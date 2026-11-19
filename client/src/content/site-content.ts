export interface NavLink {
  label: string;
  href: string;
  dropdown?: { label: string; href: string; description?: string }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  href: string;
  icon: string;
  description?: string;
  image: string;
}

export interface PalletTypeItem {
  id: string;
  name: string;
  description: string;
  image: string;
  badge?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  image: string;
  features?: string[];
  planned?: boolean;
}

export const SITE_METADATA = {
  companyName: "Ecogest India Pvt. Ltd.",
  legalName: "Ecogest India Private Limited",
  tagline: "Premium Imported Softwood Timber & Industrial Packaging Solutions",
  titleSuffix: "Ecogest India Pvt. Ltd.",
  description:
    "Ecogest India is a trusted supplier of imported softwood timber and industrial wood packaging solutions in India, built on European softwood timber heritage.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.ecogestindia.com",
  phone: "+91 9321233436",
  phoneClean: "+919321233436",
  email: "kanhaiya.mali@ecogestindia.com",
  website: "www.ecogestindia.com",
  address: {
    street: "A644, Lodha Signet",
    locality: "Dombivli",
    city: "Thane",
    state: "Maharashtra",
    postalCode: "421204",
    country: "India",
    full: "A644, Lodha Signet, Dombivli, Thane, Maharashtra – 421204",
  },
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.3323098522363!2d73.08571877521876!3d19.224368982012015!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x3be7bf7b75f82fe9%3A0x7d94cf3e47761ea!2sLodha%20Signet!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
};

export const NAVIGATION_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Products & Solutions",
    href: "/manufacturing",
    dropdown: [
      {
        label: "Imported Softwood Timber",
        href: "/timber",
        description: "European & South American lumber, kiln-dried & structural wood",
      },
      {
        label: "Packaging Manufacturing",
        href: "/manufacturing",
        description: "Export-standard industrial wood packaging solutions",
      },
      {
        label: "Wooden Pallets",
        href: "/pallets",
        description: "Two-way stringer, four-way block & specialized pallet types",
      },
      {
        label: "Industrial Wooden Products",
        href: "/industrial-products",
        description: "Heavy-duty cable drums, machinery boxes & crates",
      },
    ],
  },
  { label: "Pallets", href: "/pallets" },
  { label: "Quality & Standards", href: "/quality" },
  { label: "Industries", href: "/industries" },
  { label: "Contact Us", href: "/contact" },
];

export const HOME_CONTENT = {
  hero: {
    headline: "European Softwood Timber Expertise. Reliable Indian Supply.",
    paragraph1:
      "Ecogest India Pvt. Ltd. is a trusted supplier of imported softwood timber and industrial wood packaging solutions in India. Built on a strong European softwood timber heritage, we specialize in sourcing premium-quality softwood lumber from Europe and South America while delivering high-quality industrial packaging products for diverse industries.",
    paragraph2:
      "From imported softwood timber trading to manufacturing export-standard wooden pallets, boxes, crates, and heavy-duty packaging solutions, Ecogest India is committed to quality, sustainability, and long-term business partnerships.",
    ctaPrimary: { label: "Get a Quote", href: "/quote" },
    ctaSecondary: { label: "Contact Us", href: "/contact" },
    stats: [
      { label: "European Heritage Since", value: "1984" },
      { label: "Annual Softwood Exported to India", value: "30,000 m³" },
      { label: "Consistent Indian Supply", value: "10+ Years" },
      { label: "Compliance & Safety", value: "ISPM-15" },
    ],
    bgImage: "/assets/hero/hero-bg.svg",
  },
  coreServicesHeading: "Our Core Services",
  coreServices: [
    {
      id: "timber-trading",
      title: "Imported Softwood Timber Trading",
      href: "/timber",
      icon: "Trees",
      description: "European and South American softwood lumber, kiln-dried sawn timber, and structural wood.",
      image: "/assets/timber/softwood-lumber.svg",
    },
    {
      id: "packaging-manufacturing",
      title: "Industrial Packaging Manufacturing",
      href: "/manufacturing",
      icon: "Factory",
      description: "Export-standard wooden packaging solutions tailored for Indian and international industries.",
      image: "/assets/hero/manufacturing-hero.svg",
    },
    {
      id: "wooden-pallets",
      title: "Wooden Pallets",
      href: "/pallets",
      icon: "Layers",
      description: "Standard, customized, two-way stringer, four-way block, and specialized industrial pallets.",
      image: "/assets/pallets/four-way-pallet.png",
    },
    {
      id: "industrial-boxes-crates",
      title: "Industrial Boxes & Crates",
      href: "/industrial-products",
      icon: "Box",
      description: "Durable wooden boxes and heavy-duty crates engineered for equipment and sea-worthy export.",
      image: "/assets/industrial-products/wooden-box.png",
    },
    {
      id: "heavy-duty-packaging",
      title: "Heavy-Duty Packaging",
      href: "/manufacturing",
      icon: "ShieldCheck",
      description: "Custom protective wooden packaging designed to withstand demanding transport stresses.",
      image: "/assets/industrial-products/wooden-crate.png",
    },
    {
      id: "cable-drums",
      title: "Cable Drums & Specialized Structures",
      href: "/industrial-products",
      icon: "Disc",
      description: "Robust industrial wooden cable drums for safe cable storage, coiling, and global shipping.",
      image: "/assets/industrial-products/wooden-cable-drum.png",
    },
  ],
  aboutTeaser: {
    heading: "European Softwood Timber Heritage",
    subheading: "Since 1984 in European Timber Sales",
    description:
      "Ecogest India Private Limited is built on a strong European softwood timber heritage. Our group companies, including Ecogest SRL Italy and Gatta Marco SRL, have been active in the timber industry since 1984, representing leading productions from Austria and Germany across the European market. With more than a decade of consistent supply to India, Ecogest SRL Italy has exported an average of 30,000 m³ of softwood annually.",
    cta: { label: "Learn More About Our Heritage", href: "/about" },
    image: "/assets/hero/about-hero.svg",
  },
  finalCta: {
    heading: "Ready for Reliable Softwood Timber & Packaging Supply?",
    subheading:
      "Partner with Ecogest India for premium imported softwood timber and export-compliant industrial packaging solutions.",
    ctaPrimary: { label: "Request a Custom Quote", href: "/quote" },
    ctaSecondary: { label: "Speak with Our Team", href: "/contact" },
  },
};

