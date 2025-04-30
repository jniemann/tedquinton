interface Item {
  label: string
  href: string
  submenu?: Item[]
  active: boolean
}


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
