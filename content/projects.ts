export type ProjectTag = "Robotics" | "Mechanical" | "Software";

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: ProjectTag[];
  image: string;
  content: string;
  techStack: string[];
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    slug: "autonomous-rover",
    title: "Autonomous Rover Platform",
    description:
      "A modular ground robot with SLAM navigation, sensor fusion, and real-time path planning for unstructured environments.",
    tags: ["Robotics", "Software"],
    image: "/images/projects/rover.svg",
    content:
      "Designed and built a four-wheeled autonomous rover from the ground up. The platform integrates LiDAR, IMU, and wheel odometry for localization. A ROS 2 stack handles perception, mapping, and motion planning with custom cost-map tuning for indoor/outdoor transitions.\n\nMechanical design focused on modularity — sensor mounts and drive modules can be swapped without redesigning the chassis. The suspension geometry was iterated through FEA to balance ground clearance and stability on uneven terrain.",
    techStack: ["ROS 2", "Python", "C++", "LiDAR", "SolidWorks", "Gazebo"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    slug: "cnc-gantry-redesign",
    title: "CNC Gantry Redesign",
    description:
      "Structural redesign of a 3-axis CNC gantry to improve rigidity and reduce chatter during high-speed aluminum machining.",
    tags: ["Mechanical"],
    image: "/images/projects/cnc.svg",
    content:
      "Analyzed vibration modes in the existing gantry frame using modal FEA. Identified the Y-axis rail mounting as the primary compliance source. Redesigned the cross-member geometry with triangular ribbing and relocated bearing surfaces to shorten the load path.\n\nPrototype testing showed a 40% reduction in surface roughness at equivalent feed rates. Documented the full design process including tolerance stack-up analysis and assembly fixtures.",
    techStack: ["SolidWorks", "FEA", "GD&T", "Aluminum 6061", "CAM"],
    github: "https://github.com",
  },
  {
    slug: "embedded-motor-controller",
    title: "Embedded Motor Controller",
    description:
      "Custom BLDC motor controller with field-oriented control, CAN bus communication, and a web-based tuning interface.",
    tags: ["Software", "Robotics"],
    image: "/images/projects/motor.svg",
    content:
      "Developed a compact motor controller board around an STM32 running FOC at 20 kHz. Implemented current sensing, over-temperature protection, and CAN-based command/telemetry for integration with a larger robot fleet.\n\nBuilt a lightweight web UI for real-time parameter tuning over USB — gain adjustment, waveform visualization, and fault logging. The firmware architecture separates the control loop from communication to guarantee deterministic timing.",
    techStack: ["C", "STM32", "FOC", "CAN", "TypeScript", "WebSerial"],
    github: "https://github.com",
  },
  {
    slug: "soft-gripper",
    title: "Pneumatic Soft Gripper",
    description:
      "A compliant pneumatic gripper for delicate object manipulation, with molded silicone fingers and pressure-regulated actuation.",
    tags: ["Mechanical", "Robotics"],
    image: "/images/projects/gripper.svg",
    content:
      "Designed a three-finger soft gripper using cast silicone over 3D-printed molds. The pneumatic network uses a single pressure line with internal channels modeled in CAD and validated through flow simulation.\n\nTested grasp success rates across object geometries from 20 mm spheres to flat plates. Integrated with a 6-DOF arm for pick-and-place evaluation in a lab setting.",
    techStack: ["Silicone molding", "3D printing", "Pneumatics", "SolidWorks"],
  },
  {
    slug: "telemetry-dashboard",
    title: "Robot Telemetry Dashboard",
    description:
      "Real-time monitoring dashboard for multi-robot fleets — battery, pose, task status, and alert history in a single view.",
    tags: ["Software"],
    image: "/images/projects/dashboard.svg",
    content:
      "Built a full-stack telemetry system that ingests robot state over MQTT and renders live updates in a React dashboard. Historical data is stored in TimescaleDB for trend analysis and post-mission review.\n\nThe UI prioritizes information density without clutter — status at a glance, drill-down on click. Designed for field operators wearing gloves on tablets.",
    techStack: ["Next.js", "TypeScript", "MQTT", "TimescaleDB", "WebSockets"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    slug: "walking-mechanism",
    title: "Leg Mechanism Study",
    description:
      "Kinematic analysis and prototype of a four-bar leg linkage for a small walking robot, optimizing stride length and ground clearance.",
    tags: ["Mechanical", "Robotics"],
    image: "/images/projects/leg.svg",
    content:
      "Explored multiple leg topologies through kinematic simulation before committing to a four-bar design. Swept linkage parameters to map the trade-off between stride length, peak joint torque, and foot trajectory flatness.\n\nMachined a single-leg test rig from aluminum stock and drove it with a servo to validate simulation predictions. Documented the design space exploration methodology for future platform decisions.",
    techStack: ["MATLAB", "SolidWorks", "CNC machining", "Servo control"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
