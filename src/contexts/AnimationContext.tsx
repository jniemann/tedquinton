"use client";
import React, {
  createContext,
  RefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
//import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Preload from "../components/Preload";
import Transition from "../components/Transition";
import Menu from "../components/Menu";
import { useLenis } from "./LenisContext";
// import SplitType from "split-type";
import { company } from "@/database/company";
import "plyr-react/dist/plyr.css";

// const Plyr = dynamic(() => import('plyr-react'), {
//   ssr: false,
// });

export type AnimationRefs = {
  pageContent: RefObject<HTMLDivElement | null>;
  homePage: {
    mainMenuRef: HTMLDivElement | null;
    menuLayoutRef: HTMLDivElement | null;
    menuOpenButtonRef: HTMLDivElement | null;
    menuCloseButtonRef: HTMLDivElement | null;
    footerRef: HTMLDivElement | null;
  };
};

type AnimationContextType = {
  refs: any
};

const AnimationContext = createContext<AnimationContextType | null>(null);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { lenis } = useLenis();
  const stdDuration = 0.8;
  const logoRef = useRef<HTMLDivElement>(null);
  const menuResizeTimeout = useRef<NodeJS.Timeout | null>(null);
  const mainMenuRef = useRef<HTMLDivElement>(null);
  const menuLayoutRef = useRef<HTMLDivElement>(null);
  const menuOpenButtonRef = useRef<HTMLDivElement>(null);
  const menuCloseButtonRef = useRef<HTMLDivElement>(null);
  // const menuLinkRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const contextValue: AnimationContextType = useMemo(
    () => ({
      refs: {
        logoRef,
        mainMenuRef,
        menuLayoutRef,
        menuOpenButtonRef,
        menuCloseButtonRef,
        footerRef,
      },
    }),
    []
  );

  useEffect(() => {
    if (typeof window === "undefined" || !lenis) return
    if (typeof document === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    let menuSlideIn: gsap.core.Timeline = gsap.timeline();;

    const pageLoadTl = gsap.timeline({
      paused: true,
      onComplete: () => {
        ScrollTrigger.refresh();
        lenis.resize();
        lenis.start();
      },
    });

    const mm = gsap.matchMedia();

    gsap.config({
      nullTargetWarn: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    //MAIN MENU
    const mainMenuItems = gsap.utils.toArray(".menu-inf_item") as HTMLElement[];

    let mainMenuHeight = mainMenuRef?.current?.clientHeight;
    let mainMenuItemHeight = mainMenuItems[0].clientHeight;
    let menuWrapHeight = mainMenuItems.length * mainMenuItemHeight;

    let mainMenuScrollSpeed = 0;
    let menuOldScrollY = 0;
    let menuScrollY = 0;
    let menuY = 0;

    const menuLerp = (v0: number, v1: number, t: number) => {
      return v0 * (1 - t) + v1 * t;
    };

    const menuDispose = (scroll: number, items: HTMLElement[]) => {
      gsap.set(items, {
        y: (i) => {
          return i * mainMenuItemHeight + scroll;
        },
        modifiers: {
          y: (menuY, _target) => {
            const s = gsap.utils.wrap(
              -mainMenuItemHeight,
              menuWrapHeight - mainMenuItemHeight,
              parseInt(menuY)
            );
            return `${s}px`;
          },
        },
      });
    };
    menuDispose(0, mainMenuItems);

    const menuMouseWheel = (e: WheelEvent) => {
      menuScrollY -= e.deltaY;
    };

    if (menuLayoutRef?.current) {
      menuLayoutRef?.current.addEventListener("wheel", menuMouseWheel);
    }

    const handleResize = () => {
      // Clear any previous timeouts to avoid multiple function calls
      if (menuResizeTimeout.current) {
        clearTimeout(menuResizeTimeout.current);
      }

      // Set a new timeout to delay the execution of the function
      menuResizeTimeout.current = setTimeout(() => {
        const mainMenuItems =
          mainMenuRef.current?.querySelectorAll(".menu-item");
        if (!mainMenuItems || mainMenuItems.length === 0) return;

        mainMenuHeight = mainMenuRef.current?.clientHeight || 0;
        mainMenuItemHeight = mainMenuItems[0].clientHeight;
        menuWrapHeight = mainMenuItems.length * mainMenuItemHeight;
      }, 100);
    };
    window.addEventListener("resize", handleResize);

    const menuRender = () => {
      requestAnimationFrame(menuRender);
      menuY = menuLerp(menuY, menuScrollY, 0.1);
      menuDispose(menuY, mainMenuItems);
      mainMenuScrollSpeed = menuY - menuOldScrollY;
      menuOldScrollY = menuY;
    };
    menuRender();

    /**
     * Open main menu animation
     * STARTS
     */
    menuSlideIn = gsap.timeline({
      paused: true,
      onComplete: () => {
        document.body.classList.add("menu-open");
      },
    });

    menuSlideIn.set(".menu-component", {
      pointerEvents: "auto",
    });

    menuSlideIn.to(".menu-component", {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
      duration: stdDuration,
      ease: "primary-ease",
    });

    menuSlideIn.from(
      ".menu-logo_text",
      {
        yPercent: 110,
        duration: stdDuration,
        ease: "circ.out",
      },
      stdDuration / 2
    );

    menuSlideIn.from(
      ".menu-link_text",
      {
        yPercent: 110,
        duration: stdDuration,
        ease: "circ.out",
        stagger: 0.07,
      },
      "<"
    );

    menuSlideIn.to(
      ".mainmenu-fade",
      {
        opacity: 1,
        duration: stdDuration,
        ease: "power1.out",
      },
      stdDuration / 1.5
    );

    mm.add("(max-width: 767px)", () => {
      menuSlideIn.to(
        ".mobile-menu_img-holder",
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
          ease: "power3.out",
          duration: 1.8,
        },
        stdDuration
      );
    });
    /** END */

    /**
     * Close main menu animation
     * STARTS
     */
    const menuSlideOut = gsap.timeline({
      paused: true,
      onStart: () => {
        document.body.classList.remove("menu-open");
      },
    });

    menuSlideOut.to(".menu-logo_text", {
      yPercent: -110,
      duration: stdDuration,
      ease: "primary-ease",
    });

    menuSlideOut.to(
      ".menu-link_text",
      {
        yPercent: -110,
        duration: stdDuration / 1.5,
        ease: "power3.inOut",
        stagger: 0.04,
      },
      "<"
    );

    menuSlideOut.to(
      ".mobile-menu_img-holder",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: stdDuration,
        ease: "primary-ease",
      },
      "<"
    );

    menuSlideOut.to(
      ".mainmenu-fade",
      {
        opacity: 0,
        duration: stdDuration / 2,
        ease: "power1.out",
      },
      "<"
    );

    menuSlideOut.to(
      ".menu-component",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: stdDuration,
        ease: "primary-ease",
      },
      stdDuration / 2
    );

    menuSlideOut.set(".menu-component", {
      pointerEvents: "none",
    });
    /** END */

    const init = () => {
      console.log('INIT PAGE')
      // Función que valida si los elementos existen antes de ejecutar cualquier acción
      const safeQuerySelector = (selector: string) => {
        const element: HTMLElement | null = document.querySelector(selector);
        if (!element) {
          console.warn(`Elemento no encontrado: ${selector}`);
        }
        return element;
      };

      const safeQuerySelectorAll = (selector: string) => {
        const element: NodeListOf<HTMLElement> = document.querySelectorAll(selector);
        if (!element) {
          console.warn(`Elemento no encontrado: ${selector}`);
        }
        return element;
      };

      // Aseguramos que las variables son del tipo adecuado
      const menuBtn = safeQuerySelector(".menu-btn") as HTMLButtonElement | null;
      const menuClose = safeQuerySelector(".menu-close") as HTMLButtonElement | null;
      const menuLinks = safeQuerySelectorAll(".menu-link")

      if (menuBtn) {
        menuBtn.addEventListener("click", () => {
          if (menuSlideIn) menuSlideIn.restart();
        });
      }

      if (menuClose) {
        menuClose.addEventListener("click", () => {
          if (menuSlideOut) menuSlideOut.restart();
        });
      }

      // Cambiar atributo de loading en imágenes
      safeQuerySelectorAll("img[loading='lazy']")?.forEach((img) => {
        if (img instanceof HTMLImageElement) {
          img.setAttribute("loading", "auto");
        }
      });

      // Ocultar componente con GSAP
      safeQuerySelectorAll(".next-proj_component").forEach((el) => {
        if (el instanceof HTMLElement) {
          el.addEventListener("click", () => {
            gsap.set(".next-img_holder", {
              display: "none",
            });
          });
        }
      });

      // Redimensionamiento de ventana
      let windowWidth: number = window.innerWidth;
      window.addEventListener("resize", () => {
        if (windowWidth !== window.innerWidth) {
          windowWidth = window.innerWidth;
          if (pageLoadTl) {
            pageLoadTl.revert();
            pageLoadTl.invalidate();
            pageLoadTl.restart();
          }
          // lenis.resize();
          // ScrollTrigger.refresh(true);
        }
      });

      // Hover links menú
      menuLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          menuLinks.forEach((l) => l.classList.add("fade"));
          link.classList.remove("fade");
        });

        link.addEventListener("mouseleave", () => {
          menuLinks.forEach((l) => l.classList.remove("fade"));
        });
      });

      // Video Player
      // safeQuerySelectorAll("[video-player]").forEach((el: HTMLElement) => {
      //   // Aseguramos que el componente sea un HTMLElement
      //   if (el instanceof HTMLElement) {
      //     const playVidBtn = el.querySelector(
      //       ".is-vid_thumb"
      //     ) as HTMLElement | null;
      //     const closeVidBtn = el.querySelector(
      //       ".archive-close_vid"
      //     ) as HTMLElement | null;
      //     const plyrEl = el.querySelector(
      //       ".plyr_video"
      //     ) as HTMLVideoElement | null;

      //     const controls = `
      //       <div className="plyr__controls">
      //         <div className="plyr__progress">
      //           <input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
      //         </div>
      //         <div className="plyr_stretch">
      //           <div className="plyr_col">
      //             <div className="plyr__control" aria-label="Play, {title}" data-plyr="play">
      //               <div className="icon--pressed" role="presentation">Pause</div>
      //               <div className="icon--not-pressed" role="presentation">Play</div>
      //             </div>
      //             <div className="plyr__time plyr__time--current" aria-label="Current time">00:00</div>
      //           </div>
      //           <div className="plyr__control" aria-label="Mute" data-plyr="mute">
      //             <span className="icon--pressed" role="presentation">Sound On</span>
      //             <span className="icon--not-pressed" role="presentation">Sound Off</span>
      //           </div>
      //         </div>
      //       </div>`;

      //     if (Plyr && plyrEl) {
      //       const player = new Plyr(plyrEl, {
      //         controls,
      //         resetOnEnd: true,
      //       });

      //       // Validamos que los botones de play y close existan antes de agregar el event listener
      //       if (playVidBtn) {
      //         playVidBtn.addEventListener("click", () => {
      //           const videoPopup = safeQuerySelector(".archive-video_popup") as HTMLElement | null;
      //           videoPopup?.classList.add("show");
      //           player.play();
      //         });
      //       }

      //       if (closeVidBtn) {
      //         closeVidBtn.addEventListener("click", () => {
      //           const videoPopup = safeQuerySelector(
      //             ".archive-video_popup"
      //           ) as HTMLElement | null;
      //           videoPopup?.classList.remove("show");
      //           player.pause();
      //         });
      //       }

      //       player.on("ended", () => {
      //         const videoPopup = safeQuerySelector(
      //           ".archive-video_popup"
      //         ) as HTMLElement | null;
      //         videoPopup?.classList.remove("show");
      //         if (player.fullscreen.active) {
      //           player.fullscreen.exit();
      //         }
      //       });
      //     }
      //   }
      // });

      // Selección de los elementos con el atributo 'tr-cmsnext-element="component"'
      // document
      //   .querySelectorAll("[tr-cmsnext-element='component']")
      //   .forEach((componentEl) => {
      //     if (!(componentEl instanceof HTMLElement)) return;

      //     const cmsListEl = componentEl.querySelector(".w-dyn-items") as HTMLElement | null;
      //     if (!cmsListEl) return;

      //     const cmsItemEls = Array.from(cmsListEl.children) as HTMLElement[];

      //     const currentItemEl: HTMLElement | null = null;

      //     const noResultEl = componentEl.querySelector(
      //       "[tr-cmsnext-element='no-result']"
      //     ) as HTMLElement | null;

      //     cmsItemEls.forEach((item) => {
      //       if (item.querySelector(".w--current")) {
      //         currentItemEl = item;
      //       }
      //     });

      //     const nextItemEl = currentItemEl?.nextElementSibling as HTMLElement | null;
      //     const prevItemEl = currentItemEl?.previousElementSibling as HTMLElement | null;

      //     if (componentEl.getAttribute("tr-cmsnext-loop") === "true") {
      //       if (!nextItemEl) nextItemEl = cmsItemEls[0];
      //       if (!prevItemEl) prevItemEl = cmsItemEls[cmsItemEls.length - 1];
      //     }

      //     const displayEl: HTMLElement | null = nextItemEl;
      //     if (componentEl.getAttribute("tr-cmsnext-showprev") === "true") {
      //       displayEl = prevItemEl;
      //     }

      //     if (componentEl.getAttribute("tr-cmsnext-showall") === "true") {
      //       prevItemEl?.classList.add("is-prev");
      //       currentItemEl?.classList.add("is-current");
      //       nextItemEl?.classList.add("is-next");
      //     } else {
      //       cmsItemEls.forEach((item) => {
      //         if (item !== displayEl) item.remove();
      //       });

      //       if (!displayEl && noResultEl) noResultEl.style.display = "block";
      //       if (!displayEl && componentEl.getAttribute("tr-cmsnext-hideempty") === "true") {
      //         componentEl.style.display = "none";
      //       }
      //     }
      //   });


      //h-effect selector
      safeQuerySelectorAll("[h-effect]").forEach((el) => {
        if (!(el instanceof HTMLElement)) return;

        const hItems = el.querySelectorAll(
          "[h-item]"
        ) as NodeListOf<HTMLElement>;
        const text1 = hItems[0];
        const text2 = hItems[1];

        if (!text1 || !text2) return;

        const textContent = text1.textContent || "";
        const numberOfLetters = textContent.length;
        const staggerAmount = numberOfLetters * 0.025;

        const tl = gsap.timeline({ paused: true });

        tl.to(text1.querySelectorAll(".char") as NodeListOf<HTMLElement>, {
          yPercent: -100,
          opacity: 0,
          ease: "power1.out",
          stagger: { amount: staggerAmount },
        });

        tl.from(
          text2.querySelectorAll(".char") as NodeListOf<HTMLElement>,
          {
            yPercent: 100,
            opacity: 0,
            ease: "power1.out",
            stagger: { amount: staggerAmount },
          },
          0
        );

        el.addEventListener("mouseenter", () => {
          tl.restart();
        });
      });

      // SplitType h-item
      // const splitType = new SplitType("[h-item]", {
      //   types: "words,chars",
      //   tagName: "span",
      // });

      // SplitType pload-body, pload-head
      // const paragraphSplit = new SplitType("[pload-body], [pload-head]", {
      //   types: "lines",
      //   tagName: "span",
      // });

      //Page preload
      const preload = (): void => {
        const counter = {
          value: 0,
        };
        const loaderDuration = 4;

        const updateLoaderText = (): void => {
          const progress = Math.round(counter.value);
          const formattedProgress =
            progress < 10 ? `0${progress}%` : `${progress}%`;
          const preloaderTimer = safeQuerySelector(
            ".preloader-timer"
          ) as HTMLElement;
          if (preloaderTimer) {
            preloaderTimer.textContent = formattedProgress;
          }
        };

        const endLoaderAnimation = (): void => {
          document.body.classList.remove("preloading");
          if (typeof lenis !== "undefined") {
            lenis.start();
          }
          if (typeof pageLoadTl !== "undefined") {
            pageLoadTl.play();
          }
        };

        const startLoaderAnimation = (): void => {
          document.documentElement.scrollTop = 0;
        };

        if (typeof lenis !== "undefined") {
          lenis.stop();
        }

        // Check if sessionStorage has a "visited" value
        if (sessionStorage.getItem("visited") !== null) {
          document.body.classList.remove("preloading");
          if (typeof lenis !== "undefined") {
            lenis.start();
          }
          if (typeof pageLoadTl !== "undefined") {
            pageLoadTl.play();
          }
        } else {
          const tl = gsap.timeline({
            onComplete: endLoaderAnimation,
          });

          tl.to(counter, {
            value: 100,
            onUpdate: updateLoaderText,
            duration: loaderDuration,
            ease: "power4.inOut",
          });

          tl.to(".preloader-component", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: stdDuration,
            ease: "primary-ease",
          });

          sessionStorage.setItem("visited", "true");
        }
      };

      const easterEgg = () => {
        mm.add("(min-width: 768px)", () => {
          document
            .querySelectorAll(".footer-logo_holder")
            .forEach((element) => {
              element.addEventListener("mouseenter", () => {
                document.body.classList.add("easter-on");
                safeQuerySelector(".menu-btn")?.classList.add("hide");
              });

              element.addEventListener("mouseleave", () => {
                document.body.classList.remove("easter-on");
                safeQuerySelector(".menu-btn")?.classList.remove("hide");
              });
            });
        });

        mm.add("(max-width: 767px)", () => {
          document
            .querySelectorAll(".footer-logo_holder")
            .forEach((element) => {
              element.addEventListener("mouseenter", () => {
                document.body.classList.add("easter-on");
                safeQuerySelector(".menu-btn")?.classList.add("hide");
              });

              element.addEventListener("mouseleave", () => {
                document.body.classList.remove("easter-on");
                safeQuerySelector(".menu-btn")?.classList.remove("hide");
              });
            });
        });
      };

      preload();

      // Función que se ejecuta cuando se carga la página
      const pageLoad = () => {
        console.log('Loading page')
        pageLoadTl.set(".page-content", {
          opacity: 1,
        });

        const pload = gsap.utils.toArray("[pload]") as HTMLElement[];

        if (pload) {
          pageLoadTl.fromTo(
            pload,
            {
              opacity: 0,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            },
            {
              opacity: 1,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
              duration: stdDuration,
              ease: "primary-ease",
            }
          );
        }

        if (safeQuerySelector(".home-page")) {
          pageLoadTl.fromTo(
            ".video-component",
            {
              y: "6.75rem",
              opacity: 0,
            },
            {
              y: "0rem",
              opacity: 1,
              duration: stdDuration,
              ease: "circ.out",
            },
            "<"
          );
          pageLoadTl.fromTo(
            ".video-bg",
            {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            },
            {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
              duration: stdDuration,
              ease: "circ.out",
            },
            "<"
          );

          pageLoadTl.fromTo(
            ".logo-text",
            {
              yPercent: 0,
            },
            {
              yPercent: -100,
              duration: stdDuration,
              ease: "circ.out",
              stagger: 0.07,
            },
            "<"
          );
        }

        const ploadOpacity = gsap.utils.toArray(
          "[pload-opacity]"
        ) as HTMLElement[];

        if (ploadOpacity) {
          pageLoadTl.fromTo(
            ploadOpacity,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 1,
              ease: "power1.inOut",
            },
            "<"
          );
        }

        const ploadImg = gsap.utils.toArray("[pload-img]") as HTMLElement[];

        if (ploadImg) {
          pageLoadTl.fromTo(
            ploadImg,
            {
              opacity: 0,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            },
            {
              opacity: 1,
              clipPath: "polygon(0% 100%, 100% 100%, 120% 0%, 0% 0%)",
              duration: 1.8,
              stagger: { amount: 0.5, from: "start" },
              ease: "power3.out",
            },
            "<"
          );
        }

        const ploadHeadLines = gsap.utils.toArray(
          "[pload-head] .line"
        ) as HTMLElement[];

        if (ploadHeadLines) {
          pageLoadTl.fromTo(
            ploadHeadLines,
            {
              opacity: 0,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            },
            {
              opacity: 1,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
              duration: 1.2,
              stagger: { each: 0.1, from: "end" },
              ease: "power3.out",
            },
            "<"
          );
        }

        const archiveTitleTop = gsap.utils.toArray(
          ".archive-title_top"
        ) as HTMLElement[];

        if (archiveTitleTop) {
          pageLoadTl.fromTo(
            archiveTitleTop,
            {
              opacity: 0,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            },
            {
              opacity: 1,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
              duration: 1.2,
              ease: "power3.out",
            },
            "<"
          );
        }

        const archiveTitleBot = gsap.utils.toArray(
          ".archive-title_bot"
        ) as HTMLElement[];

        if (archiveTitleBot) {
          pageLoadTl.fromTo(
            archiveTitleBot,
            {
              opacity: 0,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            },
            {
              opacity: 1,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
              duration: 1.2,
              ease: "power3.out",
              delay: 0.1,
            },
            "<"
          );
        }

        const ploadArchive = gsap.utils.toArray(
          "[pload-archive]"
        ) as HTMLElement[];

        if (ploadArchive) {
          pageLoadTl.fromTo(
            ploadArchive,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 1,
              delay: 0.3,
              ease: "power1.out",
            },
            "<"
          );
        }

        const ploadBodyLine = gsap.utils.toArray(
          "[pload-body] .line"
        ) as HTMLElement[];

        if (ploadBodyLine) {
          pageLoadTl.fromTo(
            ploadBodyLine,
            {
              opacity: 0,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            },
            {
              opacity: 1,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
              duration: 0.8,
              stagger: 0.04,
              delay: 0.2,
              ease: "power1.out",
            },
            "<"
          );
        }

        const ploadStagger = gsap.utils.toArray(
          "[pload-stagger]"
        ) as HTMLElement[];

        if (ploadStagger) {
          pageLoadTl.fromTo(
            ploadStagger,
            {
              opacity: 0,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            },
            {
              opacity: 1,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
              duration: 1,
              delay: 0.2,
              stagger: 0.07,
              clearProps: "all",
              ease: "power3.out",
            },
            "<"
          );
        }
      };

      pageLoad();

      const logoShrink = (): void => {
        const mm = window.matchMedia("(min-width: 768px)");

        const handleResize = () => {
          if (mm.matches) {
            // Para pantallas de escritorio
            const logoShrinkTimeline = gsap.timeline({
              paused: true,
              scrollTrigger: {
                trigger: "[logo-start]",
                start: "top top",
                end: "+=500",
                scrub: true,
              },
            });

            // Validamos si el elemento existe antes de manipularlo
            const logoHolder = safeQuerySelector(".head-logo_holder");
            if (logoHolder) {
              logoShrinkTimeline.fromTo(
                logoHolder,
                { width: "4.5625rem" },
                { width: "3.125rem", ease: "linear" }
              );
            }
          } else {
            // Para pantallas móviles
            const logoShrinkMobTimeline = gsap.timeline({
              paused: true,
              scrollTrigger: {
                trigger: "[logo-start-mob]",
                start: "top top",
                end: "+=500",
                scrub: true,
              },
            });

            // Validamos si el elemento existe antes de manipularlo
            const logoHolderMob = safeQuerySelector(".head-logo_holder");
            if (logoHolderMob) {
              logoShrinkMobTimeline.fromTo(
                logoHolderMob,
                { width: "4rem" },
                { width: "3rem", ease: "linear" }
              );
            }
          }
        };

        // Agregamos un solo listener y manejamos la lógica internamente
        mm.addEventListener("change", handleResize);

        // Ejecutamos la función inicialmente en caso de que ya esté en el tamaño adecuado
        handleResize();
      };

      logoShrink();


      //Home Page
      const homeScripts = (): void => {
        // Abrir el popup del video
        const openVideoPopup = gsap.timeline({
          paused: true,
          onComplete: () => {
            const video = safeQuerySelector(
              "#sp-vid"
            ) as HTMLVideoElement | null;
            if (video) {
              video.play();
            }
          },
        });

        const videoPopup = safeQuerySelector(
          ".video-popup"
        ) as HTMLElement | null;
        if (videoPopup) {
          openVideoPopup.set(videoPopup, { display: "flex" });
        }

        openVideoPopup.fromTo(
          videoPopup,
          { opacity: 0 },
          { opacity: 1, duration: stdDuration, ease: "primary-ease" }
        );

        const videoHolder = safeQuerySelector(
          ".video-holder"
        ) as HTMLElement | null;
        if (videoHolder) {
          openVideoPopup.fromTo(
            videoHolder,
            {
              opacity: 0,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            },
            {
              opacity: 1,
              clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
              duration: stdDuration,
              ease: "primary-ease",
            },
            "<"
          );
        }

        const videoClose = safeQuerySelector(
          ".video-close"
        ) as HTMLElement | null;
        if (videoClose) {
          openVideoPopup.fromTo(
            videoClose,
            { opacity: 0 },
            { opacity: 1, duration: stdDuration, ease: "primary-ease" },
            "<"
          );
        }

        // Cerrar el popup del video
        const closeVideoPopup = gsap.timeline({
          paused: true,
        });

        closeVideoPopup.to(".video-close", {
          opacity: 0,
          duration: stdDuration,
          ease: "primary-ease",
        });

        closeVideoPopup.to(
          videoHolder,
          {
            opacity: 0,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: stdDuration,
            ease: "primary-ease",
          },
          "<"
        );

        closeVideoPopup.to(videoPopup, {
          opacity: 0,
        });

        if (videoPopup) {
          closeVideoPopup.set(videoPopup, { display: "none" });
        }

        // Eventos de control del video
        const videoPlayButton = safeQuerySelector(
          ".video-play"
        ) as HTMLElement | null;
        if (videoPlayButton) {
          videoPlayButton.addEventListener("click", () => {
            openVideoPopup.restart();
            const video = safeQuerySelector(
              "#sp-vid"
            ) as HTMLVideoElement | null;
            if (video) {
              video.currentTime = 0;
              video.play();
            }
          });
        }

        const videoCloseButton = safeQuerySelector(
          ".video-close"
        ) as HTMLElement | null;
        if (videoCloseButton) {
          videoCloseButton.addEventListener("click", () => {
            closeVideoPopup.restart();
            const video = safeQuerySelector(
              "#sp-vid"
            ) as HTMLVideoElement | null;
            if (video) {
              video.pause();
            }
          });
        }

        // Media query para pantallas grandes (768px o más)
        mm.add("(min-width: 768px)", () => {
          const showPlay = gsap.timeline({
            paused: true,
          });

          const videoPlay = safeQuerySelector(
            ".video-play"
          ) as HTMLElement | null;

          const videoPlayText = safeQuerySelector(
            ".video-play_text"
          ) as HTMLElement | null;

          if (videoPlay) {
            showPlay.to(videoPlay, {
              backgroundColor: "transparent",
              duration: 0.3,
              ease: "power2.inOut",
            });

            if (videoPlayText) {
              showPlay.to(
                videoPlayText,
                {
                  yPercent: -100,
                  duration: 0.3,
                  ease: "power2.inOut",
                },
                "<"
              );
            }

            // Evento mouseenter y mouseleave para hover sobre el botón de video
            videoPlay.addEventListener("mouseenter", () => {
              showPlay.play();
              const overlay = safeQuerySelector(
                ".home-hero_overlay_darken"
              ) as HTMLElement | null;
              if (overlay) {
                overlay.classList.add("cover");
              }
            });

            videoPlay.addEventListener("mouseleave", () => {
              showPlay.reverse();
              const overlay = safeQuerySelector(
                ".home-hero_overlay_darken"
              ) as HTMLElement | null;
              if (overlay) {
                overlay.classList.remove("cover");
              }
            });
          }

          const homeIntroScroll = gsap.timeline({
            scrollTrigger: {
              trigger: ".home-hero_overlay_wrap",
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          });

          homeIntroScroll.to(".home-hero_spacer", {
            height: "0px",
            ease: "linear",
          });

          const homeVideoActivate = gsap.timeline({
            scrollTrigger: {
              trigger: ".home-hero_overlay",
              start: "top center",
              end: "bottom bottom",
              scrub: true,
              onEnter: () => {
                const videoComponent = safeQuerySelector(
                  ".video-component"
                ) as HTMLElement | null;
                if (videoComponent) {
                  videoComponent.classList.add("clickable");
                }
              },
              onLeaveBack: () => {
                const videoComponent = safeQuerySelector(
                  ".video-component"
                ) as HTMLElement | null;
                if (videoComponent) {
                  videoComponent.classList.remove("clickable");
                }
              },
            },
          });

          homeVideoActivate.fromTo(
            videoPlay,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              ease: "linear",
            }
          );

          homeVideoActivate.from(
            videoPlayText,
            {
              opacity: 0,
              duration: 0.1,
              ease: "power2.inOut",
              clearProps: "all",
            },
            "<"
          );

          const fadeGrid = gsap.timeline({
            scrollTrigger: {
              trigger: "[grid-fade_trigger]",
              start: "top bottom",
              end: "top 40%",
              scrub: true,
              onEnter: () => {
                document
                  .querySelectorAll(".image-grid_item")
                  .forEach((item) => item.classList.add("inactive"));
              },
              onLeaveBack: () => {
                document
                  .querySelectorAll(".image-grid_item")
                  .forEach((item) => item.classList.remove("inactive"));
              },
            },
          });

          fadeGrid.to(".text-logo_holder, .floating-title_holder", {
            opacity: 0,
            duration: 0.4,
            ease: "power1.out",
          });

          fadeGrid.fromTo(
            safeQuerySelectorAll(".image-grid_item"),
            {
              opacity: 1,
              filter: "grayscale(0)",
            },
            {
              opacity: 0.2,
              filter: "grayscale(1)",
              ease: "linear",
            },
            "<"
          );

          const floatingProductTitle = gsap.timeline({
            scrollTrigger: {
              trigger: ".home-intro_layout",
              start: "bottom 50%",
              end: "bottom 10%",
              scrub: true,
            },
          });

          floatingProductTitle.to(".floating-title_holder", {
            opacity: 1,
            duration: 0.4,
            ease: "power1.out",
          });
        }); // END MM

        // Media query para pantallas móviles (menos de 768px)
        mm.add("(max-width: 767px)", () => {
          gsap.timeline({
            scrollTrigger: {
              trigger: ".home-intro_section",
              start: "top top",
              onEnter: () => {
                document.querySelector(".mobile-text_logo")?.classList.add("show-logo");
              },
              onLeave: () => {
                document.querySelector(".mobile-text_logo")?.classList.remove("show-logo");
              },
              onEnterBack: () => {
                document.querySelector(".mobile-text_logo")?.classList.add("show-logo");
              },
              onLeaveBack: () => {
                document.querySelector(".mobile-text_logo")?.classList.remove("show-logo");
              },
            },
          });

          // Segundo ScrollTrigger para [hidemob-logo]
          gsap.timeline({
            scrollTrigger: {
              trigger: "[hidemob-logo]",
              start: "top 180%",
              onEnter: () => {
                document.querySelector(".mobile-text_logo")?.classList.remove("show-logo");
              },
              onLeaveBack: () => {
                document.querySelector(".mobile-text_logo")?.classList.add("show-logo");
              },
            },
          });
        });

        const photoGridSections = gsap.utils.toArray(".photo-grid_section") as HTMLElement[];

        if (photoGridSections) {
          photoGridSections.forEach(function (item) {
            const gridItems = item.querySelectorAll(".image-grid_item");

            const gridEase = gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "top 50%",
                endTrigger: ".grid-end_trigger",
                scrub: true,
              },
            });

            gridEase.fromTo(
              gridItems,
              {
                marginTop: "100%",
              },
              {
                marginTop: "0%",
                stagger: {
                  each: 0.1,
                  from: "random",
                  ease: "none",
                },
                ease: "power2.out",
              }
            );
          });
        }

        const imageGridItems = gsap.utils.toArray(".image-grid_item") as HTMLElement[];

        imageGridItems.forEach(function (item) {
          // const imgNumber = item.querySelector(".grid-img_number");
          const activeItem = item;
          const projectName = item.getAttribute("main-title");
          const projectTitle = item.getAttribute("work-title");
          const projectCopy = item.getAttribute("work-copy");

          const allImageGridItems = document.querySelectorAll(".image-grid_item");
          const overlay = item.querySelector(".image-item_overlay");
          const imageGridTitle = safeQuerySelector("[image-grid_title]");
          const imageGridCopy = safeQuerySelector("[image-grid_copy]");
          const imageGridInfoHolder = safeQuerySelector('.image-grid-info_holder');
          const logoText = safeQuerySelectorAll(".logo-text");

          if (
            !!overlay &&
            !!imageGridTitle &&
            !!imageGridCopy &&
            !!imageGridInfoHolder &&
            !!logoText
          ) {
            // Evento mouseenter
            overlay.addEventListener("mouseenter", function () {
              activeItem?.classList.add("highlight");
              imageGridInfoHolder?.classList.add("show");
              imageGridTitle.textContent = projectTitle || "";
              logoText.forEach(item => item.textContent = projectName || "")
              imageGridCopy.textContent = projectCopy || "";
              allImageGridItems.forEach((el) => el !== activeItem && el.classList.add("fadeout"));
            });

            // Evento mouseleave
            overlay.addEventListener("mouseleave", function () {
              console.log("mouseleave", activeItem)
              logoText.forEach(item => item.textContent = company?.name || "")
              imageGridInfoHolder?.classList.remove("show");
              allImageGridItems.forEach((el) => el !== activeItem && el.classList.remove("fadeout"));
              activeItem?.classList.remove("highlight");
            });
          }
        });


        //FOOTER IMAGE HOVER TIMELINE
        const footerInfoBlocks = document.querySelectorAll(".desktop-flex .home-footer-info_block");
        const footerImgHolders = document.querySelectorAll(".footer-img_holder");
        const contactHoverComponent = document.querySelector(".contact-hover_component");

        footerInfoBlocks.forEach((block, index) => {
          const footerImg = footerImgHolders[index]?.querySelector(".img-fill");

          if (!footerImg) return;

          // Timeline ON
          const footerImgOn = gsap.timeline({ paused: true });
          footerImgOn.fromTo(
            footerImg,
            {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            },
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              duration: stdDuration,
              ease: "primary-ease",
            }
          );
          footerImgOn.fromTo(
            footerImg,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: stdDuration,
              ease: "primary-ease",
            },
            "<"
          );

          // Timeline OFF
          const footerImgOff = gsap.timeline({ paused: true });
          footerImgOff.to(footerImg, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: stdDuration,
            ease: "primary-ease",
          });
          footerImgOff.to(
            footerImg,
            {
              opacity: 0,
              duration: stdDuration,
              ease: "primary-ease",
            },
            "<"
          );

          // Hover listeners
          block.addEventListener("mouseenter", () => {
            block.classList.add("show");
            footerImgOn.restart();
            contactHoverComponent?.classList.add("show");
            imageGridItems.forEach(el => el.classList.add("extra-fade"));
          });

          block.addEventListener("mouseleave", () => {
            footerImgOff.restart();
            contactHoverComponent?.classList.remove("show");
            imageGridItems.forEach(el => el.classList.remove("extra-fade"));
            block.classList.remove("show");
          });
        });

      };

      //Studio Page
      const studioScripts = (): void => {
        const studioIntroScroll = gsap.timeline({
          scrollTrigger: {
            trigger: ".studio-right_scroll",
            start: "top top",
            end: "top top",
            scrub: true,
            pin: ".studio-intro_left",
            endTrigger: ".areas-section",
          },
        });

        studioIntroScroll.to(".studio-intro_img", {
          yPercent: -20,
          ease: "none",
        });

        gsap.timeline({
          scrollTrigger: {
            trigger: ".studio-right_scroll",
            start: "top top",
            end: "top top",
            scrub: true,
            endTrigger: ".team-section",
            pinSpacing: true,
            pin: ".studio-punch_height",
          },
        });

        safeQuerySelectorAll("[studio-fade-text]").forEach((el) => {
          if (el instanceof HTMLElement) {
            const studioFadeText = gsap.timeline({
              scrollTrigger: {
                trigger: el,
                start: "top center",
                end: "bottom center",
                scrub: true,
              },
            });
            studioFadeText.to(el, {
              opacity: 1,
              ease: "none",
            });
          }
        });

        // WHITE LOGO CLIP
        mm.add("(min-width: 768px)", () => {
          const logoClip = gsap.timeline({
            scrollTrigger: {
              trigger: ".white-logo-clip_trigger",
              start: "top top",
              end: "bottom +26px",
              scrub: true,
            },
          });

          const headLogoWhite = safeQuerySelector(".head-logo-white");
          const headLogo = safeQuerySelector(".head-logo");
          if (headLogoWhite && headLogo) {
            logoClip.fromTo(
              headLogoWhite,
              {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              },
              {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "none",
              }
            );

            logoClip.fromTo(
              headLogo,
              {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              },
              {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                ease: "none",
              },
              0
            );
          }

          const blackLogoClip = gsap.timeline({
            scrollTrigger: {
              trigger: ".approach-section",
              start: "top 10%",
              end: "bottom bottom",
              scrub: true,
            },
          });

          const headLogoHolder = safeQuerySelector(".head-logo_holder");
          if (headLogoHolder) {
            blackLogoClip.fromTo(
              headLogoHolder,
              { opacity: 1 },
              { opacity: 0, ease: "none" }
            );
          }
        });

        mm.add("(max-width: 767px)", () => {
          const logoClip = gsap.timeline({
            scrollTrigger: {
              trigger: ".white-logo-clip_trigger",
              start: "top top",
              end: "bottom +26px",
              scrub: true,
            },
          });

          const headLogoWhite = safeQuerySelector(".head-logo-white");
          const headLogo = safeQuerySelector(".head-logo");
          if (headLogoWhite && headLogo) {
            logoClip.fromTo(
              headLogoWhite,
              {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              },
              {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "none",
              }
            );

            logoClip.fromTo(
              headLogo,
              {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              },
              {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                ease: "none",
              },
              0
            );
          }

          const blackLogoClip = gsap.timeline({
            scrollTrigger: {
              trigger: ".global-footer",
              start: "top 50%",
              end: "top 20%",
              scrub: true,
            },
          });

          const headLogoHolder = safeQuerySelector(".head-logo_holder");
          if (headLogoHolder) {
            blackLogoClip.fromTo(
              headLogoHolder,
              { opacity: 1 },
              { opacity: 0, ease: "none" }
            );
          }
        });

        // END BLACK LOGO CLIP
        const teamMembers = safeQuerySelectorAll("[team-sync] [team-item='team-member']")

        teamMembers
          .forEach((element) => {
            if (element instanceof HTMLElement) {
              element.addEventListener("mouseenter", () => {
                const parent = element.parentNode;
                if (parent instanceof Element) {
                  const index = Array.from(parent.children).indexOf(element);

                  const teamSyncElements = safeQuerySelectorAll("[team-sync]")

                  teamSyncElements
                    .forEach((syncElement) => {
                      const teamItems = syncElement.querySelectorAll("[team-item='team-member']");

                      if (teamItems[index]) {
                        teamItems[index].classList.add("team-hovered");
                      }
                    });
                }
              });

              element.addEventListener("mouseleave", () => {
                document
                  .querySelectorAll("[team-sync] [team-item='team-member']")
                  .forEach((item) => {
                    item.classList.remove("team-hovered");
                  });
              });
            }
          });


        // Team Pin
        const teamMarker = document
          .querySelector(".team-list_holder")
          ?.getBoundingClientRect().height;

        if (teamMarker) {
          gsap.timeline({
            scrollTrigger: {
              trigger: ".team-list_holder",
              endTrigger: ".team-col_item:last-child",
              start: "top top",
              end: "bottom " + teamMarker,
              scrub: true,
              pinSpacing: false,
              pin: ".team-list",
            },
          });
        }

        // TEAM FLIP
        const openContactModal = gsap.timeline({
          paused: true,
          defaults: {
            duration: 0.6,
            ease: "power2.inOut",
          },
        });
        openContactModal.set(".contact-popup", {
          pointerEvents: "auto",
          opacity: 1,
        });

        openContactModal.fromTo(
          ".contact-popup_content",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "linear",
          },
          "<"
        );

        // CLOSE TEAM POPUP
        const closeContactModal = gsap.timeline({
          onComplete: () => {
            document.body.classList.remove("popup-open");
          },
          paused: true,
          defaults: {
            duration: 0.6,
            ease: "power2.inOut",
          },
        });

        closeContactModal.set(".contact-popup", { pointerEvents: "none" });

        closeContactModal.to(".contact-popup_content", {
          opacity: 0,
          duration: 0.4,
          ease: "linear",
        });

        closeContactModal.to(".contact-popup", { opacity: 0 });

        // Open Popup
        const joinBtn = safeQuerySelector(".join-btn");
        if (joinBtn instanceof HTMLElement) {
          joinBtn.addEventListener("click", () => {
            lenis.stop();
            document.body.classList.add("popup-open");
            openContactModal.restart();
          });
        }

        // Close Popup
        const closeContactBtn = safeQuerySelector(".close-contact");
        if (closeContactBtn instanceof HTMLElement) {
          closeContactBtn.addEventListener("click", () => {
            lenis.start();
            closeContactModal.restart();
          });
        }

        document
          .querySelector(".explore-btn")
          ?.addEventListener("click", () => {
            lenis.start();
            closeContactModal.restart();
          });

        safeQuerySelector(".submit-btn")?.addEventListener("click", () => {
          safeQuerySelector(".form-submit")?.click();
        });

        // Pin Studio Areas
        mm.add("(min-width: 768px)", () => {
          gsap.timeline({
            scrollTrigger: {
              trigger: ".areas-section",
              start: "top top",
              end: "bottom top",
              endTrigger: ".areas-nav_holder",
              scrub: true,
            },
          });

          document.querySelectorAll("[areas-sync] [area-item]").forEach((areaItem) => {
            if (areaItem instanceof HTMLElement) {
              areaItem.addEventListener("mouseenter", () => {
                document.querySelector(".areas-empty")?.classList.add("inactive");

                if (areaItem.parentNode instanceof Element) {
                  const index = Array.from(areaItem.parentNode.children).indexOf(areaItem);

                  document.querySelectorAll("[areas-sync]").forEach((syncElement) => {
                    const syncItems = syncElement.querySelectorAll("[area-item]");
                    if (syncItems[index]) {
                      syncItems[index].classList.add("active");
                    }
                  });
                }

                document.querySelector(".areas-nav_list")?.classList.add("fade");
              });

              areaItem.addEventListener("mouseleave", () => {
                document.querySelectorAll("[areas-sync] [area-item]").forEach((item) => {
                  item.classList.remove("active");
                });
                document.querySelector(".areas-empty")?.classList.remove("inactive");
                document.querySelector(".areas-nav_list")?.classList.remove("fade");
              });
            }
          });


          const approachPin = gsap.timeline({
            scrollTrigger: {
              trigger: ".approach-copy_holder",
              start: "top bottom",
              end: "bottom bottom",
              endTrigger: ".global-footer",
              scrub: true,
            },
          });

          approachPin.to(".approach-img_list", {
            yPercent: -50,
            ease: "none",
          });
        });

        mm.add("(max-width: 767px)", () => {
          document
            .querySelectorAll(".areas-sticky_item-mob")
            .forEach((item, index) => {
              const relatedArea = document
                .querySelector(".areas-nav_mobile")
                ?.querySelectorAll(".areas-nav_item")[index];
              gsap.timeline({
                scrollTrigger: {
                  trigger: item,
                  start: "top bottom",
                  end: "bottom bottom",
                  onEnter: () => {
                    relatedArea?.classList.add("active");
                  },
                  onLeave: () => {
                    relatedArea?.classList.remove("active");
                  },
                  onEnterBack: () => {
                    relatedArea?.classList.add("active");
                  },
                  onLeaveBack: () => {
                    relatedArea?.classList.remove("active");
                  },
                },
              });
            });
        });
      };

      //Single Work Page
      const singleWorkScripts = () => {
        // Validación de media query para asegurar que la lógica se ejecuta en dispositivos con un tamaño mínimo de 768px
        if (window.matchMedia("(min-width: 768px)").matches) {
          gsap.timeline({
            scrollTrigger: {
              trigger: ".single-layout",
              start: "top top",
              end: "bottom bottom-=16",
              scrub: true,
            },
          });

          // Timeline para mostrar más información
          const moreInfo = gsap.timeline({ paused: true });

          moreInfo.fromTo(
            "[single-info]",
            { yPercent: 100 },
            { yPercent: 0, ease: "power3.out", duration: 1 }
          );

          moreInfo.fromTo(
            ".single-info_top",
            { height: "50%" },
            { height: "auto", ease: "power3.out", duration: 1 },
            "<"
          );

          moreInfo.fromTo(
            ".single-more_info-rich",
            { opacity: 0 },
            { opacity: 1, ease: "power3.in", duration: 0.8 },
            "<"
          );

          moreInfo.to(
            ".read-more_btn",
            { yPercent: -100, opacity: 0, ease: "power1.out", duration: 0.6 },
            0
          );

          moreInfo.to(
            ".close-more_btn",
            { yPercent: -100, opacity: 1, ease: "power1.out", duration: 0.6 },
            0
          );

          // Validación de botones de "leer más" y "cerrar"
          const readMoreBtn = safeQuerySelector(".read-more_btn");
          const closeMoreBtn = safeQuerySelector(".close-more_btn");

          if (readMoreBtn && closeMoreBtn) {
            readMoreBtn.addEventListener("click", () => {
              moreInfo.restart();
            });

            closeMoreBtn.addEventListener("click", () => {
              closeInfo.restart();
            });
          }

          const closeInfo = gsap.timeline({ paused: true });

          closeInfo.to(".single-more_info-rich", {
            opacity: 0,
            ease: "power3.out",
            duration: 0.4,
          });

          closeInfo.to(
            "[single-info]",
            { yPercent: 100, ease: "power3.out", duration: 1 },
            "<"
          );

          closeInfo.to(
            ".single-info_top",
            { height: "50%", ease: "power3.out", duration: 1 },
            "<"
          );

          closeInfo.to(
            ".read-more_btn",
            { yPercent: 0, opacity: 1, ease: "power1.out", duration: 0.6 },
            0
          );

          closeInfo.to(
            ".close-more_btn",
            { yPercent: 100, opacity: 0, ease: "power1.out", duration: 0.6 },
            0
          );

          // Validación y animación para la sección de "next"
          const singleFade = gsap.timeline({
            paused: true,
            scrollTrigger: {
              trigger: ".single-next_section",
              start: "top 80%",
              end: "top 20%",
              scrub: true,
            },
          });

          singleFade.to(".single-layout", { opacity: 0.2, ease: "linear" });

          singleFade.to(
            ".work-page_title, .head-logo_holder",
            { opacity: 0, ease: "linear" },
            "<"
          );

          const singleShowAll = gsap.timeline({ paused: true });

          singleShowAll.to("[hover-fade]", {
            opacity: 0.2,
            ease: "power2.out",
            duration: 0.4,
          });

          singleShowAll.fromTo(
            ".case-studies_overlay",
            { opacity: 0 },
            { opacity: 1, ease: "power2.out", duration: 0.4 },
            "<"
          );

          const allBtnFlex = safeQuerySelector(".all-btn_flex");

          if (allBtnFlex) {
            allBtnFlex.addEventListener("mouseenter", () => {
              singleShowAll.restart();
            });

            allBtnFlex.addEventListener("mouseleave", () => {
              singleShowAll.reverse();
            });
          }

          const singleShowNext = gsap.timeline({ paused: true });

          singleShowNext.to("[hover-fade]", {
            opacity: 0.2,
            ease: "power1.out",
            duration: 0.4,
          });

          const nextProjComponent = safeQuerySelector(".next-proj_component");

          if (nextProjComponent) {
            nextProjComponent.addEventListener("mouseenter", function (this: HTMLElement) {
              safeQuerySelector(".page-wrapper")?.classList.add("above");
              this.classList.add("flip");
              safeQuerySelector(".next-hover_component")?.classList.add("show");
              singleShowNext.restart();
            });


            nextProjComponent.addEventListener("mouseleave", function (this: HTMLElement) {
              safeQuerySelector(".page-wrapper")?.classList.remove("above");
              this.classList.remove("flip");
              safeQuerySelector(".next-hover_component")?.classList.remove("show");
              singleShowNext.reverse();
            });
          }
        } // End of MM media query check for (min-width: 768px)

        // Validaciones para dispositivos con tamaño máximo de 767px
        if (window.matchMedia("(max-width: 767px)").matches) {
          gsap.timeline({
            scrollTrigger: {
              trigger: ".single-next_section",
              start: "top center",
              end: "bottom top",
              toggleClass: {
                targets: ".single-info_btn",
                className: "hide-info_btn",
              },
            },
          });

          const mobileInfo = gsap.timeline({
            paused: true,
            onStart: () => {
              const mobileSingleInfo = safeQuerySelector(".mobile-single_info");
              if (mobileSingleInfo) {
                mobileSingleInfo.scrollTop = 0;
              }
            },
          });

          mobileInfo.set(".mobile-single_info", { display: "flex" });

          mobileInfo.to(".mobile-single_info", {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            duration: 1.2,
            opacity: 1,
            ease: "expo.out",
          });

          mobileInfo.fromTo(
            "[msingle]",
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: "power1.out" },
            "0.6"
          );

          const closeMobileInfo = gsap.timeline({ paused: true });

          closeMobileInfo.to("[msingle]", {
            opacity: 0,
            duration: 0.6,
            ease: "expo.out",
          });

          closeMobileInfo.to(
            ".mobile-single_info",
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              duration: 1.2,
              ease: "expo.out",
            },
            0.6
          );

          closeMobileInfo.set(".mobile-single_info", { display: "none" });

          const singleInfoBtn = safeQuerySelector(".single-info_btn");

          const closeSingleInfoBtn = safeQuerySelector(
            ".close-single-info_btn"
          );

          if (singleInfoBtn && closeSingleInfoBtn) {
            singleInfoBtn.addEventListener("click", () => {
              mobileInfo.restart();
            });

            closeSingleInfoBtn.addEventListener("click", () => {
              closeMobileInfo.restart();
            });
          }

          const blackLogoClip = gsap.timeline({
            scrollTrigger: {
              trigger: ".home-footer_component",
              start: "top 50%",
              end: "top 20%",
              scrub: true,
            },
          });

          blackLogoClip.fromTo(
            safeQuerySelector(".head-logo_holder"),
            { opacity: 1 },
            { opacity: 0, ease: "none" }
          );
        } // End of MM media query check for (max-width: 767px)
      };

      //Works Page
      const workScripts = () => {
        const itemCount = safeQuerySelectorAll(".inf-work_item").length;
        const totalTextContent = safeQuerySelector(".case-studies_total");

        if (totalTextContent) {
          totalTextContent.textContent = itemCount.toString();
        }

        mm.add("(min-width: 768px)", () => {
          const $menu = safeQuerySelector(".inf-work_list") as HTMLElement;
          const $scroller = safeQuerySelector(".work-layout") as HTMLElement;
          const $allItems = safeQuerySelectorAll(".inf-work_item") as NodeListOf<HTMLElement>;
          const $items = safeQuerySelectorAll(".inf-work_item:nth-child(2n + 1)") as NodeListOf<HTMLElement>;
          const $items2 = safeQuerySelectorAll(".inf-work_item:nth-child(2n + 2)") as NodeListOf<HTMLElement>;

          if (!$menu || !$scroller || !$allItems.length) return; // Validación para asegurar que los elementos existen

          let menuHeight = $menu.clientHeight;
          let itemHeight = $allItems[0].clientHeight;
          let wrapHeight = ($allItems.length / 2) * itemHeight;

          let scrollSpeed = 0;
          let oldScrollY = 0;
          let scrollY = 0;
          let y = 0;
          let y2 = 0;

          const lerp = (v0: number, v1: number, t: number) => {
            return v0 * (1 - t) + v1 * t;
          };

          const dispose = (scroll: number, items: NodeListOf<HTMLElement>) => {
            gsap.set(items, {
              y: (i) => {
                return i * itemHeight + scroll;
              },
              modifiers: {
                y: (y, target) => {
                  const s = gsap.utils.wrap(
                    -itemHeight,
                    wrapHeight - itemHeight,
                    parseInt(y)
                  );
                  return `${s}px`;
                },
              },
            });
          };

          dispose(0, $items);
          dispose(0, $items2);

          const handleMouseWheel = (e: WheelEvent) => {
            scrollY -= e.deltaY;
          };

          $scroller.addEventListener("wheel", handleMouseWheel);

          let resizeTimeout: NodeJS.Timeout;

          window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
              const updateMenuHeight = () => {
                menuHeight = $menu.clientHeight;
                itemHeight = $allItems[0].clientHeight;
                wrapHeight = ($allItems.length / 2) * itemHeight;
              };
              updateMenuHeight();
            }, 0);
          });

          const render = () => {
            // requestAnimationFrame(render);
            // y = lerp(y, scrollY, 0.09);
            // y2 = lerp(y2, scrollY, 0.08);
            // dispose(y, $items);
            // dispose(y2, $items2);
            // scrollSpeed = y - oldScrollY;
            // oldScrollY = y;

            // requestAnimationFrame(render);

            requestAnimationFrame(render);

            y = lerp(y, scrollY, 0.09);
            y2 = lerp(y2, scrollY, 0.08);

            dispose(y, $items);
            dispose(y2, $items2);

            scrollSpeed = y - oldScrollY;
            oldScrollY = y;
          };

          render();

          // Work Grid Hover
          safeQuerySelectorAll("[inf-item]").forEach(function (item: HTMLElement) {
            // const imgNumber = item.querySelector(".work-number_text");
            const projectName = item.getAttribute("main-title");
            // const projectLogo = item.getAttribute("main-title"); // igual que projectName
            const activeItem = item;
            const projectTitle = item.getAttribute("work-title");
            const projectCopy = item.getAttribute("work-copy");
            // const catColor = item.querySelector(".category-color")?.textContent || "";

            const inactiveItems = Array.from(document.querySelectorAll("[inf-item]")).filter(
              (el) => el !== activeItem
            );


            item.addEventListener("mouseenter", function () {
              this.classList.add("highlight");
              document.body.classList.add("fade-items");
              safeQuerySelector(".text-logo_holder")?.classList.add("flip");
              safeQuerySelector(".image-grid-info_holder")?.classList.add("show");

              const imageGridTitle = safeQuerySelector("[image-grid_title]");
              const imageGridCopy = safeQuerySelector("[image-grid_copy]");
              const logoReveal = safeQuerySelector(".logo-reveal");

              if (imageGridTitle) { imageGridTitle.textContent = projectTitle; }
              if (imageGridCopy) { imageGridCopy.textContent = projectCopy; }
              if (logoReveal) { logoReveal.textContent = projectName; }

              inactiveItems.forEach((el) => el.classList.add("fadeout"));
            });

            item.addEventListener("mouseleave", function () {
              this.classList.remove("highlight");
              document.body.classList.remove("fade-items");
              safeQuerySelector(".text-logo_holder")?.classList.remove("flip");
              safeQuerySelector(".image-grid-info_holder")?.classList.remove("show");

              inactiveItems.forEach((el) => el.classList.remove("fadeout"));
            });
          });


          // Work grid toggle
          safeQuerySelectorAll(".toggle-cat_item").forEach((item: HTMLElement) => {
            const logoUrl = item
              .querySelector(".category-img")
              ?.getAttribute("src");
            // const catColor = item.getAttribute("hover-color") || "#000000";

            item.addEventListener("mouseenter", () => {
              if (logoUrl)
                document
                  .querySelector(".head-logo")
                  ?.setAttribute("src", logoUrl);
            });

            item.addEventListener("mouseleave", () => {
              document
                .querySelector(".head-logo")
                ?.setAttribute(
                  "src",
                  "https://uploads-ssl.webflow.com/66601c7c6b0d48cf88bbe06c/66601c7c6b0d48cf88bbe08f_logo-icon.svg"
                );
            });
          });
        });

        mm.add("(max-width: 767px)", () => {
          safeQuerySelectorAll("[work-2grid]").forEach((item: HTMLElement) => {
            item.addEventListener("click", () => {
              document
                .querySelector(".inf-work_list")
                ?.classList.remove("is-4");
              item.classList.add("is-active");
              document
                .querySelector("[work-4grid]")
                ?.classList.remove("is-active");
            });
          });

          safeQuerySelectorAll("[work-4grid]").forEach((item: HTMLElement) => {
            item.addEventListener("click", () => {
              safeQuerySelector(".inf-work_list")?.classList.add("is-4");
              item.classList.add("is-active");
              document
                .querySelector("[work-2grid]")
                ?.classList.remove("is-active");
            });
          });
        });
      };

      //Archive Page
      const archiveScripts = (): void => {
        mm.add("(min-width: 768px)", () => {
          const $archiveScroller = safeQuerySelector(".page-content");
          const $archive = safeQuerySelector(".archive-grid_component");
          const $archiveItems = safeQuerySelectorAll(".archive-grid_wrap");

          // Validaciones
          if (!$archiveScroller || !$archive || !$archiveItems.length) return;

          let archiveHeight: number = $archive.clientHeight;
          let archiveItemHeight: number = $archiveItems[0].clientHeight;
          let archiveListHeight: number = $archiveItems.length * archiveItemHeight;
          let archiveScrollSpeed: number = 0;
          let archiveOldScrollY: number = 0;
          let archiveScrollY: number = 0;
          let y: number = 0;

          const lerp = (v0: number, v1: number, t: number): number => {
            return v0 * (1 - t) + v1 * t;
          };

          const archiveDispose = (
            scroll: number,
            items: NodeListOf<Element>
          ): void => {
            items.forEach((item, i) => {
              // Aquí calculas el desplazamiento de cada item basado en el índice
              const itemPosition = i * archiveItemHeight + scroll;

              // Usamos gsap.set para aplicar el transform correctamente a cada elemento
              gsap.set(item, {
                y: itemPosition,
                modifiers: {
                  y: (y: string, target: Element): string => {
                    // Envuelves la posición Y para asegurarte que no se desborde
                    const s = gsap.utils.wrap(
                      -archiveItemHeight,
                      archiveListHeight - archiveItemHeight,
                      parseInt(y)
                    );
                    return `${s}px`;
                  },
                },
              });
            });
          };

          archiveDispose(0, $archiveItems);

          $archiveScroller.addEventListener("wheel", (e: Event) => {
            const wheelEvent = e as WheelEvent;
            archiveScrollY -= wheelEvent.deltaY;
          });

          let resizeTimeout: number;

          window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = window.setTimeout(() => {
              const updateArchiveHeight = (): void => {
                archiveHeight = $archive.clientHeight;
                archiveItemHeight = $archiveItems[0].clientHeight;
                archiveListHeight = $archiveItems.length * archiveItemHeight;
              };

              updateArchiveHeight();
            }, 0);
          });

          const render = (): void => {
            requestAnimationFrame(render);
            y = lerp(y, archiveScrollY, 0.09);
            archiveDispose(y, $archiveItems);
            archiveScrollSpeed = y - archiveOldScrollY;
            archiveOldScrollY = y;
          };

          render();

          const archiveItems = document.querySelectorAll("[archive-sync] [archive-item]");
          const titleTopEl = document.querySelector(".fixed-page_title-top");
          const titleBotEl = document.querySelector(".fixed-page_title-bot");
          const archiveImgHolders = document.querySelectorAll(".archive-img_holder");

          archiveItems.forEach((item, index) => {
            const titleTop = item.getAttribute("title-top");
            const titleBot = item.getAttribute("title-bot");

            const imgFill = archiveImgHolders[index]?.querySelector(".img-fill");

            const archiveOn = gsap.timeline({ paused: true });
            const archiveOff = gsap.timeline({ paused: true });

            if (imgFill) {
              archiveOn.fromTo(
                imgFill,
                {
                  clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                },
                {
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  duration: stdDuration,
                  ease: "primary-ease",
                }
              );

              archiveOn.fromTo(
                imgFill,
                {
                  opacity: 0,
                },
                {
                  opacity: 1,
                  duration: stdDuration,
                  ease: "primary-ease",
                },
                "<"
              );

              archiveOff.to(imgFill, {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                duration: stdDuration,
                ease: "primary-ease",
              });

              archiveOff.to(
                imgFill,
                {
                  opacity: 0,
                  duration: stdDuration,
                  ease: "primary-ease",
                },
                "<"
              );
            }

            item.addEventListener("mouseenter", () => {
              item.classList.add("archive-hovered");
              document.body.classList.add("archive-on");
              if (titleTopEl) titleTopEl.textContent = titleTop;
              if (titleBotEl) titleBotEl.textContent = titleBot;
              archiveOn.restart();
            });

            item.addEventListener("mouseleave", () => {
              archiveItems.forEach(el => el.classList.remove("archive-hovered"));
              archiveOff.restart();
              if (titleTopEl) titleTopEl.textContent = "Our Creative";
              if (titleBotEl) titleBotEl.textContent = "Archive";
              document.body.classList.remove("archive-on");
            });
          });

          const openArchivePopup = gsap.timeline({
            paused: true,
            onStart: () => {
              document
                .querySelectorAll("[archive-sync] [archive-item]")
                .forEach((item) => item.classList.remove("archive-hovered"));
            },
          });

          openArchivePopup.set(".archive-preview_component", {
            pointerEvents: "auto",
          });

          openArchivePopup.to(".archive-preview_component", { opacity: 1 });

          openArchivePopup.set(".archive-preview_layout", { opacity: 1 });

          openArchivePopup.fromTo(
            ".archive-preview_overlay",
            { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" },
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              duration: stdDuration,
              ease: "primary-ease",
            }
          );

          openArchivePopup.fromTo(
            ".archive-preview_img-wrap",
            { opacity: 0 },
            {
              opacity: 1,
              duration: stdDuration,
              ease: "primary-ease",
            },
            "<"
          );

          openArchivePopup.fromTo(
            ".archive-video-preview",
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.8,
              ease: "linear",
            },
            "<"
          );

          openArchivePopup.fromTo(
            "[archive-fade]",
            { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
            {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
              duration: 1.2,
              ease: "expo.out",
              delay: 0.4,
            },
            "<"
          );

          openArchivePopup.fromTo(
            "[archive-fade]",
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.8,
              ease: "linear",
            },
            "<"
          );

          const closeArchivePopup = gsap.timeline({
            paused: true,
            onComplete: () => {
              document
                .querySelectorAll("[archive-sync] [archive-item]")
                .forEach((item) =>
                  item.classList.remove("archive-preview_open")
                );
            },
          });

          closeArchivePopup.fromTo(
            ".archive-preview_overlay",
            { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
            {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
              duration: 1.2,
              ease: "expo.out",
            },
            "<"
          );

          closeArchivePopup.to(
            ".archive-preview_img-wrap",
            {
              opacity: 0,
              duration: 0.8,
              ease: "linear",
            },
            "<"
          );

          closeArchivePopup.to(
            "[archive-fade]",
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              duration: 1.2,
              ease: "expo.out",
            },
            "<"
          );

          closeArchivePopup.to(
            "[archive-fade]",
            {
              opacity: 0,
              duration: 0.8,
              ease: "linear",
            },
            "<"
          );

          closeArchivePopup.to(".archive-preview_component", {
            opacity: 0,
            duration: 0.4,
            ease: "linear",
          });

          closeArchivePopup.set(".archive-preview_component", {
            pointerEvents: "none",
          });

          // Seleccionar todos los elementos con el atributo [archive-item] dentro de .archive-grid_list
          document.querySelectorAll('.archive-grid_list [archive-item]').forEach((item, index) => {
            item.addEventListener('click', (event: Event) => {
              //lenis.stop(); // Detener Lenis
              openArchivePopup.restart(); // Reiniciar openArchivePopup

              // Usamos `event.target` para obtener el elemento que disparó el evento
              const clickedItem = event.target as HTMLElement;

              // Obtenemos el índice usando `index`, que ya tenemos al iterar sobre los elementos
              document.querySelectorAll('[archive-sync]').forEach((syncElement) => {
                // Añadimos la clase al elemento correspondiente usando el índice
                syncElement.querySelectorAll('[archive-item]')?.[index]?.classList.add('archive-preview_open');
              });
            });
          });


          // Seleccionar el botón de cierre
          document.querySelectorAll('.archive-close').forEach(function (closeBtn) {
            closeBtn.addEventListener('click', function () {
              //lenis.start(); // Iniciar Lenis
              closeArchivePopup.restart(); // Reiniciar closeArchivePopup
              // Si se necesitara, aquí podrías agregar el código para ocultar el popup
              // document.querySelector('.archive-preview_component').classList.remove('show');
            });
          });
        });
      };

      //News Page
      const newsLinks = safeQuerySelectorAll(
        ".news-item_link"
      ) as NodeListOf<HTMLAnchorElement>;

      newsLinks.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          newsLinks.forEach((otherLink) => {
            if (otherLink !== link) {
              otherLink.classList.add("fadeout");
            }
          });
        });

        link.addEventListener("mouseleave", () => {
          newsLinks.forEach((otherLink) => {
            otherLink.classList.remove("fadeout");
          });
        });
      });

      const news = () => {
        const shareLinks = safeQuerySelectorAll(
          ".news-share_link"
        ) as NodeListOf<HTMLAnchorElement>;
        shareLinks.forEach((shareLink) => {
          shareLink.addEventListener("click", function () {
            const currentUrl: string = window.location.href;
            const tempInput: HTMLInputElement = document.createElement("input");
            document.body.appendChild(tempInput);
            tempInput.value = currentUrl;
            tempInput.select();
            document.execCommand("copy");
            tempInput.remove();
            const bodyCopy: HTMLElement | null =
              this.querySelector(".body-copy");
            if (bodyCopy) {
              bodyCopy.textContent = "copied";
            }
            setTimeout(() => {
              this.classList.add("hide");
            }, 1000);
          });
        });

        if (window.matchMedia("(min-width: 768px)").matches) {
          // Single project fadeout
          const singleFade = gsap.timeline({
            paused: true,
            scrollTrigger: {
              trigger: ".home-footer_layout",
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
            onStart: () => {
              ScrollTrigger.refresh();
            },
          });

          singleFade.to(".single-news", {
            opacity: 0.2,
            ease: "linear",
          });

          singleFade.to(
            ".head-logo_holder",
            {
              opacity: 0,
              ease: "linear",
            },
            "<"
          );

          const singleShowNext = gsap.timeline({
            paused: true,
          });

          singleShowNext.to("[hover-fade]", {
            opacity: 0.2,
            ease: "power1.out",
            duration: 0.4,
          });

          const nextProjComponent = safeQuerySelector(
            ".next-proj_component"
          ) as HTMLElement;
          nextProjComponent.addEventListener("mouseenter", () => {
            nextProjComponent.classList.add("flip");
            safeQuerySelector(".page-wrapper")?.classList.add("above");
            document
              .querySelector(".next-hover_component")
              ?.classList.add("show");
            singleShowNext.restart();
          });

          nextProjComponent.addEventListener("mouseleave", () => {
            safeQuerySelector(".page-wrapper")?.classList.remove("above");
            nextProjComponent.classList.remove("flip");
            document
              .querySelector(".next-hover_component")
              ?.classList.remove("show");
            singleShowNext.reverse();
          });

          const allBtnLayout = safeQuerySelector(".all-btn_layout") as HTMLElement;
          allBtnLayout.addEventListener("mouseenter", () => {
            allBtnLayout.classList.add("flip");
          });

          allBtnLayout.addEventListener("mouseleave", () => {
            allBtnLayout.classList.remove("flip");
          });
        }

        if (window.matchMedia("(max-width: 767px)").matches) {
          const blackLogoClip = gsap.timeline({
            scrollTrigger: {
              trigger: ".home-footer_component",
              start: "top 20%",
              end: "top top",
              scrub: true,
            },
          });

          blackLogoClip.fromTo(
            safeQuerySelector(".head-logo_holder") as HTMLElement,
            {
              opacity: 1,
            },
            {
              opacity: 0,
              ease: "none",
            }
          );
        }

        const newsGalleryComponents = safeQuerySelectorAll(
          ".news-gallery_component"
        ) as NodeListOf<HTMLElement>;

        newsGalleryComponents.forEach((component) => {
          const firstMainItem = component.querySelector(
            ".news-gallery_main-item"
          ) as HTMLElement | null;
          const firstThumbItem = component.querySelector(
            ".news-gallery_thumbs-item"
          ) as HTMLElement | null;

          if (firstMainItem) firstMainItem.classList.add("active");
          if (firstThumbItem) firstThumbItem.classList.add("active");

          const thumbItems = component.querySelectorAll(
            ".news-gallery_thumbs-item"
          ) as NodeListOf<HTMLElement>;

          thumbItems.forEach((thumbItem, index) => {
            thumbItem.addEventListener("click", () => {
              updateActiveClass(index);
            });
          });

          const nextButton = component.querySelector(
            ".news-gallery_next"
          ) as HTMLElement;
          if (nextButton) {
            nextButton.addEventListener("click", () => {
              const currentIndex = Array.from(
                component.querySelectorAll(".news-gallery_thumbs-item")
              ).indexOf(
                component.querySelector(
                  ".news-gallery_thumbs-item.active"
                ) as HTMLElement
              );
              const nextIndex = (currentIndex + 1) % thumbItems.length;
              updateActiveClass(nextIndex);
            });
          }

          const updateActiveClass = (index: number): void => {
            component
              .querySelectorAll(".news-gallery_thumbs-item")
              .forEach((item) => {
                item.classList.remove("active");
              });

            component
              .querySelectorAll(".news-gallery_main-item")
              .forEach((item) => {
                item.classList.remove("active");
              });

            component
              .querySelectorAll(".news-gallery_thumbs-item")
            [index]?.classList.add("active");
            component
              .querySelectorAll(".news-gallery_main-item")
            [index]?.classList.add("active");
          };
        });
      };

      //Team Page
      const teamScripts = () => {
        if (window.matchMedia("(min-width: 768px)").matches) {
          const setRightColumnHeight = (): void => {
            const spaceElement = safeQuerySelector(
              ".team-popup_space"
            ) as HTMLElement | null;
            const rightColumnElement = safeQuerySelector(
              ".team-popup_space-right"
            ) as HTMLElement | null;

            if (spaceElement && rightColumnElement) {
              const spaceHeight: number = spaceElement.offsetHeight;
              rightColumnElement.style.height = `${spaceHeight}px`;
            }
          };

          // Call the function on page load
          setRightColumnHeight();

          // Call the function whenever the window is resized
          window.addEventListener("resize", () => {
            setRightColumnHeight();
          });
        }
      };

      //Area Page
      const areasScripts = () => {
        const items = safeQuerySelectorAll(".areas-work_item");
        const totalElement = safeQuerySelector(".case-studies_total");

        if (totalElement) {
          totalElement.textContent = items.length.toString();
        }

        if (window.matchMedia("(min-width: 768px)").matches) {
          // Work Grid Hover
          document
            .querySelectorAll<HTMLElement>("[inf-item]")
            .forEach((item) => {
              // const imgNumber = item.querySelector(".work-number_text");
              const projectName = item.getAttribute("main-title") ?? "";
              const projectTitle = item.getAttribute("work-title") ?? "";
              const projectCopy = item.getAttribute("work-copy") ?? "";
              // const catColor = item.querySelector(".category-color")?.textContent ?? "";

              const allItems = Array.from(
                safeQuerySelectorAll("[inf-item]")
              );
              const inactiveItems = allItems.filter((i) => i !== item);

              item.addEventListener("mouseenter", () => {
                item.classList.add("highlight");
                document.body.classList.add("fade-items");

                const textLogo = safeQuerySelector(".text-logo_holder");
                const gridInfo = safeQuerySelector(
                  ".image-grid-info_holder"
                );
                const gridTitle = safeQuerySelector("[image-grid_title]");
                const gridCopy = safeQuerySelector("[image-grid_copy]");
                const logoReveal = safeQuerySelector(".logo-reveal");

                if (textLogo) textLogo.classList.add("flip");
                if (gridInfo) gridInfo.classList.add("show");
                if (gridTitle) gridTitle.textContent = projectTitle;
                if (gridCopy) gridCopy.textContent = projectCopy;
                if (logoReveal) logoReveal.textContent = projectName;

                inactiveItems.forEach((inactiveItem) => {
                  inactiveItem.classList.add("fadeout");
                });
              });

              item.addEventListener("mouseleave", () => {
                item.classList.remove("highlight");
                document.body.classList.remove("fade-items");

                const textLogo = safeQuerySelector(".text-logo_holder");
                const gridInfo = safeQuerySelector(
                  ".image-grid-info_holder"
                );

                if (textLogo) textLogo.classList.remove("flip");
                if (gridInfo) gridInfo.classList.remove("show");

                inactiveItems.forEach((inactiveItem) => {
                  inactiveItem.classList.remove("fadeout");
                });
              });
            });

          // Work grid toggle
          document
            .querySelectorAll<HTMLElement>(".toggle-cat_item")
            .forEach((toggleItem) => {
              const categoryImg = toggleItem.querySelector<HTMLImageElement>(".category-img");
              const logoUrl = categoryImg?.getAttribute("src");
              // const hoverColor = toggleItem.getAttribute("hover-color") ?? "#000000";

              toggleItem.addEventListener("mouseenter", () => {
                const logo = safeQuerySelector(".head-logo");
                if (logo && logoUrl) {
                  logo.setAttribute("src", logoUrl);
                }
              });

              toggleItem.addEventListener("mouseleave", () => {
                const logo = safeQuerySelector(".head-logo");
                if (logo) {
                  logo.setAttribute("src", "https://uploads-ssl.webflow.com/66601c7c6b0d48cf88bbe06c/66601c7c6b0d48cf88bbe08f_logo-icon.svg");
                }
              });
            });
        }
      };



      if (safeQuerySelector(".home-page")) {
        homeScripts();
        easterEgg();
      }

      if (safeQuerySelector(".studio-page")) {
        studioScripts();
        logoShrink();
      }

      if (safeQuerySelector("[work-page]")) {
        workScripts();
      }

      if (safeQuerySelector("[single-work-page]")) {
        singleWorkScripts();
        logoShrink();
      }

      if (safeQuerySelector("[archive-page]")) {
        archiveScripts();
      }

      if (safeQuerySelector("[team-page]")) {
        teamScripts();
      }

      if (safeQuerySelector("[single-area-page]")) {
        areasScripts();
      }

      if (safeQuerySelector("[single-news-page]")) {
        news();
        logoShrink();
      }

      if (safeQuerySelector("[news-page]")) {
        news();
        logoShrink();
      }
    };

    // /**
    //  * Menu open/close buttons actions
    //  */
    // if (menuOpenButtonRef.current) {
    //   menuOpenButtonRef.current.onclick = () => menuSlideIn.restart();
    // }

    // if (menuCloseButtonRef.current) {
    //   menuCloseButtonRef.current.onclick = () => menuSlideOut.restart();
    // }

    // /**
    //  * Menu links
    //  */
    // const links = safeQuerySelectorAll(".menu-link");

    // links.forEach((link) => {
    //   link.addEventListener("mouseenter", () => {
    //     links.forEach((l) => l.classList.add("fade"));
    //     link.classList.remove("fade");
    //   });

    //   link.addEventListener("mouseleave", () => {
    //     links.forEach((l) => l.classList.remove("fade"));
    //   });
    // });

    // Pages transition animation with swup
    // const swup = new Swup({
    //   containers: ["#swup"],
    //   animateHistoryBrowsing: true,
    //   // cache: false,
    // });

    const timeout = setTimeout(() => {
      init();
    }, 100); // o 10ms, o 100ms si querés asegurarte



    return () => clearTimeout(timeout);
  }, [lenis]);

  return (
    <AnimationContext.Provider value={contextValue}>
      <Menu />
      <main id="swup" className="page-main">
        {children}
      </main>
      <Preload />
      <Transition />
    </AnimationContext.Provider>
  );
};

export const useAnimation = (): AnimationContextType => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};
