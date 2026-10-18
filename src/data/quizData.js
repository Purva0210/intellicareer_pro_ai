export const QUIZ_SECTIONS = [
  { id: "aptitude", name: "Quantitative Aptitude", icon: "Calculator" },
  { id: "logical", name: "Logical Reasoning", icon: "Compass" },
  { id: "verbal", name: "Verbal & Communication", icon: "MessageSquare" },
  { id: "technical", name: "Role Technical Core", icon: "Code" }
];

export const QUESTION_BANK = {
  aptitude: [
    {
      id: "apt_1",
      question: "A data pipeline processes 1,200 records in 4 minutes. If the rate of processing increases by 25%, how many records will be processed in 10 minutes?",
      options: [
        "3,000 records",
        "3,750 records",
        "4,200 records",
        "3,500 records"
      ],
      correctIndex: 1,
      explanation: "Initial rate = 1200 / 4 = 300 records/min. Increased rate = 300 * 1.25 = 375 records/min. In 10 mins = 375 * 10 = 3,750 records."
    },
    {
      id: "apt_2",
      question: "If the ratio of two numbers is 3:5 and their Least Common Multiple (LCM) is 150, what is the sum of the two numbers?",
      options: [
        "60",
        "80",
        "75",
        "90"
      ],
      correctIndex: 1,
      explanation: "Let numbers be 3x and 5x. LCM(3x, 5x) = 15x = 150 => x = 10. Numbers are 30 and 50. Sum = 30 + 50 = 80."
    },
    {
      id: "apt_3",
      question: "A developer invests ₹40,000 in a server infrastructure yielding 10% compound interest per annum. What will be the total investment value after 2 years?",
      options: [
        "₹48,000",
        "₹48,400",
        "₹49,200",
        "₹50,000"
      ],
      correctIndex: 1,
      explanation: "A = P(1 + r/100)^n = 40000 * (1.1)^2 = 40000 * 1.21 = ₹48,400."
    },
    {
      id: "apt_4",
      question: "A machine learning model training job takes 8 hours with 4 GPUs. Assuming linear scaling efficiency, how long will it take to train with 10 GPUs?",
      options: [
        "3.2 hours",
        "4.0 hours",
        "2.5 hours",
        "3.5 hours"
      ],
      correctIndex: 0,
      explanation: "Work = 8 * 4 = 32 GPU-hours. With 10 GPUs, time = 32 / 10 = 3.2 hours."
    }
  ],

  logical: [
    {
      id: "log_1",
      question: "If 'PYTHON' is coded as 'QZUIPO', how is 'FLASK' coded in the same pattern?",
      options: [
        "GMBT L",
        "GMBTL",
        "EMZRJ",
        "GMBSL"
      ],
      correctIndex: 1,
      explanation: "Each letter is shifted by +1 in alphabetical position: F->G, L->M, A->B, S->T, K->L. Hence 'GMBTL'."
    },
    {
      id: "log_2",
      question: "Statements: All algorithms are functions. Some functions are recursive. Conclusions: I. Some algorithms are recursive. II. All recursive entities are functions.",
      options: [
        "Only Conclusion I follows",
        "Only Conclusion II follows",
        "Neither I nor II follows",
        "Both I and II follow"
      ],
      correctIndex: 2,
      explanation: "From 'Some functions are recursive', it doesn't imply 'All recursive entities are functions'. Also no direct overlap guarantee between algorithms and recursive functions."
    },
    {
      id: "log_3",
      question: "In a family of 6 developers, A is the mentor of B who is the manager of C. D is the sister of C and daughter of E. How is A related to D?",
      options: [
        "Grandmentor / Senior Leader",
        "Mentor",
        "Direct peer",
        "Cannot be determined"
      ],
      correctIndex: 0,
      explanation: "A mentors B, who manages C and D (siblings). Thus A is at the senior leadership level above D."
    }
  ],

  verbal: [
    {
      id: "verb_1",
      question: "Select the antonym for the word 'AMBIGUOUS' in professional documentation context:",
      options: [
        "Vague",
        "Lucid",
        "Obscure",
        "Equivocal"
      ],
      correctIndex: 1,
      explanation: "Ambiguous means unclear or open to multiple interpretations. 'Lucid' means clear, transparent, and easy to understand."
    },
    {
      id: "verb_2",
      question: "Choose the correct grammatically improved sentence for an engineering report:",
      options: [
        "The team have completed the deployment without any errors.",
        "The team has completed the deployment without any errors.",
        "The team were completed the deployment without any errors.",
        "The team completing the deployment without any errors."
      ],
      correctIndex: 1,
      explanation: "'Team' is a collective noun functioning as a singular subject here, taking the singular verb 'has completed'."
    }
  ],

  technical_data_analyst: [
    {
      id: "tech_da_1",
      question: "In SQL, which clause is used to filter records AFTER an aggregation function (e.g. COUNT, SUM, AVG)?",
      options: [
        "WHERE",
        "HAVING",
        "GROUP BY",
        "ORDER BY"
      ],
      correctIndex: 1,
      explanation: "WHERE filters individual rows BEFORE aggregation. HAVING filters grouped rows AFTER aggregation."
    },
    {
      id: "tech_da_2",
      question: "What does the Pandas method `df.drop_duplicates(subset=['user_id'])` do?",
      options: [
        "Deletes the user_id column",
        "Removes duplicate rows based on unique values in user_id column",
        "Sorts the dataframe by user_id",
        "Fills null values in user_id"
      ],
      correctIndex: 1,
      explanation: "It evaluates duplicates specifically looking at the 'user_id' column values and drops subsequent repeated rows."
    },
    {
      id: "tech_da_3",
      question: "Which DAX function in Power BI calculates a value under a modified filter context?",
      options: [
        "SUMX",
        "CALCULATE",
        "FILTER",
        "RELATED"
      ],
      correctIndex: 1,
      explanation: "CALCULATE() evaluates an expression in a context modified by filters, making it the most essential DAX function."
    }
  ],

  technical_fullstack_dev: [
    {
      id: "tech_fs_1",
      question: "What is the primary benefit of React's Virtual DOM reconciliation process?",
      options: [
        "It directly modifies the browser DOM on every frame.",
        "It minimizes costly real DOM manipulations by computing diffs in memory.",
        "It replaces JavaScript with WebAssembly.",
        "It eliminates the need for CSS."
      ],
      correctIndex: 1,
      explanation: "The Virtual DOM creates an in-memory representation. During updates, React diffs trees and updates only changed nodes in the real DOM."
    },
    {
      id: "tech_fs_2",
      question: "In Express.js / Node.js, what is the role of `next()` inside a middleware function?",
      options: [
        "Terminates the HTTP request immediately",
        "Passes control to the next middleware function in the stack",
        "Restarts the Node server process",
        "Sends a JSON response to the client"
      ],
      correctIndex: 1,
      explanation: "Calling `next()` passes execution to the next registered middleware in the Express request-response cycle."
    }
  ],

  technical_ml_engineer: [
    {
      id: "tech_ml_1",
      question: "What issue does L2 Regularization (Ridge Regression) solve during ML model training?",
      options: [
        "Underfitting by adding more features",
        "Overfitting by penalizing large coefficient weights (squared magnitude)",
        "Vanishing gradient in deep neural networks",
        "Slow database read queries"
      ],
      correctIndex: 1,
      explanation: "L2 regularization adds a penalty proportional to the square of the magnitude of coefficients, preventing overfitting."
    },
    {
      id: "tech_ml_2",
      question: "Which evaluation metric is preferred when evaluating a highly imbalanced fraud detection dataset?",
      options: [
        "Accuracy Score",
        "Precision-Recall AUC / F1-Score",
        "Mean Squared Error (MSE)",
        "R-Squared"
      ],
      correctIndex: 1,
      explanation: "Standard accuracy is misleading in imbalanced datasets (e.g. 99.9% non-fraud). Precision, Recall, and F1-score evaluate true positive performance."
    }
  ],

  technical_cybersecurity_analyst: [
    {
      id: "tech_sec_1",
      question: "Which attack vector involves injecting malicious SQL commands into database query input fields?",
      options: [
        "Cross-Site Scripting (XSS)",
        "SQL Injection (SQLi)",
        "Man-in-the-Middle (MitM)",
        "Denial of Service (DoS)"
      ],
      correctIndex: 1,
      explanation: "SQL Injection occurs when untrusted user input is concatenated into raw SQL queries, allowing attackers to execute arbitrary database commands."
    },
    {
      id: "tech_sec_2",
      question: "What is the primary function of a SIEM (Security Information and Event Management) system?",
      options: [
        "Encrypting hard drives",
        "Aggregating, correlating, and analyzing real-time security log data across enterprise systems",
        "Compiling Python source code",
        "Hosting public DNS servers"
      ],
      correctIndex: 1,
      explanation: "SIEM centralizes log events from network appliances, firewalls, and servers to detect security incidents and compliance breaches."
    }
  ],

  technical_software_engineer: [
    {
      id: "tech_se_1",
      question: "What is the worst-case time complexity of QuickSort algorithm when an improper pivot is selected?",
      options: [
        "O(n log n)",
        "O(n^2)",
        "O(n)",
        "O(log n)"
      ],
      correctIndex: 1,
      explanation: "When the pivot is consistently the smallest or largest element (e.g. already sorted array), QuickSort degrades to O(n^2)."
    },
    {
      id: "tech_se_2",
      question: "In Object-Oriented Programming, which principle allows a subclass to provide a specific implementation of a method declared in its parent class?",
      options: [
        "Encapsulation",
        "Method Overriding (Polymorphism)",
        "Multiple Inheritance",
        "Abstraction"
      ],
      correctIndex: 1,
      explanation: "Method Overriding is a form of runtime polymorphism where a child class replaces the parent's default implementation."
    }
  ]
};
