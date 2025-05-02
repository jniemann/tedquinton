"use client"
import { company } from '@/database/company';
import { mainMenu } from '@/database/mainMenu';
import Word from './Word'
import { socialNetworks } from '@/database/socialNetworks';
import Image from 'next/image';
import dynamic from "next/dynamic";
import Link from 'next/link';

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});

const Component = () => {
  return (
    <div className="footer-component">
      <div className="global-footer desktop-footer">
        <div hover-fade="" className="home-footer_layout desktop-flex">
          <div className="footer-bot_layout">
            <div className="footer-bot_left">
              <div className="footer-col">
                <Link href="/" className="footer-logo_holder w-inline-block">
                  <div className="sp-anim_holder">
                    <Lottie animationData={company?.animatedLogoBold} loop={true} className="sp-anim_container" />
                  </div>
                </Link>
              </div>
              <p easter-fade="" className="paragraph">All rights reserved {company?.name}</p>
            </div>

            <div easter-fade="" className="footer-bot_right">
              <div easter-fade="" className="footer-menu_holder">
                {mainMenu.filter((item) => item.active).map((item) => (
                  <Link key={item?.href} t-white="" h-effect="" href={item?.href} className="footer-link w-inline-block">
                    <Word text={item?.label} color="white" />
                  </Link>
                ))}
              </div>

              <div className="footer-menu_holder">
                {socialNetworks?.filter(item => item.active).map((item) => (
                  <Link key={item?.link} t-black="" h-effect="" href={item?.link} target="_blank" className="footer-link w-inline-block">
                    <Word text={item.name} color="white" />
                  </Link>
                ))}
              </div>

              {company?.emails?.info && (
                <Link href={`mailto:${company?.emails?.info}`} className="footer-link w-inline-block">
                  <div mask-in="" className="footer-link_text">{company?.emails?.info}</div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div mobile-footer="" className="global-footer mobile">
        <div hover-fade="" className="home-footer_layout">
          <div className="footer-bot_layout">
            <div className="footer-bot_left">
              <div className="footer-col">
              </div>
            </div>
            <div easter-fade="" className="footer-bot_right">
              <div easter-fade="" className="footer-menu_holder">
                {mainMenu.filter((item) => item.active).map((item) => (
                  <Link key={item?.href} h-effect="" href={item?.href} className="footer-link w-inline-block">
                    <Word text={item?.label} color="white" />
                  </Link>
                ))}
              </div>

              <div className="footer-menu_holder">
                {socialNetworks?.filter(item => item.active).map((item) => (
                  <Link key={item?.link} t-black="" h-effect="" href={item?.link} target="_blank" className="footer-link w-inline-block">
                    <Word text={item.name} color="white" />
                  </Link>
                ))}
              </div>

              <div className="footer-menu_holder">
                <div className="socials-component">
                  <Word text="©2024" color="white" />
                </div>
              </div>
            </div>
          </div>
          <div className="footer-logo_holder">
            <Image src={company?.logoBold} alt={company?.shortName} />
          </div>
          <div className="footer-extras">
            <div mask-in="" className="footer-link_text">info@stewartpartners.studio</div>
            <p easter-fade="" className="paragraph">All rights reserved ©Stewart&amp;Partners</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component