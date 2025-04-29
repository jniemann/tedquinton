import { areas, AreasEnum } from './areas'

export const newsCategories = [
  {
    name: 'All news',
    link: '/news',
  },
  {
    ...areas.map((item) => ({
      name: item?.name,
      link: `/news/category-${item?.slug}`,
    }))
  }
];


export const news = [
  {
    link: "/news/architecture-internships-and-advice-for-students",
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/67ac4b22d8bb77c6250f5eec_Rectangle%2045%20(1).png",
    title: "Architecture Internships and Advice for Students",
    date: "February 5, 2025",
    category: [AreasEnum.research],
    featured: true
  },
  {
    link: "/news/a-new-approach-to-water-infrastructure-human-centred-design",
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/6666d654d85ebf13240ad91d_news-1.png",
    title: "A New Approach to Water Infrastructure: Human-centred Design",
    date: "December 28, 2023",
    category: [AreasEnum.infrastructure],
    featured: false
  },
  {
    link: "/news/farmhouse-manor",
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66ffb12175cfe61efb3f54d7_Preview%20Image%20Zevenrevieren%20(1).jpg",
    title: "From the archive: 200-year-old Farmhouse Manor",
    date: "December 27, 2023",
    category: [AreasEnum.interior, AreasEnum.research],
    featured: true
  },
  {
    link: "/news/designing-the-non-building-the-lake-club",
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/6685482bebe690b081c718f1_Rectangle%2053%20(1)%20(1).jpg",
    title: "Designing the Non-Building: The Lake Club",
    date: "December 20, 2023",
    category: [AreasEnum.architecture],
    featured: true
  },
  {
    link: "/news/intuition-risk-global-south",
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/670e730d96de6ca581067532_Rectangle%2069%20(1).jpg",
    title: "Intuition, Risk and Representing the Global South",
    date: "December 19, 2023",
    category: [AreasEnum.research],
    featured: true
  },
  {
    link: "/news/our-perfect-the-loft-house-alma-road",
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/670397b3684a2b255c8ba4eb_Rectangle%2046%20(1).png",
    title: '"Our perfect": The Loft House',
    date: "December 18, 2023",
    category: [AreasEnum.architecture, AreasEnum.interior],
    featured: true
  }
];