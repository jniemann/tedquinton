import { works } from "./works"

export const homeSectionOne = {
  title: "Design Intelligence",
  logo: {
    lottie: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe06c/6666f04a6fb4b231ea178487_S%26P_ShiftingLogo_NoBorder.json",
    image: null,
  }
}

export const homeSectionTwo = {
  label: ["Showreel©2024", "watch reel"],
  image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe06c/6690e94371f7a4507bf1dba0_S%26P_Landing%20Hero.jpg",
  video: "https://stewart-partners.netlify.app/stewart.mp4"
}

export const homeSectionThree = {
  title: ["a120/03", "SP_a"],
  text: "Our architecture practice fosters connection and grows relationships between people, society and the environment. Our rigorous creative process ensures we evolve not only what is made, but how ideas are generated, evaluated and realised. Since 2003, our team has grown across disciplines and thrives on collaboration. Driven by curiosity and ambition, we believe that any enduring solution needs to synchronise cogent analysis with sensitivity to the finer contextual impact."
}

export const homeSectionFour = {
  title: "feature works",
  works: works.filter(item => item.featured)
}

export const homeFooterInfoBlock = [
  {
    title: "our studio",
    description: "Our portfolio is expanding. The range of projects, from polished and structured to speculative and experimental, testify to the way our creative philosophy permeates every area we work in.",
    link: "/about",
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe06c/66601c7c6b0d48cf88bbe0d7_Home_StudioHover.jpg"
  },
  {
    title: "contact us",
    description: "We look forward to hearing from you. Email us to collaborate.",
    link: "/contact",
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe06c/66601c7c6b0d48cf88bbe0bf_Home_ContactHover.jpg"
  },
]


