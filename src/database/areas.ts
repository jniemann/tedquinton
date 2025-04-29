export enum AreasEnum {
  architecture = "architecture",
  interior = "interior",
  digital = "digital",
  research = "research",
  infrastructure = "infrastructure",
}

export const areas = [
  {
    name: "Architecture",
    color: "blue",
    img: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/6660aed251e7422053e969cf_Architectural.svg",
    img2: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe151_Studio_Areas_Architecture.jpg",
    slug: AreasEnum.architecture,
    code: "SP_01.ARC",
    text: "We work closely with our clients. Wide-ranging conversations shape our ability to instinctively perceive the end- user's challenges and needs. We oversee building designs from their inception to completion."
  },
  {
    name: "Infrastructure",
    color: "orange",
    img: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/6660aec93b86acfd7f21b423_Infrastructure.svg",
    img2: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe150_Studio_Areas_Infrastructure.jpg",
    slug: AreasEnum.infrastructure,
    code: "SP_02.INF",
    text: "Taking a research-heavy and community-informed approach to large scale infrastructure ensures longevity and cohesion between the project and its surroundings. At these sites, public service delivery is our priority."
  },
  {
    name: "Interior",
    color: "yellow",
    img: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/6660aec07b0dd1b54560b9c2_Interior.svg",
    img2: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe14f_Studio_Areas_Interior.jpg",
    slug: AreasEnum.interior,
    code: "SP_03.INt",
    text: "Interiors are carefully composed, strategically unified by textural details. Complementary interiors harmonise the architectural character of a space and establish stylish coherence. We are skilled in turnkey design solutions for commercial, office and domestic use."
  },
  {
    name: "Digital",
    color: "green",
    img: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/6660aeb49e976330d9e740dc_Digital.svg",
    img2: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe14e_Studio_Areas_Digital.jpg",
    slug: AreasEnum.digital,
    code: "SP_04.DiG",
    text: "Technology has allowed us to mold new opportunities for digital design and Virtual Reality. Developments in this area enrich the design process and the client experience, placing clients in the envisioned space long before it is built. In our work on digital marketing, we apply critical design strategies to ensure digital content matches its spatial form."
  },
  {
    name: "Research",
    color: "violet",
    img: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/6660ae976c058a1d4460b6cc_Research.svg",
    img2: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe14d_Studio_Areas_Research.jpg",
    slug: AreasEnum.research,
    code: "SP_05.Res",
    text: "Our commitment to research is crucial to uncompromising design. By grounding our inquiries in place we attain the necessary knowledge to integrate the needs of the client and the context. Our research probes knowledge bases, resources and processes. Using available materials, we apply sustainability principles to the particularities of place. With this approach to design, we diversify our practice and channel our architectural problem solving skills in new ways."
  },
];
