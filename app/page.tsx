'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { fadeIn } from '@/app/variants/variants';
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { FeaturesSection } from '@/components/features-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { PricingSection } from '@/components/pricing-section';
import { Footer } from '@/components/footer';
import Waves from '../components/Waves';

import Link from 'next/link';

export default function HomePage() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  return (
    <div className="body-gradient-bg min-h-screen overflow-hidden">
      <Navigation onSignOut={() => signOut(router)} isLandingPage={true} />

      <Waves
        lineColor="#3674cf" // purple start
        fadeTo="transparent" // fade to transparent
        fadeAngle={90} // top → bottom
        fadeStart={0.0} // start at top
        fadeEnd={0.9} // fade out halfway
      />

      <motion.div
        variants={fadeIn('up', 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <HeroSection />
      </motion.div>

      <motion.section
        id="about"
        variants={fadeIn('up', 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-0 pb-[4rem] lg:pt-[0rem]"
      >
        <AboutSection />
      </motion.section>

      <motion.section
        id="features"
        variants={fadeIn('up', 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="lg:py-[4rem]"
      >
        <FeaturesSection />
      </motion.section>

      <motion.section
        id="pricing"
        variants={fadeIn('up', 0.4)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="lg:py-[4rem]"
      >
        <PricingSection />
      </motion.section>

      <motion.section
        id="testimonials"
        variants={fadeIn('up', 0.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="lg:py-[4rem]"
      >
        <TestimonialsSection />
      </motion.section>

      <motion.section
        id="contact"
        variants={fadeIn('up', 0.6)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="lg:py-[4rem]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Have questions about Celpius AI? We're here to help you succeed in your CELPIP journey
              and achieve your Canadian immigration goals.
            </p>
            <div className="glass-card mx-auto max-w-md rounded-2xl p-8">
              <p className="mb-4 text-slate-600 dark:text-slate-400">Contact us at:</p>
              <Link
                href="mailto:support@celpius.ai"
                className="mb-4 block font-mono text-lg text-blue-500 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                support@celpius.ai
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                We typically respond within 24 hours
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}
