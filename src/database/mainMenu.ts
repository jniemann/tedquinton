interface Item {
  label: string
  href: string
  submenu?: Item[]
  active: boolean
}

export const mainMenuImages: string[] = [
  "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe127_Menu_Gallery%2001.jpg",
  "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe139_Menu_Gallery%2003.jpg",
  "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe138_Menu_Gallery%2002.jpg",
  "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe13a_Menu_Gallery%2004.jpg",
  "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe13b_Menu_Gallery%2005.jpg",
  "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe13d_Menu_Gallery%2007.jpg",
  "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe13c_Menu_Gallery%2006.jpg",
  "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe13f_Menu_Gallery%2009.jpg",
  "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe140_Menu_Gallery%2010.jpg",
  "https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe13e_Menu_Gallery%2008.jpg"
]

export const mainMenu: Item[] = [
  {
    label: "Home",
    href: "/",
    active: true
  },
  {
    label: "About",
    href: "/about",
    active: true
  },
  {
    label: "Work",
    href: "/work",
    active: true
  },
  {
    label: "Experience",
    href: "/experience",
    active: true
  },
  {
    label: "News",
    href: "/news",
    active: false
  },
  {
    label: "Contact",
    href: "/contact",
    active: true
  },
];
