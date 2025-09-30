'use client';

import { useState, useCallback, MouseEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  Play,
  Headphones,
  Mic,
  PenTool,
  BookOpen,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard-layout';
import BorderSpotlight from '@/components/BorderSpotlight';

const testSections = [
  {
    id: 'listening',
    name: 'Listening',
    icon: Headphones,
    duration: '47-55 minutes',
    parts: 6,
    description: 'Listen to conversations, discussions, and presentations',
    color: 'from-[rgb(2,45,81)] to-[rgb(96,165,250)]',
    href: '/test/listening',
  },
  {
    id: 'reading',
    name: 'Reading',
    icon: BookOpen,
    duration: '55-60 minutes',
    parts: 4,
    description: 'Read correspondence, diagrams, information, and viewpoints',
    color: 'from-[rgb(2,45,81)] to-[rgb(96,165,250)]',
    href: '/test/reading',
  },
  {
    id: 'writing',
    name: 'Writing',
    icon: PenTool,
    duration: '53-60 minutes',
    parts: 2,
    description: 'Write an email and respond to survey questions',
    color: 'from-[rgb(2,45,81)] to-[rgb(96,165,250)]',
    href: '/test/writing',
  },
  {
    id: 'speaking',
    name: 'Speaking',
    icon: Mic,
    duration: '15-20 minutes',
    parts: 8,
    description: 'Speak about various topics and situations',
    color: 'from-[rgb(2,45,81)] to-[rgb(96,165,250)]',
    href: '/test/speaking',
  },
];

function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

export default function PracticePage() {
  const [selectedTest, setSelectedTest] = useState<string>('complete');
  const [cardRotations, setCardRotations] = useState<{ [key: string]: { x: number; y: number } }>(
    {}
  );

  const tiltSensitivity = 45; // Lower number = more tilt (default: 7)
  const glowColors = {
    from: 'blue-400',
    via: 'blue-400',
    to: 'blue-400',
  };

  const handleMouseMove = useCallback(
    throttle((e: MouseEvent<HTMLDivElement>, sectionId: string) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / tiltSensitivity;
      const rotateY = (centerX - x) / tiltSensitivity;

      setCardRotations((prev) => ({
        ...prev,
        [sectionId]: { x: rotateX, y: rotateY },
      }));
    }, 100),
    [tiltSensitivity]
  );

  const handleMouseLeave = (sectionId: string) => {
    setCardRotations((prev) => ({
      ...prev,
      [sectionId]: { x: 0, y: 0 },
    }));
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 fade-in">
        <div className="space-y-4 text-center">
          <h1 className="gradient-text font-mono text-[2rem] font-[500]">CELPIP Practice Test</h1>
          <p className="mx-auto max-w-3xl text-xl text-slate-800/70 dark:text-gray-500">
            Take a complete practice test or focus on individual sections. Get instant AI-powered
            feedback on your performance.
          </p>
        </div>

        <BorderSpotlight
          color="#5ea0ff"
          brightness={1}
          feather={80}
          borderWidth={7}
          borderRadius="2rem"
        >
          <div className="glassmorphic-dashboard rounded-[2rem]">
            <CardHeader>
              <CardTitle className="hero-card-font-sh-features flex items-center gap-2 font-mono">
                <AlertCircle className="h-5 w-5 text-blue-400" />
                Important Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-blue-100">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-800/70 dark:text-gray-100">
                    Before You Begin:
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-800/70 dark:text-gray-100">
                    <li>• Ensure you have a quiet environment</li>
                    <li>• Use headphones or speakers for audio sections</li>
                    <li>• Have paper and pen ready for notes</li>
                    <li>• Check your microphone for speaking tasks</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-800/70 dark:text-gray-100">
                    Test Format:
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-800/70 dark:text-gray-100">
                    <li>• Complete test takes approximately 3 hours</li>
                    <li>• Each section has strict time limits</li>
                    <li>• No going back once you move forward</li>
                    <li>• Immediate AI feedback after completion</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </div>
        </BorderSpotlight>

        <div className="space-y-6">
          <h2 className="hero-card-font-sh-features text-center font-mono text-2xl font-bold">
            Choose Your Practice Mode
          </h2>

          <BorderSpotlight
            color="#5ea0ff"
            brightness={1}
            feather={80}
            borderWidth={7}
            borderRadius="2rem"
          >
            <div className="glassmorphic-dashboard overflow-hidden rounded-[2rem]">
              <CardHeader className="bg-gradient-to-r from-blue-600/20 to-purple-600/20">
                <CardTitle className="flex items-center gap-3 font-mono text-blue-500 dark:text-blue-400">
                  <Play className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                  Complete Practice Test
                  <Badge
                    variant="secondary"
                    className="border-green-500/30 bg-green-500/20 text-green-300"
                  >
                    Recommended
                  </Badge>
                </CardTitle>
                <CardDescription className="text-blue-500 dark:text-blue-200">
                  Take all four sections in sequence - the full CELPIP experience
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Total Duration: 2 hours 39 minutes</span>
                    </div>
                    <p className="text-sm text-gray-900 dark:text-blue-300">
                      Includes all sections: Listening → Reading → Writing → Speaking
                    </p>
                  </div>
                  <Button
                    className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 font-mono text-white hover:from-blue-700 hover:to-purple-700"
                    asChild
                  >
                    <Link href="/test/complete">Start Complete Test</Link>
                  </Button>
                </div>
              </CardContent>
            </div>
          </BorderSpotlight>

          <div className="space-y-4">
            <h3 className="hero-card-font-sh-features text-center font-mono text-xl font-semibold">
              Or Practice Individual Sections
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              {testSections.map((section) => {
                const IconComponent = section.icon;
                const rotation = cardRotations[section.id] || { x: 0, y: 0 };
                return (
                  <div key={section.id} className="group relative">
                    <div
                      className={`absolute -inset-1 bg-gradient-to-r from-${glowColors.from} via-${glowColors.via} to-${glowColors.to} rounded-2xl opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100`}
                    />

                    <div
                      className="glassmorphic-dashboard relative cursor-pointer overflow-hidden rounded-[2rem] transition-all duration-300 will-change-transform"
                      onMouseMove={(e) => handleMouseMove(e, section.id)}
                      onMouseLeave={() => handleMouseLeave(section.id)}
                      style={{
                        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
                        transition: 'all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s',
                      }}
                    >
                      <BorderSpotlight
                        color="#5ea0ff"
                        brightness={1}
                        feather={80}
                        borderWidth={7}
                        borderRadius="2rem"
                      >
                        <CardHeader className={`bg-gradient-to-r ${section.color}/20`}>
                          <CardTitle className="flex items-center gap-3 font-mono text-white">
                            <IconComponent className="h-5 w-5" />
                            {section.name}
                          </CardTitle>
                          <CardDescription className="text-gray-50">
                            {section.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 p-6">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-blue-600 dark:text-blue-300">Duration:</span>
                              <span className="text-gray-700 dark:text-white">
                                {section.duration}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-blue-600 dark:text-blue-300">Parts:</span>
                              <span className="text-gray-700 dark:text-white">
                                {section.parts} tasks
                              </span>
                            </div>
                          </div>

                          <Button
                            className={`w-full bg-gradient-to-r ${section.color} rounded-xl font-mono text-white hover:opacity-90`}
                            asChild
                          >
                            <Link href={section.href}>Start {section.name}</Link>
                          </Button>
                        </CardContent>
                      </BorderSpotlight>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <BorderSpotlight
          color="#5ea0ff"
          brightness={1}
          feather={80}
          borderWidth={7}
          borderRadius="2rem"
        >
          <div className="glassmorphic-dashboard rounded-[2rem]">
            <CardHeader>
              <CardTitle className="hero-card-font-sh-features flex items-center gap-2 font-mono">
                <CheckCircle className="h-5 w-5 text-green-400" />
                Performance Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-800/70 dark:text-gray-100">
              <p className="mb-4">
                After completing your test, you can review detailed performance standards to
                understand how your responses would be evaluated by CELPIP raters.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <Button
                  variant="outline"
                  className="border-blue-500/30 bg-transparent font-mono text-blue-500 hover:bg-blue-500/10"
                  asChild
                >
                  <Link href="/standards/writing">Writing Standards</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-500/30 bg-transparent font-mono text-blue-500 hover:bg-blue-500/10"
                  asChild
                >
                  <Link href="/standards/speaking">Speaking Standards</Link>
                </Button>
              </div>
            </CardContent>
          </div>
        </BorderSpotlight>
      </div>
    </DashboardLayout>
  );
}
