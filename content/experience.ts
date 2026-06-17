export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: "robotics-lab",
    role: "Undergraduate Research Assistant",
    organization: "Autonomous Systems Lab",
    period: "2024 — Present",
    description:
      "Contributing to mobile robot perception and navigation research. Responsible for sensor integration, data collection pipelines, and hardware prototyping.",
    highlights: [
      "Integrated LiDAR and camera fusion for improved localization accuracy",
      "Built repeatable test environments for benchmarking navigation stacks",
      "Co-authored internal technical reports on sensor calibration methods",
    ],
  },
  {
    id: "mech-team",
    role: "Mechanical Lead",
    organization: "University Robotics Competition Team",
    period: "2023 — 2024",
    description:
      "Led the mechanical subteam for a national robotics competition. Managed design reviews, manufacturing schedules, and cross-disciplinary integration with software and electrical teams.",
    highlights: [
      "Directed CAD workflow and tolerance analysis for competition robot",
      "Coordinated CNC machining and 3D printing across 12 subsystems",
      "Reduced assembly time by 30% through modular mounting redesign",
    ],
  },
  {
    id: "engineering-society",
    role: "Workshop Coordinator",
    organization: "Engineering Student Society",
    period: "2022 — 2023",
    description:
      "Organized hands-on workshops on CAD, rapid prototyping, and basic embedded systems for first-year engineering students.",
    highlights: [
      "Ran 8 workshops with 30+ attendees each semester",
      "Developed curriculum materials for SolidWorks and 3D printing labs",
      "Managed workshop equipment inventory and safety protocols",
    ],
  },
  {
    id: "summer-intern",
    role: "Mechanical Engineering Intern",
    organization: "Precision Manufacturing Co.",
    period: "Summer 2023",
    description:
      "Supported design and quality teams on production tooling. Gained hands-on experience with GD&T, inspection methods, and design-for-manufacturing principles.",
    highlights: [
      "Redesigned a fixture that reduced part rejection rate by 15%",
      "Created inspection documentation for incoming quality control",
      "Participated in cross-functional design review meetings",
    ],
  },
];
