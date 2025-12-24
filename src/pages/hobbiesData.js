export const hobbies = [
  {
    id: "photography",
    title: "Photography",
    year: "Ongoing",
    headline: "Personal Interest · Visual Storytelling",
    about: [
      "Exploring the world through photography, capturing moments and landscapes that tell stories and evoke emotions.",
    ],
    learned: [
      "Mastered composition techniques including rule of thirds, leading lines, and depth of field.",
      "Developed skills in post-processing and color grading to enhance visual narratives.",
    ],
    contributions: [
      "Captured stunning landscapes and portraits that showcase natural beauty and human expression.",
      "Created a portfolio documenting travels and local scenes with artistic perspective.",
      "Experimented with different photography styles from street photography to nature landscapes.",
    ],
    media: [
      {
        src: "/media/photography.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Photography equipment and camera setup",
        caption: "Photography equipment and creative setup.",
      },
      {
        src: "/media/photography.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Landscape photography example",
        caption: "Landscape photography capturing natural beauty.",
      },
      {
        src: "/media/photography.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Portrait photography session",
        caption: "Portrait photography showcasing human expression.",
      },
      {
        src: "/media/photography.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Street photography example",
        caption: "Street photography capturing everyday moments.",
      },
    ],
  },
  {
    id: "arduino",
    title: "Arduino",
    year: "Ongoing",
    headline: "Electronics & Programming · DIY Projects",
    about: [
      "Building interactive electronics projects using Arduino microcontrollers, combining programming skills with hardware prototyping.",
    ],
    learned: [
      "Integrated sensor data processing and actuator control for interactive systems.",
      "Designed and prototyped custom circuits for various automation and IoT applications.",
    ],
    contributions: [
      "Developed home automation projects including smart lighting and temperature monitoring systems.",
      "Created interactive art installations using Arduino and various sensors.",
      "Built robotics projects combining Arduino with motors and sensors for autonomous behavior.",
    ],
    media: [
      {
        src: "/media/arduino.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Arduino project workspace with components",
        caption: "Arduino project workspace with various components.",
      },
      {
        src: "/media/arduino.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Arduino circuit board and wiring",
        caption: "Custom circuit design and wiring for Arduino project.",
      },
      {
        src: "/media/arduino.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Arduino project demonstration",
        caption: "Interactive Arduino project in action.",
      },
      {
        src: "/media/arduino.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Arduino robotics project",
        caption: "Arduino-powered robotics project.",
      },
    ],
  },
  {
    id: "hiking",
    title: "Hiking",
    year: "Ongoing",
    headline: "Outdoor Adventure · Nature Exploration",
    about: [
      "Exploring trails and natural landscapes through hiking, combining physical activity with appreciation for nature and photography opportunities.",
    ],
    learned: [
      "Developed navigation skills and trail awareness for safe outdoor adventures.",
      "Gained appreciation for environmental conservation and sustainable outdoor practices.",
    ],
    contributions: [
      "Completed numerous trails ranging from day hikes to multi-day backpacking trips.",
      "Documented hiking experiences through photography and trail notes.",
      "Explored diverse landscapes from mountain peaks to forest trails and coastal paths.",
    ],
    media: [
      {
        src: "/media/hiking.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Hiking trail through forest",
        caption: "Scenic hiking trail through forest landscape.",
      },
      {
        src: "/media/hiking.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Mountain summit view from hike",
        caption: "Panoramic view from mountain summit.",
      },
      {
        src: "/media/hiking.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Hiking gear and equipment",
        caption: "Hiking gear and equipment for outdoor adventures.",
      },
      {
        src: "/media/hiking.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Coastal hiking trail",
        caption: "Coastal hiking trail with ocean views.",
      },
    ],
  },
];

export function getHobbyById(id) {
  if (!id) return hobbies[0];
  return hobbies.find((hobby) => hobby.id === id) ?? hobbies[0];
}

export function getHobbyNeighbors(id) {
  const index = hobbies.findIndex((hobby) => hobby.id === id);
  if (index === -1) {
    return {
      previous: hobbies[hobbies.length - 1],
      next: hobbies[1] ?? hobbies[0],
    };
  }

  const previous = hobbies[(index - 1 + hobbies.length) % hobbies.length];
  const next = hobbies[(index + 1) % hobbies.length];

  return { previous, next };
}


