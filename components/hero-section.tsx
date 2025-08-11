"use client"

import { motion} from "framer-motion"
import { fadeIn, scaleIn } from "@/app/variants/variants"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Brain, Target } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-20 lg:pt-[10rem] lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glow-container">

          <div className="glass-hero p-8 sm:p-12">

            <Image
              src="/section-images/flare (horizontal).png"
              alt="flare"
              width={500} 
              height={3500} 
              quality={100} 
              className="absolute xl:top-[-7.9%] lg:top-[-7.5%] xl:left-[30.55%] lg:left-[24.55%] 820:top-[-4.8%] 820:left-[15.55%] dark:opacity-100 opacity-0 max-408:dark:opacity-0 z-20 max-w-none max-h-none xl:scale-[2.5] lg:scale-[2] 820:scale-[1.6] max-768:top-[-4.7%] max-768:left-[17%] max-768:scale-[1.4] max-435:top-[-2.9%] max-435:left-[-15%] max-435:scale-[0.6]  max-415:top-[-2.8%] max-415:left-[-17%]"
            />


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center hero-content-grid">

              <div className="text-center lg:text-left">
                <motion.p
                  variants={fadeIn('up', 0.3)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.6 }}
                  className="text-lg uppercase tracking-[1rem] sm:text-xl gradient-text max-w-xl mx-auto lg:mx-0 mb-3 leading-relaxed"
                >
                  Get started
                </motion.p>

                <motion.h1
                  variants={fadeIn('up', 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.6 }}
                  className="text-slate-600 dark:text-slate-100 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                >
                  Master CELPIP with <span className="gradient-text">AI Experience</span>
                </motion.h1>
                <motion.p
                  variants={fadeIn('up', 0.3)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.6 }}
                  className="text-lg sm:text-xl dark:text-slate-300 text-slate-700 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed tracking-[0.02rem]"
                >
                  Experience the future of CELPIP preparation with real-time AI feedback, emotional analysis, and adaptive learning paths tailored to your success.
                </motion.p>

                <motion.div
                  variants={fadeIn('up', 0.4)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.6 }}
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                >
                  <Link href="/auth/signup">
                    <Button size="lg" className="gradient-btn text-white font-bold group w-full sm:w-auto font-mono glow btn-gradient-border">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>

              </div>

              <motion.div 
                variants={scaleIn(0.4)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.6 }}
                className="grid grid-cols-2 gap-[4rem]"
              >
                <div className="col-span-2 glass-diag-hero p-4 flex items-center gap-4 max-820:gap-[4rem] max-435:gap-[1rem]">

                  <div className="relative w-24 h-24 rounded-lg flex-shrink-0 overflow-hidden">
                    <Image src="/hero-cards/main-hero-card.jpg" alt="Why CELPIP?" layout="fill" objectFit="cover" />
                  </div>
                  <div>
                    <h3 className="pb-[1rem] font-bold text-lg hero-card-font-h">Why CELPIP?</h3>
                    <p className="text-sm hero-card-font-sh"> CELPIP is a requirement when it comes to English tests for immigration in Canada.</p>
                  </div>
                </div>

                <div className="col-span-2 flex md:justify-center md:items-center glass-diag-hero2 p-4 gap-4 max-820:gap-[4rem] max-435:flex-col max-435:gap-[2rem]">

                  <div className="md:flex-container-col glass-card-2 p-4 text-center">
                    <div className="relative w-full h-24 rounded-lg mb-2 overflow-hidden">
                      <Image src="/hero-cards/hero-card-1.jpg" alt="Instant feedback" layout="fill" objectFit="cover" />
                    </div>
                    <p className="font-[400] text-sm hero-card-font-sh">Instant feedback</p>
                  </div>

                  <div className="md:flex-container-col glass-card-2 p-4 text-center">
                    <div className="relative w-full h-24 rounded-lg mb-2 overflow-hidden">
                      <Image src="/hero-cards/hero-card-3.jpg" alt="Emotion analysis" layout="fill" objectFit="cover" />
                    </div>
                    <p className="font-[400] text-sm hero-card-font-sh">Emotion analysis</p>
                  </div>

                  <div className="md:flex-container-col glass-card-2 p-4 text-center">
                    <div className="relative w-full h-24 rounded-lg mb-2 overflow-hidden">
                      <Image src="/hero-cards/hero-card-4.jpg" alt="Quick online results" layout="fill" objectFit="cover" />
                    </div>
                    <p className="font-[400] text-sm hero-card-font-sh">Quick online results</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
