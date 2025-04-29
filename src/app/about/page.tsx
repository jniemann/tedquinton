"use client"
import Footer from "../../components/Footer";
import MenuButton from '../../components/MenuButton'
import GlobalHead from '../../components/GlobalHead'
import ContactPopUp from './partials/ContactPopUp'
import './styles.css'
import { teamMembers } from "@/database/teamMembers";
import { company } from "@/database/company";
import { areas } from "@/database/areas";
import { aboutSectionFive, aboutSectionFour, aboutSectionOne, aboutSectionSix, aboutSectionThree, aboutSectionTwo, pageTitle } from "@/database/aboutPage";
import Link from "next/link";


const Component = () => {
  return (
    <>
      <div dark-theme="" className="page-wrapper studio-page">
        <MenuButton />

        <GlobalHead pageTitle={pageTitle} />

        <div className="page-content">
          {/* About Section One */}
          <div logo-start="" className="studio-intro_section desktop">
            <div className="studio-intro_flex">
              <div studio-intro-pin="" pload="" className="studio-intro_left">
                <div className="studio-intro_img_holder">
                  <img src={aboutSectionOne?.image} alt="" className="studio-intro_img" />
                </div>
              </div>

              <div className="studio-intro_right">
                <div className="studio-right_punch-holder">
                  <div studio-intro-pin="" className="studio-punch_height">
                    <h1 pload-head="" className="studio-punch_head">
                      {aboutSectionOne?.title}
                    </h1>
                  </div>
                </div>

                <div className="studio-right_scroll">
                  <div studio-fade-text="" className="studio-right_text-holder">
                    <p pload-body="" className="studio-intro_body">
                      {aboutSectionOne?.textOne}
                    </p>
                  </div>

                  <div studio-fade-text="" className="studio-right_text-holder is-right">
                    <p pload-body="" className="studio-intro_body">
                      {aboutSectionOne?.textThree}
                    </p>
                  </div>
                </div>
              </div>

              <div className="studio-left_scroll">
                <div className="studio-left_container">
                  <h3 logo-end="" className="studio-left_scroll-head">
                    {aboutSectionOne?.textTwo}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="studio-intro_section mobile">
            <div className="studio-intro_flex">
              <div studio-intro-pin="" pload="" className="studio-intro_left">
                <div logo-start-mob="" className="studio-intro_img_holder">
                  <img
                    src={aboutSectionOne?.image}
                    loading="eager"
                    sizes="100vw"
                    alt=""
                    className="studio-intro_img"
                  />
                </div>
              </div>

              <div className="studio-intro_right">
                <div className="studio-right_punch-holder">
                  <h1 pload-head="" className="studio-punch_head">
                    {aboutSectionOne?.title}
                  </h1>
                </div>
                <div className="studio-right_scroll">
                  <div studio-fade-text="" className="studio-right_text-holder">
                    <p pload-body="" className="studio-intro_body">
                      {aboutSectionOne?.textOne}
                    </p>
                  </div>
                  <h3 logo-end="" className="studio-left_scroll-head">
                    {aboutSectionOne?.textTwo}
                  </h3>
                  <div studio-fade-text="" className="studio-right_text-holder is-right">
                    <p className="studio-intro_body">
                      {aboutSectionOne?.textThree}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Section Two */}
          <div className="black-section">
            <div id="team" className="team-section">
              <div className="container">
                <div className="team-flex">
                  <div className="team-left">
                    <div className="body-copy">{aboutSectionTwo?.title}</div>

                    <div className="team-grid_holder">
                      <div className="team-col_wrapper w-dyn-list">
                        <div team-sync="" role="list" className="team-col_list w-dyn-items">
                          {aboutSectionTwo?.teamMembers.map((item) =>
                            <div key={item?.slug + '-1'} team-item="team-member" role="listitem" className="team-col_item w-dyn-item">
                              {/* <Link data-swup-animation="to-black" href={item?.link} className="team-img_holder w-inline-block"> */}
                              <div data-swup-animation="to-black" className="team-img_holder w-inline-block">
                                <div className="team-img_height" />
                                <img src={item?.picture_bw} alt="" className="team-img" />
                                <div style={{ backgroundImage: `url(${item?.picture_color})` }} className="team-img_overlay"></div>
                              </div>
                              {/* </Link> */}

                              <div className="team-name">{item?.name}</div>

                              <div className="join-btn w-condition-invisible">
                                <div className="join-content">
                                  <div className="body-copy is-wrap">
                                    Join the team<br />{company?.emails?.info}
                                  </div>
                                </div>
                                <div className="team-img_height"></div>
                              </div>
                            </div>
                          )}

                          <ContactPopUp />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="team-right">
                    <div className="team-list_holder">
                      <div className="team-list_wrap w-dyn-list">
                        <div className="pin-spacer">
                          <div pload-opacity="" team-sync="" role="list" className="team-list w-dyn-items">
                            {aboutSectionTwo?.teamMembers.map((item) =>
                              <div key={item?.slug + '-2'} team-item="team-member" role="listitem" className="team-list_item team-item w-dyn-item" >
                                {/* <Link data-swup-animation="to-black" href="/team-members/alex-stewart" className="team-list_title-holder w-inline-block"> */}
                                <div data-swup-animation="to-black" className="team-list_title-holder w-inline-block">
                                  <h4 className="team-list_title">
                                    {item?.name}
                                  </h4>
                                </div>
                                {/* </Link> */}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="white-logo-clip_trigger" />
            </div>
            {/* End Team */}

            {/* Start Areas */}
            <div className="areas-section">
              <div className="areas-static">
                <div className="areas-nav_mobile">
                  <div className="areas-nav_holder-mobile">
                    <div className="areas-nav_wrap w-dyn-list">
                      <div role="list" className="areas-nav_list-mob w-dyn-items">
                        {aboutSectionThree?.areas.map((item) =>
                          <div key={item?.slug} role="listitem" className="areas-nav_item w-dyn-item">
                            <Link text-color={item?.color} href={`/areas/${item?.slug}`} className="areas-nav_link w-inline-block">
                              <h4 className="areas-list_head">{item?.name}</h4>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="areas-empty">
                  <div className="areas_title">
                    <div mask-in="" className="body-copy">
                      {aboutSectionThree?.title}
                    </div>
                  </div>

                  <div className="areas-sticky_col">
                    <div m-inactive="" className="areas-img_holder">
                      <img alt="" sizes="(max-width: 767px) 100vw, (max-width: 991px) 283.53125px, 29vw" src="https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe06c/66601c7c6b0d48cf88bbe0bd_S%26P_AxisLines.png" className="areas-img" />
                      <div className="areas-img_height" />
                    </div>
                  </div>
                </div>

                <div className="areas-sticky_mob w-dyn-list">
                  <div role="list" className="areas-sticky_list-mob w-dyn-items">
                    {areas.map((item) =>
                      <div key={item?.slug + '-1'} areas-color={item?.color} role="listitem" className="areas-sticky_item-mob w-dyn-item">
                        <div className="areas-sticky_col">
                          <div className="areas-img_holder">
                            <img src={item?.img} alt="" className="areas-img" />
                            <div className="areas-img_height" />
                          </div>
                        </div>
                        <div className="areas-sticky_col is-content">
                          <div className="areas-content">
                            <h3 className="area-heading">{item?.code}</h3>
                            <div className="areas-rich w-richtext">
                              <p>{item?.text}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div m-inactive="" areas-sync="" className="areas-sticky w-dyn-list">
                  <div role="list" className="areas-sticky_list w-dyn-items">
                    {areas.map((item) =>
                      <div key={item?.slug + '-2'} area-item="" areas-color={item?.color} role="listitem" className="areas-sticky_item w-dyn-item">
                        <div className="areas-sticky_col is-content">
                          <div className="areas-content">
                            <div className="areas-rich w-richtext">
                              <p>{item?.text}</p>
                            </div>
                            <h3 className="area-heading">{item?.code}</h3>
                          </div>
                        </div>

                        <div className="areas-sticky_col">
                          <div className="areas-img_holder">
                            <img alt="" src={item?.img} className="areas-img" />
                            <div className="areas-img_height" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="areas-nav">
                <div className="areas-nav_holder">
                  <div areas-sync="" className="areas-nav_wrap w-dyn-list">
                    <div role="list" className="areas-nav_list w-dyn-items">
                      {areas.map((item) =>
                        <div
                          key={item?.slug + '-3'}
                          area-item=""
                          role="listitem"
                          className="areas-nav_item w-dyn-item"
                        >
                          <Link
                            data-swup-animation="to-black"
                            text-color={item?.color}
                            href={`/areas/${item?.slug}`}
                            className="areas-nav_link w-inline-block"
                          >
                            <h4 className="areas-list_head">{item?.name}</h4>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  <div areas-sync="" className="areas-nav_img-wrap w-dyn-list">
                    <div role="list" className="areas-nav_img-list w-dyn-items">
                      {areas.map((item) =>
                        <div key={item?.slug + '-4'} area-item="" m-inactive="" role="listitem" className="areas-nav_img-item w-dyn-item">
                          <img src={item?.img2} alt="" className="areas-img is-full" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Areas */}

            {/* Start Practice */}
            <div className="practice-section">
              <div className="container">
                <div className="layout-flex is-practice">
                  <div className="practice-col">
                    <div className="body-copy is-grey">{aboutSectionFour?.title}</div>
                    <div className="layout-flex practice-body">
                      <div className="practice-col_inner">
                        <p className="practice-body">
                          {aboutSectionFour?.textOne}
                        </p>
                      </div>
                      <div className="practice-col_inner">
                        <p className="practice-body">
                          {aboutSectionFour?.textTwo}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="practice-col">
                    <div className="practice-p_holder">
                      <h2 className="practice-p_large">
                        {aboutSectionFour?.featuredText}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Practice */}

            {/* Start Team Picture */}
            <div className="studio-fullimg_holder">
              <div className="studio-fullimg_height">
                <img
                  src={aboutSectionFive?.image}
                  alt=""
                  sizes="100vw"
                  className="img-fill"
                />
              </div>
            </div>
            {/* End Team Picture */}

            {/* Start Approach */}
            <div className="approach-section">
              <div className="container">
                <div className="layout-flex practice-body">
                  <div className="approach-col">
                    <h2 className="practice-p_large">
                      {aboutSectionFive?.text}
                    </h2>
                  </div>
                </div>

                <div className="layout-flex pull-up">
                  <div className="approach-col"></div>
                  <div approach-trigger="" className="approach-col is-right">
                    <div className="approach-img_list">
                      {aboutSectionSix?.images.map((src) =>
                        <div key={src} className="approach-img_holder">
                          <div className="approach-img_height"></div>
                          <img
                            src={src}
                            alt=""
                            className="img-fill"
                          />
                        </div>
                      )}
                    </div>

                    <div className="approach-copy_holder">
                      <div className="body-copy">{aboutSectionSix?.title}</div>
                      <p className="practice-body">
                        {aboutSectionSix?.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Approach */}

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Component