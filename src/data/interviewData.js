export const INTERVIEW_QUESTIONS = {
  hr: [
    {
      id: "hr_1",
      category: "Behavioral",
      question: "Tell me about a challenging project you worked on. What obstacles did you encounter and how did you resolve them?",
      expectedKeywords: ["project", "challenge", "problem", "action", "result", "solution", "teamwork", "outcome"],
      starCheck: {
        situation: "Context or setting of the project problem",
        task: "Your specific responsibility or deadline",
        action: "Concrete technical/personal steps you executed",
        result: "Measurable outcome (e.g. improved speed by 30%, reduced bugs)"
      },
      sampleAnswer: "During my final year project, our team faced high latency when fetching large dataset records from PostgreSQL. As lead backend developer, I benchmarked SQL queries using EXPLAIN ANALYZE, added indexed columns on frequent search fields, and implemented Redis caching. This reduced query execution time from 2.4s to 180ms, improving overall dashboard responsiveness by 92%."
    },
    {
      id: "hr_2",
      category: "Career Objectives",
      question: "Why do you want to pursue a career in your target role, and where do you see yourself in 3 years?",
      expectedKeywords: ["passion", "skills", "learning", "growth", "impact", "industry", "contribute"],
      sampleAnswer: "I am passionate about building data-driven systems. Over the past 2 years, I've honed my skills in Python, SQL, and machine learning through hands-on projects and open-source contributions. In 3 years, I see myself taking ownership of core AI pipelines, mentoring junior developers, and delivering scalable solutions."
    },
    {
      id: "hr_3",
      category: "Conflict Management",
      question: "Describe a situation where you had a disagreement with a teammate or supervisor regarding code architecture or project direction.",
      expectedKeywords: ["disagreement", "listen", "data", "compromise", "perspective", "align", "resolution"],
      sampleAnswer: "During a team sprint, a colleague wanted to use a complex GraphQL setup for a small internal dashboard, whereas I favored simple REST endpoints to meet our tight deadline. Instead of debating subjectively, I created a quick benchmark comparing setup time and bundle size. We reviewed the trade-offs together and agreed to start with REST while keeping code modular for potential GraphQL migration later."
    }
  ],

  data_analyst: [
    {
      id: "da_int_1",
      question: "How do you approach missing data or outliers in a dataset prior to building BI dashboards?",
      expectedKeywords: ["missing values", "nulls", "imputation", "mean", "median", "outliers", "iqr", "z-score", "pandas"],
      sampleAnswer: "First, I inspect the proportion of missing values. If under 5%, I may impute numerical columns using median or mode. For outliers, I visualize data distribution using box plots and calculate Interquartile Range (IQR) or Z-scores. I consult business domain context before deciding whether to filter or cap outliers."
    },
    {
      id: "da_int_2",
      question: "Walk me through how you optimize a slow SQL query involving multi-table JOINs and aggregations.",
      expectedKeywords: ["indexes", "join", "explain analyze", "subquery", "group by", "execution plan", "select columns"],
      sampleAnswer: "I start by running EXPLAIN ANALYZE to identify sequential scans. I add B-Tree indexes on primary and foreign key join columns, avoid SELECT *, filter rows early using WHERE clauses before performing JOINs, and replace unnecessary subqueries with WITH (CTE) clauses."
    }
  ],

  fullstack_dev: [
    {
      id: "fs_int_1",
      question: "How do you handle JWT authentication and secure token storage in a React + Node application?",
      expectedKeywords: ["jwt", "token", "httponly", "cookie", "localstorage", "auth middleware", "refresh token", "xss", "csrf"],
      sampleAnswer: "I store access tokens in memory or short-lived state and long-lived refresh tokens inside HttpOnly, Secure, SameSite cookies to prevent Cross-Site Scripting (XSS). On requests, the Express server verifies the JWT signature in an authentication middleware before serving protected routes."
    },
    {
      id: "fs_int_2",
      question: "Explain the difference between SQL (e.g. PostgreSQL) and NoSQL (e.g. MongoDB) databases and when to use each.",
      expectedKeywords: ["sql", "nosql", "relational", "schema", "acid", "document", "mongodb", "postgresql", "scalability"],
      sampleAnswer: "SQL databases use structured tables with fixed schemas and ACID compliance, ideal for financial or transactional systems. NoSQL databases like MongoDB use flexible JSON documents, making them suited for rapidly evolving unstructured data and horizontal scaling."
    }
  ],

  ml_engineer: [
    {
      id: "ml_int_1",
      question: "How do you diagnose and fix overfitting in a deep learning model?",
      expectedKeywords: ["overfitting", "regularization", "dropout", "early stopping", "data augmentation", "cross validation", "loss curve"],
      sampleAnswer: "Overfitting occurs when training loss decreases while validation loss increases. I resolve it by adding Dropout layers (e.g. rate=0.3), applying L2 regularization (weight decay), utilizing Data Augmentation techniques, gathering more data, and implementing EarlyStopping based on validation loss."
    },
    {
      id: "ml_int_2",
      question: "Explain how self-attention works in Transformer architectures like BERT or GPT.",
      expectedKeywords: ["transformer", "self-attention", "query", "key", "value", "dot product", "softmax", "multi-head"],
      sampleAnswer: "Self-attention computes dynamic weights between every pair of tokens in a sequence. It projects input embeddings into Query (Q), Key (K), and Value (V) matrices, calculates scaling factor Softmax(Q K^T / sqrt(d_k)), and multiplies by V to capture long-range contextual relationships."
    }
  ],

  cybersecurity_analyst: [
    {
      id: "sec_int_1",
      question: "What steps would you take upon detecting a ransomware attack on a company workstation?",
      expectedKeywords: ["isolate", "network", "containment", "incident response", "backup", "logs", "forensics", "notification"],
      sampleAnswer: "Immediately isolate the infected machine from the network (disconnect Ethernet/Wi-Fi) to prevent lateral movement. Preserve volatile RAM memory for forensics, alert the Incident Response team, inspect firewall and SIEM logs, identify patient zero, and restore unaffected systems from secure offline backups."
    }
  ],

  software_engineer: [
    {
      id: "se_int_1",
      question: "Explain how you would design a URL Shortener service (like bit.ly) considering database choice, hash algorithm, and scaling.",
      expectedKeywords: ["base62", "hashing", "md5", "cache", "redis", "database", "short url", "redirect", "system design"],
      sampleAnswer: "Use Base62 encoding (a-z, A-Z, 0-9) on auto-incrementing 64-bit integer IDs to convert to 7-character short codes. Store original URL mappings in PostgreSQL or MongoDB. Place a Redis cache layer in front of the DB to serve 95%+ of GET redirects under 10ms."
    }
  ]
};
