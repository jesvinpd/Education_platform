const axios = require("axios");
const Question = require("../models/Question");
const Submission = require("../models/Submission");
const UserStats = require("../models/UserStat");

exports.submitCode = async (req, res) => {
  try {
  const { code, language, questionId, timeTaken } = req.body;
  const userId = req.user.userId;

  const question = await Question.findById(questionId);
  if (!question) return res.status(404).json({ message: "Question not found" });

  const languageMap = { c: 50, cpp: 54, java: 62, python: 71 };
  const langId = languageMap[language];

  let passed = 0;
  const results = [];

  for (const testCase of question.testCases) {
    const submission = await axios.post("https://judge0-ce.p.rapidapi.com/submissions", {
      
      language_id: langId,
      source_code: code,
      stdin: testCase.input
    }, {
      headers: {
        "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json"
      }
    });

    const token = submission.data.token;

    // Poll until result is ready
    let executionResult;
    while (true) {
      const check = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
        headers: {
          "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        }
      });

      if (check.data.status.id >= 3) {
        executionResult = check.data;
        break;
      }
    }

    const actualOutput = (executionResult.stdout || "").trim();
    const expectedOutput = testCase.expectedOutput.trim();

    const status = actualOutput === expectedOutput ? "Passed" : "Failed";
    if (status === "Passed") passed++;

    results.push({
      input: testCase.input,
      expected: expectedOutput,
      actual: actualOutput,
      status
    });
  }
  const submissionStatus = passed === question.testCases.length ? "Accepted" : "Rejected";

  // Save submission result
  const newSubmission = new Submission({
    questionId,
    userId,
    language,
    code,
    timeTaken,
    result: {
      totalCases: question.testCases.length,
      passedCases: passed,
      details: results
    },
    status: submissionStatus
  });

  await newSubmission.save();

  // Update question stats
  question.totalSubmissions++;
  if (passed === question.testCases.length) question.successfulSubmissions++;
  await question.save();

  //update user stats


const stats = await UserStats.findOne({ userId }) || new UserStats({ userId });

stats.totalSubmissions += 1;
stats.totalTimeSpent += timeTaken;
stats.languageUsage.set(language, (stats.languageUsage.get(language) || 0) + 1);

if (submissionStatus === "Accepted") {
  stats.acceptedSubmissions += 1;
  if (!stats.questionsSolved.includes(questionId)) {
    stats.questionsSolved.push(questionId);
  }
} else {
  stats.rejectedSubmissions += 1;
}

await stats.save();


  res.json({ verdict: newSubmission.status, passed, total: question.testCases.length, details: results });
  } catch (err) {
    console.error("Submission error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getSubmissions = async (req, res) => {
  const { userId, questionId } = req.query;
  const query = {};
  if (userId) query.userId = userId;
  if (questionId) query.questionId = questionId;

  const submissions = await Submission.find(query).populate('questionId', 'title');
  res.json(submissions);
};

exports.runOnly = async (req, res) => {
  try {
    const { code, language, questionId } = req.body;

    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ message: "Question not found" });

    const languageMap = { c: 50, cpp: 54, java: 62, python: 71 };
    const langId = languageMap[language];

    let passed = 0;
    const results = [];

    const normalize = (s) => (s || "").trim().replace(/\r/g, "");

    for (const testCase of question.testCases) {
      const submission = await axios.post("https://judge0-ce.p.rapidapi.com/submissions", {
        language_id: langId,
        source_code: code,
        stdin: testCase.input
      }, {
        headers: {
          "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "Content-Type": "application/json"
        }
      });

      const token = submission.data.token;

      let executionResult;
      while (true) {
        const check = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
          headers: {
            "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
          }
        });

        if (check.data.status.id >= 3) {
          executionResult = check.data;
          break;
        }
      }

      const actualOutput = normalize(executionResult.stdout);
      const expectedOutput = normalize(testCase.expectedOutput);

      const status = actualOutput === expectedOutput ? "Passed" : "Failed";
      if (status === "Passed") passed++;

      results.push({
        input: testCase.input,
        expected: expectedOutput,
        actual: actualOutput,
        status
      });
    }

    const verdict = passed === question.testCases.length ? "Accepted" : "Rejected";

    res.json({
      verdict,
      passed,
      total: question.testCases.length,
      details: results
    });

  } catch (err) {
    console.error("Run error:", err);
    res.status(500).json({ message: "Run failed", error: err.message });
  }
};
