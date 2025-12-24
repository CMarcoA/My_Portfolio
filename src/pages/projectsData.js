export const projects = [
  {
    id: "jackal-research",
    title: "Jackal Research",
    year: "2024",
    headline: "Research Project · Robotics & Navigation",
    about: [
      "Developed advanced navigation and mapping capabilities for the Jackal unmanned ground vehicle platform.",
    ],
    learned: [
      "Implemented SLAM (Simultaneous Localization and Mapping) algorithms for autonomous navigation.",
      "Worked with ROS (Robot Operating System) to integrate sensor data and control systems.",
    ],
    contributions: [
      "Built real-time obstacle detection and avoidance systems using LiDAR and camera fusion.",
      "Created path planning algorithms that optimized for terrain and energy efficiency.",
      "Developed visualization tools for mapping and navigation debugging.",
    ],
    media: [
      {
        src: "/media/jackal-research.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Jackal robot navigating through test environment",
        caption: "Jackal UGV navigating through test environment.",
      },
      {
        src: "/media/jackal-research.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Jackal research setup with sensors and equipment",
        caption: "Research setup with integrated sensor systems.",
      },
      {
        src: "/media/jackal-research.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Mapping visualization from Jackal research project",
        caption: "Real-time mapping visualization during navigation.",
      },
      {
        src: "/media/jackal-research.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Jackal robot in outdoor testing environment",
        caption: "Outdoor testing of navigation algorithms.",
      },
    ],
  },
  {
    id: "devhacks-2025",
    title: "DevHacks 2025",
    year: "2025",
    headline: "Hackathon Project · Web Development",
    about: [
      "Participated in DevHacks 2025, building innovative web solutions in a 48-hour hackathon format.",
    ],
    learned: [
      "Rapid prototyping and iterative development under time constraints.",
      "Collaborative coding and team coordination in high-pressure environments.",
    ],
    contributions: [
      "Developed full-stack application with modern React and Node.js architecture.",
      "Implemented real-time features using WebSocket connections.",
      "Created intuitive user interface with responsive design principles.",
    ],
    media: [
      {
        src: "/media/devhacks-2025.jpg",
        placeholder: "/media/img1.jpg",
        alt: "DevHacks 2025 team working on project",
        caption: "Team collaboration during DevHacks 2025.",
      },
      {
        src: "/media/devhacks-2025.jpg",
        placeholder: "/media/img1.jpg",
        alt: "DevHacks 2025 project demonstration",
        caption: "Project demonstration and presentation.",
      },
      {
        src: "/media/devhacks-2025.jpg",
        placeholder: "/media/img1.jpg",
        alt: "DevHacks 2025 coding session",
        caption: "Intensive coding session during hackathon.",
      },
      {
        src: "/media/devhacks-2025.jpg",
        placeholder: "/media/img1.jpg",
        alt: "DevHacks 2025 final product showcase",
        caption: "Final product showcase at DevHacks 2025.",
      },
    ],
  },
  {
    id: "gamejam-2024",
    title: "GameJam 2024",
    year: "2024",
    headline: "Game Development · Unity & C#",
    about: [
      "Created an original game prototype during GameJam 2024, focusing on innovative gameplay mechanics and engaging user experience.",
    ],
    learned: [
      "Game design principles and rapid prototyping in Unity engine.",
      "C# scripting for game mechanics and player interactions.",
    ],
    contributions: [
      "Designed and implemented core gameplay loop with unique mechanics.",
      "Created pixel art assets and animations for character and environment.",
      "Developed level progression system with increasing difficulty curves.",
    ],
    media: [
      {
        src: "/media/gamejam-2024.jpg",
        placeholder: "/media/img1.jpg",
        alt: "GameJam 2024 game development workspace",
        caption: "Game development workspace during GameJam 2024.",
      },
      {
        src: "/media/gamejam-2024.jpg",
        placeholder: "/media/img1.jpg",
        alt: "GameJam 2024 gameplay screenshot",
        caption: "Gameplay screenshot from the final prototype.",
      },
      {
        src: "/media/gamejam-2024.jpg",
        placeholder: "/media/img1.jpg",
        alt: "GameJam 2024 team presentation",
        caption: "Team presentation of the game prototype.",
      },
      {
        src: "/media/gamejam-2024.jpg",
        placeholder: "/media/img1.jpg",
        alt: "GameJam 2024 game mechanics demonstration",
        caption: "Demonstrating unique game mechanics.",
      },
    ],
  },
];

export function getProjectById(id) {
  if (!id) return projects[0];
  return projects.find((project) => project.id === id) ?? projects[0];
}

export function getProjectNeighbors(id) {
  const index = projects.findIndex((project) => project.id === id);
  if (index === -1) {
    return {
      previous: projects[projects.length - 1],
      next: projects[1] ?? projects[0],
    };
  }

  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return { previous, next };
}


