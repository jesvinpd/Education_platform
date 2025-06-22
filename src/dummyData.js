export const codingProblems = [
  {
    questionNo: 1,
    question: "Two Sum: Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target. You may assume that each input would have exactly one solution.",
    expectedOutput: "[0,1]",
    input: {
      nums: [2, 7, 11, 15],
      target: 9
    },
    difficultyLevel: "Easy",
    topics: ["Array", "Hash Table"],
    hint: "Try using a hash map to store the complement of each number you've seen so far."
  },
  {
    questionNo: 2,
    question: "Valid Palindrome: Given a string s, return true if it is a palindrome, or false otherwise. A string is a palindrome when it reads the same backward as forward. Consider only alphanumeric characters and ignore cases.",
    expectedOutput: "true",
    input: {
      s: "A man, a plan, a canal: Panama"
    },
    difficultyLevel: "Easy",
    topics: ["String", "Two Pointers"],
    hint: "Convert the string to lowercase and remove non-alphanumeric characters before checking."
  },
  {
    questionNo: 3,
    question: "Maximum Subarray: Given an integer array nums, find the subarray with the largest sum, and return its sum.",
    expectedOutput: "6",
    input: {
      nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
    },
    difficultyLevel: "Medium",
    topics: ["Array", "Dynamic Programming", "Divide and Conquer"],
    hint: "Try using Kadane's algorithm - keep track of the maximum sum ending at each position."
  },
  {
    questionNo: 4,
    question: "Binary Tree Level Order Traversal: Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
    expectedOutput: "[[3],[9,20],[15,7]]",
    input: {
      root: [3,9,20,null,null,15,7]
    },
    difficultyLevel: "Medium",
    topics: ["Tree", "BFS", "Binary Tree"],
    hint: "Use a queue to keep track of nodes at each level while traversing."
  },
  {
    questionNo: 5,
    question: "Merge k Sorted Lists: You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    expectedOutput: "[1,1,2,3,4,4,5,6]",
    input: {
      lists: [[1,4,5],[1,3,4],[2,6]]
    },
    difficultyLevel: "Hard",
    topics: ["Linked List", "Divide and Conquer", "Heap"],
    hint: "Consider using a min-heap to always get the smallest element among all lists."
  },
  {
    questionNo: 6,
    question: "Word Search: Given an m x n grid of characters board and a string word, return true if word exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.",
    expectedOutput: "true",
    input: {
      board: [
        ["A","B","C","E"],
        ["S","F","C","S"],
        ["A","D","E","E"]
      ],
      word: "ABCCED"
    },
    difficultyLevel: "Medium",
    topics: ["Array", "Backtracking", "Matrix"],
    hint: "Use DFS with backtracking from each cell as a potential starting point."
  },
  {
    questionNo: 7,
    question: "LRU Cache: Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get and put methods.",
    expectedOutput: "Methods should return appropriate values based on LRU policy",
    input: {
      operations: ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"],
      values: [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
    },
    difficultyLevel: "Medium",
    topics: ["Hash Table", "Linked List", "Design"],
    hint: "Consider using a hash map along with a doubly linked list to achieve O(1) operations."
  },
  {
    questionNo: 8,
    question: "Regular Expression Matching: Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where '.' matches any single character and '*' matches zero or more of the preceding element.",
    expectedOutput: "true",
    input: {
      s: "aa",
      p: "a*"
    },
    difficultyLevel: "Hard",
    topics: ["String", "Dynamic Programming", "Recursion"],
    hint: "Try using dynamic programming to build up the solution from smaller subproblems."
  },
  {
    questionNo: 9,
    question: "Find Median from Data Stream: Design a data structure that supports adding integers to the data stream and calculating the median of all elements so far.",
    expectedOutput: "Methods should return correct median after each addition",
    input: {
      operations: ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"],
      values: [[], [1], [2], [], [3], []]
    },
    difficultyLevel: "Hard",
    topics: ["Heap", "Design", "Data Stream"],
    hint: "Consider using two heaps: a max-heap for the lower half and a min-heap for the upper half."
  },
  {
    questionNo: 10,
    question: "Clone Graph: Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.",
    expectedOutput: "Cloned graph with same structure as input",
    input: {
      adjList: [[2,4],[1,3],[2,4],[1,3]]
    },
    difficultyLevel: "Medium",
    topics: ["Hash Table", "DFS", "BFS", "Graph"],
    hint: "Use a hash map to keep track of already cloned nodes while traversing the graph."
  }
];

