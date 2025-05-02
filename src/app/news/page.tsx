"use client";
import { news } from "@/database/newsPage";
import Word from "../../components/Word";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";

const Component = () => {
  return (
    <>
      <div news-page="" className="page-wrapper">
        <div className="global-head">
          <div className="global-head_layout">
            <a pload="" href="/" className="head-logo_holder w-inline-block">
              <div className="head-logo_height"></div>
              <Image
                src="https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe06c/66601c7c6b0d48cf88bbe08f_logo-icon.svg"
                alt=""
                className="head-logo"
              />
            </a>
            <div pload="" className="head-page_name">
              <div className="page-name_text">Work</div>
            </div>
          </div>
        </div>
        <div h-fade-item="" className="menu-btn">
          <div pload="" h-effect="" className="text-overflow is-menu">
            <div h-item="" mask-in="" className="menu-btn_text">
              <Word text="word" />
            </div>
          </div>
        </div>
        <div className="page-content">
          <div logo-start-mob="" className="news-page">
            <div className="container">
              <div className="news-layout">
                <div className="news-left">
                  <div hover-color="#000000" className="toggle-cat_item">
                    <div
                      pload-stagger=""
                      h-effect=""
                      className="grid-toggle_item is-active"
                    >
                      <div h-item="" className="grid-toggle">
                        <Word text="all news" />
                      </div>
                      <Image
                        src="https://cdn.prod.website-files.com/66601c7c6b0d48cf88bbe06c/66601c7c6b0d48cf88bbe08f_logo-icon.svg"
                        loading="eager"
                        alt=""
                        className="category-img"
                      />
                    </div>
                  </div>
                  <div h-fade-item="" className="work-toggle_holder">
                    <div className="toggle-cat_wrap w-dyn-list">
                      <div role="list" className="toggle-cat_list w-dyn-items">
                        <div
                          hover-color="blue"
                          role="listitem"
                          className="toggle-cat_item w-dyn-item"
                        >
                          <a
                            pload-stagger=""
                            h-effect=""
                            href="/news-categories/architecture"
                            className="grid-toggle_item w-inline-block"
                          >
                            <div h-item="" className="grid-toggle">
                              <Word text="architecture" />
                            </div>
                          </a>
                        </div>
                        <div
                          hover-color="yellow"
                          role="listitem"
                          className="toggle-cat_item w-dyn-item"
                        >
                          <a
                            pload-stagger=""
                            h-effect=""
                            href="/news-categories/interior"
                            className="grid-toggle_item w-inline-block"
                          >
                            <div h-item="" className="grid-toggle">
                              <Word text="interior" />
                            </div>
                          </a>
                        </div>
                        <div
                          hover-color="green"
                          role="listitem"
                          className="toggle-cat_item w-dyn-item"
                        >
                          <a
                            pload-stagger=""
                            h-effect=""
                            href="/news-categories/digital"
                            className="grid-toggle_item w-inline-block"
                          >
                            <div h-item="" className="grid-toggle">
                              <Word text="digital" />
                            </div>
                          </a>
                        </div>
                        <div
                          hover-color="violet"
                          role="listitem"
                          className="toggle-cat_item w-dyn-item"
                        >
                          <a
                            pload-stagger=""
                            h-effect=""
                            href="/news-categories/research"
                            className="grid-toggle_item w-inline-block"
                          >
                            <div h-item="" className="grid-toggle">
                              <Word text="research" />
                            </div>
                          </a>
                        </div>
                        <div
                          hover-color="orange"
                          role="listitem"
                          className="toggle-cat_item w-dyn-item"
                        >
                          <a
                            pload-stagger=""
                            h-effect=""
                            href="/news-categories/infrastructure"
                            className="grid-toggle_item w-inline-block"
                          >
                            <div h-item="" className="grid-toggle">
                              <Word text="infrastructure" />
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="news-right">
                  <div className="news-wrap w-dyn-list">
                    <div role="list" className="news-list w-dyn-items">
                      {news.map((item) => (
                        <div
                          key={item?.link}
                          pload-stagger=""
                          role="listitem"
                          className="news-item w-dyn-item"
                        >
                          <a
                            href={item?.link}
                            className="news-item_link w-inline-block"
                          >
                            <Image
                              src={item?.image}
                              loading="eager"
                              alt=""
                              sizes="(max-width: 479px) 96vw, (max-width: 767px) 97vw, 19vw"
                              className="news-img"
                            />
                            <div className="news-head">{item.title}</div>
                            <div className="news-date">{item.date}</div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <a href="#" className="work-top_holder w-inline-block">
                  <div className="top-text">Back to Top</div>
                </a>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;
