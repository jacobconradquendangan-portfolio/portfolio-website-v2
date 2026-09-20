export const profile = {
  name: "Jacob Conrad Quendangan",
  shortName: "Jacob",
  photo: "/profile.jpg",
  role: "Information Systems Student • Data, UX & Agentic AI",
  tagline:
    "I'm a 4th-year Information Systems student at CIIT College of Innovation and Integrated Technology (expected graduation 2027), focused on turning complex data into decisions and ideas into polished interfaces with Next.js. Currently, I'm exploring Agentic AI—integrating autonomous coding agents like Cline directly into my development workflow to build AI-driven applications that act, not just answer.",
  location: "Philippines • Remote",
  email: "jacobconradquendangan@gmail.com",
  availability: "Open to internships & collaborations",
  socials: {
    github: "https://github.com/jacobconradquendangan-portfolio",
    linkedin: "https://www.linkedin.com/in/jacob-conrad-quendangan-176525435",
  },
  stats: [
    { value: "16+", label: "Projects completed" },
    { value: "20+", label: "Technologies" },
    { value: "3+", label: "Years active" },
  ],
  links: {
    cvBuilder: "https://cv-builder-eight-tan.vercel.app/",
    cvBuilderGithub: "https://github.com/jacobconradquendangan-portfolio/CV-Builder",
  },
};

