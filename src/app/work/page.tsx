"use client";
import Word from "../../components/Word";
import MenuButton from "../../components/MenuButton";
import { filterByArea } from "@/database/worksPage";
import { works } from "@/database/works";
import { areas } from "@/database/areas";
import "./styles.css"
import { company } from "@/database/company";
import Link from "next/link";

const Component = () => {
  return (
    <div work-page="" className="page-wrapper">
      <MenuButton />

      <div className="image-grid-info_holder">
        <div image-grid_title="" mask-in="" className="body-copy">
          .
        </div>
        <p image-grid_copy="" className="paragraph">
          .
        </p>
      </div>

      <div className="text-logo_holder desktop">
        <div p-load="" className="text-logo_layout">
          <h3 className="logo-text invis">{company?.name}</h3>
        </div>
        <h3 className="logo-reveal">Heading</h3>
      </div>

      <Link
        data-swup-animation="to-black"
        h-effect=""
        pload=""
        href="/experience"
        className="work-page_title w-inline-block"
      >
        <div h-item="" className="body-copy">
          <Word text="experience" />
        </div>
      </Link>

      <div className="global-head">
        <div className="global-head_layout">
          <Link pload="" href="/" className="head-logo_holder w-inline-block">
            <div className="head-logo_height"></div>
            <img
              src="https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe06c/66601c7c6b0d48cf88bbe08f_logo-icon.svg"
              alt=""
              className="head-logo"
            />
          </Link>
          <div pload="" className="head-page_name">
            <div className="page-name_text">Work</div>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div id="our-work" className="work-layout">
          <div className="mob-work_toggle-holder">
            <div h-fade-item="" className="work-toggle_holder">
              <div className="toggle-cat_wrap w-dyn-list">
                <div role="list" className="toggle-cat_list w-dyn-items">
                  {filterByArea?.map((item) => (
                    <div key={item?.link} hover-color={item?.color} role="listitem" className="toggle-cat_item w-dyn-item" >
                      <Link data-swup-animation="to-black" h-effect="" pload-stagger="" href={item?.link} className="grid-toggle_item w-inline-block" >
                        <Word text={item?.name} />
                      </Link>
                      <img src={item?.image} alt="" className="category-img" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="work-count_holder">
            <div className="work-count">
              (<span className="case-studies_total">{works?.length}</span>)
            </div>
          </div>

          <div className="work-col is-static">
            <div h-fade-item="" className="work-toggle_holder">
              <div className="toggle-cat_wrap w-dyn-list">
                <div role="list" className="toggle-cat_list w-dyn-items">
                  {filterByArea?.map((item) => (
                    <div key={item?.link + '-2'} hover-color={item?.color} role="listitem" className="toggle-cat_item w-dyn-item" >
                      <Link data-swup-animation="to-black" h-effect="" pload-stagger="" href={item?.link} className="grid-toggle_item w-inline-block" >
                        <Word text={item?.name} />
                      </Link>
                      <img src={item?.image} alt="" className="category-img" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div pload="" className="work-toggle_holder">
              <div className="body-copy">
                Case Studies(<span className="case-studies_total">{works?.length}</span>)
              </div>
            </div>
          </div>

          <div className="work-col is-work lenis lenis-smooth">
            <div className="inf-work_wrap is-on w-dyn-list">
              <div role="list" className="inf-work_list w-dyn-items">
                {works.filter(item => item?.active).map((item, index) => (
                  <div
                    key={'work-' + item?.slug}
                    main-title={item?.mainTitle}
                    work-title={item?.workTitle}
                    work-copy={item?.workCopySummary}
                    pload-img=""
                    inf-item=""
                    role="listitem"
                    className="inf-work_item w-dyn-item"
                  >
                    <Link
                      href={`/work/${item?.slug}`}
                      className="inf-work_link w-inline-block"
                    >
                      <div className="work-grid_img-holder">
                        <div className="work-grid_img-height">
                          <img
                            src={item?.image}
                            alt=""
                            className="img-fill"
                          />
                        </div>
                        <div className="work-number_holder">
                          <div className="work-name_text">{item?.workTitle}</div>
                          <div className="work-number_text">{String(index + 1).padStart(2, '0')}</div>
                        </div>
                      </div>
                    </Link>
                    <div className="category_wrap w-dyn-list">
                      <div role="list" className="category-list w-dyn-items">
                        {item?.categories.map(category => {
                          const area = areas.find(area => area.slug === category);

                          if (area) {
                            return (
                              <div key={item?.mainTitle + '-' + area?.slug} role="listitem" className="category-item w-dyn-item">
                                <div className="category-name">{area.name}</div>
                                <div className="category-color">{area.color}</div>
                                <img src={area?.img2} alt="" />
                              </div>
                            )
                          }

                          return <></>
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Link href="#our-work" className="work-top_holder w-inline-block">
          <div className="top-text">Back to Top</div>
        </Link>
      </div>
    </div>
  );
};

export default Component;
