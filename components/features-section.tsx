"use client";

import MicrophoneIcon from "./icons/microphone-icon";
import PenIcon from './icons/pen-icon';
import HeadphonesIcon from './icons/headphones-icon';

import { motion} from "framer-motion"
import { fadeIn } from "@/app/variants/variants"
import Image from "next/image"

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 lg:py-32 h-[85rem] max-1024:h-[160rem] max-435:h-[182rem]">
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

            {/* ----------------------------GRID FEATURE CARDS---------------------------------------- */}

              <div className="grid grid-cols-2 gap-[7rem] mt-[7rem] max-1024:grid-cols-1">


                <div className="card-outline-feature p-[2rem] w-[100%] overflow-hidden">
                    
                      <h3 className="dark:text-slate-300 text-slate-700 text-[1.5rem] text-start font-[700] ">Listening <span className="font-[200]">comprehension</span> </h3>

                      <p className="pt-[1rem] gradient-features-sh text-[1.1rem] font-[300] text-start">
                        Interactive listening exercises with detailed explanations and progress tracking to advance your learning experience.
                      </p>
                    
                    <div className="relative w-[200px] h-[200px] scale-[1] mt-[1rem] mx-auto z-20">
                      <Image
                        src="/features-section/Listening comprehension icon.png"
                        alt="Listening comprehension"
                        fill
                        quality={100} 
                        className=" object-contain"
                      />
                    </div>

                    <div className="relative opacity-[14%] w-[277px] h-[200px] scale-[1] mt-[-12.5rem] mb-[2rem] mx-auto z-10">
                      <Image
                        src="/features-section/01.png"
                        alt="01 (big)"
                        fill
                        quality={100} 
                        className=" object-cover"
                      />
                    </div>

                    <div className="flex flex-row">

                    <div className="relative w-[86px] h-[60px] scale-[1]">
                      <Image
                        src="/features-section/01.png"
                        alt="01 (small)"
                        fill
                        quality={100} 
                        className=" object-cover"
                      />
                    </div>

                    <div className="relative w-[60px] h-[60px] scale-[4] ml-auto translate-x-[-3.5rem] translate-y-[-3.7rem]">
                      <Image
                        src="/features-section/Bottom right radio wave.png"
                        alt="Bottom right radio wave"
                        fill
                        quality={100} 
                        className=" object-cover"
                      />
                    </div>
                  </div>
                </div>



                 <div className="card-outline-feature p-[2rem] w-[100%] overflow-hidden">
                    
                      <h3 className="dark:text-slate-300 text-slate-700 text-[1.5rem] text-start font-[700] ">Tracking <span className="font-[200]">reading speed</span> </h3>

                      <p className="pt-[1rem] gradient-features-sh text-[1.1rem] font-[300] text-start">
                        Have an experience of timed reading exercises and follow up your reading speed and accuracy over time.
                      </p>
                    
                    <div className="relative w-[200px] h-[200px] scale-[1] mt-[1rem] mx-auto z-20">
                      <Image
                        src="/features-section/Track reading speed.png"
                        alt="Track reading speed"
                        fill
                        quality={100} 
                        className=" object-contain"
                      />
                    </div>

                    <div className="relative opacity-[14%] w-[320px] h-[200px] scale-[1] mt-[-12.5rem] mb-[2rem] mx-auto z-10">
                      <Image
                        src="/features-section/02.png"
                        alt="02 (big)"
                        fill
                        quality={100} 
                        className=" object-cover"
                      />
                    </div>

                    <div className="flex flex-row">

                    <div className="relative w-[98px] h-[61px] scale-[1]">
                      <Image
                        src="/features-section/02.png"
                        alt="02 (small)"
                        fill
                        quality={100} 
                        className=" object-cover"
                      />
                    </div>

                    <div className="relative w-[60px] h-[60px] scale-[4] ml-auto translate-x-[-3.5rem] translate-y-[-3.7rem]">
                      <Image
                        src="/features-section/Bottom right radio wave.png"
                        alt="Bottom right radio wave"
                        fill
                        quality={100} 
                        className=" object-cover"
                      />
                    </div>

                  </div>
                </div>




                 <div className="card-outline-feature p-[2rem] w-[100%] overflow-hidden">
                    
                      <h3 className="dark:text-slate-300 text-slate-700 text-[1.5rem] text-start font-[700] ">Writing <span className="font-[200]">analysis</span> </h3>

                      <p className="pt-[1rem] gradient-features-sh text-[1.1rem] font-[300] text-start">
                        Comprehensive grammar, coherence, and vocabulary analysis with line-by-line suggestions.
                      </p>
                    
                    <div className="relative w-[200px] h-[200px] scale-[1] mt-[1rem] mx-auto z-20">
                      <Image
                        src="/features-section/Writing analysis.png"
                        alt="Writing analysis"
                        fill
                        quality={100} 
                        className=" object-contain"
                      />
                    </div>

                    <div className="relative opacity-[14%] w-[321px] h-[200px] scale-[1] mt-[-12.5rem] mb-[2rem] mx-auto z-10">
                      <Image
                        src="/features-section/03.png"
                        alt="03 (big)"
                        fill
                        quality={100} 
                        className=" object-cover"
                      />
                    </div>

                    <div className="flex flex-row">

                    <div className="relative w-[96px] h-[60px] scale-[1]">
                      <Image
                        src="/features-section/03.png"
                        alt="03 (small)"
                        fill
                        quality={100} 
                        className=" object-cover"
                      />
                    </div>

                    <div className="relative w-[60px] h-[60px] scale-[4] ml-auto translate-x-[-3.5rem] translate-y-[-3.7rem]">
                      <Image
                        src="/features-section/Bottom right radio wave.png"
                        alt="Bottom right radio wave"
                        fill
                        quality={100} 
                        className=" object-cover"
                      />
                    </div>
                  </div>
                </div>




                 <div className="card-outline-feature p-[2rem] w-[100%] overflow-hidden">
                    
                      <h3 className="dark:text-slate-300 text-slate-700 text-[1.5rem] text-start font-[700] ">Speaking <span className="font-[200]">practice</span> </h3>

                      <p className="pt-[1rem] gradient-features-sh text-[1.1rem] font-[300] text-start">
                        Record your responses and get AI-powered feedback on pronunciation, fluency, and emotional tone.
                      </p>
                    
                    <div className="relative w-[200px] h-[200px] scale-[1] mt-[1rem] mx-auto z-20">
                      <Image
                        src="/features-section/Speaking practice.png"
                        alt="Speaking practice"
                        fill
                        quality={100} 
                        className=" object-contain"
                      />
                    </div>

                    <div className="relative opacity-[14%] w-[351px] h-[200px] scale-[1] mt-[-12.5rem] mb-[2rem] mx-auto z-10">
                      <Image
                        src="/features-section/04.png"
                        alt="04 (big)"
                        fill
                        quality={100} 
                        className=" object-cover"
                      />
                    </div>

                    <div className="flex flex-row">

                    <div className="relative w-[105px] h-[60px] scale-[1]">
                      <Image
                        src="/features-section/04.png"
                        alt="04 (small)"
                        fill
                        quality={100} 
                        className=" object-cover"
                      />
                    </div>

                    <div className="relative w-[60px] h-[60px] scale-[4] ml-auto translate-x-[-3.5rem] translate-y-[-3.7rem]">
                      <Image
                        src="/features-section/Bottom right radio wave.png"
                        alt="Bottom right radio wave"
                        fill
                        quality={100} 
                        className=" object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
          </motion.div>
            {/* ----------------------------GRID FEATURE CARDS---------------------------------------- */}
        </div>
      </div>
    </section>
  )
}
