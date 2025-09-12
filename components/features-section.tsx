"use client";

import MicrophoneIcon from "./icons/microphone-icon";
import PenIcon from './icons/pen-icon';
import HeadphonesIcon from './icons/headphones-icon';

import { motion} from "framer-motion"
import { fadeIn } from "@/app/variants/variants"
import Image from "next/image"
import BorderSpotlight from "@/components/BorderSpotlight"


export function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 lg:py-32 h-[77rem] max-1024:h-[133rem] max-820:h-[141rem] max-435:h-[151rem]">
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

              <div className="grid grid-cols-2 gap-[1.2rem] mt-[7rem] max-1024:grid-cols-1">

                <BorderSpotlight
                  color="#5ea0ff"
                  brightness={1}
                  feather={80}
                  borderWidth={7}
                  borderRadius="1.5rem"
                >

                <div className="glassmorphic-dashboard rounded-[1.5rem] p-[2rem] w-[100%] overflow-hidden">
                    
                    <h3 className="dark:text-slate-300 text-slate-700 text-[1.5rem] text-start font-[700] ">Listening <span className="font-[200]">comprehension</span> </h3>

                    <p className="pt-[1rem] gradient-features-sh text-[1.1rem] font-[300] text-start">
                      Interactive listening exercises with detailed explanations and progress tracking to advance your learning experience.
                    </p>

                    <div className="relative opacity-[100%] w-[310px] h-[170px] scale-[1.7] max-435:scale-[1] mt-[6.0rem] mb-[2rem] mx-auto z-10">
                      <Image
                        src="/features-section/Feature aesthetic 1.png"
                        alt="Feature aesthetic 1"
                        fill
                        quality={100} 
                        className="object-cover"
                      />
                    </div>
                </div>
                </BorderSpotlight>


                <BorderSpotlight
                  color="#5ea0ff"
                  brightness={1}
                  feather={80}
                  borderWidth={7}
                  borderRadius="1.5rem"
                >

                 <div className="glassmorphic-dashboard rounded-[1.5rem] p-[2rem] w-[100%] overflow-hidden">
                    
                      <h3 className="dark:text-slate-300 text-slate-700 text-[1.5rem] text-start font-[700] ">Tracking <span className="font-[200]">reading speed</span> </h3>

                      <p className="pt-[1rem] gradient-features-sh text-[1.1rem] font-[300] text-start">
                        Have an experience of timed reading exercises and follow up your reading speed and accuracy over time.
                      </p>

                      <div className="relative opacity-[100%] w-[310px] h-[170px] scale-[1.7] max-435:scale-[1] mt-[6.0rem] mb-[2rem] mx-auto z-10">
                      <Image
                        src="/features-section/Feature aesthetic 2.png"
                        alt="Feature aesthetic 2"
                        fill
                        quality={100} 
                        className="object-cover"
                      />
                    </div>
                </div>
                </BorderSpotlight>

                <BorderSpotlight
                  color="#5ea0ff"
                  brightness={1}
                  feather={80}
                  borderWidth={7}
                  borderRadius="1.5rem"
                >
                 <div className="glassmorphic-dashboard rounded-[1.5rem] p-[2rem] w-[100%] overflow-hidden">
                    
                      <h3 className="dark:text-slate-300 text-slate-700 text-[1.5rem] text-start font-[700] ">Writing <span className="font-[200]">analysis</span> </h3>

                      <p className="pt-[1rem] gradient-features-sh text-[1.1rem] font-[300] text-start">
                        Comprehensive grammar, coherence, and vocabulary analysis with line-by-line suggestions.
                      </p>

                      <div className="relative opacity-[100%] w-[310px] h-[170px] scale-[1.7] max-435:scale-[1] mt-[6.0rem] mb-[2rem] mx-auto z-10">
                      <Image
                        src="/features-section/Feature aesthetic 3.png"
                        alt="Feature aesthetic 3"
                        fill
                        quality={100} 
                        className="object-cover"
                      />
                    </div>
                </div>
                </BorderSpotlight>


                <BorderSpotlight
                  color="#5ea0ff"
                  brightness={1}
                  feather={80}
                  borderWidth={7}
                  borderRadius="1.5rem"
                >
                 <div className="glassmorphic-dashboard rounded-[1.5rem] p-[2rem] w-[100%] overflow-hidden">
                    
                      <h3 className="dark:text-slate-300 text-slate-700 text-[1.5rem] text-start font-[700] ">Speaking <span className="font-[200]">practice</span> </h3>

                      <p className="pt-[1rem] gradient-features-sh text-[1.1rem] font-[300] text-start">
                        Record your responses and get AI-powered feedback on pronunciation, fluency, and emotional tone.
                      </p>


                      <div className="relative opacity-[100%] w-[310px] h-[170px] scale-[1.7] max-435:scale-[1] mt-[6.0rem] mb-[2rem] mx-auto z-10">
                      <Image
                        src="/features-section/Feature aesthetic 4.png"
                        alt="Feature aesthetic 4"
                        fill
                        quality={100} 
                        className="object-cover"
                      />
                    </div>
                </div>
                </BorderSpotlight>
              </div>
          </motion.div>
            {/* ----------------------------GRID FEATURE CARDS---------------------------------------- */}
        </div>
      </div>
    </section>
  )
}
