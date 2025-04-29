

"use client";
import Image from "next/image";
import { mainMenu } from "@/database/mainMenu";
import "lenis/dist/lenis.css";
import { useAnimation } from "../contexts/AnimationContext";
import Word from '../components/Word'
import { socialNetworks } from "@/database/socialNetworks";
import { company } from "@/database/company";
import Link from "next/link";

const items = [
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
];

export default function Navbar() {
  const { refs } = useAnimation()

  return (
    <div className="menu-component">
      <div className="menu-layout" ref={refs?.menuLayoutRef}>
        <div className="menu-col is-left">
          <div className="menu-logo_holder">
            <div className="menu-logo_layout">
              <h3 className="menu-logo_text">{company?.name}</h3>
            </div>
          </div>

          <div className="menu-infite_holder mainmenu-fade">
            <div className="menu-inf_wrap w-dyn-list">
              <div className="menu-inf_list w-dyn-items">
                {items.map((src, index) => (
                  <div key={'menu-carousel-image-' + index} className="menu-inf_item w-dyn-item">
                    <div className="menu-inf_comp">
                      <div className="menu_img-holder">
                        <div className="menu-img_height" />
                        <Image
                          className="img-fill"
                          width={131}
                          height={197}
                          src={src}
                          alt={`Imagen {index + 1}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="menu-col is-right">
          <div className="menu-list">
            {mainMenu.filter(item => item?.active).map((item) => (
              <Link key={item.href + '-menu'} href={item.href} className="menu-link w-inline-block" w--current="">
                <div className="menu-link_text">{item.label}</div>
              </Link>
            ))}
          </div>

          <div className="menu-bottom mainmenu-fade">
            <div className="footer-bot_layout is-menu">
              <div className="footer-bot_left">
                <div className="footer-menu_holder is-menu">
                  {socialNetworks?.filter(item => item.active).map((item) => (
                    <Link key={item?.link + "-desktop"} h-effect="" href={item?.link} target="_blank" className="footer-link w-inline-block">
                      <Word text={item?.name} color="white" />
                    </Link>
                  ))}
                </div>
              </div>
              <p easter-fade="" className="paragraph desktop">All rights reserved {company?.name}</p>
            </div>
          </div>
        </div>

        <div className="menu-close" ref={refs?.menuCloseButtonRef}>
          <div className="menu-btn_text">
            <Word text="close" color="white" />
          </div>
        </div>

        <div className="mobile-menu-bot">
          <div className="footer-menu_holder is-menu mainmenu-fade">
            {socialNetworks?.filter(item => item.active).map((item) => (
              <Link key={item?.link + "-mobile"} h-effect="" href={item?.link} target="_blank" className="footer-link w-inline-block">
                <Word text={item?.name} color="white" />
              </Link>
            ))}
          </div>
          <p className="mobile-extra_p mainmenu-fade">All rights reserved {company?.name}</p>
        </div>
      </div>
    </div>
  );
}
