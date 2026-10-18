export const JOB_ROLES = {
  data_analyst: {
    id: "data_analyst",
    title: "Data Analyst",
    category: "Data & Analytics",
    icon: "BarChart3",
    description: "Transforms raw data into actionable insights through statistical analysis, SQL queries, and interactive dashboards.",
    primarySkills: ["Python", "SQL", "Excel", "Power BI", "Tableau", "Statistics", "Data Visualization", "ETL"],
    secondarySkills: ["Pandas", "NumPy", "R", "DAX", "Data Wrangling", "A/B Testing", "PostgreSQL", "Google Analytics", "Jupyter"],
    keywords: [
      "python", "sql", "excel", "power bi", "tableau", "statistics", "data visualization", "pandas", "numpy", 
      "dax", "etl", "data wrangling", "a/b testing", "data modeling", "relational database", "business intelligence",
      "bi", "eda", "exploratory data analysis", "data cleaning", "reporting", "dashboards", "postgresql", "mysql"
    ],
    idealExperience: "0-3 Years",
    targetScoreCriteria: {
      requiredSkillsCount: 5,
      impactMetricsRatio: 0.3,
      atsMinScore: 75
    },
    sampleJobDescription: `We are looking for a Data Analyst to join our analytics team. You will be responsible for extracting data from SQL databases, creating interactive dashboards in Power BI or Tableau, conducting statistical analysis using Python (Pandas, NumPy), and delivering actionable insights to stakeholders. Experience with ETL pipelines, data wrangling, and A/B testing is a strong plus.`
  },

  fullstack_dev: {
    id: "fullstack_dev",
    title: "Full Stack Developer",
    category: "Software Development",
    icon: "Code2",
    description: "Builds scalable front-end user interfaces and robust back-end APIs/microservices for modern web applications.",
    primarySkills: ["React", "Node.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "REST APIs", "MongoDB", "PostgreSQL"],
    secondarySkills: ["Express.js", "Next.js", "Git", "Docker", "Tailwind CSS", "GraphQL", "Redux", "CI/CD", "AWS"],
    keywords: [
      "react", "node.js", "javascript", "typescript", "html5", "css3", "express", "mongodb", "postgresql", 
      "rest api", "graphql", "next.js", "git", "github", "docker", "redux", "tailwind", "microservices",
      "frontend", "backend", "full stack", "fullstack", "web development", "webpack", "vite", "jwt", "json"
    ],
    idealExperience: "0-3 Years",
    targetScoreCriteria: {
      requiredSkillsCount: 6,
      impactMetricsRatio: 0.25,
      atsMinScore: 80
    },
    sampleJobDescription: `Seeking a Full Stack Developer proficient in React.js and Node.js. You will design responsive UI components, develop RESTful APIs, manage PostgreSQL/MongoDB databases, and integrate third-party services. Strong knowledge of JavaScript/TypeScript, Git, and modern web frameworks is required.`
  },

  ml_engineer: {
    id: "ml_engineer",
    title: "Machine Learning Engineer",
    category: "AI & Data Science",
    icon: "BrainCircuit",
    description: "Designs, trains, evaluates, and deploys scalable machine learning algorithms and deep learning models.",
    primarySkills: ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "Machine Learning", "Deep Learning", "NLP", "Computer Vision"],
    secondarySkills: ["Pandas", "NumPy", "MLOps", "Docker", "Flask", "FastAPI", "Transformers", "SQL", "OpenCV"],
    keywords: [
      "python", "pytorch", "tensorflow", "scikit-learn", "machine learning", "deep learning", "nlp", "natural language processing",
      "computer vision", "opencv", "transformers", "huggingface", "bert", "mlops", "docker", "fastapi", "flask",
      "neural networks", "cnn", "rnn", "feature engineering", "model deployment", "hyperparameter tuning", "sql"
    ],
    idealExperience: "0-3 Years",
    targetScoreCriteria: {
      requiredSkillsCount: 5,
      impactMetricsRatio: 0.35,
      atsMinScore: 80
    },
    sampleJobDescription: `Join our AI lab as an ML Engineer! Requirements include strong Python programming, hands-on experience with PyTorch or TensorFlow, training classical ML (scikit-learn) and Deep Learning models, NLP or Computer Vision expertise, and deploying models using FastAPI/Docker.`
  },

  cybersecurity_analyst: {
    id: "cybersecurity_analyst",
    title: "Cybersecurity Analyst",
    category: "Security & Infrastructure",
    icon: "ShieldCheck",
    description: "Protects organizational networks, systems, and applications from cyber threats, vulnerabilities, and attacks.",
    primarySkills: ["Network Security", "Linux", "Penetration Testing", "Ethical Hacking", "SIEM", "Wireshark", "Cryptography", "SOC"],
    secondarySkills: ["Python", "Bash Scripting", "Metasploit", "Nmap", "Firewalls", "Incident Response", "OWASP", "Burp Suite"],
    keywords: [
      "network security", "linux", "penetration testing", "ethical hacking", "siem", "wireshark", "cryptography",
      "soc", "metasploit", "nmap", "firewalls", "incident response", "owasp", "burp suite", "cybersecurity",
      "vulnerability assessment", "threat detection", "bash", "python", "pcap", "cissp", "ceh", "comptia security+"
    ],
    idealExperience: "0-3 Years",
    targetScoreCriteria: {
      requiredSkillsCount: 5,
      impactMetricsRatio: 0.25,
      atsMinScore: 78
    },
    sampleJobDescription: `We are hiring a Cybersecurity Analyst to monitor security incidents, perform vulnerability assessments, inspect traffic with Wireshark, analyze logs in SIEM tools, and assist with penetration testing. Knowledge of Linux, TCP/IP networking, Python/Bash scripting, and OWASP Top 10 is essential.`
  },

  software_engineer: {
    id: "software_engineer",
    title: "Software Engineer",
    category: "Software Development",
    icon: "Terminal",
    description: "Engineers high-performance software applications, algorithms, system architecture, and robust automated test suites.",
    primarySkills: ["Java", "C++", "Python", "Data Structures", "Algorithms", "Object-Oriented Programming (OOP)", "Git", "System Design"],
    secondarySkills: ["SQL", "Spring Boot", "Multithreading", "Unit Testing", "Design Patterns", "Linux", "CI/CD", "Docker"],
    keywords: [
      "java", "c++", "python", "data structures", "algorithms", "dsa", "oop", "object-oriented programming",
      "git", "system design", "sql", "spring boot", "multithreading", "unit testing", "junit", "design patterns",
      "linux", "ci/cd", "software development", "debugging", "agile", "sdlc"
    ],
    idealExperience: "0-3 Years",
    targetScoreCriteria: {
      requiredSkillsCount: 6,
      impactMetricsRatio: 0.3,
      atsMinScore: 82
    },
    sampleJobDescription: `Looking for a core Software Engineer with strong foundations in Data Structures, Algorithms, and Object-Oriented Programming (Java/C++/Python). Responsibilities include writing clean unit-tested code, optimizing performance, designing APIs, and collaborating in an Agile environment.`
  },

  data_scientist: {
    id: "data_scientist",
    title: "Data Scientist",
    category: "AI & Data Science",
    icon: "LineChart",
    description: "Builds predictive statistical models, ML algorithms, and hypothesis testing pipelines to solve complex business problems.",
    primarySkills: ["Python", "R", "SQL", "Machine Learning", "Statistics", "Data Mining", "Hypothesis Testing", "Big Data"],
    secondarySkills: ["Pandas", "Scikit-Learn", "Spark", "Hadoop", "Tableau", "Time Series", "A/B Testing", "Deep Learning"],
    keywords: [
      "python", "r", "sql", "machine learning", "statistics", "statistical modeling", "data mining", "hypothesis testing",
      "pandas", "numpy", "scikit-learn", "spark", "tableau", "time series", "a/b testing", "deep learning",
      "predictive modeling", "clustering", "regression", "classification", "feature engineering"
    ],
    idealExperience: "0-3 Years",
    targetScoreCriteria: {
      requiredSkillsCount: 6,
      impactMetricsRatio: 0.35,
      atsMinScore: 82
    },
    sampleJobDescription: `Seeking a Data Scientist skilled in Python, SQL, and Statistical Modeling. You will build predictive algorithms, design hypothesis testing experiments, clean large datasets, and communicate data stories to business leaders.`
  }
};
