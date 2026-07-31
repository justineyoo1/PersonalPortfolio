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
      items: ["Python", "TypeScript", "Swift", "Java", "SQL"],
    },
    {
      group: "Frameworks",
      items: ["React", "Next.js", "Node.js", "FastAPI", "Spring Boot"],
    },
    {
      group: "Libraries",
      items: ["PyTorch", "Hugging Face", "pandas", "NumPy"],
    },
    {
      group: "Databases",
      items: ["Postgres", "Snowflake", "dbt"],
    },
    {
      group: "Developer Tools",
      items: ["Git", "Docker", "Kubernetes", "GitHub Actions"],
    },
    {
      group: "Platforms",
      items: ["Stripe", "Plaid", "SwiftUI", "StoreKit 2", "MCP"],
    },
  ],
  courses: [
    "COMP 210 - Data Structures and Algorithms",
    "COMP 211 - Systems Fundamentals",
    "COMP 301 - Foundations of Programming",
    "COMP 311 - Computer Organization",
    "MATH 381 - Discrete Mathematics",
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