export const ABOUT_CONTENT = {
  hero: {
    title: "About Us",
    subtitle: "Strong European Softwood Timber Heritage",
    image: "/assets/hero/about-hero.svg",
  },
  heritage: {
    heading: "Strong European Softwood Timber Heritage",
    paragraphs: [
      "Ecogest India Private Limited is built on a strong European softwood timber heritage. Our group companies, including Ecogest SRL Italy and Gatta Marco SRL, have been active in the timber industry since 1984, representing leading productions from Austria and Germany across the European market.",
      "With more than a decade of consistent supply to India, Ecogest SRL Italy has exported an average of 30,000 m³ of softwood annually, establishing long-term relationships and trust within the Indian wood industry.",
      "Our company combines international sourcing expertise, sustainable practices, and industrial manufacturing capabilities to provide reliable softwood timber and packaging solutions tailored for Indian industries.",
    ],
  },
  vision: {
    heading: "OUR VISION",
    statement:
      "To become a trusted partner in India for imported softwood timber supply and industrial wood manufacturing by combining European expertise, sustainable sourcing, and innovative packaging solutions.",
  },
  whyChooseUs: {
    heading: "WHY CHOOSE US",
    items: [
      {
        title: "Direct European Sourcing",
        description:
          "We maintain strong sourcing relationships with leading European timber producers, ensuring consistent supply and quality.",
        icon: "Globe",
      },
      {
        title: "Reliable Supply Chain",
        description:
          "Efficient procurement and logistics systems help us deliver products on time and maintain long-term customer trust.",
        icon: "Truck",
      },
      {
        title: "Consistent Quality Standards",
        description:
          "We follow strict quality standards in timber sourcing, manufacturing, and industrial packaging solutions.",
        icon: "Award",
      },
      {
        title: "Technical Assistance",
        description:
          "Our experienced team provides technical guidance and customized support as per client requirements.",
        icon: "Headphones",
      },
    ],
  },
  expertise: {
    heading: "OUR EXPERTISE",
    items: [
      {
        title: "Experience",
        description:
          "Gatta Legno has operated in timber sales since 1984, expanding beyond Italy into Europe and becoming a reliable timber agency for major wood producers.",
        icon: "Clock",
      },
      {
        title: "Environment",
        description:
          "Our commitment focuses on responsibly sourced, renewable timber, promoting sustainability while supporting industrial growth.",
        icon: "Leaf",
      },
    ],
  },
  sustainability: {
    heading: "SUSTAINABILITY",
    statement:
      "At Ecogest India Pvt. Ltd., sustainability is at the core of our operations. We focus on responsibly sourced renewable timber and environmentally conscious manufacturing practices to support sustainable industrial growth.",
  },
};

