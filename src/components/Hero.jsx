import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { heroVideo, smallHeroVideo } from "../utils"
import { useEffect, useState } from "react"

const Hero = () => {

  const [ videoSrc, setVideoSrc ] = useState(window.
    innerWidth < 760 ? smallHeroVideo : heroVideo)

  const handleVideoSourceSet = () => {
    
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo)
    } else {
      setVideoSrc(heroVideo)
    }
  }

  useGSAP(() => {
    gsap.to("#hero", { opacity: 1, delay: 3, duration: 10 })
    gsap.to("#cta", { opacity: 1, duration: 1.5, delay: 0.9, y: -25})
   
  }, [])

  useEffect(() => {
    window.addEventListener("resize", handleVideoSourceSet)

    return () => {
      window.removeEventListener("resize", handleVideoSourceSet)
    }
  }, []) 


  return (
 
      <section className='w-full nav-height bg-black mx-auto' style={{maxWidth: '1920px'}}>
        <div className="h-5/6 w-full flex flex-col justify-start items-center pt-12">
          <p id="hero" className='hero-title'>iPhone 15 Pro</p>
          <div className="md:w-9/12 w-8/12">
            <video className="pointer-events-none" 
            autoPlay muted playsInline={true} key={videoSrc}>
              <source src={videoSrc} type="video/mp4"/>
            </video>
          </div>
          <div id="cta" className="flex flex-col items-center opacity-0">
            <a href="#highlights" className="btn">Buy</a>
            <p className="font-normal text-xl">From $199/month or $999</p>
          </div>
        </div>

      </section>

  )
}

export default Hero
