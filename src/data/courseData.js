export const VERIFIED_COURSES = [
  // Python & Statistics
  {
    id: "py_01",
    skill: "Python",
    title: "Python for Everybody Specialization",
    provider: "Coursera (University of Michigan)",
    url: "https://www.coursera.org/specializations/python",
    level: "Beginner",
    duration: "2-3 Months",
    cost: "Free Audit Available",
    rating: 4.8,
    description: "Learn Python fundamentals, data structures, network programming, and SQL database integration."
  },
  {
    id: "py_02",
    skill: "Python",
    title: "Scientific Computing with Python",
    provider: "freeCodeCamp",
    url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/",
    level: "Beginner to Intermediate",
    duration: "30 Hours",
    cost: "100% Free",
    rating: 4.9,
    description: "Learn Python basics, algorithms, and build 5 hands-on projects with free certification."
  },
  {
    id: "sql_01",
    skill: "SQL",
    title: "Intro to SQL & Advanced SQL",
    provider: "Kaggle Learn",
    url: "https://www.kaggle.com/learn/intro-to-sql",
    level: "Beginner",
    duration: "6 Hours",
    cost: "100% Free",
    rating: 4.9,
    description: "Hands-on SQL queries, JOINs, GROUP BY, window functions, and BigQuery integration."
  },
  {
    id: "sql_02",
    skill: "SQL",
    title: "SQL for Data Science",
    provider: "Coursera (UC Davis)",
    url: "https://www.coursera.org/learn/sql-for-data-science",
    level: "Beginner",
    duration: "4 Weeks",
    cost: "Free Audit Available",
    rating: 4.7,
    description: "Master relational database queries, filtering, aggregations, and data analysis in SQLite."
  },
  {
    id: "bi_01",
    skill: "Power BI",
    title: "Microsoft Power BI Data Analyst Professional Certificate",
    provider: "Microsoft Learn / Coursera",
    url: "https://learn.microsoft.com/en-us/credentials/certifications/power-bi-data-analyst-associate/",
    level: "Intermediate",
    duration: "1 Month",
    cost: "Free Docs & Tutorials",
    rating: 4.8,
    description: "Official Microsoft certification preparation covering DAX, data modeling, and interactive reporting."
  },
  {
    id: "tab_01",
    skill: "Tableau",
    title: "Data Visualization with Tableau Specialization",
    provider: "Coursera (UC Davis)",
    url: "https://www.coursera.org/specializations/data-visualization",
    level: "Beginner",
    duration: "1-2 Months",
    cost: "Free Audit Available",
    rating: 4.7,
    description: "Design interactive visual analytics dashboards, custom charts, and business intelligence stories."
  },

  // Web Development
  {
    id: "react_01",
    skill: "React",
    title: "React Official Documentation & Interactive Guide",
    provider: "React Official (react.dev)",
    url: "https://react.dev/learn",
    level: "Beginner to Advanced",
    duration: "Self-Paced",
    cost: "100% Free",
    rating: 5.0,
    description: "Learn component design, state management, hooks (useState, useEffect, useContext), and modern React."
  },
  {
    id: "react_02",
    skill: "React",
    title: "Full Stack Open - Deep Dive Into Modern Web Development",
    provider: "University of Helsinki",
    url: "https://fullstackopen.com/en/",
    level: "Intermediate",
    duration: "2 Months",
    cost: "100% Free",
    rating: 4.9,
    description: "Learn React, Redux, Node.js, Express, MongoDB, TypeScript, GraphQL, and Docker."
  },
  {
    id: "node_01",
    skill: "Node.js",
    title: "Node.js & Express REST API Development",
    provider: "MDN Web Docs",
    url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs",
    level: "Beginner to Intermediate",
    duration: "20 Hours",
    cost: "100% Free",
    rating: 4.9,
    description: "Comprehensive MDN guide on server-side JS, routing, controllers, databases, and authentication."
  },
  {
    id: "ts_01",
    skill: "TypeScript",
    title: "TypeScript Handbook & Practical Course",
    provider: "Microsoft TypeScript Docs",
    url: "https://www.typescriptlang.org/docs/handbook/intro.html",
    level: "Intermediate",
    duration: "Self-Paced",
    cost: "100% Free",
    rating: 4.9,
    description: "Official guide to static typing, interfaces, generics, type narrowing, and utility types."
  },

  // Machine Learning & AI
  {
    id: "ml_01",
    skill: "Machine Learning",
    title: "Machine Learning Specialization by Andrew Ng",
    provider: "DeepLearning.AI / Coursera",
    url: "https://www.coursera.org/specializations/machine-learning-introduction",
    level: "Beginner to Intermediate",
    duration: "2 Months",
    cost: "Free Audit Available",
    rating: 4.9,
    description: "Supervised & Unsupervised Learning, Decision Trees, Logistic Regression, Neural Networks, Scikit-Learn."
  },
  {
    id: "pytorch_01",
    skill: "PyTorch",
    title: "Deep Learning with PyTorch Tutorials",
    provider: "PyTorch Official",
    url: "https://pytorch.org/tutorials/",
    level: "Intermediate",
    duration: "Self-Paced",
    cost: "100% Free",
    rating: 4.9,
    description: "Official tutorials for Tensors, Autograd, Neural Networks, CNNs, Transformers, and Model Deployment."
  },
  {
    id: "tf_01",
    skill: "TensorFlow",
    title: "TensorFlow Developer Certificate Program",
    provider: "TensorFlow / Google",
    url: "https://www.tensorflow.org/resources/learn-ml",
    level: "Intermediate",
    duration: "1-2 Months",
    cost: "100% Free Tutorials",
    rating: 4.8,
    description: "Build computer vision, NLP, and time series forecasting models using Keras and TensorFlow 2."
  },
  {
    id: "nlp_01",
    skill: "NLP",
    title: "Hugging Face NLP Course (Transformers & spaCy)",
    provider: "Hugging Face",
    url: "https://huggingface.co/learn/nlp-course/",
    level: "Intermediate to Advanced",
    duration: "40 Hours",
    cost: "100% Free",
    rating: 5.0,
    description: "Learn Transformer models (BERT, GPT), fine-tuning tokenizers, datasets, and text classification."
  },

  // Cybersecurity
  {
    id: "sec_01",
    skill: "Network Security",
    title: "Cybersecurity Basics & Networking fundamentals",
    provider: "Cisco Networking Academy",
    url: "https://www.netacad.com/courses/cybersecurity",
    level: "Beginner",
    duration: "30 Hours",
    cost: "100% Free",
    rating: 4.8,
    description: "Understand TCP/IP protocols, threat vectors, firewalls, Wireshark packet capture, and network defense."
  },
  {
    id: "pen_01",
    skill: "Penetration Testing",
    title: "Hands-on Ethical Hacking & Web Security",
    provider: "TryHackMe / PortSwigger Web Security Academy",
    url: "https://portswigger.net/web-security",
    level: "Beginner to Advanced",
    duration: "Self-Paced",
    cost: "100% Free Labs",
    rating: 5.0,
    description: "Interactive labs covering SQL Injection, XSS, CSRF, Authentication bypass, and OWASP vulnerabilities."
  },

  // Software Engineering & DSA
  {
    id: "dsa_01",
    skill: "Data Structures",
    title: "Data Structures & Algorithms Course",
    provider: "Harvard University (CS50 via edX)",
    url: "https://www.edx.org/course/introduction-computer-science-harvardx-cs50x",
    level: "Beginner",
    duration: "10 Weeks",
    cost: "Free Audit Available",
    rating: 4.9,
    description: "Arrays, Linked Lists, Trees, Graphs, Hash Tables, Sorting Algorithms, Time/Space Complexity."
  },
  {
    id: "java_01",
    skill: "Java",
    title: "Java Programming Masterclass",
    provider: "Oracle / Dev.java",
    url: "https://dev.java/learn/",
    level: "Beginner to Intermediate",
    duration: "Self-Paced",
    cost: "100% Free",
    rating: 4.8,
    description: "Official Oracle documentation & tutorials covering OOP, Collections, Streams API, and Multithreading."
  }
];

