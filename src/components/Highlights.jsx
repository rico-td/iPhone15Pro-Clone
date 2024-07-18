import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { rightImg, watchImg } from '../utils'
import VideoCarousel from './VideoCarousel'

import MotionPathPlugin from 'gsap/MotionPathPlugin'


const Highlights = () => {
  
  useGSAP(() => {

    gsap.registerPlugin(MotionPathPlugin);

    gsap.to("#title", {opacity: 1, y: 0, duration: 1}); 
    gsap.to(".link", {opacity:1, y:0, duration: 1.5,  scrollTrigger: {
      trigger: "#title",
      start: "top 75%", 
      
    }});

    // testing animations
    var tl1 = gsap.timeline();  
    tl1
    // .to("#box", {x: 200, duration: 1, delay: 1, ease: "elastic"})
    // .to("#box", {rotate: 360, duration: 10, delay: 1, borderRadius: 100, motionPath: {
    //   path: "M 0 0 L -200 -200 L 200 -200 Z",
    //   align: "center",
    //   alignOrigin: [0.5, 0.5],
    //   autoRotate: 90
    // }})
    // .to("#box", {x: 500, duration: 1, delay: 1, ease: "elastic"})
    // .to("#box", {rotate: 0, duration: 1, delay: 1})
    // .to("#box", {
    //   motionPath: {
    //     path: "#path",
    //     align: "#path",
    //     alignOrigin: [0.5, 0.5],
    //     autoRotate: true,
    //   },
    //   transformOrigin: "50% 50%",
    //   duration: 5,
    //   ease: "power1.inOut",
    // });
  }, [])

  return (

    <div>
      <section id='highlights' className='w-screen, 
      overflow-hidden h-full common-padding bg-zinc'>

        <div className="screen-max-with">

          <div className="mb-12 w-full md:flex justify-between items-end">
            <h1 id='title' className='section-heading'>
              Get highlights.
            </h1>
            <div className="flex flex-wrap items-end gap-5 mt-3">
              <p className="link ">Watch the film&nbsp;
                <img src={watchImg} alt="watch" className=''/>
              </p>
              <p className="link">Watch the event&nbsp;
                <img src={rightImg} alt="right" className=''/>
              </p>
            </div>
          </div>

          <VideoCarousel />
        </div>
      </section>

      {/* <div className='w-full h-[150px] flex justify-start'>
        <div id='box' className='bg-white w-[150px] h-[150px]'></div>
        <path id="path" fill="none" d="M8,102 C15,83 58,25 131,24 206,24 233,63 259,91 292,125 328,155 377,155 464,155 497,97 504,74"/>
      </div> */}
      </div>
  )
}

export default Highlights
