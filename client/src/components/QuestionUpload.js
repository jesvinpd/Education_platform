import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import './css/QuestionUpload.css';
import { createQuestion } from '../services/api';

const QuestionUpload = () => {
  const [questionData, setQuestionData] = useState({
    title: '',
    description: '',
    difficultyLevel: 'Easy',
    topics: '',
    constraints: '',
    hints: '',
  });

  const [examples, setExamples] = useState([
    { input: '', output: '' }
  ]);

  const [testCases, setTestCases] = useState([
    { input: '', expectedOutput: '', hidden: false }
  ]);

  const [codeTemplates, setCodeTemplates] = useState({
    c: '',
    cpp: '',
    java: '',
    python: ''
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExampleChange = (index, field, value) => {
    const updatedExamples = [...examples];
    updatedExamples[index][field] = value;
    setExamples(updatedExamples);
  };

  const addExample = () => {
    setExamples([...examples, { input: '', output: '' }]);
  };

  const removeExample = (index) => {
    if (examples.length > 1) {
      setExamples(examples.filter((_, i) => i !== index));
    }
  };

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', expectedOutput: '', hidden: false }]);
  };

  const removeTestCase = (index) => {
    if (testCases.length > 1) {
      setTestCases(testCases.filter((_, i) => i !== index));
    }
  };

  const handleCodeTemplateChange = (language, value) => {
    setCodeTemplates(prev => ({
      ...prev,
      [language]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Prepare form data
      const formData = new FormData();
      
      // Add basic question data
      formData.append('title', questionData.title);
      formData.append('description', questionData.description);
      formData.append('difficultyLevel', questionData.difficultyLevel);
      
      // Convert topics, constraints, and hints from strings to arrays
      const topicsArray = questionData.topics.split(',').map(topic => topic.trim()).filter(topic => topic);
      const constraintsArray = questionData.constraints.split('\n').filter(constraint => constraint.trim());
      const hintsArray = questionData.hints.split('\n').filter(hint => hint.trim());
      
      formData.append('topics', JSON.stringify(topicsArray));
      formData.append('constraints', JSON.stringify(constraintsArray));
      formData.append('hints', JSON.stringify(hintsArray));
      
      // Add examples and test cases
      formData.append('examples', JSON.stringify(examples));
      formData.append('testCases', JSON.stringify(testCases));
      
      // Add code templates
      formData.append('languages', JSON.stringify(codeTemplates));
      
      // Add image if exists
      if (image) {
        formData.append('image', image);
      }

      const response = await createQuestion(formData);
      
      setMessage('Question created successfully!');
      
      // Reset form
      setQuestionData({
        title: '',
        description: '',
        difficultyLevel: 'Easy',
        topics: '',
        constraints: '',
        hints: '',
      });
      setExamples([{ input: '', output: '' }]);
      setTestCases([{ input: '', expectedOutput: '', hidden: false }]);
      setCodeTemplates({ c: '', cpp: '', java: '', python: '' });
      setImage(null);
      console.log("hello")
    } catch (error) {
      console.error('Error creating question:', error);
      setMessage('Error creating question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="question-upload-container">
      <div className="question-upload-header">
        <h1>Upload New Question</h1>
        <p>Create a new coding problem for the platform</p>
      </div>

      <form onSubmit={handleSubmit} className="question-upload-form">
        {/* Basic Information Section */}
        <div className="form-section">
          <h2>Basic Information</h2>
          
          <div className="form-group">
            <label htmlFor="title">Question Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={questionData.title}
              onChange={handleInputChange}
              required
              placeholder="e.g., Two Sum"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={questionData.description}
              onChange={handleInputChange}
              required
              rows="6"
              placeholder="Describe the problem in detail..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="difficultyLevel">Difficulty Level *</label>
              <select
                id="difficultyLevel"
                name="difficultyLevel"
                value={questionData.difficultyLevel}
                onChange={handleInputChange}
                required
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="topics">Topics</label>
              <input
                type="text"
                id="topics"
                name="topics"
                value={questionData.topics}
                onChange={handleInputChange}
                placeholder="Array, Hash Table, Two Pointers (comma separated)"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Question Image (optional)</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Examples Section */}
        <div className="form-section">
          <h2>Examples</h2>
          {examples.map((example, index) => (
            <div key={index} className="example-item">
              <div className="example-header">
                <h3>Example {index + 1}</h3>
                {examples.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExample(index)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Input</label>
                  <textarea
                    value={example.input}
                    onChange={(e) => handleExampleChange(index, 'input', e.target.value)}
                    placeholder="nums = [2,7,11,15], target = 9"
                    rows="2"
                  />
                </div>
                <div className="form-group">
                  <label>Output</label>
                  <textarea
                    value={example.output}
                    onChange={(e) => handleExampleChange(index, 'output', e.target.value)}
                    placeholder="[0,1]"
                    rows="2"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button type="button" onClick={addExample} className="add-btn">
            Add Example
          </button>
        </div>

        {/* Test Cases Section */}
        <div className="form-section">
          <h2>Test Cases</h2>
          {testCases.map((testCase, index) => (
            <div key={index} className="test-case-item">
              <div className="test-case-header">
                <h3>Test Case {index + 1}</h3>
                <div className="test-case-actions">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={testCase.hidden}
                      onChange={(e) => handleTestCaseChange(index, 'hidden', e.target.checked)}
                    />
                    Hidden
                  </label>
                  {testCases.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTestCase(index)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Input</label>
                  <textarea
                    value={testCase.input}
                    onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                    placeholder="Test input..."
                    rows="2"
                  />
                </div>
                <div className="form-group">
                  <label>Expected Output</label>
                  <textarea
                    value={testCase.expectedOutput}
                    onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                    placeholder="Expected output..."
                    rows="2"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button type="button" onClick={addTestCase} className="add-btn">
            Add Test Case
          </button>
        </div>

        {/* Code Templates Section */}
        <div className="form-section">
          <h2>Code Templates</h2>
          
          <div className="code-templates">
            {Object.entries(codeTemplates).map(([language, code]) => (
              <div key={language} className="code-template">
                <h3>{language.toUpperCase()} Template</h3>
                <div className="monaco-editor-container">
                  <Editor
                    height="200px"
                    language={language === 'cpp' ? 'cpp' : language}
                    value={code}
                    onChange={(value) => handleCodeTemplateChange(language, value || '')}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="form-section">
          <h2>Additional Information</h2>
          
          <div className="form-group">
            <label htmlFor="constraints">Constraints</label>
            <textarea
              id="constraints"
              name="constraints"
              value={questionData.constraints}
              onChange={handleInputChange}
              rows="4"
              placeholder="1 <= nums.length <= 10^4&#10;-10^9 <= nums[i] <= 10^9&#10;Each constraint on a new line"
            />
          </div>

          <div className="form-group">
            <label htmlFor="hints">Hints</label>
            <textarea
              id="hints"
              name="hints"
              value={questionData.hints}
              onChange={handleInputChange}
              rows="4"
              placeholder="Try using a hash map&#10;Think about the time complexity&#10;Each hint on a new line"
            />
          </div>
        </div>

        {/* Submit Section */}
        <div className="form-section">
          <div className="submit-section">
            {message && (
              <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
                {message}
              </div>
            )}
            
            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Question'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuestionUpload;
