import { areas } from "./areas";

export const filterByArea = [
  {
    color: "black",
    link: "/work",
    name: "all work",
    slug: null,
    image: "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe06c/66601c7c6b0d48cf88bbe08f_logo-icon.svg",
  },
  ...areas.map((item) => ({
    color: item?.color,
    link: `/areas/${item?.slug}`,
    slug: item?.slug,
    name: item?.name,
    image: item?.img,
  }))
];