"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/app/variants/variants";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CELPIP Test Taker",
    content: "Celpius AI transformed my CELPIP preparation. The AI feedback was incredibly detailed and helped me improve my speaking score by 3 points!",
    rating: 5,
    avatar: "SC"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Immigration Candidate",
    content: "The personalized learning path was exactly what I needed. I went from struggling with listening to scoring 10+ consistently.",
    rating: 5,
    avatar: "MR"
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "CELPIP Graduate",
    content: "Amazing platform! The real-time feedback during speaking practice sessions made all the difference in my preparation.",
    rating: 5,
    avatar: "PP"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Test Preparation Student",
    content: "I loved how the AI analyzed my writing and gave specific suggestions. My writing score improved dramatically!",
    rating: 5,
    avatar: "DK"
  },
  {
    id: 5,
    name: "Emma Thompson",
    role: "CELPIP Success Story",
    content: "The emotional analysis feature helped me understand my speaking patterns. Highly recommend this platform!",
    rating: 5,
    avatar: "ET"
  },
  {
    id: 6,
    name: "Ahmed Hassan",
    role: "Language Learner",
    content: "Celpius AI made CELPIP preparation enjoyable and effective. The progress tracking kept me motivated throughout.",
    rating: 5,
    avatar: "AH"
  },
  {
    id: 7,
    name: "Lisa Wang",
    role: "CELPIP Achiever",
    content: "The adaptive learning technology is incredible. It knew exactly where I needed to focus my efforts.",
    rating: 5,
    avatar: "LW"
  },
  {
    id: 8,
    name: "Carlos Martinez",
    role: "Test Success",
    content: "Best CELPIP prep platform I've used. The AI coaching felt like having a personal tutor available 24/7.",
    rating: 5,
    avatar: "CM"
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="testimonial-card flex-shrink-0 w-[380px] min-h-[120px] card-outline border border-white/10 rounded-2xl p-6 cursor-pointer transition-all duration-300 backdrop-blur-[10px] whitespace-normal mr-5">
    <div className="testimonial-content flex flex-col gap-4 h-full">
      <p className="testimonial-text text-white text-[0.95rem] leading-[1.6] m-0 flex-grow whitespace-normal">
        "{testimonial.content}"
      </p>
      <div className="testimonial-author flex items-center gap-3">
        <div className="testimonial-avatar w-10 h-10 rounded-full object-cover border-2 border-white/10 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
          {testimonial.avatar}
        </div>
        <div className="testimonial-handle text-white/75 text-[0.9rem] font-medium">
          {testimonial.name}
        </div>
      </div>
    </div>
  </div>
);

export function TestimonialsSection() {
  // Split testimonials into three rows
  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3, 6);
  const row3 = testimonials.slice(6, 8);

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden max-820:h-[68rem]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <motion.h2
            variants={fadeIn('up', 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          >
            What Our Students <span className="gradient-text">Say</span>
          </motion.h2>
          <motion.p
            variants={fadeIn('up', 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Join thousands of successful CELPIP test takers who achieved their dreams with Celpius AI
          </motion.p>
        </div>
      </div>

      {/* First Row - Right to Left */}
      <motion.div
        variants={fadeIn('up', 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="relative mb-8 overflow-hidden"
      >
        <div className="flex animate-scroll-right-to-left">
          {/* Create enough duplicates for seamless infinite scroll */}
          {[...Array(4)].map((_, setIndex) => 
            row1.map((testimonial, index) => (
              <TestimonialCard key={`row1-set${setIndex}-${testimonial.id}-${index}`} testimonial={testimonial} />
            ))
          )}
        </div>
      </motion.div>

      {/* Second Row - Left to Right */}
      <motion.div
        variants={fadeIn('up', 0.4)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="relative mb-8 overflow-hidden"
      >
        <div className="flex animate-scroll-left-to-right">
          {/* Create enough duplicates for seamless infinite scroll */}
          {[...Array(4)].map((_, setIndex) => 
            row2.map((testimonial, index) => (
              <TestimonialCard key={`row2-set${setIndex}-${testimonial.id}-${index}`} testimonial={testimonial} />
            ))
          )}
        </div>
      </motion.div>

      {/* Third Row - Right to Left */}
      <motion.div
        variants={fadeIn('up', 0.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="relative overflow-hidden"
      >
        <div className="flex animate-scroll-right-to-left-row3">
          {/* Create enough duplicates for seamless infinite scroll */}
          {[...Array(6)].map((_, setIndex) => 
            row3.map((testimonial, index) => (
              <TestimonialCard key={`row3-set${setIndex}-${testimonial.id}-${index}`} testimonial={testimonial} />
            ))
          )}
        </div>
      </motion.div>
    </section>
  );
}
