import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { rightImg, watchImg } from '../utils'
import VideoCarousel from './VideoCarousel'

const Highlights = () => {

  useGSAP(() => {
    gsap.to("#title", {opacity: 1, y: 0, duration: 1});
    gsap.to(".link", {opacity:1, y:0, duration: 1.5,  scrollTrigger: {
      trigger: "#title",
      start: "top 75%", 
      
    }});
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
    </div>
  )
}

export default Highlights
