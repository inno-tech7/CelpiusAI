'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SemiCircularProgress from '@/components/SemiCircularProgress';
import BorderSpotlight from '@/components/BorderSpotlight';

import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  Clock,
  Target,
  TrendingUp,
  BookOpen,
  Mic,
  PenTool,
  Headphones,
  Play,
  Calendar,
  Award,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cards = [
  {
    icon: <BarChart3 className="h-5 w-5 text-blue-500" />,
    label: 'Current CLB',
    value: '8.5',
  },
  {
    icon: <Clock className="h-5 w-5 text-green-500" />,
    label: 'Study Time',
    value: '24h',
  },
  {
    icon: <Target className="h-5 w-5 text-purple-500" />,
    label: 'Tests Taken',
    value: '12',
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-orange-500" />,
    label: 'Improvement',
    value: '+1.2',
  },
];

export default function DashboardPage() {
  const { user } = useAuth();

  const recentTests = [
    {
      id: 1,
      type: 'Complete Test',
      score: 8.5,
      date: '2024-01-15',
      sections: { listening: 9, reading: 8, writing: 8, speaking: 9 },
    },
    { id: 2, type: 'Writing Practice', score: 7.5, date: '2024-01-12', sections: { writing: 7.5 } },
    { id: 3, type: 'Speaking Practice', score: 8.0, date: '2024-01-10', sections: { speaking: 8 } },
  ];

  const weakAreas = [
    { area: 'Past Tense Usage', frequency: 15, improvement: '+20%' },
    { area: 'Pronunciation /th/', frequency: 8, improvement: '+15%' },
    { area: 'Essay Structure', frequency: 6, improvement: '+10%' },
  ];

  const recommendations = [
    'Practice more complex sentence structures in writing',
    'Focus on pronunciation drills for /th/ sounds',
    'Review past tense irregular verbs',
    'Work on speaking fluency with timed exercises',
  ];

  return (
    <DashboardLayout>
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerChildren}
        className="space-y-8"
      >
        <motion.div variants={fadeInUp}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold max-435:max-w-[40%]">
                Welcome, {user?.firstName || 'Student'} !
              </h1>
              <p className="mt-2 text-muted-foreground max-435:w-[62%]">
                Continue your CELPIP preparation journey
              </p>
            </div>
            <Badge variant="secondary" className="glass-card">
              <Award className="mr-2 h-4 md:w-4 max-435:w-[3rem]" />
              Target: CLB {user?.targetCLB || '9'}
            </Badge>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {cards.map((card, idx) => (
            <BorderSpotlight
              key={idx}
              color="#5ea0ff"
              brightness={1}
              feather={80}
              borderWidth={7}
              borderRadius="1.5rem"
            >
              <div className="glassmorphic-dashboard rounded-[1.5rem] p-8">
                <div className="flex items-center space-x-2">
                  {card.icon}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                    <p className="text-2xl font-bold">{card.value}</p>
                  </div>
                </div>
              </div>
            </BorderSpotlight>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp}>
          <BorderSpotlight
            color="#5ea0ff"
            brightness={1}
            feather={80}
            borderWidth={7}
            borderRadius="1.5rem"
          >
            <Card className="glassmorphic-dashboard">
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
                <CardDescription>Choose your practice mode</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
                  <Link href="/test/complete" className="group">
                    <Button
                      variant="outline"
                      className="glass-card glow-before glow-after flex h-20 w-full flex-col items-center justify-center space-y-2 bg-transparent max-1024:space-y-0"
                    >
                      <Play className="h-6 w-6" />
                      <span className="font-mono text-sm max-1024:text-wrap">Complete Test</span>
                    </Button>
                  </Link>

                  <Link href="/test/listening" className="group">
                    <Button
                      variant="outline"
                      className="glass-card glow-before glow-after flex h-20 w-full flex-col items-center justify-center space-y-2 bg-transparent"
                    >
                      <Headphones className="h-6 w-6" />
                      <span className="font-mono text-sm">Listening</span>
                    </Button>
                  </Link>

                  <Link href="/test/reading" className="group">
                    <Button
                      variant="outline"
                      className="glass-card glow-before glow-after flex h-20 w-full flex-col items-center justify-center space-y-2 bg-transparent"
                    >
                      <BookOpen className="h-6 w-6" />
                      <span className="font-mono text-sm">Reading</span>
                    </Button>
                  </Link>

                  <Link href="/test/writing" className="group">
                    <Button
                      variant="outline"
                      className="glass-card glow-before glow-after flex h-20 w-full flex-col items-center justify-center space-y-2 bg-transparent"
                    >
                      <PenTool className="h-6 w-6" />
                      <span className="font-mono text-sm">Writing</span>
                    </Button>
                  </Link>

                  <Link href="/test/speaking" className="group">
                    <Button
                      variant="outline"
                      className="glass-card glow-before glow-after flex h-20 w-full flex-col items-center justify-center space-y-2 bg-transparent"
                    >
                      <Mic className="h-6 w-6" />
                      <span className="font-mono text-sm">Speaking</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </BorderSpotlight>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-1024:grid-cols-1">
          <motion.div variants={fadeInUp}>
            <BorderSpotlight
              color="#5ea0ff"
              brightness={1}
              feather={80}
              borderWidth={7}
              borderRadius="1.5rem"
            >
              <Card className="glassmorphic-dashboard">
                <CardHeader>
                  <CardTitle>Recent Tests</CardTitle>
                  <CardDescription>Your latest practice sessions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentTests.map((test) => (
                    <div
                      key={test.id}
                      className="glass flex items-center justify-between rounded-lg p-4"
                    >
                      <div>
                        <p className="font-medium">{test.type}</p>
                        <p className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4" />
                          {test.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">CLB {test.score}</p>
                        <div className="flex space-x-1">
                          {Object.entries(test.sections).map(([section, score]) => (
                            <Badge key={section} variant="secondary" className="text-xs">
                              {section.charAt(0).toUpperCase()}: {score}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </BorderSpotlight>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <BorderSpotlight
              color="#5ea0ff"
              brightness={1}
              feather={80}
              borderWidth={7}
              borderRadius="1.5rem"
            >
              <Card className="glassmorphic-dashboard">
                <CardHeader>
                  <CardTitle>Progress Overview</CardTitle>
                  <CardDescription>Your current skill levels</CardDescription>
                </CardHeader>

                <div className="mt-[-1rem] grid grid-cols-2 gap-[0rem]">
                  <div className="flex scale-[0.7] flex-col items-center justify-center">
                    <h2 className="text-[1.3rem] font-bold text-white">Listening</h2>
                    <SemiCircularProgress value={11.5} size={70} className="mx-auto mt-[-0.5rem]" />
                  </div>

                  <div className="flex scale-[0.7] flex-col items-center justify-center">
                    <h2 className="text-[1.3rem] font-bold text-white">Reading</h2>
                    <SemiCircularProgress value={8.5} size={70} className="mx-auto mt-[-0.5rem]" />
                  </div>

                  <div className="flex scale-[0.7] flex-col items-center justify-center">
                    <h2 className="text-[1.3rem] font-bold text-white">Writing</h2>
                    <SemiCircularProgress value={6.5} size={70} className="mx-auto mt-[-0.5rem]" />
                  </div>

                  <div className="flex scale-[0.7] flex-col items-center justify-center">
                    <h2 className="text-[1.3rem] font-bold text-white">Speaking</h2>
                    <SemiCircularProgress value={3.5} size={70} className="mx-auto mt-[-0.5rem]" />
                  </div>
                </div>
              </Card>
            </BorderSpotlight>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-1024:grid-cols-1">
          <motion.div variants={fadeInUp}>
            <BorderSpotlight
              color="#5ea0ff"
              brightness={1}
              feather={80}
              borderWidth={7}
              borderRadius="1.5rem"
            >
              <Card className="glassmorphic-dashboard">
                <CardHeader>
                  <CardTitle>Areas for Improvement</CardTitle>
                  <CardDescription>AI-identified focus areas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {weakAreas.map((area, index) => (
                    <div
                      key={index}
                      className="glass flex items-center justify-between rounded-lg p-3"
                    >
                      <div>
                        <p className="font-medium">{area.area}</p>
                        <p className="text-sm text-muted-foreground">
                          {area.frequency} occurrences
                        </p>
                      </div>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        {area.improvement}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </BorderSpotlight>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <BorderSpotlight
              color="#5ea0ff"
              brightness={1}
              feather={80}
              borderWidth={7}
              borderRadius="1.5rem"
            >
              <Card className="glassmorphic-dashboard">
                <CardHeader>
                  <CardTitle>AI Recommendations</CardTitle>
                  <CardDescription>Personalized study suggestions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="glass flex items-start space-x-3 rounded-lg p-3">
                      <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </BorderSpotlight>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
