"use client"

import { motion} from "framer-motion"
import { fadeIn, scaleIn } from "@/app/variants/variants"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Brain, Target } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import SpottyBtn from "./spotty-btn"

import CardSwap, { Card } from './CardSwap'

export function HeroSection() {
  return (
    <section className="relative lg:pt-[6rem] h-[89rem] md:pt-[5rem] max-768:pt-[1rem] sm:pt-[10rem] lg:pb-[30rem] overflow-hidden max-1024:h-[95rem] max-820:h-[86rem] max-768:h-[79rem] max-435:h-[65rem] max-435:pt-[0rem]">

      {/* <Image
        src="/section-images/lines (dark theme).png"
        alt="Background lines"
        objectFit="cover"
        width={3840} 
        height={2160}
        className="dark:opacity-100 opacity-0 absolute top-0 left-0 z-[0] translate-x-[85px] translate-y-[20px] scale-x-[1.2] max-1024:translate-y-[178px] max-435:translate-y-[0] max-435:translate-x-[0] max-435:top-[29rem]"
      /> */}







      
     
      {/* <Image
        src="/section-images/Hero_bg (dark theme).png"
        alt="Background"
        objectFit="cover"
        width={1440} 
        height={872}
        className="dark:opacity-100 opacity-0 absolute top-0 left-0 z-[1] translate-x-[-205px] translate-y-[700px] scale-[1.2] max-1024:translate-y-[770px] max-435:translate-y-[0] max-435:translate-x-[-5rem] max-435:top-[50rem]"
      /> */}

      


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[2] mt-[6rem]">

          <div className="px-8 mb-[14rem] max-1024:mb-[17rem] max-820:pt-[3rem] max-768:mb-[11rem]">

              <div className="flex flex-col items-center text-center max-1024:items-center max-1024:text-center">
                <motion.p
                  variants={fadeIn('up', 0.3)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.6 }}
                  className="text-lg uppercase tracking-[1rem] sm:text-xl gradient-text max-w-xl mb-3 leading-relaxed"
                >
                  Get started
                </motion.p>

                <motion.h1
                  variants={fadeIn('up', 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.6 }}
                  className="text-slate-600 dark:text-slate-100 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-1024:w-[67%] max-435:w-[72%] max-w-3xl w-[50%] max-415:w-[77%]"
                >
                  Master CELPIP with <span className="gradient-text">AI Experience</span>
                </motion.h1>
                <motion.p
                  variants={fadeIn('up', 0.3)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.6 }}
                  className="text-lg sm:text-xl dark:text-slate-300 text-slate-700 max-w-xl mb-10 leading-relaxed tracking-[0rem]"
                >
                  Experience the future of CELPIP preparation with real-time AI feedback, emotional analysis, and adaptive learning paths tailored to your success.
                </motion.p>

                <motion.div
                  variants={fadeIn('up', 0.4)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.6 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                  <Link href="/auth/signup">
                    <SpottyBtn size="lg" className="text-white font-[400] group w-full sm:w-auto font-mono transform scale-[1.20] hover:scale-[1.25] transition-transform max-435:scale-[0.9]">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </SpottyBtn>
                  </Link>
                </motion.div>

                {/* <Image
                  src="/section-images/Hero_showcase (dark theme).png"
                  alt="Hero image"
                  width={1220} 
                  height={573} 
                  quality={100} 
                  className="absolute top-[115.5%] xl:left-[2.55%] lg:left-[17.55%] dark:opacity-100 opacity-0 max-408:dark:opacity-0 z-20 max-w-none max-h-none xl:scale-[1] max-1024:scale-[0.7] max-1024:mx-auto max-820:scale-[1.5] max-435:top-[-5.1%] max-435:left-[-15.45%] max-435:scale-[0.7]"
                /> */}

                {/* <Image
                  src="/section-images/Hero_showcase (dark theme).png"
                  alt="Hero image"
                  width={1220} 
                  height={573} 
                  quality={100} 
                  className="absolute top-[115.5%] max-435:top-[127.5%]"
                />

                <Image
                  src="/section-images/Hero_showcase (light theme).png"
                  alt="Hero image (light theme)"
                  width={1220} 
                  height={573} 
                  quality={100} 
                  className="absolute top-[115.5%] xl:left-[2.55%] lg:left-[17.55%] dark:opacity-0 opacity-100 max-408:dark:opacity-0 z-20 max-w-none max-h-none xl:scale-[1]  max-820:scale-[1.5] max-435:top-[-5.1%] max-435:left-[-15.45%] max-435:scale-[0.7]"
                /> */}

                {/* CardSwap */}
                <div className="mt-[11rem] flex justify-center max-435:mt-[4rem] max-435:scale-[0.5]">
                  <CardSwap
                    cardDistance={0}
                    verticalDistance={5}
                    delay={5000}
                    pauseOnHover={false}
                  >
                    <Card customClass="absolute overflow-hidden p-0">
                      <Image
                        src="/hero-cards/Hero_CardSwap 3 (dark theme).png"
                        alt="Hero image"
                        fill
                        quality={100} 
                        unoptimized={true}
                        className="object-cover"
                      />
                    </Card>

                    <Card customClass="absolute overflow-hidden p-0">
                      <Image
                        src="/hero-cards/Hero_CardSwap 1 (dark theme).png"
                        alt="Hero image"
                        fill
                        quality={100} 
                        unoptimized={true}
                        className="object-cover"
                      />
                    </Card>

                    <Card customClass="absolute overflow-hidden p-0">
                      <Image
                        src="/hero-cards/Hero_CardSwap 2 (dark theme).png"
                        alt="Hero image"
                        fill
                        quality={100} 
                        unoptimized={true}
                        className="object-cover"
                      />
                    </Card>
                  </CardSwap>
                  
                </div>
              </div>
          </div>
      </div>
    </section>
  )
}
