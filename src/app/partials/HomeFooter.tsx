"use client"
import { mainMenu } from "@/database/mainMenu";
import Word from '../../components/Word'
import plusIcon from '../../../assets/icons/plus_icon.svg'
import arrowIcon from '../../../assets/icons/arrow_icon.svg'
import { company } from "@/database/company";
import { socialNetworks } from "@/database/socialNetworks";
import { homeFooterInfoBlock } from "@/database/homePage";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});

const Component = () => {
  return (
    <>
      <div grid-fade_trigger="" className="home-footer_component desktop-flex">
        <div hover-fade="" className="home-footer_layout">
          <div className="home-footer_row">
            <div className="home-footer_info">
              {homeFooterInfoBlock.map(item =>
                <Link key={item?.link + '-deslktop'} t-white="" h-effect="" href={item?.link} className="home-footer-info_block w-inline-block">
                  <Word text={item?.title} />
                  <p className="home-footer_p">{item?.description}</p>
                  <div className="footer-info-icon_holder">
                    <Image src={plusIcon} loading="eager" alt="" className="footer-info_icon" />
                    <Image src={arrowIcon} loading="eager" alt="" className="footer-info_icon" />
                  </div>
                </Link>
              )}
            </div>
          </div>

          <div className="footer-bot_layout">
            <div className="footer-bot_left">
              <div className="footer-col">
                <div className="footer-logo_holder">
                  <div className="sp-anim_holder">
                    <Lottie animationData={company?.animatedLogoBold} loop className="sp-anim_container" />
                  </div>
                </div>
              </div>
              <p easter-fade="" className="paragraph">All rights reserved {company?.name}</p>
            </div>

            <div easter-fade="" className="footer-bot_right">
              <div easter-fade="" className="footer-menu_holder">
                {mainMenu.filter(item => item.active).map((item) =>
                  <Link key={item?.href + '-2'} h-effect="" href={item?.href} aria-current="page" className="footer-link w-inline-block">
                    <Word text={item?.label} />
                  </Link>
                )}
              </div>

              <div className="footer-menu_holder">
                {socialNetworks.filter(item => item.active).map((item) =>
                  <Link key={item?.name + '-1'} t-black="" h-effect="" href={item?.link} target="_blank" className="footer-link w-inline-block">
                    <Word text={item?.name} />
                  </Link>
                )}
              </div>

              <Link href={`mailto:${company?.emails.info}`} className="footer-link w-inline-block">
                <div mask-in="" className="footer-link_text">{company?.emails.info}</div>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid-end_trigger" />
      </div>

      <div hidemob-logo="" className="home-footer_component mobile">
        <div hover-fade="" className="home-footer_layout">
          <div className="home-footer_row">
            <div className="home-footer_info">
              {homeFooterInfoBlock.map(item =>
                <Link key={item?.link + '-mobile'} t-white="" h-effect="" href={item?.link} className="home-footer-info_block w-inline-block">
                  <img src={item?.image} loading="eager" alt="" className="hidden-contact_img" />
                  <Word text={item?.title} />
                  <p className="home-footer_p">{item?.description}</p>
                  <div className="footer-info-icon_holder">
                    <Image src={plusIcon} loading="eager" alt="" className="footer-info_icon" />
                    <Image src={arrowIcon} loading="eager" alt="" className="footer-info_icon" />
                  </div>
                </Link>
              )}
            </div>
          </div>

          <div className="footer-bot_layout">
            <div className="footer-bot_left">
              <div className="footer-col" />
            </div>

            <div easter-fade="" className="footer-bot_right">
              <div easter-fade="" className="footer-menu_holder">
                {mainMenu.filter(item => item.active).map((item) =>
                  <Link key={item?.href + '-1'} h-effect="" href={item?.href} aria-current="page" className="footer-link w-inline-block w--current">
                    <Word text={item?.label} />
                  </Link>
                )}
              </div>

              <div className="footer-menu_holder">
                {socialNetworks.filter(item => item.active).map((item) =>
                  <Link key={item?.name + '-2'} t-black="" h-effect="" href={item?.link} target="_blank" className="footer-link w-inline-block">
                    <Word text={item?.name} />
                  </Link>
                )}
              </div>

              <div className="footer-menu_holder">
                <div className="socials-component">
                  <Word text="©2024" />
                </div>
              </div>
            </div>
          </div>

          <div className="footer-logo_holder">
            <div className="sp-anim_holder">
              <Image src={company?.logoBold} loading="eager" alt="" className="footer-logo_svg" />
            </div>
          </div>

          <div className="footer-extras">
            <div mask-in="" className="footer-link_text">{company?.emails.info}</div>
            <p easter-fade="" className="paragraph">All rights reserved {company?.name}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Component