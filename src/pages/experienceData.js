export const experiences = [
  {
    id: "hci-research-student",
    title: "HCI Research Student",
    year: "Summer 2024",
    headline: "Human-Computer Interaction Lab · University of Manitoba",
    about: [
      "This summer, I had the privilege of working as an undergraduate research student under Dr. Daniel J. Rae in the Human-Computer Interaction Lab at the University of Manitoba.",
    ],
    learned: [
      "Developing independence and time management skills to stay consistent in long-term projects.",
      "Research is not just about building, but about curiosity, asking the right questions, and following open-ended outcomes.",
    ],
    contributions: [
      "Prototyped interactive task flows for an eye-tracking study using React and Python tooling.",
      "Designed and ran formative usability sessions with 12 participants to validate study scripts.",
      "Synthesized findings into a recommendations brief adopted for the Fall 2024 research phase.",
    ],
    media: [
      {
        src: "/media/img1.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Research station with multiple monitors and eye-tracking hardware",
        caption: "Eye-tracking test bench assembled for pilot sessions.",
      },
      {
        src: "/media/img1.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Claudius sharing findings with lab members during weekly sync",
        caption: "Weekly share-out with the HCI lab to iterate on study plan.",
      },
      {
        src: "/media/img1.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Whiteboard covered in interaction flows and interview notes",
        caption: "Affinity diagramming session turning interviews into action.",
      },
    ],
  },
  {
    id: "kawasaki-sales-intern",
    title: "Kawasaki Sales Intern",
    year: "2023 Season",
    headline: "Kawasaki · Regional Sales & Partnerships",
    about: [
      "Supported the regional sales team on channel partner operations and product launch events.",
    ],
    learned: [
      "Translated technical product specs into compelling value propositions for dealerships.",
      "Balanced stakeholder priorities between supply, marketing, and finance teams.",
    ],
    contributions: [
      "Produced weekly sales intelligence dashboards used by 15+ partner stores.",
      "Coordinated two demo-day activations that generated 200+ qualified leads.",
    ],
    media: [
      {
        src: "/media/kawasaki-intern.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Claudius standing beside a Kawasaki motorcycle at a demo event",
        caption: "Demo day setup for the Ninja ZX-6R product launch.",
      },
    ],
  },
  {
    id: "permika-co-president",
    title: "PERMIKA Co-President & Secretary",
    year: "2022 – 2024",
    headline: "PERMIKA Manitoba · Indonesian Students Association",
    about: [
      "Led programming, sponsorship, and community outreach for PERMIKA Manitoba.",
    ],
    learned: [
      "Built community-first programs that celebrate culture while supporting new students.",
      "Practiced servant leadership across cross-functional student teams.",
    ],
    contributions: [
      "Organized 8 flagship events with 600+ cumulative attendees.",
      "Secured $7K in sponsorships to fund cultural showcases and newcomer support.",
    ],
    media: [
      {
        src: "/media/img1.jpg",
        placeholder: "/media/img1.jpg",
        alt: "Crowd celebrating at a PERMIKA cultural night event",
        caption: "Cultural Night 2024 featuring local artists and community partners.",
      },
    ],
  },
];

export function getExperienceById(id) {
  if (!id) return experiences[0];
  return experiences.find((experience) => experience.id === id) ?? experiences[0];
}

export function getExperienceNeighbors(id) {
  const index = experiences.findIndex((experience) => experience.id === id);
  if (index === -1) {
    return {
      previous: experiences[experiences.length - 1],
      next: experiences[1] ?? experiences[0],
    };
  }

  const previous = experiences[(index - 1 + experiences.length) % experiences.length];
  const next = experiences[(index + 1) % experiences.length];

  return { previous, next };
}

