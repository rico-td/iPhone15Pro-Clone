// libaries and hooks
import React from "react";
import { useEffect, useRef, useState } from "react";

// GSAP imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

// components imports
import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

const VideoCarousel = () => {
   const videoRef = useRef([]);
   const videoSpanRef = useRef([]);
   const videoDivRef = useRef([]);

   // set initial state for the video
   const [video, setVideo] = useState({
      isEnd: false,
      startPlay: false,
      videoId: 0,
      isLastVideo: false,
      isPlaying: false,
   });

   // deconstruct the properties of the video object
   // properties are available without using video.isEnd, video.startPlay...
   const [loadedData, setLoadedData] = useState([]);
   const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

   useGSAP(() => {
      // slider animation moves the prevSlide 100% to the left
      gsap.to("#slider", {
         transform: `translateX(${-100 * videoId}%)`,
         duration: 2,
         ease: "power2.inOut",
      });

      gsap.to("#video", {
         scrollTrigger: {
            trigger: "#video",
            toggleActions: "play none none none",
         },
         onComplete: () => {
            setVideo((pre) => ({
               ...pre,
               startPlay: true,
               isPlaying: true,
            }));
         },
      });
   }, [isEnd, videoId]);

   // hook to animate the videos
   useEffect(() => {
      let currentProgress = 0;
      let span = videoSpanRef.current;

      if (span[videoId]) {
         //   animate the video
         let anim = gsap.to(span[videoId], {
            onUpdate: () => {
               // get the progress of the video
               const progress = Math.ceil(anim.progress() * 100);

               if (progress != currentProgress) {
                  currentProgress = progress;

                  // set the width of the progress bar
                  gsap.to(videoDivRef.current[videoId], {
                     width:
                        window.innerWidth < 760
                           ? "10vw" // mobile
                           : window.innerWidth < 1200
                           ? "10vw" // tablet
                           : "4vw", // laptop
                  });

                  // set the background color of the progress bar
                  gsap.to(span[videoId], {
                     width: `${currentProgress}%`,
                     backgroundColor: "white",
                  });
               }
            },
            onComplete: () => {
               if (isPlaying) {
                  gsap.to(videoDivRef.current[videoId], { width: "12px" });
                  gsap.to(span[videoId], {
                     backgroundColor: "#afafaf",
                  });
               }
            },
         });

         if (videoId === 0) {
            anim.restart();
         }

         const animUpdate = () => {
            anim.progress(
               videoRef.current[videoId].currentTime /
                  hightlightsSlides[videoId].videoDuration
            );
         };

         if (isPlaying) {
            gsap.ticker.add(animUpdate);
         } else {
            gsap.ticker.remove(animUpdate);
         }
      }
   }, [videoId, startPlay]);

   // deals with the playing of the video
   useEffect(() => {
      if (loadedData.length > 3) {
         if (!isPlaying) {
            videoRef.current[videoId].pause();
         } else {
            startPlay && videoRef.current[videoId].play();
         }
      }
   }, [startPlay, videoId, isPlaying, loadedData]);

   const handleLoadedMetaData = (i, e) => {
      setLoadedData((pre) => [...pre, e]);
   };

   const handleProcess = (type, i) => {
      switch (type) {
         case "video-end":
            setVideo((pre) => ({
               ...pre,
               isEnd: true,
               videoId: i + 1,
            }));
            break;
         case "video-last":
            setVideo((pre) => ({ ...pre, isLastVideo: true }));
            break;
         case "video-reset":
            setVideo((pre) => ({
               ...pre,
               isLastVideo: false,
               videoId: 0,
            }));
            break;
         case "pause":
            setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
            break;
         case "play":
            setVideo((pre) => ({
               ...pre,
               isPlaying: !pre.isPlaying,
            }));
            break;
         default:
            return video;
      }
   };

   return (
      <>
         <div className="flex items-center h-500px">
            {hightlightsSlides.map((list, i) => (
               <div key={list.id} id="slider" className="sm:pr-20 pr-10 my-10">
                  <div className="video-carousel_container">
                     <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                        <video
                           id="video"
                           playsInline={true}
                           preload="auto"
                           muted={true}
                           ref={(el) => (videoRef.current[i] = el)}
                           onEnded={() =>
                              i !== 3
                                 ? handleProcess("video-end", i)
                                 : handleProcess("video-last", i)
                           }
                           onPlay={() =>
                              setVideo((pre) => ({ ...pre, isPlaying: true }))
                           }
                           onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                        >
                           <source src={list.video} type="video/mp4" />
                        </video>
                     </div>
                     <div className="absolute top-12 left-[5%] z-10">
                        {list.textLists.map((text) => (
                           <p
                              key={text}
                              className="md:text-2xl text-xl font-medium"
                           >
                              {text}
                           </p>
                        ))}
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* progress bar */}
         <div className="relative flex-center mt-10">
            <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
               {videoRef.current.map((_, i) => (
                  <span
                     key={i}
                     ref={(el) => (videoDivRef.current[i] = el)}
                     className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                  >
                     <span
                        className="absolute h-full w-full rounded-full"
                        ref={(el) => (videoSpanRef.current[i] = el)}
                     />
                  </span>
               ))}
            </div>

            <button className="control-btn">
               <img
                  src={
                     isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg
                  }
                  alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
                  onClick={
                     isLastVideo
                        ? () => handleProcess("video-reset")
                        : !isPlaying
                        ? () => handleProcess("play")
                        : () => handleProcess("pause")
                  }
               ></img>
            </button>
         </div>
      </>
   );
};

export default VideoCarousel;
