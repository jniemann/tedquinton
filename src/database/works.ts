import { areas, AreasEnum } from "./areas";

export interface Work {
  active: boolean, // If the value is false, it will be hidden on the entire website.
  featured: boolean, // If the value is true, it will be displayed on the homepage.
  slug: string, // Is just to identify the work/project it must be the same as
  mainTitle: string, // Title of the work/project
  workTitle: string, // Code of the work/project
  workCopySummary: string, // Description
  workCopy: string,
  year: string,
  location: string,
  collaborations: string,
  image: string, // Thumbnail
  categories: AreasEnum[], // Areas or categories to which the project belongs.
  gallery: string[] // Images URLs
}

export const works: Work[] = [
  {
    active: true,
    featured: true,
    slug: "dunkeld-estate",
    mainTitle: "Dunkeld Estate",
    workTitle: "SP/ARC_01",
    workCopySummary: "Dunkeld Estate is a five-home family unit located deep into a quiet neighbourhood.",
    workCopy: '',
    year: '2024',
    location: 'Bishopscourt, Cape Town',
    collaborations: 'KingsHill Group',
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66a0a5e6d1907856e5f56c6b_Preview%20(1)%20(1).png",
    categories: [AreasEnum.architecture, AreasEnum.interior],
    gallery: [

    ]
  },
  {
    active: true,
    featured: true,
    slug: "lomas",
    mainTitle: "Lomas",
    workTitle: "SP/ARC_02",
    workCopySummary: "With only a plot of land it can be difficult for a client to visualise its potential. That is why generating many designs are key to illustrate the opportunity of a bare site.",
    workCopy: 'With only a plot of land it can be difficult for a client to visualise its potential. That is why generating many designs are key to illustrate the opportunity of a bare site. Lomas is one such variation for a plot available in the South of Spain.',
    year: '2024',
    location: 'spain',
    collaborations: '',
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe246_Rectangle%2035.jpg",
    categories: [AreasEnum.architecture],
    gallery: [
      "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe1c0_01.jpg",
      "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe1c1_02.jpg",
      "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe1c2_03.jpg",
      "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe1c3_04.jpg",
    ]
  },
  {
    active: true,
    featured: true,
    slug: "zandvliet-water-treatment-administration-building",
    mainTitle: "Zandvliet Wastewater Treatment Works",
    workTitle: "SP/INF_03",
    workCopySummary: "Zandvliet Wastewater Treatment Works (WWTW) was declared winner of the CESA AON 'Megaproject over R1 billion' award in 2024.",
    workCopy: "Zandvliet WWTW was declared winner of the CESA AON 'Megaproject over R1 billion' award in 2024. The administration building at Zandvliet Wastewater Treatment Works (WWTW) facilitates fluid interactions between the inside and the outside functions at the site and between employees. It contains an elevated control room for enhanced visibility to regulate water treatment processes. One of the first of its size, it is a future-bound vision that incorporates a Virtual Reality room for training employees, and eventually, to control equipment on site remotely. The project has brought social benefits to the surrounding community in Khayelitsha such as sewage drainage and developing economic opportunities in the area.",
    year: '2021',
    location: 'MACASSAR, CAPE TOWN',
    collaborations: 'ZUTARI H&I',
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/6759a98d1b2f3288e9f03689_Cape%20Town6_CG%204%20(1).jpg",
    categories: [AreasEnum.infrastructure],
    gallery: [
      "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe19b_01.jpg",
      "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe19c_02.jpg",
      "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe19d_03.jpg",
      "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe19e_04.jpg",
      "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe15a_07-gif.gif",
      "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe19f_05.jpg",
      "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe1a0_06.jpg"
    ]
  },
  {
    active: true,
    featured: true,
    slug: "villa-32",
    mainTitle: "Villa 32",
    workTitle: "SP/ARC_04",
    workCopySummary: "Situated at Real de la Quinta, near the Lake Club in Spain, Villa 32 accentuates the landscape.",
    workCopy: '',
    year: '',
    location: '',
    collaborations: '',
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe17f_preview.jpg",
    categories: [AreasEnum.architecture, AreasEnum.interior],
    gallery: [

    ]
  },
  {
    active: true,
    featured: true,
    slug: "alma-road",
    mainTitle: "Alma Road",
    workTitle: "SP/ARC_05",
    workCopySummary: "Architectural and interior design strategies were employed to change the spatially tight layout and obstructed views of the Devil’s Peak Mountain.",
    workCopy: '',
    year: '',
    location: '',
    collaborations: '',
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/6759a9a0dbfa82800fde76e8_Cape%20Town6_CG%203%20(1).jpg",
    categories: [AreasEnum.architecture, AreasEnum.interior],
    gallery: [

    ]
  },
  {
    active: true,
    featured: true,
    slug: "noordelik",
    mainTitle: "Noordelik",
    workTitle: "SP/ARC_06",
    workCopySummary: "",
    workCopy: '',
    year: '',
    location: '',
    collaborations: '',
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/67ebf392fa983d32e520cb63_9.png",
    categories: [AreasEnum.architecture],
    gallery: [

    ]
  },
  {
    active: true,
    featured: true,
    slug: "lake-club",
    mainTitle: "Lake Club",
    workTitle: "SP/ARC_07",
    workCopySummary: "Designed to melt into the landscape, the Lake Club at Real De La Quinta accommodates water sports, wellness facilities, a gym and a restaurant.",
    workCopy: '',
    year: '',
    location: '',
    collaborations: '',
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe169_Preview.jpg",
    categories: [AreasEnum.architecture],
    gallery: [

    ]
  },
  {
    active: true,
    featured: true,
    slug: "28-glen-crescent",
    mainTitle: "Glen Crescent",
    workTitle: "SP/ARC_08",
    workCopySummary: "A timber pergola screens the pool’s patio from the neighbour’s gaze.",
    workCopy: '',
    year: '',
    location: '',
    collaborations: '',
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe245_Rectangle%2036%20(1).jpg",
    categories: [AreasEnum.architecture, AreasEnum.interior],
    gallery: [

    ]
  },
  {
    active: true,
    featured: true,
    slug: "lakehouse-vt",
    mainTitle: "Lakehouse VT",
    workTitle: "SP/ARC_09",
    workCopySummary: "Perched next to Lake Champlain, the positioning of each room intensifies the connection with the landscape.",
    workCopy: '',
    year: '',
    location: '',
    collaborations: '',
    image: "https://cdn.prod.website-files.com/64bbdf61dc15a767d746c768/660d0726d3936af7a155602b_Preview%20(1).jpg",
    categories: [AreasEnum.architecture],
    gallery: [

    ]
  },
  {
    active: true,
    featured: true,
    slug: "mokopane-water-works",
    mainTitle: "Mokopane Water Treatment Works",
    workTitle: "SP/INF_10",
    workCopySummary: "One of many water infrastructure projects employing human-centred design that places people first.",
    workCopy: '',
    year: '',
    location: '',
    collaborations: '',
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe23f_Group%2013191%20(1).png",
    categories: [AreasEnum.infrastructure],
    gallery: [

    ]
  },
  {
    active: true,
    featured: false,
    slug: "villa-olivieri",
    mainTitle: "Villa Olivieri",
    workTitle: "SP/ARC_11",
    workCopySummary: "The concept for the Switzerland residence was clear: generate the feeling that you live in the garden.",
    workCopy: '',
    year: '',
    location: '',
    collaborations: '',
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe191_Preview.jpg",
    categories: [AreasEnum.architecture],
    gallery: [

    ]
  },
  {
    active: true,
    featured: false,
    slug: "zevenrivieren",
    mainTitle: "Zevenrivieren Farmhouse Manor",
    workTitle: "SP/INT_12",
    workCopySummary: "True to its Dutch name, translating to ‘Seven Rivers’, this restoration project on an operational seven-hectare farm in Stellenbosch preserved the authentic Cape Dutch style of the building’s interior and exterior architecture.",
    workCopy: '',
    year: '',
    location: '',
    collaborations: '',
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe1aa_Preview.jpg",
    categories: [AreasEnum.architecture, AreasEnum.interior],
    gallery: [

    ]
  },
  {
    active: true,
    featured: false,
    slug: "stellenbosch-water-treatment-administration-building",
    mainTitle: "Stellenbosch Wastewater Treatment Works",
    workTitle: "SP/INF_13",
    workCopySummary: "The design for the plant complements the advanced membrane water filtration technology being used for water treatment.",
    workCopy: '',
    year: '',
    location: '',
    collaborations: '',
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe17e_preview.jpg",
    categories: [AreasEnum.infrastructure],
    gallery: [

    ]
  },
  {
    active: true,
    featured: false,
    slug: "sea-farm",
    mainTitle: "Sea Farm Estate",
    workTitle: "SP/ARC_14",
    workCopySummary: "The built elements are nestled into the landscape defined by the Hangklip mountains and ocean vista.",
    workCopy: '',
    year: '',
    location: '',
    collaborations: '',
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe24a_Preview%20(3).jpg",
    categories: [AreasEnum.architecture],
    gallery: [

    ]
  },
  {
    active: true,
    featured: false,
    slug: "war-graves-memorial",
    mainTitle: "War Graves Memorial",
    workTitle: "SP/RES_15",
    workCopySummary: "During WWI approximately 1600 black South Africans gave their lives to the imperial forces. The War Graves Memorial is designed in remembrance of this history.",
    workCopy: '',
    year: '',
    location: '',
    collaborations: '',
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe247_Group%2013191%20(3).png",
    categories: [AreasEnum.architecture, AreasEnum.research],
    gallery: [

    ]
  },
  {
    active: true,
    featured: false,
    slug: "art-of-mobility",
    mainTitle: "Art of Mobility",
    workTitle: "SP/RES_16",
    workCopySummary: "Featured at the Motion exhibition at the Guggenheim Museum in Spain, the speculative design probes safe and flexible mobility in African cities.",
    workCopy: '',
    year: '',
    location: '',
    collaborations: '',
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe249_Cape%20Town6_CG%202%20(1).jpg",
    categories: [AreasEnum.research],
    gallery: [

    ]
  },
  {
    active: true,
    featured: false,
    slug: "house-higgovale",
    mainTitle: "House Higgovale",
    workTitle: "SP/ARC_17",
    workCopySummary: "Set against the backdrop of Table Mountain, this residence maximizes views of the surrounding landscape.",
    workCopy: '',
    year: '',
    location: '',
    collaborations: '',
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe230_Preview.jpg",
    categories: [AreasEnum.architecture],
    gallery: [

    ]
  }
];