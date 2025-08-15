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
      <Image
        src="/section-images/Hero_bg (dark theme).png"
        alt="Background"
        objectFit="cover"
        width={1440} 
        height={872}
        className="dark:opacity-100 opacity-0 absolute top-0 left-0 z-[1] translate-x-[-205px] translate-y-[-100px] scale-[1.2] max-1024:translate-y-[250px] max-435:translate-y-[550px] max-435:translate-x-[-75px] max-415:translate-y-[480px]"
      />

      <Image
        src="/section-images/Hero_bg (light theme).png"
        alt="Background"
        objectFit="cover"
        width={1440} 
        height={872}
        className="dark:opacity-0 opacity-100 absolute top-0 left-0 z-[1] translate-x-[-205px] translate-y-[-100px] scale-[1.2] max-1024:translate-y-[250px] max-435:translate-y-[550px] max-435:translate-x-[-75px] max-415:translate-y-[480px]"
      />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[2]">

          <div className="px-8 mb-[14rem] max-1024:mb-[17rem] max-820:pt-[3rem] max-768:mb-[11rem]">

              <div className="flex flex-col items-center text-center">
                <motion.p
                  variants={fadeIn('up', 0.3)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.6 }}
                  className="text-lg uppercase tracking-[1rem] sm:text-xl gradient-text max-w-xl mx-auto mb-3 leading-relaxed"
                >
                  Get started
                </motion.p>

                <motion.h1
                  variants={fadeIn('up', 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.6 }}
                  className="text-slate-600 dark:text-slate-100 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl w-[50%] max-415:w-[77%]"
                >
                  Master CELPIP with <span className="gradient-text">AI Experience</span>
                </motion.h1>
                <motion.p
                  variants={fadeIn('up', 0.3)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.6 }}
                  className="text-lg sm:text-xl dark:text-slate-300 text-slate-700 max-w-xl mx-auto mb-10 leading-relaxed tracking-[0.02rem]"
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
                    <Button size="lg" className="gradient-btn text-white font-bold group w-full sm:w-auto font-mono glow btn-gradient-border">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>

              </div>
          </div>
      </div>
    </section>
  )
}
