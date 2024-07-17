import React from 'react'
import { hightlightsSlides } from "../constants";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from '@gsap/react';


const VideoCarousel = () => {

  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false, 
  }); 

  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video

  const [ loadedData, setLoadedData ] = useState([]);  

  useEffect(() => {
    if (loadedData.length > 3) {
      if(!isPlaying) {  
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  
  }, [startPlay, videoId, isPlaying, loadedData])
  

  useEffect(() => {
    const currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => { 

      },

      onComplete: () => {

      },


      });
    }

  }, [videoId, startPlay])


  return (
    <>
      < div className='flex items-center' >
        {hightlightsSlides.map((list, i) => (

          <div key={list.id} id="slider" className='sm:pr-20 pr-10'>
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">

                <video 
                  id='video' 
                  autoPlay 
                  playsInline={true}
                  preload='auto'  
                  muted 
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                     ...prevVideo,
                      isPlaying: true,
                    }))
                  }}
                  >

                  <source src={list.video} type='video/mp4'/>
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text, i) => (
                  <p id='textHighlight' key={i} className='md:text-2xl text-xl font-medium'>
                    {text}
                  </p>
                ))}
              </div>
              
            </div>
          </div>
        ))}
        </div>

        <div className="relative flex-center mt-10">

          <div className="flex-center py-5 px-7 bg-grey-300 backdrop-blur rounded-full"></div>
        </div>

    </>
    
  )
}

export default VideoCarousel
