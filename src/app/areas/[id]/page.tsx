"use client";
import Word from "../../../components/Word";
import MenuButton from "../../../components/MenuButton";
import { works } from "@/database/works";
import { areas, AreasEnum } from "@/database/areas";
import "./styles.css"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import crossImage from '../../../assets/icons/cross_icon.svg'
import Image from "next/image";
import { company } from "@/database/company";
import { Work } from "@/database/works";
import Link from "next/link";

const Component = () => {
  const { id } = useParams();

  const [filteredWorks, setFilteredWorks] = useState<Work[]>([]);

  const [areaInfo, setAreaInfo] = useState<{
    name: string;
    color: string;
    img: string;
    img2: string;
    slug: AreasEnum;
    code: string;
    text: string;
  } | undefined>();

  useEffect(() => {
    const area = areas.find((a) => a.slug === id);
    const worksFiltered = works.filter((work: Work) =>
      work.categories.includes(id as AreasEnum) && work?.active
    );
    setAreaInfo(area);
    setFilteredWorks(worksFiltered);
  }, [id]);

  return (
    <>
      <div single-area-page="" className="page-wrapper is-black">
        <MenuButton color="white" />

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

          <h3 className="logo-reveal"></h3>
        </div>

        <Link data-swup-animation="to-black" h-effect="" pload="" href="/experience" className="work-page_title w-inline-block">
          <Word text="experience" color="white" />
        </Link>

        <div className="global-head">
          <div className="global-head_layout">
            <Link pload="" href="/" className="head-logo_holder w-inline-block">
              <div className="head-logo_height" />
              {areaInfo && (
                <img src={areaInfo?.img} alt="" className="head-logo" />
              )}
            </Link>

            <div pload="" className="head-page_name">
              <div className="page-name_text">Work</div>
            </div>
          </div>
        </div>

        <div className="page-content">
          <div id="our-work" className="work-layout">
            <div className="mob-work_toggle-holder">
              {areaInfo && (
                <Link hover-color={areaInfo?.color} h-effect="" pload="" href="/work" className="current-item w-inline-block">
                  <Word text={areaInfo?.name} hoverColor={areaInfo?.color} activeColor={areaInfo?.color} />
                  <Image src={crossImage} alt="x" />
                </Link>
              )}
            </div>

            <div className="work-count_holder">
              <div className="work-count">(<span className="case-studies_total">{filteredWorks?.length}</span>)</div>
            </div>

            <div className="work-col is-static">
              {areaInfo && (
                <Link hover-color={areaInfo?.color} h-effect="" pload="" href="/work" className="current-item w-inline-block">
                  <Word text={areaInfo?.name} hoverColor={areaInfo?.color} activeColor={areaInfo?.color} />
                  <Image src={crossImage} alt="x" />
                </Link>
              )}

              <div pload="" className="work-toggle_holder">
                <div className="body-copy">Case Studies(<span className="case-studies_total">{filteredWorks.length}</span>)</div>
              </div>
            </div>

            <div className="work-col is-areas">
              <div className="areas-work_wrap w-dyn-list">
                <div role="list" className="areas-work_list w-dyn-items">
                  {filteredWorks.map((item, index) =>
                    <div key={item?.slug} main-title={item?.mainTitle} work-title={item.workTitle} work-copy={item?.workCopySummary} pload-img="" inf-item="" role="listitem" className="areas-work_item w-dyn-item" >
                      <Link href={`/work/${item?.slug}`} className="areas-work_link w-inline-block">
                        <div className="work-grid_img-holder">
                          <div className="work-grid_img-height">
                            <img src={item?.image} alt="image" className="img-fill" />
                          </div>

                          <div className="work-number_holder">
                            <div className="work-name_text">{item?.mainTitle}</div>
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
                  )}
                </div>
              </div>
            </div>
          </div>

          <Link href="#swup" className="work-top_holder w-inline-block">
            <div className="top-text">Back to Top</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Component;
