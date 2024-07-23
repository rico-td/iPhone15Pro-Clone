// GSAP imports
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import { rightImg, watchImg } from "../utils";
import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
   useGSAP(() => {
      const tl = gsap.timeline({
         scrollTrigger: {
            trigger: "#trigger-container",
            start: "top bottom",
            toggleActions: "play none none reset",
         },
      });

      tl.to("#title", { opacity: 1, y: 0, duration: 1 })

         .to(".link", { opacity: 1, y: 0, duration: 1, stagger: 0.15 }, "-=0.5")
         .to("#heading-period", {
            opacity: 0.7,
            duration: 3,
            appendClass: "highlight-period",
         });
   }, []);

   return (
      <div>
         <section
            id="highlights"
            className="w-screen, 
      overflow-hidden h-full common-padding bg-zinc"
         >
            <div id="trigger-container" className="screen-max-with">
               <div className="mb-12 w-full md:flex justify-between items-end">
                  <h1 id="title" className="section-heading">
                     Get the highlights
                     <span id="heading-period" className="highlight-period">
                        .
                     </span>
                  </h1>
                  <div className="flex flex-wrap items-end gap-5 mt-3">
                     <p className="link ">
                        Watch the film&nbsp;
                        <img src={watchImg} alt="watch" className="" />
                     </p>
                     <p className="link">
                        Watch the event&nbsp;
                        <img src={rightImg} alt="right" className="" />
                     </p>
                  </div>
               </div>

               <VideoCarousel />
            </div>
         </section>
      </div>
   );
};

export default Highlights;
