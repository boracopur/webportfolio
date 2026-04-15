import abandonedHallwayImage from "@assets/bora-copur-alt-screenshot-2025-08-05-02-16-51-46_1776190143679.png";
import trainStationImage from "@assets/bora-copur-highresscreenshot00048_1776190339153.jpg";
import compassDestinyImage from "@assets/image_1776190403480.png";
import lighthouseKeeperImage from "@assets/store_page_background_1776192613971.png";

export const portfolioData = {
  profile: {
    name: "Bora Copur",
    role: "3D Environment Artist",
    summary: "3D Environment Artist specializing in game-ready worlds — from historical architecture to stylized fantasy.",
    about: "I'm a 3D Environment Artist with a Graphic Design background. I build game-ready environments and props, from historical architecture to stylized worlds, driven by atmosphere, structure, and visual storytelling.",
    contact: {
      email: "boraacopur@gmail.com",
      artstation: "https://www.artstation.com/wizbeatrix",
      linkedin: "https://www.linkedin.com/in/boraacopur/"
    },
    education: "Istanbul University, Graphic Design, 2025"
  },
  experience: [
    {
      id: "althera",
      company: "Althera Studios",
      role: "Environment Artist",
      period: "Oct 2025 — Present",
      description: "Creating modular environment kits, props and level design while supporting a consistent art style. Focused on game ready asset production that balances visual quality with technical standards."
    },
    {
      id: "m11",
      company: "M11 Studios",
      role: "Environment/Prop Artist",
      period: "Nov 2022 — Jun 2023",
      description: "Produced modular environment kits, props, weapons, and gear for Compass of Destiny: Istanbul. Worked with trimsheets, kitbashing, custom LODs, optimization and real world reference research to create believable assets."
    },
    {
      id: "stratera",
      company: "Stratera Games",
      role: "Environment Artist",
      period: "Nov 2021 — Sep 2022",
      description: "Designed stylized levels and assets, contributed to worldbuilding in Unity 3D for Lighthouse Keeper. Created interactable props, foliage, weapons, architectural assets and lighting."
    },
    {
      id: "erik",
      company: "Erik Games",
      role: "Junior Environment Artist",
      period: "Jun 2021 — Nov 2022",
      description: "Worked on realistic environments and reusable asset packs for Unreal Engine Marketplace. Built modular environment assets and flexible master materials with a focus on reusability, clean presentation and marketplace ready workflows."
    }
  ],
  skills: [
    "3D Environment & Prop Modeling",
    "Environment Design",
    "UV Mapping & Texturing",
    "Asset Optimization",
    "Scene Composition & Set Dressing",
    "Lighting & Post-Process"
  ],
  software: [
    "Blender",
    "Unreal Engine",
    "Unity",
    "Substance Painter",
    "Marmoset Toolbag",
    "Photoshop"
  ],
  languages: [
    "Turkish (Native)",
    "English (Advanced)"
  ],
  projects: [
    {
      id: "abandoned-soviet",
      title: "Abandoned Soviet Hallway",
      category: "Environment",
      description: "A game-ready horror environment in Unity, focused on abandoned Soviet architecture, atmospheric baked lighting, and grounded visual storytelling",
      imageColor: "from-zinc-800 to-zinc-950",
      imageUrl: abandonedHallwayImage,
      artstationUrl: "https://www.artstation.com/artwork/4NxKPl",
      featured: true
    },
    {
      id: "train-station",
      title: "Stylized Train Station",
      category: "Environment",
      description: "A stylized train station environment created in Unreal Engine 5, built around painterly textures and warm storybook atmosphere",
      imageColor: "from-blue-800 to-blue-950",
      imageUrl: trainStationImage,
      artstationUrl: "https://www.artstation.com/artwork/6NEG0w",
      featured: false
    },
    {
      id: "compass-destiny",
      title: "Compass of Destiny: Istanbul",
      category: "Environment & Prop",
      description: "Environment assets and character gear created in Unreal Engine 5 for Compass of Destiny, with a focus on historical accuracy and optimization",
      imageColor: "from-amber-800 to-amber-950",
      imageUrl: compassDestinyImage,
      artstationUrl: "https://www.artstation.com/artwork/39ZodB",
      featured: false
    },
    {
      id: "lighthouse-keeper",
      title: "Lighthouse Keeper",
      category: "Environment",
      description: "Level design and asset creation for Lighthouse Keeper in Unity, including interactable props, foliage, weapons and architecture assets.",
      imageColor: "from-teal-800 to-teal-950",
      imageUrl: lighthouseKeeperImage,
      artstationUrl: "https://www.artstation.com/artwork/d0DADw",
      featured: true
    }
  ]
};
