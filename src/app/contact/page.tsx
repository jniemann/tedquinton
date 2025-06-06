"use client";
import React from "react";
import Image from "next/image";
import Word from '../../components/Word'
import MenuButton from '../../components/MenuButton'
import plusIcon from '../../assets/icons/plus_icon.svg'
import arrowIcon from '../../assets/icons/arrow_icon.svg'
import { mainMenu } from "@/database/mainMenu";
import { socialNetworks } from "@/database/socialNetworks";
import { company } from "@/database/company";
import Link from "next/link";
import dynamic from "next/dynamic";
import "./styles.css"

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
});

const Component = () => {
  return (
    <div contact-page="" className="page-wrapper is-black">
      <MenuButton color="white" />

      <div pload="" className="page-title" />

      <div className="page-content">
        <div className="contact-page">
          <div className="contact-left">
            <div className="contact-row">
              <div className="contact-col">
                <a t-white="" href="/" className="home-link w-inline-block">
                  <h3 pload="" className="contact-logo_text">{company?.name}</h3>
                </a>
              </div>
              <div className="contact-col">
                <div className="contact-menu">
                  <div pload-body="" className="contact-items_block">
                    <span className="line">
                      <a href={`tel:${company?.phone}`} className="contact-link_holder w-inline-block" >
                        <div className="contact-link_text">{company?.phone}</div>
                      </a>
                    </span>

                    <span className="line">
                      <a href={`mailto:${company?.emails?.info}`} className="contact-link_holder w-inline-block" >
                        <div className="contact-link_text">{company?.emails?.info}</div>
                      </a>
                    </span>
                  </div>

                  <div className="contact-items_block">
                    <div pload-body="" className="contact-link_text">
                      {company?.address.map((item, index) =>
                        <React.Fragment key={"address-" + index}>{item} <br /></React.Fragment>
                      )}
                      <br />
                    </div>

                    <a pload-stagger="" href={company?.googleMaps} target="_blank" className="contact-text_btn-holder w-inline-block" >
                      <div className="contact-link_text">Open in Google Maps</div>

                      <div className="link-icon_holder">
                        <Image src={plusIcon} loading="eager" alt="" className="footer-info_icon" />
                        <Image src={arrowIcon} loading="eager" alt="" className="footer-info_icon" />
                      </div>
                    </a>
                  </div>

                  <div className="contact-items_block">
                    <div pload-stagger="" className="contact-link_text">Index</div>

                    <div className="contact-items_list">
                      {mainMenu.filter(item => item?.active).map((item) => (
                        <a key={'contact-page-' + item?.href} pload-stagger="" h-effect="" href={item?.href} className="contact-index_link w-inline-block">
                          <Word text={item?.label} color="white" />
                        </a>
                      ))}
                    </div>
                  </div>


                  <div className="contact-items_block">
                    <div pload-stagger="" className="contact-link_text">Social</div>

                    <div className="contact-items_list">
                      {socialNetworks?.filter(item => item.active).map((item) => (
                        <a key={item?.link + "-contact-page"} t-white="" h-effect="" pload-stagger="" href={item?.link} target="_blank" className="contact-index_link w-inline-block">
                          <Word text={item?.name} color="white" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <a t-white="" href="/" className="contact-lottie_small w-inline-block">
              <div className="lottie-component">
                <Lottie animationData={company?.animatedLogoBold} loop className="lottie-el" />
              </div>
            </a>
          </div>

          <div className="contact-right">
            <div className="contact-anim">
              <div className="lottie-component">
                <Lottie animationData={company?.animatedLogo} loop className="lottie-el" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Component