export const TIMBER_CONTENT = {
  hero: {
    title: "Imported Softwood Timber Trading",
    subtitle: "High-Quality Imported Softwood Timber Solutions",
    description:
      "Ecogest India delivers high-quality imported softwood timber backed by strong European sourcing networks and consistent grading standards.",
    image: "/assets/timber/softwood-lumber.svg",
  },
  productRange: {
    heading: "Product Range",
    items: [
      {
        name: "European Softwood Lumber",
        description:
          "Directly sourced from leading sawmills in Austria and Germany with dependable grading and dimensional accuracy.",
        image: "/assets/timber/softwood-lumber.svg",
      },
      {
        name: "South American Softwood Lumber",
        description:
          "High-grade commercial softwood lumber procured through established sustainable international networks.",
        image: "/assets/timber/softwood-lumber.svg",
      },
      {
        name: "Kiln-Dried Sawn Timber",
        description:
          "Controlled moisture content sawn timber ensuring structural stability, dimensional consistency, and pest elimination.",
        image: "/assets/timber/kiln-dried.svg",
      },
      {
        name: "Structural & Industrial Wood",
        description:
          "Heavy-duty graded timber designed for engineering, scaffolding, formwork, and heavy industrial applications.",
        image: "/assets/timber/structural-wood.svg",
      },
      {
        name: "Forestry Products",
        description:
          "Responsibly sourced forestry raw materials conforming to international ecological and trade standards.",
        image: "/assets/hero/about-hero.svg",
      },
    ],
  },
  applications: {
    heading: "Applications",
    items: [
      { name: "Packaging Industry", icon: "PackageCheck" },
      { name: "Construction Industry", icon: "Building2" },
      { name: "Furniture Manufacturing", icon: "Armchair" },
      { name: "Industrial Use", icon: "Cog" },
      { name: "Warehousing & Logistics", icon: "Warehouse" },
    ],
  },
};

export const MANUFACTURING_CONTENT = {
  hero: {
    title: "Manufacturing & Industrial Packaging",
    subtitle: "Export-Standard Packaging Solutions",
    description:
      "Expanding beyond trading, Ecogest India is entering manufacturing with a focus on export-standard wooden packaging and pallet solutions.",
    image: "/assets/hero/manufacturing-hero.svg",
  },
  productsHeading: "Our Manufacturing Products",
  products: [
    {
      id: "wooden-pallets",
      name: "Wooden Pallets (Standard & Customized)",
      description:
        "Two-way stringer pallets and four-way block pallets engineered to exact client load specifications and dimensional requirements.",
      image: "/assets/pallets/four-way-pallet.png",
      href: "/pallets",
    },
    {
      id: "epal-pallets",
      name: "EPAL & Export Pallets",
      badge: "Planned",
      planned: true,
      description:
        "Standardized European Pallet Association (EPAL) certified pallets engineered for seamless global supply chain interchangeability.",
      image: "/assets/pallets/two-way-pallet.png",
      href: "/pallets",
    },
    {
      id: "boxes-crates",
      name: "Industrial Boxes & Crates",
      description:
        "Heavy-duty wooden boxes and crates built to protect delicate equipment, machinery, and goods during transit.",
      image: "/assets/industrial-products/wooden-box.png",
      href: "/industrial-products",
    },
    {
      id: "heavy-duty-packaging",
      name: "Heavy-Duty Packaging",
      description:
        "Engineered protective packaging structures designed for excessive payloads, export shipping, and harsh handling.",
      image: "/assets/industrial-products/wooden-crate.png",
      href: "/industrial-products",
    },
    {
      id: "cable-drums",
      name: "Cable Drums & Specialized Structures",
      description:
        "Precision-built wooden cable drums for wire rope, industrial cable, and specialized cylindrical infrastructure.",
      image: "/assets/industrial-products/wooden-cable-drum.png",
      href: "/industrial-products",
    },
  ],
};

