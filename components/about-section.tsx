"use client";

import ScrollAnimatedText from "@/components/animation/scroll-animated-text"
import Image from "next/image"


export function AboutSection() {
    return (
      <section id="about" className="relative h-[95rem] max-1024:h-[90rem] py-20 lg:py-32 max-820:h-[100rem] max-435:h-[120rem]">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              About <span className="gradient-text">Celpius AI</span>
            </h2>
            <ScrollAnimatedText
              text="We're revolutionizing CELPIP preparation with cutting-edge AI technology, helping thousands of students achieve their Canadian immigration dreams through intelligent, personalized learning experiences. Our platform combines advanced artificial intelligence with proven educational methodologies to deliver the most effective CELPIP preparation available."
              className="max-w-3xl mx-auto tracking-[-0.02rem]"
              textClassName="text-[1.5rem] leading-relaxed"
              initialColorClassName="text-slate-300 dark:text-slate-700"
              finalColorClassName="text-slate-900 dark:text-slate-200"
              desktopOffset={["start 0.9", "start 0"]}
              mobileOffset={["start 0.9", "start 0"]}
            />

            <div className="mt-[10rem] max-820:mt-[0]">

             <Image
                src="/about-section/Celpius(emblem logo) dark.png"
                alt="About-section-img"
                width={1920} 
                height={1080} 
                quality={100} 
                className="relative top-[485.5%]"
            />

           {/* About card AI */}

            <Image
                src="/about-section/Circle-joint (dark).png"
                alt="Circle-joint"
                width={100} 
                height={100} 
                quality={100} 
                className="relative rotate-[150deg] translate-y-[-30rem] translate-x-[13.7rem] left-[17.55%] z-30 scale-[0.5] max-1024:translate-y-[-25rem] max-1024:translate-x-[10.7rem] max-1024:scale-[0.35] dark:opacity-100 opacity-0 max-820:hidden"
            />



            <div className="card-outline-about relative overflow-hidden flex items-center max-w-[40%] scale-[0.9] translate-y-[-42rem] translate-x-[1.2rem] z-20 max-1024:scale-[0.6] max-1024:translate-y-[-38.3rem] max-1024:translate-x-[5.2rem] max-820:max-w-[100%] max-820:translate-y-[0] max-820:translate-x-[0] max-820:scale-[1] max-820:my-[2rem]">
              <Image
                src="/about-section/Artificial Intelligence (dark).png"
                alt="Artificial Intelligence"
                width={100} 
                height={100} 
                quality={100} 
                className="absolute left-[3.6rem] z-20 scale-[2.2] h-[auto] dark:opacity-100 opacity-0"
            />

                  <div className="flex flex-col items-start justify-start pl-[12rem] pr-[1rem] py-[2rem] max-w-[100%]">
                      <p className="text-[1.5rem] text-start font-light pb-[0.5rem] dark:text-slate-300 text-slate-700/80">Artificial Intelligence</p>

                      <p className="gradient-font-about text-[0.9rem] text-start">
                        enhance the rapid advancement of your progress with AI.
                      </p>
                  </div>

                <Image
                  src="/about-section/About-card-grid (dark).png"
                  alt="About-Grid"
                  width={100} 
                  height={100} 
                  quality={100} 
                  className="absolute left-[17rem] dark:opacity-30 opacity-0 z-20 scale-[2.6] h-auto max-1024:scale-[1.8] max-1024:left-[14rem]"
                />

            </div>

            {/* About card AI */}




            {/* About card Progress Track */}

            <Image
                src="/about-section/Circle-joint (dark).png"
                alt="Circle-joint"
                width={100} 
                height={100} 
                quality={100} 
                className="relative rotate-[221deg] translate-y-[-51rem] translate-x-[25.7rem] left-[17.55%] dark:opacity-100 opacity-0 z-30 scale-[0.5] max-1024:scale-[0.35] max-1024:translate-y-[-48rem] max-1024:translate-x-[18.7rem] max-820:hidden"
            />

            
                <div className="card-outline-about relative overflow-hidden flex items-center max-w-[40%] scale-[0.9] translate-y-[-63rem] translate-x-[40.6rem] z-20 max-1024:scale-[0.6] max-1024:translate-y-[-60.6rem] max-1024:translate-x-[27.6rem] max-820:max-w-[100%] max-820:translate-y-[0] max-820:translate-x-[0] max-820:scale-[1] max-820:my-[2rem]">

                  <Image
                    src="/about-section/Progress Track (dark).png"
                    alt="Progress Track"
                    width={100} 
                    height={100} 
                    quality={100} 
                    className="absolute left-[3.6rem] dark:opacity-100 opacity-0 z-20 scale-[2.2] h-[auto]"
                  />

                
                      <div className="flex flex-col items-start justify-start pl-[12rem] pr-[1rem] py-[2rem] max-w-[100%]">
                          <p className="text-[1.5rem] text-start font-light pb-[0.5rem] dark:text-slate-300 text-slate-700/80">Progress Track</p>

                          <p className="gradient-font-about text-[0.9rem] text-start">
                            have a convenient follow up of your progress  in all sections.
                          </p>
                      </div>

                    <Image
                      src="/about-section/About-card-grid (dark).png"
                      alt="About-Grid"
                      width={100} 
                      height={100} 
                      quality={100} 
                      className="absolute left-[17rem] dark:opacity-30 opacity-0 z-20 scale-[2.6] h-auto max-1024:scale-[1.8] max-1024:left-[14rem]"
                    />

                </div>
            {/* About card Progress Track */}


            {/* About card Response Analysis */}

            <Image
                src="/about-section/Circle-joint (dark).png"
                alt="Circle-joint"
                width={100} 
                height={100} 
                quality={100} 
                className="relative rotate-[309deg] translate-y-[-56rem] translate-x-[35.3rem] left-[17.55%] dark:opacity-100 opacity-0 z-30 scale-[0.5] max-1024:scale-[0.35] max-1024:translate-y-[-48rem] max-1024:translate-x-[22.3rem] max-1024:rotate-[342deg] max-820:hidden"
            />

            
                <div className="card-outline-about relative overflow-hidden flex items-center max-w-[40%] scale-[0.9] translate-y-[-59.7rem] translate-x-[50.1rem] z-20 max-1024:scale-[0.6] max-1024:translate-y-[-54.1rem] max-1024:translate-x-[31.1rem]  max-1024:max-w-[42%] max-820:max-w-[100%] max-820:translate-y-[0] max-820:translate-x-[0] max-820:scale-[1] max-820:my-[2rem]">
                  <Image
                    src="/about-section/Response Analysis (dark).png"
                    alt="Response Analysis"
                    width={100} 
                    height={100} 
                    quality={100} 
                    className="absolute left-[3.6rem] dark:opacity-100 opacity-0 z-20 scale-[2.2] h-[auto]"
                />
              
                      <div className="flex flex-col items-start justify-start pl-[12rem] pr-[1rem] py-[2rem] max-w-[100%]">
                          <p className="text-[1.5rem] text-start font-light pb-[0.5rem] dark:text-slate-300 text-slate-700/80">Response Analysis</p>

                          <p className="gradient-font-about text-[0.9rem] text-start">
                            your answers are analyzed and feedback is given to help you improve.
                          </p>
                      </div>

                    <Image
                      src="/about-section/About-card-grid (dark).png"
                      alt="About-Grid"
                      width={100} 
                      height={100} 
                      quality={100} 
                      className="absolute left-[17rem] dark:opacity-30 opacity-0 z-20 scale-[2.6] h-auto max-1024:scale-[1.8] max-1024:left-[14rem]"
                    />

                </div>
            {/* About card Response Analysis */}

            
            {/* About card Quality material */}

            <Image
                src="/about-section/Circle-joint (dark).png"
                alt="Circle-joint"
                width={100} 
                height={100} 
                quality={100} 
                className="relative rotate-[82deg] translate-y-[-61rem] translate-x-[11.3rem] left-[17.55%] dark:opacity-100 opacity-0 z-30 scale-[0.5] max-1024:scale-[0.35] max-1024:translate-y-[-66.4rem] max-1024:translate-x-[10.3rem] max-1024:rotate-[70deg] max-820:hidden"
            />

            
                <div className="card-outline-about relative overflow-hidden flex items-center max-w-[40%] scale-[0.9] translate-y-[-64.7rem] translate-x-[-0.9rem] z-20 max-1024:scale-[0.6] max-1024:translate-y-[-72.1rem] max-1024:translate-x-[4.9rem] max-820:max-w-[100%] max-820:translate-y-[0] max-820:translate-x-[0] max-820:scale-[1] max-820:my-[2rem]">
                  <Image
                    src="/about-section/Quality Material (dark).png"
                    alt="Quality Material"
                    width={100} 
                    height={100} 
                    quality={100} 
                    className="absolute left-[3.6rem] dark:opacity-100 opacity-0 z-20 scale-[2.2] h-[auto]"
                  />

                  

                      <div className="flex flex-col items-start justify-start pl-[12rem] pr-[1rem] py-[2rem] max-w-[100%]">
                          <p className="text-[1.5rem] text-start font-light pb-[0.5rem] dark:text-slate-300 text-slate-700/80">Quality material</p>

                          <p className="gradient-font-about text-[0.9rem] text-start">
                            have a learning experience using practice methods & materials that are top notch.
                          </p>
                      </div>

                    <Image
                      src="/about-section/About-card-grid (dark).png"
                      alt="About-Grid"
                      width={100} 
                      height={100} 
                      quality={100} 
                      className="absolute left-[17rem] dark:opacity-30 opacity-0 z-20 scale-[2.6] h-auto max-1024:scale-[1.8] max-1024:left-[14rem]"
                    />
                </div>
            {/* About card Quality Material */}

            </div>

          </div>
        </div>
      </section>
    )
}