

"use client";
import Word from './Word'
import { useAnimation } from "../contexts/AnimationContext";
import { mainMenu, mainMenuImages } from "@/database/mainMenu";
import { socialNetworks } from "@/database/socialNetworks";
import { company } from "@/database/company";
import Link from "next/link";

const Component = () => {
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
                {mainMenuImages.map((src, index) => (
                  <div key={'menu-carousel-image-' + index} className="menu-inf_item w-dyn-item">
                    <div className="menu-inf_comp">
                      <div className="menu_img-holder">
                        <div className="menu-img_height" />
                        <img
                          className="img-fill"
                          width={131}
                          height={197}
                          src={src}
                          alt={'Menu Image'}
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
              <a key={item.href + '-menu'} href={item.href} className="menu-link w-inline-block" w--current="">
                <div className="menu-link_text">{item.label}</div>
              </a>
            ))}
          </div>

          <div className="menu-bottom mainmenu-fade">
            <div className="footer-bot_layout is-menu">
              <div className="footer-bot_left">
                <div className="footer-menu_holder is-menu">
                  {socialNetworks?.filter(item => item.active).map((item) => (
                    <a key={item?.link + "-desktop"} h-effect="" href={item?.link} target="_blank" className="footer-link w-inline-block">
                      <Word text={item?.name} color="white" />
                    </a>
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
              <a key={item?.link + "-mobile"} h-effect="" href={item?.link} target="_blank" className="footer-link w-inline-block">
                <Word text={item?.name} color="white" />
              </a>
            ))}
          </div>
          <p className="mobile-extra_p mainmenu-fade">All rights reserved {company?.name}</p>
        </div>
      </div>
    </div>
  );
}

export default Component