export const PALLETS_CONTENT = {
  hero: {
    title: "Wooden Pallets",
    subtitle: "Two-Way and Four-Way Industrial Pallet Solutions",
    description:
      "We engineer durable wooden pallets designed for seamless handling, warehousing efficiency, and global export compliance.",
    image: "/assets/pallets/four-way-pallet.png",
  },
  twoWay: {
    title: "Two-Way Wooden Pallet",
    alias: "Stringer Pallets",
    description:
      "Two-way wooden pallets, also known as Stringer Pallets, use “stringers” to support the unit load. These pallets can be lifted from two sides using lifting tools such as forklifts and hand jacks. A frame of three parts is used to build the pallet, including the top deck, stringer, and bottom deck.",
    features: [
      "Durable Construction",
      "Cost-Effective Design",
      "Suitable for Warehousing & Logistics",
      "Easy Material Handling",
    ],
    image: "/assets/pallets/two-way-pallet.png",
  },
  fourWay: {
    title: "Four-Way Wooden Pallet",
    alias: "Block Pallets",
    description:
      "Four-way wooden pallets, also known as Block Pallets, use solid wooden blocks to support the unit load. These pallets can be lifted from all four sides using forklifts or hand jacks, improving handling efficiency and operational flexibility.",
    features: [
      "Strong Load Bearing Capacity",
      "Easy Four-Way Entry",
      "Export Suitable",
      "Heavy-Duty Industrial Usage",
    ],
    image: "/assets/pallets/four-way-pallet.png",
  },
  typesHeading: "TYPES OF PALLETS",
  types: [
    {
      id: "closed-boarded",
      name: "Closed Boarded Pallet",
      description:
        "Designed with two closed-boarded faces and no seams between the nailed top boards.",
      image: "/assets/pallets/closed-boarded-pallet.png",
    },
    {
      id: "wing-type",
      name: "Wing Type Pallet",
      description:
        "Features extended deck boards over supporting blocks for improved support and handling.",
      image: "/assets/pallets/wing-type-pallet.png",
    },
    {
      id: "reversible",
      name: "Reversible Pallet",
      description:
        "Top and bottom decks are identical, allowing the pallet to be reversed and used on both sides.",
      image: "/assets/pallets/reversible-pallet.png",
    },
    {
      id: "single-deck",
      name: "Single Deck Pallet",
      description:
        "Single-deck pallets, also known as skids, are lightweight and easy to handle.",
      image: "/assets/pallets/single-deck-pallet.png",
    },
    {
      id: "reversible-closed",
      name: "Reversible Closed Pallet",
      description:
        "Closed-boarded pallet with reversible design for longer operational life.",
      image: "/assets/pallets/reversible-closed-pallet.png",
    },
    {
      id: "four-way-non-reversible",
      name: "Four-Way Non-Reversal Pallet",
      description:
        "Four-way entry pallet with different top and bottom faces designed for industrial applications.",
      image: "/assets/pallets/four-way-non-reversible.png",
    },
  ],
};

export const INDUSTRIAL_PRODUCTS_CONTENT = {
  hero: {
    title: "Industrial Wooden Products",
    subtitle: "Heavy-Duty Wooden Cable Drums, Boxes & Crates",
    description:
      "Engineered industrial packaging products providing maximum protection and reliability for heavy equipment and sensitive cargo.",
    image: "/assets/industrial-products/wooden-cable-drum.png",
  },
  products: [
    {
      id: "cable-drums",
      name: "Wooden Cable Drums",
      description:
        "Heavy-duty wooden cable drums designed for industrial cable storage and transportation.",
      image: "/assets/industrial-products/wooden-cable-drum.png",
      details: [
        "Reinforced wooden flange and barrel construction",
        "Suitable for electrical cables, wire ropes, and conductors",
        "Custom diameters and load specifications",
      ],
    },
    {
      id: "wooden-boxes",
      name: "Wooden Boxes",
      description:
        "Durable wooden boxes suitable for machinery packaging and export shipments.",
      image: "/assets/industrial-products/wooden-box.png",
      details: [
        "Full enclosure protection against moisture, impact, and dust",
        "Engineered for heavy industrial machinery and equipment",
        "Heat-treated ISPM-15 compliant for export shipping",
      ],
    },
    {
      id: "wooden-crates",
      name: "Wooden Crates",
      description:
        "Industrial wooden crates designed for safe transportation and handling of industrial products.",
      image: "/assets/industrial-products/wooden-crate.png",
      details: [
        "Open-slatted or reinforced frames for structural rigidity",
        "Optimized for high weight-to-volume ratio items",
        "Efficient forklift and crane lifting compatibility",
      ],
    },
  ],
};