export const skills = [
  {
    category: "Programming",
    icon: "code",
    description: "Languages I build with",
    items: ["Python", "JavaScript", "C++", "TypeScript"],
  },
  {
    category: "Data & Analytics",
    icon: "chart",
    description: "From raw data to decisions",
    items: ["Machine Learning", "Power BI", "Tableau", "Excel", "Pandas", "Jamovi"],
  },
  {
    category: "Web Development",
    icon: "globe",
    description: "Modern, responsive web apps",
    items: ["React", "Next.js", "HTML", "CSS", "Tailwind"],
  },
  {
    category: "Design",
    icon: "palette",
    description: "Advanced Figma & UX craft",
    items: ["Figma (Advanced)", "UI/UX", "Prototyping", "User Research"],
  },
  {
    category: "Database",
    icon: "database",
    description: "Modeling to analytics",
    items: ["SQL", "PostgreSQL", "Firebase", "MongoDB", "Metabase"],
  },
  {
    category: "Tools & DevOps",
    icon: "tools",
    description: "Shipping & quality",
    items: ["GitHub", "VS Code", "Selenium", "RapidMiner"],
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  github: string;
  live?: string;
  video?: string;
  image?: string;
  category: "Industry Award" | "System Architecture" | "Data Analytics";
  highlight: string;
  featured?: boolean;
};

export const projectCategories = [
  "All",
  "Industry Award",
  "System Architecture",
  "Data Analytics",
] as const;

const G = {
  award: "from-amber-400 via-orange-500 to-rose-500",
  system: "from-blue-500 via-indigo-500 to-violet-600",
  data: "from-emerald-400 via-teal-500 to-cyan-600",
};

export const projects: (Project & { gradient: string })[] = [
  {
    title: "CV Builder",
    description:
      "A real-time Next.js application that transforms user inputs into polished, structured resumes. Engineered using Cline in VS Code to explore modern agentic workflows — leveraging autonomous AI to accelerate component architecture, state management, and rapid feature iteration.",
    tags: ["Next.js", "Frontend", "Cline", "Agentic Workflow"],
    github: "https://github.com/jacobconradquendangan-portfolio/CV-Builder",
    live: "https://cv-builder-eight-tan.vercel.app/",
    category: "System Architecture",
    highlight: "Live • Full-Stack",
    featured: true,
    gradient: "from-violet-600 via-fuchsia-500 to-orange-400",
    image: "/projects/cvbuilder.webp",
  },
  {
    title: "MNLFlow Transit",
    description:
      "1st Place Industry Choice Award. Flight tracking and regional transit logic with a real-time analytics dashboard.",
    tags: ["Flight Tracking", "Transit Logic", "Analytics", "Figma", "UX Design"],
    github:
      "https://github.com/jacobconradquendangan-portfolio/My-Portfolio/tree/main/01_Industry_Wins_Awards/MNLFlow_ALIAC",
    live: "https://raw.githubusercontent.com/jacobconradquendangan-portfolio/My-Portfolio/main/01_Industry_Wins_Awards/MNLFlow_ALIAC/awards/industry_choice_award.png",
    category: "Industry Award",
    highlight: "1st Place • Industry Choice",
    featured: true,
    gradient: G.award,
    image: "/projects/mnlflow.webp",
  },
  {
    title: "Aegis Verification Platform",
    description:
      "2nd Place Hackathon. Next.js/Firebase authentication and verification system with MFA support.",
    tags: ["Next.js", "Firebase", "Authentication", "MFA"],
    github:
      "https://github.com/jacobconradquendangan-portfolio/My-Portfolio/tree/main/01_Industry_Wins_Awards/Institutional_Hackathon",
    live: "https://aegis-hackathon-demo.vercel.app/demo",
    category: "Industry Award",
    highlight: "2nd Place • Hackathon",
    featured: true,
    gradient: G.award,
    image: "/projects/aegishackathon.webp",
  },
  {
    title: "Rosemary & Thyme",
    description:
      "Entrepreneurship analysis and a functional restaurant reservation system design with table management.",
    tags: ["Entrepreneurship", "Reservation System", "Figma", "UX Design"],
    github:
      "https://github.com/jacobconradquendangan-portfolio/My-Portfolio/tree/main/01_Industry_Wins_Awards/Rosemary_Thyme_Restaurant",
    live: "https://www.figma.com/proto/POcZDoavPIU7AC0DxBL7dB/HCIFO?node-id=87-422&t=pPJ4IspMhfQnnKhC-1&scaling=scale-down&content-scaling=fixed&page-id=11%3A88&starting-point-node-id=283%3A4679",
    category: "Industry Award",
    highlight: "Reservation System",
    gradient: G.award,
    image: "/projects/rosemaryandthyme.webp",
  },
  {
    title: "CESCon Sales Blitz",
    description:
      "Highest Sales Award. Bazaar performance documentation with demand forecasting and ROI analysis.",
    tags: ["Sales Analytics", "Demand Forecasting", "Documentation"],
    github:
      "https://github.com/jacobconradquendangan-portfolio/My-Portfolio/tree/main/01_Industry_Wins_Awards/CESCon_Sales_Blitz",
    live: "https://raw.githubusercontent.com/jacobconradquendangan-portfolio/My-Portfolio/main/01_Industry_Wins_Awards/CESCon_Sales_Blitz/media/Highest_Sales_Award_Team.jpg",
    category: "Industry Award",
    highlight: "Highest Sales Award",
    gradient: G.award,
    image: "/projects/salesblitz.webp",
  },
  {
    title: "MetroStay Platform",
    description:
      "Technopreneurship case study, business strategy, and mobile app build (.apk) with real-time booking.",
    tags: ["Mobile App", "Business Strategy", "Technopreneurship"],
    github:
      "https://github.com/jacobconradquendangan-portfolio/My-Portfolio/tree/main/02_Systems_Architecture_Dev/MetroStay_Technopreneurship",
    video:
      "https://raw.githubusercontent.com/jacobconradquendangan-portfolio/My-Portfolio/main/02_Systems_Architecture_Dev/MetroStay_Technopreneurship/Media/MetroStay_Demo.mp4",
    category: "System Architecture",
    highlight: "Mobile .apk + Strategy",
    gradient: G.system,
    image: "/projects/metrostay.webp",
  },
  {
    title: "EduTrack Enrollment",
    description:
      "Full-cycle enrollment system with complex subject prerequisite logic and automated advising.",
    tags: ["JavaScript", "Enrollment System", "Prerequisite Logic"],
    github:
      "https://github.com/jacobconradquendangan-portfolio/My-Portfolio/tree/main/02_Systems_Architecture_Dev/EduTrack_Tech_Com",
    live: "https://lytningjake.github.io/TechComm_FO_2025/login.html",
    category: "System Architecture",
    highlight: "Full-cycle System",
    gradient: G.system,
    image: "/projects/edutrack.webp",
  },
  {
    title: "Hotel Management SAD",
    description:
      "Structural and behavioral blueprints (UML, DFD) plus SRS documentation with use-case analysis.",
    tags: ["UML", "DFD", "SRS", "System Architecture"],
    github:
      "https://github.com/jacobconradquendangan-portfolio/My-Portfolio/tree/main/02_Systems_Architecture_Dev/SAD_Hotel_Management",
    live: "https://raw.githubusercontent.com/jacobconradquendangan-portfolio/My-Portfolio/main/02_Systems_Architecture_Dev/SAD_Hotel_Management/Documentation/presentation.pdf",
    category: "System Architecture",
    highlight: "UML • DFD • SRS",
    gradient: G.system,
    image: "/projects/hotel.webp",
  },
  {
    title: "Bulls & Cows Engine",
    description:
      "C++ source code and algorithmic breakdown for a deductive logic game with an AI opponent.",
    tags: ["C++", "Algorithms", "Game Logic", "AI"],
    github:
      "https://github.com/jacobconradquendangan-portfolio/My-Portfolio/tree/main/02_Systems_Architecture_Dev/DSA_Bulls_Cows",
    category: "System Architecture",
    highlight: "C++ • AI Opponent",
    gradient: G.system,
    image: "/projects/bullsandcow.webp",
  },
  {
    title: "Selenium Test Automation",
    description:
      "Hybrid Quality Engineering suite with 20 automated test cases plus comprehensive manual documentation. Demo presented by group member Ken Escolar.",
    tags: ["Selenium WebDriver", "Node.js", "Quality Assurance"],
    github:
      "https://github.com/jacobconradquendangan-portfolio/My-Portfolio/tree/main/02_Systems_Architecture_Dev/Fundamentals_Software_Testing_Selenium",
    video:
      "https://raw.githubusercontent.com/jacobconradquendangan-portfolio/My-Portfolio/main/02_Systems_Architecture_Dev/Fundamentals_Software_Testing_Selenium/media/demo_video.mp4",
    category: "System Architecture",
    highlight: "20 Automated Tests",
    gradient: G.system,
    image: "/projects/softwaretesting.webp",
  },
  {
    title: "Diabetes ML Classifier",
    description:
      "Python-based machine learning model for health-risk predictive analysis with 92% accuracy.",
    tags: ["Python", "Machine Learning", "Scikit-learn"],
    github:
      "https://github.com/jacobconradquendangan-portfolio/My-Portfolio/tree/main/03_Data_Analytics_Dashboards/Diabetes_Prediction_ML",
    category: "Data Analytics",
    highlight: "92% Accuracy",
    featured: true,
    gradient: G.data,
    image: "/projects/diabetes.webp",
  },
  {
    title: "BI HR Dashboards",
    description:
      "Workforce analytics suite covering recruitment, wellness, and headcount with predictive turnover modeling.",
    tags: ["Power BI", "HR Analytics", "Dashboard"],
    github:
      "https://github.com/jacobconradquendangan-portfolio/My-Portfolio/tree/main/03_Data_Analytics_Dashboards/BI_HR_Attrition",
    live: "https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fraw.githubusercontent.com%2Fjacobconradquendangan-portfolio%2FMy-Portfolio%2Frefs%2Fheads%2Fmain%2F03_Data_Analytics_Dashboards%2FBI_HR_Attrition%2FBI_Finals_Dashboards_Master.xlsx&wdOrigin=BROWSELINK",
    category: "Data Analytics",
    highlight: "Predictive Turnover Model",
    featured: true,
    gradient: G.data,
    image: "/projects/hrbidashboard.webp",
  },
  {
    title: "Wine Data Mining",
    description:
      "RapidMiner processes with Decision Trees and Logistic Regression for wine quality prediction.",
    tags: ["RapidMiner", "Data Mining", "Decision Trees", "Classification"],
    github:
      "https://github.com/jacobconradquendangan-portfolio/My-Portfolio/tree/main/03_Data_Analytics_Dashboards/Wine_Quality_Data_Mining",
    live: "https://raw.githubusercontent.com/jacobconradquendangan-portfolio/My-Portfolio/main/03_Data_Analytics_Dashboards/Wine_Quality_Data_Mining/Datamining_Final_Report.pdf",
    category: "Data Analytics",
    highlight: "Decision Trees • LogReg",
    featured: true,
    gradient: G.data,
    image: "/projects/datamining.webp",
  },
  {
    title: "Airline Regression",
    description:
      "Statistical regression analysis of service-quality fit measures and coefficients with R² analysis.",
    tags: ["Regression Analysis", "Statistics", "Jamovi"],
    github:
      "https://github.com/jacobconradquendangan-portfolio/My-Portfolio/tree/main/03_Data_Analytics_Dashboards/Airline_Service_Regression",
    live: "https://raw.githubusercontent.com/jacobconradquendangan-portfolio/My-Portfolio/main/03_Data_Analytics_Dashboards/Airline_Service_Regression/Airline_Service_Analysis.pdf",
    category: "Data Analytics",
    highlight: "R² Analysis",
    gradient: G.data,
    image: "/projects/airline.webp",
  },
  {
    title: "EDM Medical Schema",
    description:
      "Hospital database architecture with SQL scripts and Metabase analytics for patient outcomes.",
    tags: ["SQL", "Database Design", "Metabase", "PostgreSQL"],
    github:
      "https://github.com/jacobconradquendangan-portfolio/My-Portfolio/tree/main/03_Data_Analytics_Dashboards/EDM_Medical_SQL",
    video:
      "https://raw.githubusercontent.com/jacobconradquendangan-portfolio/My-Portfolio/main/03_Data_Analytics_Dashboards/EDM_Medical_SQL/Media/Dashboard_Demo.mp4",
    category: "Data Analytics",
    highlight: "Hospital DB Architecture",
    gradient: G.data,
    image: "/projects/edm.webp",
  },
  {
    title: "SCM Inventory Health",
    description:
      "Automated supply-chain inventory logic and health monitoring via Excel.",
    tags: ["Excel", "Supply Chain", "Inventory Management"],
    github:
      "https://github.com/jacobconradquendangan-portfolio/My-Portfolio/tree/main/03_Data_Analytics_Dashboards/SCM_Inventory_Excel",
    live: "https://docs.google.com/spreadsheets/d/1pi-65n5sWiRS8G9-ZpBcOv6OWJWOTtqhP-28oUdRzeY/edit?gid=942817655#gid=942817655",
    category: "Data Analytics",
    highlight: "Automated Monitoring",
    gradient: G.data,
    image: "/projects/scminventory.webp",
  },
];

export const certifications = [
  {
    title: "HubSpot Certifications",
    description:
      "Professional certifications in inbound marketing, sales, and customer service with practical implementation.",
    github:
      "https://github.com/jacobconradquendangan-portfolio/My-Portfolio/tree/main/04_Credentials_Leadership/HubSpot_Certs",
    gallery: [
      "https://raw.githubusercontent.com/jacobconradquendangan-portfolio/My-Portfolio/main/04_Credentials_Leadership/HubSpot_Certs/HubSpot%20Marketing%20Hub%20Software%20Certificate.png",
      "https://raw.githubusercontent.com/jacobconradquendangan-portfolio/My-Portfolio/main/04_Credentials_Leadership/HubSpot_Certs/HubSpot%20Sales%20Hub%20Software%20Certificate.png",
    ],
  },
  {
    title: "Leadership Portfolio",
    description:
      "Proof of Tech Lead roles and institutional speaking engagements, including 5+ major conferences.",
    github:
      "https://github.com/jacobconradquendangan-portfolio/My-Portfolio/tree/main/04_Credentials_Leadership/Leadership_Speaking",
  },
  {
    title: "Lean Six Sigma White Belt",
    description:
      "Certified in Lean Six Sigma fundamentals — waste reduction, process mapping, and continuous improvement methodology.",
    github:
      "https://github.com/jacobconradquendangan-portfolio/My-Portfolio/tree/main/04_Credentials_Leadership/Lean_6_Sigma_Whitebelt_Cert",
    pdf: "https://raw.githubusercontent.com/jacobconradquendangan-portfolio/My-Portfolio/main/04_Credentials_Leadership/Lean_6_Sigma_Whitebelt_Cert/Official_Certification_Issued_Lean_Six_Sigma_White_Belt_Certification.png",
  },
  {
    title: "AI Engineering Workshop (Cursor)",
    description:
      "Hands-on workshop in AI-assisted software development with Cursor — agentic coding workflows, LLM integration, and shipping AI-driven features.",
    github:
      "https://github.com/jacobconradquendangan-portfolio/My-Portfolio/tree/main/04_Credentials_Leadership/Tech_Certificate_AI_Engineering_for_Software_Development",
    pdf: "https://raw.githubusercontent.com/jacobconradquendangan-portfolio/My-Portfolio/main/04_Credentials_Leadership/Tech_Certificate_AI_Engineering_for_Software_Development/jacob_quendangan.png",
  },
];
