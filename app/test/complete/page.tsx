'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Timer } from '@/components/timer';
import {
  Clock,
  Headphones,
  BookOpen,
  PenTool,
  Mic,
  Play,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

const testSections = [
  {
    id: 'listening',
    name: 'Listening',
    icon: Headphones,
    duration: 47,
    description: '6 parts with audio clips and questions',
  },
  {
    id: 'reading',
    name: 'Reading',
    icon: BookOpen,
    duration: 55,
    description: '4 parts with passages and comprehension questions',
  },
  {
    id: 'writing',
    name: 'Writing',
    icon: PenTool,
    duration: 53,
    description: '2 tasks: Email and Opinion essay',
  },
  {
    id: 'speaking',
    name: 'Speaking',
    icon: Mic,
    duration: 20,
    description: '8 tasks with voice recording',
  },
];

export default function CompleteTestPage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [testStarted, setTestStarted] = useState(false);
  const [sectionStarted, setSectionStarted] = useState(false);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const router = useRouter();

  const totalDuration = testSections.reduce((acc, section) => acc + section.duration, 0);
  const currentSectionData = testSections[currentSection];

  const startTest = () => {
    setTestStarted(true);
    startCurrentSection();
  };

  const startCurrentSection = () => {
    setSectionStarted(true);
    setTimeRemaining(currentSectionData.duration * 60);
  };

  const completeSection = () => {
    setCompletedSections((prev) => [...prev, currentSectionData.id]);
    setSectionStarted(false);

    if (currentSection < testSections.length - 1) {
      setCurrentSection((prev) => prev + 1);
    } else {
      router.push('/results/complete-test');
    }
  };

  const navigateToSection = () => {
    router.push(`/test/${currentSectionData.id}`);
  };

  useEffect(() => {
    if (sectionStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            completeSection();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [sectionStarted, timeRemaining]);

  if (!testStarted) {
    return (
      <DashboardLayout>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl space-y-8 lg:mt-[11rem] xl:mt-0"
        >
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold">Complete CELPIP Practice Test</h1>
            <p className="text-muted-foreground">
              This is a full-length practice test that mirrors the actual CELPIP exam format.
            </p>
          </div>

          <Card className="glass-dashboard">
            <Image
              src="/section-images/flare (horizontal).png"
              alt="flare"
              width={500}
              height={3500}
              quality={100}
              className="absolute left-[21.55%] top-[-7%] z-20 max-h-none max-w-none opacity-0 dark:opacity-100 md:scale-x-[1.8] md:scale-y-[0.9] max-1024:left-[7%] max-1024:scale-x-[1.2] max-1024:scale-y-[0.7] max-820:left-[18%] max-820:scale-x-[1.3] max-820:scale-y-[0.7] max-768:left-[13.55%] max-768:scale-x-[1.3] max-768:scale-y-[0.7] max-435:left-[-14.45%] max-435:top-[-5%] max-435:scale-[0.7] max-415:left-[-16%] max-415:top-[-4.65%] max-408:dark:opacity-0"
            />

            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Test Overview</span>
              </CardTitle>
              <CardDescription>
                Total duration: {totalDuration} minutes (~
                {Math.round((totalDuration / 60) * 10) / 10} hours)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {testSections.map((section, index) => (
                  <div
                    key={section.id}
                    className="glass flex items-center space-x-4 rounded-lg p-4"
                  >
                    <section.icon className="h-8 w-8 text-blue-500" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{section.name}</h3>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                      <p className="font-mono text-sm text-blue-500">{section.duration} minutes</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-blue-400/60 bg-blue-700/20 p-4 dark:bg-blue-700/30">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 text-blue-500 dark:text-blue-500" />
                  <div>
                    <h4 className="font-semibold text-blue-500 dark:text-blue-500">
                      Important Instructions
                    </h4>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>• Once you start, you cannot pause or go back to previous sections</li>
                      <li>• Each section has a strict time limit</li>
                      <li>• Make sure you have a quiet environment for the speaking section</li>
                      <li>• Your progress will be automatically saved</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button onClick={startTest} size="lg" className="glow">
                  <Play className="mr-2 h-5 w-5" />
                  Start Complete Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl space-y-8"
      >
        <div className="glass-card rounded-lg p-6">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Complete CELPIP Test</h1>
            <Badge variant="secondary" className="font-mono">
              Section {currentSection + 1} of {testSections.length}
            </Badge>
          </div>

          <Progress value={(currentSection / testSections.length) * 100} className="mb-4 h-2" />

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Progress: {currentSection}/{testSections.length} sections completed
            </span>
            <span>{completedSections.length} sections finished</span>
          </div>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <currentSectionData.icon className="h-8 w-8 text-blue-500" />
                <div>
                  <CardTitle>{currentSectionData.name} Section</CardTitle>
                  <CardDescription>{currentSectionData.description}</CardDescription>
                </div>
              </div>

              {sectionStarted && (
                <div className="text-right">
                  <Timer
                    initialTime={timeRemaining}
                    onTimeUp={completeSection}
                    className="font-mono text-2xl font-bold"
                  />
                  <p className="text-sm text-muted-foreground">Time remaining</p>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {!sectionStarted ? (
              <div className="space-y-4 text-center">
                <div className="glass rounded-lg p-6">
                  <h3 className="mb-2 text-lg font-semibold">
                    Ready to start {currentSectionData.name}?
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    You have {currentSectionData.duration} minutes to complete this section.
                  </p>
                  <p className="text-sm text-yellow-500">
                    ⚠️ Once started, the timer cannot be paused
                  </p>
                </div>

                <Button onClick={startCurrentSection} size="lg" className="glow">
                  <Play className="mr-2 h-5 w-5" />
                  Start {currentSectionData.name} Section
                </Button>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <div className="glass rounded-lg p-6">
                  <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
                  <h3 className="mb-2 text-lg font-semibold">Section Active</h3>
                  <p className="mb-4 text-muted-foreground">
                    Click below to navigate to the {currentSectionData.name} test interface.
                  </p>
                </div>

                <Button onClick={navigateToSection} size="lg" className="glow">
                  Go to {currentSectionData.name} Test
                </Button>
              </div>
            )}

            {completedSections.length > 0 && (
              <div className="border-t pt-6">
                <h4 className="mb-3 font-semibold">Completed Sections</h4>
                <div className="flex flex-wrap gap-2">
                  {completedSections.map((sectionId) => {
                    const section = testSections.find((s) => s.id === sectionId);
                    return (
                      <Badge key={sectionId} variant="secondary" className="glass-card">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        {section?.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
