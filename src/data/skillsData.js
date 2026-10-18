// Canonical skill dictionary. `a` = case-insensitive aliases, `cs` = case-sensitive aliases
// (used for short/ambiguous tokens such as "R", "ML", "SOC").
// Every skill listed in rolesData.js must have an entry here (key = lowercase skill name),
// otherwise it can never be detected in a resume.
export const SKILLS = {
  // --- Data & Analytics
  'python': { a: ['python', 'python3'] },
  'sql': { a: ['sql', 'mysql', 'sqlite', 'sql server', 't-sql', 'pl/sql'] },
  'excel': { a: ['excel', 'microsoft excel', 'vlookup', 'pivot tables', 'pivot table', 'spreadsheets'] },
  'power bi': { a: ['power bi', 'powerbi', 'power query'] },
  'dax': { a: ['dax'] },
  'tableau': { a: ['tableau', 'tableau desktop', 'tableau public'] },
  'statistics': { a: ['statistics', 'statistical analysis', 'statistical modeling', 'statistical modelling', 'regression analysis'] },
  'data visualization': { a: ['data visualization', 'data visualisation', 'data viz', 'matplotlib', 'seaborn', 'plotly'] },
  'etl': { a: ['etl', 'elt', 'data pipeline', 'data pipelines', 'extract transform load'] },
  'data wrangling': { a: ['data wrangling', 'data cleaning', 'data munging', 'data preprocessing'] },
  'a/b testing': { a: ['a/b testing', 'a/b tests', 'ab testing', 'split testing'] },
  'postgresql': { a: ['postgresql', 'postgres', 'psql'] },
  'google analytics': { a: ['google analytics', 'ga4'] },
  'jupyter': { a: ['jupyter', 'jupyter notebook', 'jupyter notebooks', 'ipython'] },
  'pandas': { a: ['pandas'] },
  'numpy': { a: ['numpy'] },
  'r': { a: [], cs: ['R', 'R Studio', 'RStudio', 'ggplot2', 'tidyverse'] },
  // --- Web / Full stack
  'react': { a: ['react', 'react.js', 'reactjs', 'react native'] },
  'node.js': { a: ['node.js', 'nodejs', 'node js'] },
  'javascript': { a: ['javascript', 'es6', 'es6+', 'vanilla js', 'ecmascript'] },
  'typescript': { a: ['typescript'] },
  'html5': { a: ['html', 'html5'] },
  'css3': { a: ['css', 'css3', 'scss', 'sass'] },
  'rest apis': { a: ['rest api', 'rest apis', 'restful', 'restful api', 'restful apis', 'api integration'] },
  'mongodb': { a: ['mongodb', 'mongo', 'mongoose'] },
  'express.js': { a: ['express.js', 'expressjs', 'express js'] },
  'next.js': { a: ['next.js', 'nextjs'] },
  'git': { a: ['git', 'version control'] },
  'docker': { a: ['docker', 'dockerfile', 'containerization', 'docker compose'] },
  'tailwind css': { a: ['tailwind', 'tailwindcss', 'tailwind css'] },
  'graphql': { a: ['graphql'] },
  'redux': { a: ['redux', 'redux toolkit'] },
  'ci/cd': { a: ['ci/cd', 'cicd', 'github actions', 'jenkins', 'continuous integration', 'gitlab ci'] },
  'aws': { a: ['aws', 'amazon web services', 'ec2'] },
  // --- AI / ML
  'pytorch': { a: ['pytorch', 'torch'] },
  'tensorflow': { a: ['tensorflow', 'keras'] },
  'scikit-learn': { a: ['scikit-learn', 'sklearn', 'scikit learn'] },
  'machine learning': { a: ['machine learning', 'supervised learning', 'unsupervised learning', 'xgboost'], cs: ['ML'] },
  'deep learning': { a: ['deep learning', 'neural network', 'neural networks', 'cnn', 'lstm', 'rnn'] },
  'nlp': { a: ['nlp', 'natural language processing', 'spacy', 'nltk'] },
  'transformers': { a: ['transformers', 'bert', 'hugging face', 'huggingface'] },
  'computer vision': { a: ['computer vision', 'image processing', 'object detection', 'yolo'] },
  'opencv': { a: ['opencv', 'cv2'] },
  'mlops': { a: ['mlops', 'mlflow', 'kubeflow', 'model deployment'] },
  'flask': { a: ['flask'] },
  'fastapi': { a: ['fastapi'] },
  // --- Security
  'network security': { a: ['network security', 'tcp/ip', 'vpn', 'ids/ips'] },
  'firewalls': { a: ['firewall', 'firewalls', 'palo alto', 'fortinet'] },
  'linux': { a: ['linux', 'ubuntu', 'kali', 'redhat', 'centos'] },
  'penetration testing': { a: ['penetration testing', 'pen testing', 'pentesting', 'vulnerability assessment'] },
  'ethical hacking': { a: ['ethical hacking', 'ethical hacker', 'red team', 'ctf'] },
  'metasploit': { a: ['metasploit'] },
  'burp suite': { a: ['burp suite', 'burp'] },
  'nmap': { a: ['nmap'] },
  'wireshark': { a: ['wireshark', 'pcap', 'packet analysis', 'packet capture'] },
  'siem': { a: ['siem', 'splunk', 'qradar', 'elk stack', 'log analysis'] },
  'soc': { a: ['security operations center'], cs: ['SOC'] },
  'cryptography': { a: ['cryptography', 'encryption', 'pki', 'ssl/tls', 'aes', 'rsa'] },
  'owasp': { a: ['owasp', 'owasp top 10', 'xss', 'sql injection'] },
  'incident response': { a: ['incident response', 'incident handling', 'dfir'] },
  'bash scripting': { a: ['bash', 'shell scripting', 'shell scripts'] },
  // --- Software engineering
  'java': { a: ['java', 'jdk', 'jvm'] },
  'c++': { a: ['c++', 'cpp'] },
  'data structures': { a: ['data structures', 'dsa', 'linked list', 'linked lists', 'hash map', 'hash maps', 'binary tree', 'binary trees'] },
  'algorithms': { a: ['algorithms', 'dynamic programming', 'big-o', 'big o', 'time complexity'] },
  'object-oriented programming (oop)': { a: ['oop', 'object-oriented programming', 'object oriented programming', 'object oriented'] },
  'system design': { a: ['system design', 'distributed systems', 'microservices', 'load balancing', 'low-level design'] },
  'spring boot': { a: ['spring boot', 'springboot', 'spring framework'] },
  'multithreading': { a: ['multithreading', 'multi-threading', 'concurrency'] },
  'unit testing': { a: ['unit testing', 'unit tests', 'junit', 'pytest', 'jest', 'mockito'] },
  'design patterns': { a: ['design patterns', 'solid principles', 'factory pattern', 'singleton'] },
  // --- Data science
  'data mining': { a: ['data mining'] },
  'hypothesis testing': { a: ['hypothesis testing', 'hypothesis tests', 'p-value', 'p-values'] },
  'big data': { a: ['big data'] },
  'spark': { a: ['spark', 'pyspark', 'apache spark'] },
  'hadoop': { a: ['hadoop', 'hdfs', 'mapreduce'] },
  'time series': { a: ['time series', 'arima', 'forecasting'] }
};

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const build = (alias, flags) =>
  new RegExp(`(?<![A-Za-z0-9+#])${esc(alias)}(?![A-Za-z0-9+#&]|\\.[A-Za-z0-9])`, flags);

// Pre-compiled matchers: [canonicalSkill, RegExp[]]
export const SKILL_MATCHERS = Object.entries(SKILLS).map(([skill, def]) => [
  skill,
  [...(def.a || []).map((a) => build(a, 'i')), ...(def.cs || []).map((a) => build(a, ''))]
]);
