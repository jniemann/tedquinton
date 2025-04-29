"use client";
import Image from "next/image";
import MenuButton from "../../components/MenuButton";
import Word from "../../components/Word";
import { archive_items, pageTitle } from "@/database/archivePage";
import PlusIcon from "../../assets/icons/plus_icon.svg"
import Lottie from "lottie-react"
import logoBold from "../../assets/lottie/logo-bold.json"
import "./styles.css";
import Link from "next/link";

const Component = () => {
  return (
    <div archive-page="" className="page-wrapper is-archive is-black">
      <MenuButton color="white" />

      <Link
        t-white=""
        h-effect=""
        pload=""
        href="/work"
        className="work-page_title w-inline-block"
      >
        <Word text="Case studies" />
      </Link>

      <div className="image-grid-info_holder">
        <div image-grid_title="" mask-in="" className="body-copy">.</div>
        <p image-grid_copy="" className="paragraph">.</p>
      </div>

      <div className="global-head">
        <div className="global-head_layout">
          <Link t-white="" pload="" href="/" className="head-logo_holder w-inline-block" >
            <div className="head-logo_height"></div>
            <Lottie animationData={logoBold} loop className="head-logo is-white" />
          </Link>
          <div pload="" className="head-page_name">
            <div className="page-name_text">{pageTitle}</div>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="archive-grid_component">
          <div archive-sync="" className="archive-grid_wrap w-dyn-list">
            <div pload-archive="" role="list" className="archive-grid_list w-dyn-items">
              {archive_items.map((item) => (
                <div
                  key={item?.slug + "-1"}
                  title-bot={item?.code}
                  title-top={item?.title}
                  archive-item=""
                  role="list"
                  className="archive-item w-dyn-item"
                >
                  <div className="archive-item_link">
                    <div className="archive-head">{item?.title}</div>
                    <div className="archive-number">{item?.number}</div>
                    <div className="archive-excerpt">{item?.excerpt}</div>
                  </div>
                  <div className="archive-mob_img-holder">
                    <div className="archive-mob_img-height">
                      <img alt="" loading="eager" src={item?.thumbnail} className="img-fill" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div archive-sync="" className="archive-grid_wrap is-infinite w-dyn-list" >
            <div pload-archive="" role="list" className="archive-grid_list w-dyn-items" >
              {archive_items.map((item) => (
                <div
                  key={item?.slug + "-2"}
                  title-bot={item?.code}
                  title-top={item?.title}
                  archive-item=""
                  role="list"
                  className="archive-item w-dyn-item"
                >
                  <div className="archive-item_link">
                    <div className="archive-head">{item?.title}</div>
                    <div className="archive-number">{item?.number}</div>
                    <div className="archive-excerpt">{item?.excerpt}</div>
                  </div>
                  <div className="archive-mob_img-holder">
                    <div className="archive-mob_img-height">
                      <img alt="" loading="eager" src={item?.thumbnail} className="img-fill" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="archive-mobile_title-holder">
            <h2 className="archive-title">{pageTitle[0]} <span className="is-serif">{pageTitle[1]}</span></h2>
          </div>
        </div>

        <div className="archive-hover_component">
          <div className="fixed-page_title">
            <h2 pload-stagger="" className="fixed-page_title-top">{pageTitle[0]}</h2>
            <h2 pload-stagger="" className="fixed-page_title-bot">{pageTitle[1]}</h2>
          </div>
        </div>

        <Link href="#swup" className="work-top_holder w-inline-block w--current">
          <div className="top-text">Back to Top</div>
        </Link>
      </div>

      <div archive-sync="" className="archive-hover_component w-dyn-list">
        <div role="list" className="archive-hover_list w-dyn-items">
          {archive_items.map((item) =>
            <div key={item?.slug + '-3'} archive-item="" role="listitem" className="archive-hover_item w-dyn-item">
              <div className="archive-img_holder">
                <img src={item?.thumbnail} loading="eager" alt="" className="img-fill" />
                <div className="archive-img_height"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        archive-sync=""
        className="archive-preview_component lenis lenis-smooth w-dyn-list"
      >
        <div role="list" className="archive-preview_img-list w-dyn-items">
          {archive_items.map((item) =>
            <div
              key={item?.slug + '-4'}
              archive-item=""
              role="listitem"
              className="archive-preview_item w-dyn-item"
            >
              <div
                archive-fade=""
                className="archive-close"
              >
                <Word text="close" color="white" />
              </div>

              <div className="archive-preview_layout">
                <div className="archive-preview_col is-left">
                  <div className="archive-preview_img-wrap">
                    <div className="archive-preview_img-list">
                      {item.images.map((image, index) => (
                        <div key={item?.slug + "-" + index + "-5"} className="archive-preview_img-item">
                          <img src={image} alt="" className="full-img" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div video-player="" className="archive-video-preview"><img
                    src="https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe075/66601c7c6b0d48cf88bbe1e0_Video%20Preview.jpg"
                    alt="Royal Ascot" className="is-vid_thumb" />

                    <div className="archive-vid_text">Play Video</div>
                    <div className="archive-video_popup">
                      <div className="archive-vid_holder">
                        <div className="plyr_component">
                          <div className="plyr_embed w-embed">
                            {!!item?.video?.videoSrc && (
                              <video className="plyr_video" playsInline controls data-poster={item?.video?.previewImage}>
                                <source src={item?.video?.videoSrc} type="video/mp4" />
                              </video>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="archive-preview_overlay"></div>
                </div>

                <div className="archive-preview_col">
                  <div className="archive-preview_info-layout">
                    <div
                      archive-fade=""
                      className="archive-info_top"
                    >
                      <div className="archive-preview_head-holder">
                        <h3 className="archive-preview_head">{item?.title}</h3>
                      </div>
                      <div className="archive-preview_head-holder">
                        <h3 className="archive-preview_head is-alt">{item?.code}</h3>
                      </div>
                    </div>
                    <div
                      archive-fade=""
                      className="archive-info_bot"
                    >
                      <div className="archive-preview_excerpt">
                        {item?.excerpt}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                t-white=""
                archive-fade=""
                href={`/work/${item?.slug}`}
                className="archive-full_btn w-inline-block w-condition-invisible"
              >
                <div className="archive-full_icon-holder">
                  <Image
                    src={PlusIcon}
                    loading="eager"
                    alt=""
                    className="back-btn_icon"
                  />
                </div>
                <Word text="View Full Case study" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default Component;
