type SkillGroup = {
  group: string;
  items: string[];
};

type Cert = {
  name: string;
  issuer: string;
  date: string;
};

type SkillsCoursesCerts = {
  skills: SkillGroup[];
  courses: string[];
  certs: Cert[];
};

export const skillsCoursesCerts: SkillsCoursesCerts = {
  skills: [
    {
      group: "Languages",
      items: ["Python", "Java", "SQL", "JavaScript", "TypeScript"],
    },
    {
      group: "Data",
      items: [
        "PostgreSQL",
        "MySQL",
        "Jupyter",
        "Snowflake",
        "dbt",
        "Pandas",
        "Scikit-learn",
        "Matplotlib",
      ],
    },
    {
      group: "Frontend",
      items: ["HTML", "CSS", "Flask", "Tailwind CSS", "React.js"],
    },
    {
      group: "Testing & Devops",
      items: ["Docker", "Kubernetes", "Linux", "CI/CD"],
    },
    {
      group: "Backend & APIs",
      items: ["Spring Boot", "REST APIs", "Node.js"],
    },
  ],
  courses: [
    "COMP 210 - Data Structures and Algorithms",
    "COMP 211 - Systems Fundamentals",
    "COMP 301 - Foundations of Programming",
    "COMP 311 - Computer Organization",
    "MATH 381 - Discrete Mathe",
    "COMP 455 - Models of Languages and Computation",
    "COMP 550 - Algorithms and Analysis",
    "COMP 560 - Artificial Intelligence",
    "MATH 231 - Calculus  I",
    "MATH 232 - Calculus II",
    "MATH 233 - Calculus III",
    "MATH 347 - Linear Algebra",
    "STOR 120 - Statistics and Data Science",
    "STOR 435 - Intro to Probability",
  ],
  certs: [
    {
      name: "PCEP: Certified Entry-Level Python Programmer",
      issuer: "Python Institute",
      date: "Feb 2023",
    },
    {
      name: "MTA: Introduction to Programming Using Python",
      issuer: "Microsoft",
      date: "Feb 2022",
    },
  ],
};