export const RECOMMENDED_PROJECTS = [
  {
    id: "proj_da_01",
    roleId: "data_analyst",
    title: "E-Commerce Customer Retention & Sales Dashboard",
    techStack: ["Python", "SQL", "Power BI", "Pandas"],
    difficulty: "Intermediate",
    objective: "Analyze 50k+ e-commerce sales transactions to detect customer churn patterns and visualize key KPIs.",
    steps: [
      "Extract raw CSV sales data into PostgreSQL database using Python scripts.",
      "Clean missing values and perform RFM (Recency, Frequency, Monetary) segmentation.",
      "Connect Power BI to SQL server and design an interactive executive dashboard with slicers."
    ],
    githubTemplateUrl: "https://github.com/topics/power-bi-dashboard"
  },
  {
    id: "proj_fs_01",
    roleId: "fullstack_dev",
    title: "SaaS Job Application & Resume Builder Portal",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    difficulty: "Advanced",
    objective: "Build a responsive web application allowing candidates to upload resumes, build profiles, and track jobs.",
    steps: [
      "Design frontend views in React with state management and form validation.",
      "Create Node/Express REST API endpoints for user authentication (JWT) and resume upload.",
      "Store user applications in MongoDB and deploy on Vercel / Render."
    ],
    githubTemplateUrl: "https://github.com/topics/fullstack-react-nodejs"
  },
  {
    id: "proj_ml_01",
    roleId: "ml_engineer",
    title: "Resume Keyword & Skill Extraction NLP Pipeline",
    techStack: ["Python", "PyTorch", "Transformers", "FastAPI", "Docker"],
    difficulty: "Advanced",
    objective: "Train an NLP token classification model to automatically parse skill entities from candidate resumes.",
    steps: [
      "Prepare labeled resume dataset with CONLL format for NER tokens.",
      "Fine-tune Hugging Face DistilBERT model for entity recognition.",
      "Package model inside a FastAPI app containerized with Docker."
    ],
    githubTemplateUrl: "https://github.com/topics/nlp-resume-parser"
  },
  {
    id: "proj_sec_01",
    roleId: "cybersecurity_analyst",
    title: "Automated Network Traffic & Vulnerability Scanner",
    techStack: ["Python", "Wireshark", "Nmap", "Linux", "Bash"],
    difficulty: "Intermediate",
    objective: "Develop a Python tool to scan local networks for exposed ports, weak SSL certificates, and suspicious PCAP packets.",
    steps: [
      "Use python-nmap wrapper to automate subnet port scanning.",
      "Parse PCAP capture files using PyShark to alert on unencrypted HTTP passwords.",
      "Generate HTML summary security audit reports."
    ],
    githubTemplateUrl: "https://github.com/topics/vulnerability-scanner"
  },
  {
      "id": "proj_da_02",
      "roleId": "data_analyst",
      "title": "Sales Forecasting & Trend Analysis Report",
      "techStack": [
          "Python",
          "Pandas",
          "Matplotlib",
          "Excel",
          "Statistics"
      ],
      "difficulty": "Beginner",
      "objective": "Analyze 3 years of retail sales data to find seasonality and forecast next-quarter revenue.",
      "steps": [
          "Clean the dataset and handle missing values and outliers with Pandas.",
          "Plot monthly/seasonal trends and run moving-average and ARIMA forecasts.",
          "Summarize findings and recommendations in an Excel + PDF report."
      ],
      "githubTemplateUrl": "https://github.com/topics/sales-forecasting"
  },
  {
      "id": "proj_da_03",
      "roleId": "data_analyst",
      "title": "HR Attrition Analysis with Tableau Storytelling",
      "techStack": [
          "SQL",
          "Tableau",
          "Python",
          "Statistics"
      ],
      "difficulty": "Intermediate",
      "objective": "Identify the factors driving employee attrition and present them as an interactive dashboard.",
      "steps": [
          "Load the HR dataset into MySQL and write SQL queries for attrition by department, tenure and salary band.",
          "Run hypothesis tests (chi-square / t-test) on key drivers.",
          "Build a Tableau story with filters and highlight actions for HR."
      ],
      "githubTemplateUrl": "https://github.com/topics/employee-attrition"
  },
  {
      "id": "proj_da_04",
      "roleId": "data_analyst",
      "title": "Automated ETL Pipeline for Weekly KPI Reporting",
      "techStack": [
          "Python",
          "SQL",
          "ETL",
          "Airflow",
          "PostgreSQL"
      ],
      "difficulty": "Advanced",
      "objective": "Automate extraction, transformation and loading of raw files into a reporting database.",
      "steps": [
          "Write Python scripts to ingest CSV/API data and validate schemas.",
          "Transform and load into PostgreSQL star-schema tables.",
          "Schedule the pipeline with Airflow/cron and refresh a BI dashboard."
      ],
      "githubTemplateUrl": "https://github.com/topics/etl-pipeline"
  },
  {
      "id": "proj_fs_02",
      "roleId": "fullstack_dev",
      "title": "Real-Time Chat Application with Rooms",
      "techStack": [
          "React",
          "Node.js",
          "Socket.IO",
          "MongoDB",
          "JWT"
      ],
      "difficulty": "Intermediate",
      "objective": "Build a multi-room chat app with authentication, typing indicators and message history.",
      "steps": [
          "Set up Express + Socket.IO server with JWT-protected connections.",
          "Build React chat UI with rooms, online users and typing status.",
          "Persist messages in MongoDB and deploy frontend and backend."
      ],
      "githubTemplateUrl": "https://github.com/topics/socket-io-chat"
  },
  {
      "id": "proj_fs_03",
      "roleId": "fullstack_dev",
      "title": "E-Commerce Store with Cart & Payment Integration",
      "techStack": [
          "React",
          "Redux",
          "Node.js",
          "Express",
          "MongoDB",
          "Stripe"
      ],
      "difficulty": "Advanced",
      "objective": "Create a full online store with product catalog, cart, orders and test-mode payments.",
      "steps": [
          "Design product, user and order schemas in MongoDB.",
          "Implement REST APIs and Redux cart with protected checkout.",
          "Integrate Stripe test mode and add an admin product dashboard."
      ],
      "githubTemplateUrl": "https://github.com/topics/ecommerce-react"
  },
  {
      "id": "proj_fs_04",
      "roleId": "fullstack_dev",
      "title": "Task Management Kanban Board",
      "techStack": [
          "React",
          "TypeScript",
          "Node.js",
          "PostgreSQL",
          "REST APIs"
      ],
      "difficulty": "Beginner",
      "objective": "Build a Trello-style board with drag-and-drop tasks and user accounts.",
      "steps": [
          "Create React board components with drag-and-drop (dnd-kit).",
          "Build CRUD REST APIs with PostgreSQL and validation.",
          "Add login, filters by label/assignee and deploy on Render/Vercel."
      ],
      "githubTemplateUrl": "https://github.com/topics/kanban-board"
  },
  {
      "id": "proj_ml_02",
      "roleId": "ml_engineer",
      "title": "Customer Churn Prediction with Model Explainability",
      "techStack": [
          "Python",
          "Scikit-Learn",
          "XGBoost",
          "SHAP",
          "Pandas"
      ],
      "difficulty": "Intermediate",
      "objective": "Predict telecom customer churn and explain which features drive each prediction.",
      "steps": [
          "Perform EDA, encode features and handle class imbalance (SMOTE / class weights).",
          "Compare Logistic Regression, Random Forest and XGBoost using cross-validation, F1 and ROC-AUC.",
          "Explain the best model with SHAP and serve it through a Flask API."
      ],
      "githubTemplateUrl": "https://github.com/topics/churn-prediction"
  },
  {
      "id": "proj_ml_03",
      "roleId": "ml_engineer",
      "title": "Image Classification with Transfer Learning",
      "techStack": [
          "Python",
          "PyTorch",
          "CNN",
          "Computer Vision",
          "Docker"
      ],
      "difficulty": "Intermediate",
      "objective": "Fine-tune a pretrained ResNet to classify images (e.g., plant diseases) with strong accuracy.",
      "steps": [
          "Prepare and augment the image dataset with train/val/test splits.",
          "Fine-tune ResNet/EfficientNet and track metrics with confusion matrix.",
          "Deploy a small Streamlit/FastAPI demo for image upload and prediction."
      ],
      "githubTemplateUrl": "https://github.com/topics/image-classification"
  },
  {
      "id": "proj_ml_04",
      "roleId": "ml_engineer",
      "title": "Movie / Course Recommendation Engine",
      "techStack": [
          "Python",
          "Scikit-Learn",
          "Pandas",
          "NLP",
          "Sentence Transformers"
      ],
      "difficulty": "Advanced",
      "objective": "Build a content-based and collaborative recommender and evaluate it with ranking metrics.",
      "steps": [
          "Create content embeddings from descriptions (TF-IDF vs sentence embeddings).",
          "Implement collaborative filtering with matrix factorization.",
          "Evaluate with Precision@K / Recall@K and compare approaches."
      ],
      "githubTemplateUrl": "https://github.com/topics/recommendation-system"
  },
  {
      "id": "proj_sec_02",
      "roleId": "cybersecurity_analyst",
      "title": "SIEM Log Monitoring Lab with Splunk / ELK",
      "techStack": [
          "SIEM",
          "Splunk",
          "ELK Stack",
          "Linux",
          "Log Analysis"
      ],
      "difficulty": "Intermediate",
      "objective": "Set up a home lab that ingests logs and raises alerts for brute-force and suspicious logins.",
      "steps": [
          "Deploy Splunk Free or ELK on a Linux VM and forward auth/syslog logs.",
          "Write detection queries and dashboards for failed-login spikes.",
          "Simulate attacks (Hydra) and document incident-response findings."
      ],
      "githubTemplateUrl": "https://github.com/topics/siem"
  },
  {
      "id": "proj_sec_03",
      "roleId": "cybersecurity_analyst",
      "title": "Phishing URL & Email Detection with Machine Learning",
      "techStack": [
          "Python",
          "Scikit-Learn",
          "NLP",
          "Feature Engineering",
          "Flask"
      ],
      "difficulty": "Intermediate",
      "objective": "Classify phishing vs. legitimate URLs/emails using lexical and content features.",
      "steps": [
          "Collect a labeled phishing dataset (e.g., PhishTank / UCI) and engineer URL features.",
          "Train and compare classifiers; report precision, recall and F1.",
          "Wrap the model in a Flask app or browser extension."
      ],
      "githubTemplateUrl": "https://github.com/topics/phishing-detection"
  },
  {
      "id": "proj_sec_04",
      "roleId": "cybersecurity_analyst",
      "title": "Web App Penetration Test Report (OWASP Top 10)",
      "techStack": [
          "OWASP",
          "Burp Suite",
          "Kali Linux",
          "SQL Injection",
          "XSS"
      ],
      "difficulty": "Beginner",
      "objective": "Perform an authorized pentest on DVWA/Juice Shop and write a professional report.",
      "steps": [
          "Set up DVWA or OWASP Juice Shop in a local lab (never test live sites without permission).",
          "Exploit and document SQLi, XSS and broken auth using Burp Suite.",
          "Write a report with severity ratings (CVSS) and remediation steps."
      ],
      "githubTemplateUrl": "https://github.com/topics/owasp"
  },
  {
      "id": "proj_se_01",
      "roleId": "software_engineer",
      "title": "Library Management System with Clean Architecture",
      "techStack": [
          "Java",
          "Spring Boot",
          "MySQL",
          "REST APIs",
          "JUnit"
      ],
      "difficulty": "Intermediate",
      "objective": "Build a layered backend with books, members and borrowing rules plus unit tests.",
      "steps": [
          "Model entities and relationships; implement repository/service/controller layers.",
          "Add validation, exception handling and JWT security.",
          "Write JUnit/Mockito tests and document APIs with Swagger."
      ],
      "githubTemplateUrl": "https://github.com/topics/library-management-system"
  },
  {
      "id": "proj_se_02",
      "roleId": "software_engineer",
      "title": "URL Shortener with Caching & Rate Limiting",
      "techStack": [
          "Python",
          "Flask",
          "Redis",
          "SQL",
          "System Design"
      ],
      "difficulty": "Intermediate",
      "objective": "Design and build a scalable URL shortener with analytics.",
      "steps": [
          "Implement Base62 ID encoding and a SQL-backed mapping store.",
          "Add Redis caching and per-IP rate limiting.",
          "Track click analytics and load-test with Locust."
      ],
      "githubTemplateUrl": "https://github.com/topics/url-shortener"
  },
  {
      "id": "proj_se_03",
      "roleId": "software_engineer",
      "title": "Algorithm Visualizer Web App",
      "techStack": [
          "JavaScript",
          "Data Structures",
          "Algorithms",
          "HTML/CSS",
          "React"
      ],
      "difficulty": "Beginner",
      "objective": "Visualize sorting, searching and graph algorithms step by step.",
      "steps": [
          "Implement sorting, BFS/DFS and Dijkstra algorithms as step generators.",
          "Animate each step with React and adjustable speed controls.",
          "Show time/space complexity and publish on GitHub Pages."
      ],
      "githubTemplateUrl": "https://github.com/topics/algorithm-visualizer"
  },
  {
      "id": "proj_ds_01",
      "roleId": "data_scientist",
      "title": "House Price Prediction with Feature Engineering",
      "techStack": [
          "Python",
          "Scikit-Learn",
          "Pandas",
          "Regression",
          "Statistics"
      ],
      "difficulty": "Beginner",
      "objective": "Predict housing prices and compare regression models with proper validation.",
      "steps": [
          "Do EDA, handle skewness/outliers and engineer features.",
          "Compare Linear, Ridge/Lasso and Gradient Boosting using cross-validation (RMSE, R²).",
          "Present insights and feature importance in a notebook report."
      ],
      "githubTemplateUrl": "https://github.com/topics/house-price-prediction"
  },
  {
      "id": "proj_ds_02",
      "roleId": "data_scientist",
      "title": "Sentiment Analysis on Product Reviews",
      "techStack": [
          "Python",
          "NLP",
          "TF-IDF",
          "Scikit-Learn",
          "Transformers"
      ],
      "difficulty": "Intermediate",
      "objective": "Classify review sentiment and compare a TF-IDF baseline against a transformer model.",
      "steps": [
          "Clean text and build a TF-IDF + Logistic Regression baseline.",
          "Fine-tune DistilBERT and compare F1 scores and confusion matrices.",
          "Visualize top positive/negative terms and publish a Streamlit demo."
      ],
      "githubTemplateUrl": "https://github.com/topics/sentiment-analysis"
  },
  {
      "id": "proj_ds_03",
      "roleId": "data_scientist",
      "title": "A/B Testing & Customer Segmentation Study",
      "techStack": [
          "Python",
          "Statistics",
          "SQL",
          "Clustering",
          "Matplotlib"
      ],
      "difficulty": "Intermediate",
      "objective": "Run an A/B test analysis and segment customers with K-Means for targeted campaigns.",
      "steps": [
          "Perform hypothesis testing and compute confidence intervals/p-values.",
          "Segment customers with RFM + K-Means and validate with silhouette score.",
          "Write business recommendations for each segment."
      ],
      "githubTemplateUrl": "https://github.com/topics/customer-segmentation"
  }
];
