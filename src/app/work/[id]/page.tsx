"use client";
import Word from "../../../components/Word";
import MenuButton from "../../../components/MenuButton";
import "./styles.css";
import Footer from "../../../components/Footer";
import Image from "next/image";
import PlusIcon from "../../../assets/icons/plus_icon.svg";
import GlobalHead from "../../../components/GlobalHead";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Work, works } from "@/database/works";
import Link from "next/link";

const Component = () => {
  const { id } = useParams();
  const [workInfo, setWorkInfo] = useState<Work>();
  const [nextWorkInfo, setNextWorkInfo] = useState<Work>();

  useEffect(() => {
    const work = works.find((a) => a.slug === id);

    // Obtener el índice del trabajo actual
    const currentIndex = works.findIndex((a) => a.slug === id);

    // Obtener el siguiente trabajo activo (si existe)
    let nextWork = null;

    // Buscar el siguiente trabajo activo después del trabajo actual
    for (let i = currentIndex + 1; i < works.length; i++) {
      if (works[i].active) {
        nextWork = works[i];
        break;
      }
    }

    // Si no se encuentra un siguiente trabajo activo, buscar el primero activo en la lista
    if (!nextWork) {
      nextWork = works.find((a) => a.active); // Si no se encuentra, se asigna null
    }

    // Establecer la información del trabajo y el siguiente trabajo
    setNextWorkInfo(nextWork);
    setWorkInfo(work);
  }, [id]);

  return (
    <>
      <GlobalHead pageTitle={`Work - ${workInfo?.workTitle}`} />

      <div single-work-page="" className="page-wrapper">
        <div className="single-info_btn">
          <div className="back-btn_icon-holder">
            <Image
              src={PlusIcon}
              loading="eager"
              alt=""
              className="back-btn_icon"
            />
          </div>
          <Word text="Read more" parentClassName="single-info_btn-holder" className="single-info_btn-text" pload="" h-effect="" />
        </div>

        <MenuButton />

        <div className="page-content">
          <div logo-start="" className="single-layout">
            <Link href="/work" className="allwork-mob-btn w-inline-block">
              <Word text="all work" />
            </Link>

            <div className="single-images_holder">
              <div className="single-images_wrap">
                <div className="single-images_list">
                  {workInfo?.gallery.map((item) => (
                    <div key={item} className="single-images_item first-img">
                      <img
                        src={item}
                        alt=""
                        pload=""
                        className="full-img first-image"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="single-content_holder desktop">
              <div className="single-info">
                <div single-info="" className="single-info_top">
                  <h1 pload="" className="single-title">
                    {workInfo?.mainTitle}
                  </h1>
                  <div pload="" className="page-name_text">
                    {workInfo?.workTitle}
                  </div>
                  <div pload="" className="single-info_rich">
                    {/* Year */}
                    <div className="single-info_block">
                      <div className="body-copy">
                        <strong>Year</strong>
                      </div>
                      <div>{workInfo?.year}</div>
                    </div>

                    {/* Location */}
                    <div className="single-info_block">
                      <div>
                        <strong>Location</strong>
                      </div>
                      <div>{workInfo?.location}</div>
                    </div>

                    {/* Collaborations */}
                    {workInfo?.collaborations &&
                      workInfo?.collaborations !== "" && (
                        <div className="single-info_block">
                          <div>
                            <strong>Collaborations</strong>
                          </div>
                          <div>{workInfo?.collaborations}</div>
                        </div>
                      )}
                  </div>
                </div>

                <div single-info="" className="single-info_bottom">
                  <div className="single-more_info-rich">
                    <div className="body-copy">About</div>
                    <div className="single-content w-richtext">
                      <p>{workInfo?.workCopy}</p>
                    </div>
                  </div>
                </div>

                <div className="read-more_btn-holder">
                  <div pload="" className="read-more_btn">
                    <Word text="read more" />

                    <div className="back-btn_icon-holder">
                      <Image
                        src={PlusIcon}
                        loading="eager"
                        alt=""
                        className="back-btn_icon"
                      />
                    </div>
                  </div>

                  <div className="close-more_btn">
                    <div h-effect="" className="rm-btn_holder">
                      <Word text="close" />
                    </div>
                    <div className="back-btn_icon-holder">
                      <Image
                        src={PlusIcon}
                        loading="eager"
                        alt=""
                        className="close-more_btn-icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div logo-start-mob="" className="mobile_single-content">
              <h1 pload="" className="single-title">
                {workInfo?.mainTitle}
              </h1>
            </div>
          </div>

          <div
            tr-cmsnext-loop="true"
            tr-cmsnext-element="component"
            className="single-next_section is-work"
          >
            <div className="next-wrap w-dyn-list">
              <div role="list" className="next-list w-dyn-items">
                <div role="listitem" className="next-item w-dyn-item">
                  <div className="single-next_holder">
                    <div className="single-next_mid">
                      <div className="all-btn_holder m-hide">
                        <div className="all-btn_layout">
                          <Link
                            href="/work"
                            className="all-btn_flex w-inline-block"
                          >
                            <div className="all-plus_holder">
                              <Image
                                src={PlusIcon}
                                loading="eager"
                                alt=""
                                className="back-btn_icon"
                              />
                            </div>

                            <div className="all-btn_text_holder">
                              <div className="all-btn_text">
                                All Case Studies
                              </div>
                              <div className="all-btn_text">
                                All Case Studies
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>

                      <div className="next-proj_component">
                        <Link
                          href={`/work/${nextWorkInfo?.slug}`}
                          className="all-btn_text"
                        >
                          Next Project
                        </Link>
                        <Link
                          href={`/work/${nextWorkInfo?.slug}`}
                          className="all-btn_text is-next"
                        >
                          View Now
                        </Link>

                        <div className="mobile-next_img-holder">
                          <div className="mobile-next_img-height">
                            <img alt="" src={nextWorkInfo?.image} className="img-fill" />
                          </div>
                        </div>
                      </div>

                      {/* <small className="next-proj_title">{nextWorkInfo?.mainTitle}</small> */}
                    </div>

                    <div
                      hidemob-logo=""
                      className="home-footer_component mobile"
                    ></div>

                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mobile-single_info">
          <h1 msingle="" className="single-title">
            {workInfo?.mainTitle}
          </h1>
          <div msingle="" className="page-name_text">
            {workInfo?.workTitle}
          </div>
          <div msingle="" className="single-info_rich">
            {/* Year */}
            <div className="single-info_block">
              <div className="body-copy">
                <strong>Year</strong>
              </div>
              <div>{workInfo?.year}</div>
            </div>

            {/* Location */}
            <div className="single-info_block">
              <div>
                <strong>Location</strong>
              </div>
              <div>{workInfo?.location}</div>
            </div>

            {/* Collaborations */}
            {workInfo?.collaborations && workInfo?.collaborations !== "" && (
              <div className="single-info_block">
                <div>
                  <strong>Collaborations</strong>
                </div>
                <div>{workInfo?.collaborations}</div>
              </div>
            )}
          </div>

          <div msingle="" className="single-more_info-rich w-richtext">
            <p>{workInfo?.workCopy}</p>
          </div>

          <div msingle="" className="close-single-info_btn">
            <div pload="" h-effect="" className="single-info_btn-holder">
              <Word text="close" />
            </div>
          </div>
        </div>

        <Link
          t-black=""
          h-effect=""
          pload=""
          href="/work"
          className="work-page_title w-inline-block"
        >
          <Word text="all case studies" />
        </Link>
      </div>
    </>
  );
};

export default Component;