export const QUALITY_CONTENT = {
  hero: {
    title: "Quality & Certifications",
    subtitle: "Reliable Manufacturing Standards & Export Compliance",
    description:
      "We maintain high standards of manufacturing quality and export compliance to ensure reliable industrial packaging solutions.",
    image: "/assets/hero/quality-compliance.svg",
  },
  standardsHeading: "Our Standards",
  standards: [
    {
      title: "ISPM-15 Heat Treatment Compliance",
      description:
        "Our wooden packaging materials conform to the International Standards for Phytosanitary Measures No. 15, preventing the international transport and spread of pests.",
      icon: "ShieldAlert",
      badge: "Export Standard",
    },
    {
      title: "Sea-Worthy Export Packaging",
      description:
        "Engineered to withstand humidity, ocean transit stresses, multi-modal lifting, and prolonged containerized shipping without compromising integrity.",
      icon: "Anchor",
      badge: "Global Logistics",
    },
    {
      title: "Sustainable Wood Usage",
      description:
        "We prioritize timber sourced from responsibly managed forests, supporting environmental conservation alongside industrial performance.",
      icon: "TreePine",
      badge: "Eco-Friendly",
    },
    {
      title: "Precision Manufacturing & Engineering Design",
      description:
        "Rigorous dimensional tolerances, quality fasteners, and tailored load distribution engineering ensure peak structural reliability.",
      icon: "Compass",
      badge: "Engineered Fit",
    },
  ],
  sustainabilityNote: {
    heading: "SUSTAINABILITY",
    statement:
      "At Ecogest India Pvt. Ltd., sustainability is at the core of our operations. We focus on responsibly sourced renewable timber and environmentally conscious manufacturing practices to support sustainable industrial growth.",
  },
};

export const INDUSTRIES_CONTENT = {
  hero: {
    title: "Industries We Serve",
    subtitle: "Tailored Softwood Timber & Packaging for Diverse Sectors",
    description:
      "Ecogest India delivers specialized timber and export-compliant wooden packaging solutions tailored to the operational demands of India's leading industrial sectors.",
    image: "/assets/hero/hero-bg.svg",
  },
  sectors: [
    {
      name: "Logistics & Warehousing",
      description:
        "Standardized and customized stringer & block pallets engineered for automated warehouse racking, rapid forklift handling, and optimized storage footprints.",
      icon: "Warehouse",
    },
    {
      name: "Export & Shipping",
      description:
        "ISPM-15 compliant sea-worthy wooden packaging, crates, and pallets certified for frictionless international customs clearance.",
      icon: "Ship",
    },
    {
      name: "Engineering Industries",
      description:
        "Heavy-duty wooden boxes and structural timber engineered to support dense mechanical machinery and oversized capital goods.",
      icon: "Cpu",
    },
    {
      name: "Manufacturing Units",
      description:
        "Consistent supply of structural softwood lumber and durable production pallets supporting uninterrupted assembly line throughput.",
      icon: "Factory",
    },
    {
      name: "FMCG Industry",
      description:
        "Clean, uniform pallets designed for fast-moving consumer goods distribution, multi-tier palletization, and bulk transport.",
      icon: "ShoppingBag",
    },
    {
      name: "Pharmaceuticals",
      description:
        "High-grade, pest-free, heat-treated wooden pallets and specialized protective crates meeting hygienic supply chain protocols.",
      icon: "Pill",
    },
    {
      name: "Construction & Infrastructure",
      description:
        "Imported European & South American softwood timber, kiln-dried sawn lumber, and industrial wood for structural construction needs.",
      icon: "Building",
    },
  ],
};

export const CONTACT_CONTENT = {
  hero: {
    title: "Contact Us",
    subtitle: "Get in Touch with Ecogest India",
    description:
      "Have questions about imported softwood lumber, pallet manufacturing, or custom packaging solutions? Reach out to our team today.",
  },
  company: "Ecogest India Pvt. Ltd.",
  details: {
    addressLabel: "Address",
    addressValue: "A644, Lodha Signet, Dombivli, Thane, Maharashtra – 421204",
    phoneLabel: "Phone",
    phoneValue: "+91 9321233436",
    websiteLabel: "Website",
    websiteValue: "www.ecogestindia.com",
    websiteHref: "https://www.ecogestindia.com",
    emailLabel: "Email",
    emailValue: "kanhaiya.mali@ecogestindia.com",
  },
};

export const QUOTE_CONTENT = {
  hero: {
    title: "Request a Quote",
    subtitle: "Custom Timber & Packaging Solutions",
    description:
      "Provide your requirements below, and our technical team will contact you promptly with competitive pricing and specifications.",
  },
  productOptions: [
    "Imported European Softwood Lumber",
    "South American Softwood Lumber",
    "Kiln-Dried Sawn Timber",
    "Structural & Industrial Wood",
    "Two-Way Wooden Pallets (Stringer)",
    "Four-Way Wooden Pallets (Block)",
    "Custom Wooden Pallets",
    "EPAL / Export Pallets (Planned)",
    "Wooden Boxes",
    "Wooden Crates",
    "Wooden Cable Drums",
    "Heavy-Duty Industrial Packaging",
    "Other / Specialized Structure",
  ],
};
