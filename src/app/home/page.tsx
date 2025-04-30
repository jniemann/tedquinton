"use client"

//import Lottie from "lottie-react"
import Image from "next/image";
import Link from "next/link";
import {
  company
} from '@/database/company';
import {
  homeFooterInfoBlock,
  homeSectionFour,
  homeSectionOne,
  homeSectionThree,
  homeSectionTwo
} from '@/database/homePage';
import { useCurrentTime } from '../../hooks/useCurrentTime';
// import MenuButton from '../../components/MenuButton'
// import Egg from '../../components/Egg'
// import VideoPopUp from './partials/VideoPopUp'
import Footer from './partials/HomeFooter'
import "./styles.css"


const Component = () => {
  const currentTime = useCurrentTime();

  return (
    <>
      <div className="page-wrapper home-page">
        <div className="mobile-text_logo">
          <Link t-white="" pload="" href="/" aria-current="page" className="head-logo_holder w-inline-block w--current" >
            <div className="head-logo_height" />
            <Image src={company?.logoBold} alt="" className="head-logo" />
          </Link>
        </div>

        {/* <MenuButton /> */}

        <div className="floating-title_holder">
          <div className="body-copy">{homeSectionFour?.title}<br />({homeSectionFour?.works.filter(item => item?.active).length})</div>
        </div>

        {/* <VideoPopUp /> */}

        <div className="image-grid-info_holder">
          <div image-grid_title="" mask-in="" className="body-copy"></div>
          <p image-grid_copy="" className="paragraph"></p>
        </div>

        <div className="contact-hover_component">
          {homeFooterInfoBlock.map(item =>
            <div key={item?.link} className="footer-img_holder">
              <div className="footer-img_height" />
              <img src={item?.image} loading="eager" alt="" className="img-fill" />
            </div>
          )}
        </div>

        <div className="page-content">
          <div className="home-hero_sticky">
            <div className="home-hero_layout">
              <div className="layout-col desktop" />

              <div className="layout-col home-intro">
                <div pload-opacity="" className="layout-flex is-ci">
                  <div className="text-overflow">
                    <div className="body-copy">{homeSectionOne?.title}</div>
                  </div>

                  <div className="text-overflow desktop">
                    <div mask-in="" className="alt-copy text-right">{company?.coords}<br />
                      <span className="local-time">{currentTime}</span>
                    </div>
                  </div>
                </div>

                <div pload="" className="text-logo_holder is-mobile" >
                  <div className="text-logo_layout">
                    <h3 className="logo-text">{company?.name}</h3>
                  </div>
                </div>

                <div className="video-component clickable" >
                  <div className="video-bg" >
                    {(typeof window === "undefined" || typeof document === 'undefined') && (
                      // <Lottie animationData={company?.animatedLogo} loop={true} />
                      <></>
                    )}
                  </div>

                  <div className="video-play">
                    <div className="play-text_holder">
                      {homeSectionTwo.label.map((item) =>
                        <div key={item + "-1"} className="video-play_text">{item}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div pload-opacity="" className="scroll-component">
                  <div className="text-overflow">
                    <div className="body-copy">Scroll</div>
                  </div>
                </div>
              </div>

              <div className="home-hero_overlay_wrap desktop">
                <div className="home-hero_spacer" />
                <div className="home-hero_overlay">
                  <img src={homeSectionTwo?.image} loading="eager" alt="" sizes="100vw" className="img-fill" />
                  <div className="home-hero_overlay_darken" />
                </div>
              </div>
            </div>

            <div className="home-hero_overlay_wrap mobile video-play">
              <div className="home-hero_overlay">
                <img src={homeSectionTwo?.image} loading="eager" alt="" sizes="100vw" className="img-fill" />
                <div className="home-hero_overlay_darken" />
                <div className="play-text_holder mobile">
                  {homeSectionTwo.label.map((item) =>
                    <div key={item + "-2"} className="video-play_text">{item}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="home-intro_section">
            <div className="container">
              <div className="home-intro_layout">
                <div className="home-intro_left">
                  <div mask-in="" className="body-copy">{homeSectionThree?.title}</div>
                </div>
                <div className="home-intro_right">
                  <h2 className="h-medium">{homeSectionThree?.text}</h2>
                </div>
              </div>
            </div>
          </div>

          <div className="photo-grid_section">
            <div mask-in="" className="body-copy mobile">{homeSectionFour?.title}<br />({homeSectionFour?.works?.filter(item => item?.active).length})</div>

            <div className="photo-grid_wrap w-dyn-list">
              <div role="list" className="photo-grid w-dyn-items">
                {homeSectionFour?.works?.filter(item => item?.active).map((item, index) =>
                  <div key={item?.slug} main-title={item?.mainTitle} work-title={item?.workTitle} work-copy={item?.workCopySummary} role="listitem" className="image-grid_item w-dyn-item">
                    <img loading="eager" grid-img="" src={item?.image} alt="" className="grid-img" />
                    <div className="grid-img-number_holder">
                      <div className="grid-img_number">{String(index + 1).padStart(2, '0')}</div>
                      <div className="grid-mobi_name">{item?.mainTitle}</div>
                    </div>
                    <Link href="#" className="image-item_overlay w-inline-block" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <Footer />

          <div className="logo-holder hide">
            <div className="logo-text_holder">
              <img src={company?.logoText} loading="eager" alt="" className="logo-text" />
            </div>
          </div>
        </div>

        <div pload-swipe="" className="text-logo_holder">
          <div p-load="" className="text-logo_layout">
            <h3 className="logo-text" >{company?.name}</h3>
          </div>
        </div>
      </div>

      {/* <Egg /> */}
    </>
  );
}

export default Component