"use client";

import MicrophoneIcon from "./icons/microphone-icon";
import PenIcon from './icons/pen-icon';
import HeadphonesIcon from './icons/headphones-icon';

import { motion} from "framer-motion"
import { fadeIn } from "@/app/variants/variants"
import Image from "next/image"

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 lg:py-32">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            variants={fadeIn('up', 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            Powerful Features for <span className="gradient-text">CELPIP Success</span>
          </motion.h2>
          <motion.p
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Our AI-powered platform provides comprehensive tools to help you excel in all four CELPIP test sections.
          </motion.p>

          <motion.div 
              variants={fadeIn('up', 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.07 }}
              className="">

                <div className="glass-diag-effect p-5 lg:m-28 max-md:w-full max-lg:my-28 max-820:mt-[7rem] ">

                  <Image
                    src="/section-images/flare (horizontal).png"
                    alt="flare"
                    width={500} 
                    height={3500} 
                    quality={100} 
                    className="absolute top-[-7.5%] xl:left-[24.55%] lg:left-[17.55%] dark:opacity-100 opacity-0 max-408:dark:opacity-0 z-20 max-w-none max-h-none xl:scale-[2.15] lg:scale-[1.4] max-820:scale-[1.5] max-435:top-[-5.1%] max-435:left-[-15.45%] max-435:scale-[0.7]"
                  />
                  
                  
                 <Image
                    src="/section-images/grid (dark theme).png"
                    alt="Grid background"
                    width={500} 
                    height={250}
                    className="absolute dark:opacity-100 opacity-0 xl:translate-x-[-275px] lg:translate-x-[-162px] max-820:translate-x-[-170px] translate-y-[5px] max-435:top-[5.5%] max-435:left-[41.55%] max-435:scale-[1]"
                    unoptimized={true}
                  />


                  <Image
                    src="/section-images/grid (light theme).png"
                    alt="Grid background"
                    width={500} 
                    height={250}
                    className="absolute dark:opacity-0 opacity-50 xl:translate-x-[-275px] lg:translate-x-[-162px] max-820:translate-x-[-170px] translate-y-[5px] max-435:top-[5.5%] max-435:left-[41.55%] max-435:scale-[1]"
                    unoptimized={true}
                  />
                  
                  <div className="relative flex h-full max-435:flex-col w-full items-center md:justify-between  p-8">
                    <div className="flex w-1/2 flex-col md:items-start max-435:items-center justify-center">

                      <div className="max-435:absolute max-435:mx-auto max-435:top-[-0.5%] max-435:scale-[1]">
                        <MicrophoneIcon />
                      </div>

                      <div className="mt-4 max-435:mt-[16rem]">
                        <h3 className="text-[4rem] max-435:text-[3rem] font-bold dark:text-slate-300 text-slate-700">Speaking</h3>
                        <p className="text-4xl font-light dark:text-slate-300 text-slate-700/80">practice</p>
                      </div>
                    </div>
                    <div className="md:w-1/2 md:pl-8 max-435:pt-[2rem]">
                      <p className="hero-card-font-sh-features">
                        Record your responses and get AI-powered feedback on
                        pronunciation, fluency, and emotional tone.
                      </p>
                    </div>
                  </div>
                  <span className="shine shine-top"></span>
                  <span className="shine shine-bottom"></span>
                  <span className="glow glow-top"></span>
                  <span className="glow glow-bottom"></span>
                  <span className="glow glow-bright glow-top "></span>
                  <span className="glow glow-bright glow-bottom "></span>
                </div>

          </motion.div>

          <motion.div
            variants={fadeIn('up', 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.07 }}
            className="mt-8 flex flex-col lg:flex-row gap-8"
          >
            <div className="glass-diag-effect p-5 w-full lg:w-1/2 absolute flex flex-col justify-between max-820:mt-[7rem]">

              <Image
                src="/section-images/flare (horizontal).png"
                alt="flare"
                width={500} 
                height={3500} 
                quality={100} 
                className="absolute xl:top-[-7%] lg:top-[-6.4%] max-820:top-[-7.7%] xl:left-[5.55%] lg:left-[-5.55%] dark:opacity-100 opacity-0 max-408:dark:opacity-0 z-20 max-w-none max-h-none xl:scale-[1.1] lg:scale-[0.8] max-820:scale-[1.5] max-768:top-[-7%] max-435:top-[-5.95%] max-435:left-[-13.45%] max-435:scale-[0.7] max-415:top-[-5.55%] max-415:left-[-17.5%]"
                />


              <Image
                src="/section-images/grid (dark theme).png"
                alt="Grid background"
                width={600}
                height={300}
                className="absolute top-0 left-0 dark:opacity-70 opacity-0  translate-x-[-10px] translate-y-[0px] max-820:translate-x-[82px] max-820:translate-y-[-35px] max-820:scale-[0.9] max-435:top-[10.5%] max-435:left-[-19.45%] max-435:scale-[1]"
                unoptimized={true}
              />

              <Image
                src="/section-images/grid (light theme).png"
                alt="Grid background"
                width={600}
                height={300}
                className="absolute top-0 left-0 dark:opacity-0 opacity-40 translate-x-[-10px] translate-y-[0px] max-820:translate-x-[82px] max-820:translate-y-[-35px] max-820:scale-[0.9] max-435:top-[10.5%] max-435:left-[-19.45%] max-435:scale-[1]"
                unoptimized={true}
              />

              <div className="relative flex flex-col h-full p-8">
                <div className="flex-shrink-0 flex justify-center">
                  <PenIcon />
                </div>
                <div className="flex-grow flex flex-col justify-end mt-4">
                  <h3 className="text-[3rem] font-bold dark:text-slate-300 text-slate-700">Writing</h3>
                  <p className="text-3xl font-light dark:text-slate-300 text-slate-700/80">analysis</p>
                  <p className="hero-card-font-sh-features mt-4 text-lg">
                    Comprehensive grammar, coherence, and vocabulary analysis with line-by-line suggestions.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-diag-ft-listening p-5 w-full lg:w-1/2 absolute flex flex-col justify-between max-820:mt-[7rem]">

              <Image
                src="/section-images/flare (horizontal).png"
                alt="flare"
                width={500} 
                height={3500} 
                quality={100} 
                className="absolute xl:top-[-7%] lg:top-[-6.4%] max-820:top-[-7.6%] xl:left-[5.55%] lg:left-[-5.55%] dark:opacity-100 opacity-0 max-408:dark:opacity-0 z-20 max-w-none max-h-none xl:scale[1.1] lg:scale-[0.8] max-820:scale-[1.5] max-768:top-[-7.7%] max-435:top-[-6%] max-435:left-[-13.45%] max-435:scale-[0.7] max-415:left-[-17.5%]"
                />

               <Image
                src="/section-images/grid (dark theme).png"
                alt="Grid background"
                width={600}
                height={300}
                className="absolute top-0 left-0 opacity-70 translate-x-[10px] translate-y-[0px] max-820:translate-x-[90px] max-820:translate-y-[-40px] max-820:scale-[0.9] max-435:top-[4.5%] max-435:left-[-19.45%] max-435:scale-[1]"
                unoptimized={true}
              />

              <Image
                src="/section-images/grid (light theme).png"
                alt="Grid background"
                width={600}
                height={300}
                className="absolute top-0 left-0 dark:opacity-0 opacity-40 translate-x-[10px] translate-y-[0px] max-820:translate-x-[90px] max-820:translate-y-[-40px] max-820:scale-[0.9] max-435:top-[4.5%] max-435:left-[-19.45%] max-435:scale-[1]"
                unoptimized={true}
              />

              <div className="relative flex flex-col h-full p-8">
                <div className="flex-grow flex flex-col justify-start">
                  <h3 className="text-[3rem] font-bold dark:text-slate-300 text-slate-700">Listening</h3>
                  <p className="text-3xl font-light dark:text-slate-300 text-slate-700">comprehension</p>
                  <p className="hero-card-font-sh-features mt-4 text-lg">
                    Interactive listening exercises with detailed explanations and progress tracking.
                  </p>
                </div>
                <div className="flex-shrink-0 flex mt-4 justify-center">
                  <HeadphonesIcon />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
