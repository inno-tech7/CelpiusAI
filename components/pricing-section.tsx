'use client';

import { motion } from 'framer-motion';
import { fadeIn } from '@/app/variants/variants';
import { Button } from '@/components/ui/button';
import { usePlans } from '@/components/providers/plans-provider';
import { Check, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import BorderSpotlight from './BorderSpotlight';

export function PricingSection() {
  const { plans } = usePlans();

  const displayPlans = plans.map((plan) => {
    return {
      ...plan,
      cta: 'Get Started',
      popular: !!plan.isCurrent,
    };
  });

  return (
    <section
      id="pricing"
      className="h-[42rem] py-20 lg:py-32 max-1024:h-[54rem] max-820:h-[125rem] max-768:h-[118rem]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <motion.h2
            variants={fadeIn('up', 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl"
          >
            Choose Your <span className="gradient-text">Success Plan</span>
          </motion.h2>
          <motion.p
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400"
          >
            Choose a plan that is right for you and unlock your full potential.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 max-820:gap-[5rem]">
          {displayPlans.map((plan, index) => (
            <div key={plan.name} className="relative overflow-visible pt-10">
              {/* 🔹 Badge is placed above BorderSpotlight */}
              {plan.popular && (
                <div className="absolute left-1/2 top-[2rem] z-20 -translate-x-1/2 transform">
                  <div className="flex items-center space-x-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-950 px-4 py-1 text-sm font-medium text-white shadow-lg">
                    <Star className="h-4 w-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <BorderSpotlight
                color="#5ea0ff"
                brightness={1}
                feather={80}
                borderWidth={7}
                borderRadius="2rem"
              >
                <div className="glassmorphic-card rounded-3xl p-8">
                  <div className="mb-8 text-center">
                    <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="ml-1 text-slate-600 dark:text-slate-400">{plan.period}</span>
                    </div>
                  </div>

                  <div className="flex min-h-[22vh] items-center justify-center">
                    <div className="mb-8 flex flex-col items-start space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href="/auth/signup">
                    <Button
                      className={`w-full font-mono ${plan.popular ? 'glow hover:text-white' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.popular && <Zap className="mr-2 h-4 w-4" />}
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </BorderSpotlight>
            </div>
          ))}
        </div>

        <motion.div
          variants={fadeIn('up', 0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-600 dark:text-slate-400">
            ✨ 30-day money-back guarantee on all paid plans
          </p>
        </motion.div>
      </div>
    </section>
  );
}
