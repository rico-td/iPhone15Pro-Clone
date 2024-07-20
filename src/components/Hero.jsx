import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo, smallHeroVideo } from "../utils";
import { useEffect, useState } from "react";

const Hero = () => {
   const [videoSrc, setVideoSrc] = useState(
      window.innerWidth < 760 ? smallHeroVideo : heroVideo
   );

   const handleVideoSourceSet = () => {
      if (window.innerWidth < 760) {
         setVideoSrc(smallHeroVideo);
      } else {
         setVideoSrc(heroVideo);
      }
   };

   useGSAP(() => {
      gsap.to("#hero", { opacity: 1, delay: 3, duration: 10 });
      gsap.to("#cta", { opacity: 1, duration: 1.5, delay: 0.9, y: -25 });
   }, []);

   useEffect(() => {
      window.addEventListener("resize", handleVideoSourceSet);

      return () => {
         window.removeEventListener("resize", handleVideoSourceSet);
      };
   }, []);

   return (
      <section
         className="w-full nav-height bg-black mx-auto"
         style={{ maxWidth: "1920px" }}
      >
         <div className="h-full w-full flex flex-col justify-center items-center my-4">
            <p id="hero" className="hero-title">
               iPhone 15 Pro
            </p>
            <div className="md:w-9/12 w-8/12 mb-8">
               <video
                  className="pointer-events-none"
                  autoPlay
                  muted
                  playsInline={true}
                  key={videoSrc}
               >
                  <source src={videoSrc} type="video/mp4" />
               </video>
            </div>
            <div id="cta" className="flex flex-col items-center opacity-0">
               <a href="#highlights" className="btn">
                  Buy
               </a>
               <p className="text-xl text-gray-100 font-normal">
                  From $999 or $41.62/mo. for 24 mo.
               </p>
            </div>
         </div>
      </section>
   );
};

export default Hero;
