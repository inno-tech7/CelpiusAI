'use client';

import type React from 'react';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/hooks/use-auth';
import { useModal } from '@/components/modal-provider';
import { useToast } from '@/hooks/use-toast';
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowLeft,
  ArrowRight,
  Globe,
  Target,
  Check,
} from 'lucide-react';
import Image from 'next/image';
import BorderSpotlight from '@/components/BorderSpotlight';

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    nativeLanguage: '',
    targetCLB: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const { showModal } = useModal();
  const router = useRouter();

  const totalSteps = 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showModal('Error', 'Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      await signUp(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        nativeLanguage: formData.nativeLanguage,
        targetCLB: formData.targetCLB,
      });
      toast({
        title: 'Account created!',
        description: 'Please check your email to verify your account.',
      });
      router.push('/auth/login');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName;
      case 2:
        return (
          formData.email &&
          formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword
        );
      case 3:
        return formData.nativeLanguage && formData.targetCLB;
      default:
        return false;
    }
  };

  const handleStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === totalSteps) {
      handleSubmit(e);
    } else if (validateStep(currentStep)) {
      nextStep();
    } else {
      showModal('Error', 'Please fill in all required fields.');
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Personal Information';
      case 2:
        return 'Account Security';
      case 3:
        return 'Learning Preferences';
      default:
        return 'Create Account';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return "Let's start with your basic information";
      case 2:
        return 'Set up your login credentials';
      case 3:
        return 'Help us personalize your experience';
      default:
        return 'Start your CELPIP preparation journey';
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-3">
                <Label htmlFor="firstName" className="text-sm font-medium text-white/90">
                  First Name
                </Label>
                <div className="group relative">
                  <User className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transform text-white/40 transition-colors group-focus-within:text-blue-400" />
                  <Input
                    id="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    className="rounded-xl border border-white/20 bg-white/5 py-3 pl-12 pr-4 text-white transition-all duration-200 placeholder:text-white/50 hover:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                    required
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="lastName" className="text-sm font-medium text-white/90">
                  Last Name
                </Label>
                <div className="group relative">
                  <User className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transform text-white/40 transition-colors group-focus-within:text-blue-400" />
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    className="rounded-xl border border-white/20 bg-white/5 py-3 pl-12 pr-4 text-white transition-all duration-200 placeholder:text-white/50 hover:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium text-white/90">
                Email Address
              </Label>
              <div className="group relative">
                <Mail className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transform text-white/40 transition-colors group-focus-within:text-blue-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="rounded-xl border border-white/20 bg-white/5 py-3 pl-12 pr-4 text-white transition-all duration-200 placeholder:text-white/50 hover:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-sm font-medium text-white/90">
                Password
              </Label>
              <div className="group relative">
                <Lock className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transform text-white/40 transition-colors group-focus-within:text-blue-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  className="rounded-xl border border-white/20 bg-white/5 py-3 pl-12 pr-12 text-white transition-all duration-200 placeholder:text-white/50 hover:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 transform rounded-lg p-0 text-white/50 transition-all hover:bg-white/10 hover:text-white/80"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-white/90">
                Confirm Password
              </Label>
              <div className="group relative">
                <Lock className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transform text-white/40 transition-colors group-focus-within:text-blue-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                  className="rounded-xl border border-white/20 bg-white/5 py-3 pl-12 pr-12 text-white transition-all duration-200 placeholder:text-white/50 hover:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 transform rounded-lg p-0 text-white/50 transition-all hover:bg-white/10 hover:text-white/80"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="nativeLanguage" className="text-sm font-medium text-white/90">
                Native Language
              </Label>
              <div className="group relative">
                <Globe className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transform text-white/40 transition-colors group-focus-within:text-blue-400" />
                <Select
                  value={formData.nativeLanguage}
                  onValueChange={(value) => updateFormData('nativeLanguage', value)}
                >
                  <SelectTrigger className="rounded-xl border border-white/20 bg-white/5 py-3 pl-12 pr-4 text-white transition-all duration-200 hover:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20">
                    <SelectValue placeholder="Native language" className="text-white/50" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-700 bg-slate-900/95 backdrop-blur-sm">
                    <SelectItem
                      value="spanish"
                      className="rounded-lg text-white hover:bg-slate-700/50"
                    >
                      Spanish
                    </SelectItem>
                    <SelectItem
                      value="french"
                      className="rounded-lg text-white hover:bg-slate-700/50"
                    >
                      French
                    </SelectItem>
                    <SelectItem
                      value="mandarin"
                      className="rounded-lg text-white hover:bg-slate-700/50"
                    >
                      Mandarin
                    </SelectItem>
                    <SelectItem
                      value="arabic"
                      className="rounded-lg text-white hover:bg-slate-700/50"
                    >
                      Arabic
                    </SelectItem>
                    <SelectItem
                      value="portuguese"
                      className="rounded-lg text-white hover:bg-slate-700/50"
                    >
                      Portuguese
                    </SelectItem>
                    <SelectItem
                      value="other"
                      className="rounded-lg text-white hover:bg-slate-700/50"
                    >
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="targetCLB" className="text-sm font-medium text-white/90">
                Target CLB Level
              </Label>
              <div className="group relative">
                <Target className="absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 transform text-white/40 transition-colors group-focus-within:text-blue-400" />
                <Select
                  value={formData.targetCLB}
                  onValueChange={(value) => updateFormData('targetCLB', value)}
                >
                  <SelectTrigger className="rounded-xl border border-white/20 bg-white/5 py-3 pl-12 pr-4 text-white transition-all duration-200 hover:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20">
                    <SelectValue placeholder="Target CLB level" className="text-white/50" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-700 bg-slate-900/95 backdrop-blur-sm">
                    <SelectItem
                      value="clb4"
                      className="rounded-lg text-white hover:bg-slate-700/50"
                    >
                      CLB 4 - Basic
                    </SelectItem>
                    <SelectItem
                      value="clb5"
                      className="rounded-lg text-white hover:bg-slate-700/50"
                    >
                      CLB 5 - Intermediate Low
                    </SelectItem>
                    <SelectItem
                      value="clb6"
                      className="rounded-lg text-white hover:bg-slate-700/50"
                    >
                      CLB 6 - Intermediate Mid
                    </SelectItem>
                    <SelectItem
                      value="clb7"
                      className="rounded-lg text-white hover:bg-slate-700/50"
                    >
                      CLB 7 - Intermediate High
                    </SelectItem>
                    <SelectItem
                      value="clb8"
                      className="rounded-lg text-white hover:bg-slate-700/50"
                    >
                      CLB 8 - Advanced Low
                    </SelectItem>
                    <SelectItem
                      value="clb9"
                      className="rounded-lg text-white hover:bg-slate-700/50"
                    >
                      CLB 9 - Advanced Mid
                    </SelectItem>
                    <SelectItem
                      value="clb10"
                      className="rounded-lg text-white hover:bg-slate-700/50"
                    >
                      CLB 10 - Advanced High
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-blue-400/20 bg-blue-500/10 p-4">
              <div className="flex items-start space-x-3">
                <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-400"></div>
                <div className="text-sm text-blue-200/90">
                  <p className="mb-1 font-medium">Almost there!</p>
                  <p className="text-blue-200/70">Complete your profile to get access.</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="body-gradient-bg flex min-h-screen items-center justify-center p-4 lg:overflow-hidden"
    >
      <BorderSpotlight
        color="#5ea0ff"
        brightness={1}
        feather={80}
        borderWidth={7}
        borderRadius="1.5rem"
      >
        <div className="glassmorphic-auth w-full max-w-[75rem] rounded-[1.5rem]">
          <div className="grid min-h-[600px] lg:grid-cols-2 max-1024:grid-cols-1">
            <div className="flex flex-col justify-center px-[2rem] py-[1.5rem] max-1024:px-[3rem] max-1024:pb-[2rem]">
              <div className="flex justify-center xl:hidden max-1024:mb-[2rem]">
                <Link href="/" className="cursor-pointer">
                  <Image
                    src="/celpius-ai-logo.png"
                    alt="Celpius AI"
                    width={120}
                    height={40}
                    className="h-10 w-auto transition-opacity hover:opacity-80"
                  />
                </Link>
              </div>

              <div className="mx-auto w-full max-w-md">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`header-${currentStep}`}
                    initial={{ opacity: 0, x: 30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -30, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.4, 0.0, 0.2, 1],
                      scale: { duration: 0.3 },
                    }}
                    className="mb-8"
                  >
                    <div className="mb-[1rem]">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-white/70">
                          Step {currentStep} of {totalSteps}
                        </span>
                        <span className="text-sm font-medium text-white/70">
                          {Math.round((currentStep / totalSteps) * 100)}%
                        </span>
                      </div>

                      <div className="relative mb-2">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600/0 shadow-lg"
                            initial={{ width: 0 }}
                            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                          />
                        </div>

                        <div className="absolute -top-1 left-0 flex w-full justify-between">
                          {[1, 2, 3].map((step, index) => (
                            <div
                              key={step}
                              className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                                step <= currentStep
                                  ? 'border-[#6394ff]'
                                  : 'border-white/30 bg-white/20'
                              }`}
                              style={{
                                backgroundColor: step <= currentStep ? '#112b65' : undefined,
                                marginLeft: index === 0 ? '-8px' : '0',
                                marginRight: index === 2 ? '0px' : '0',
                              }}
                            >
                              {step < currentStep && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.2 }}
                                  className="flex items-center justify-center"
                                >
                                  <Check className="h-2 w-2 text-white" />
                                </motion.div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between text-xs">
                        <span
                          className={`transition-colors ${currentStep >= 1 ? 'text-blue-400' : 'text-white/50'}`}
                        >
                          1
                        </span>
                        <span
                          className={`transition-colors ${currentStep >= 2 ? 'text-blue-400' : 'text-white/50'}`}
                        >
                          2
                        </span>
                        <span
                          className={`transition-colors ${currentStep >= 3 ? 'text-blue-400' : 'text-white/50'}`}
                        >
                          3
                        </span>
                      </div>
                    </div>

                    <div>
                      <h1 className="mb-2 text-3xl font-bold text-white">{getStepTitle()}</h1>
                      <p className="text-white/70">{getStepDescription()}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <form onSubmit={handleStepSubmit} className="space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 30, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -30, scale: 0.95 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.4, 0.0, 0.2, 1],
                        scale: { duration: 0.3 },
                      }}
                      className="flex min-h-[200px] items-center"
                    >
                      <div className="w-full">{renderStep()}</div>
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`buttons-${currentStep}`}
                      initial={{ opacity: 0, x: 30, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -30, scale: 0.95 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.4, 0.0, 0.2, 1],
                        scale: { duration: 0.3 },
                      }}
                      className={`flex items-center ${currentStep === 1 ? 'justify-center' : 'justify-between max-435:flex-col max-435:gap-[1rem]'}`}
                    >
                      <AnimatePresence>
                        {currentStep > 1 && (
                          <motion.div
                            initial={{ opacity: 0, x: -30, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -30, scale: 0.9 }}
                            transition={{
                              duration: 0.4,
                              ease: [0.4, 0.0, 0.2, 1],
                            }}
                          >
                            <Button
                              type="button"
                              variant="outline"
                              onClick={prevStep}
                              className="flex items-center gap-2 rounded-xl border-white/20 bg-white/5 px-6 py-3 text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white"
                            >
                              <ArrowLeft className="h-4 w-4" />
                              Back
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div
                        layout
                        transition={{
                          duration: 0.4,
                          ease: [0.4, 0.0, 0.2, 1],
                        }}
                      >
                        <Button
                          type="submit"
                          className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-3 font-semibold text-white transition-all duration-200 hover:from-blue-700 hover:to-blue-800"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                              Processing...
                            </>
                          ) : currentStep === totalSteps ? (
                            <>
                              Create Account
                              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30">
                                <Check className="h-2.5 w-2.5" />
                              </div>
                            </>
                          ) : (
                            <>
                              Next Step
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </form>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`footer-${currentStep}`}
                    initial={{ opacity: 0, x: 30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -30, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.4, 0.0, 0.2, 1],
                      scale: { duration: 0.3 },
                    }}
                    className="mt-6 text-center max-435:mt-[0.1rem]"
                  >
                    <div className="flex flex-row justify-center gap-[1.5rem] max-1024:flex max-1024:flex-col max-1024:pt-[1rem] max-435:gap-[0.7rem]">
                      <p className="text-white/70">Already have an account? </p>
                      <Link
                        href="/auth/login"
                        className="font-medium text-blue-400 hover:text-blue-300"
                      >
                        Sign in
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="relative flex flex-col overflow-hidden border-l border-white/20 p-8 lg:p-[2rem] max-1024:hidden">
              <div className="flex justify-center">
                <Link href="/" className="cursor-pointer">
                  <Image
                    src="/celpius-ai-logo.png"
                    alt="Celpius AI"
                    width={120}
                    height={40}
                    className="h-10 w-auto transition-opacity hover:opacity-80"
                  />
                </Link>
              </div>

              <div className="flex flex-1 items-center justify-center">
                <div className="relative z-10 text-center text-white">
                  <div className="mb-8">
                    <div className="relative mx-auto mb-6">
                      <Image
                        src="/auth/concentric-circles.png"
                        alt="Concentric Circles"
                        width={960}
                        height={400}
                        className="h-[25rem] w-[60rem] object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="mb-4 text-3xl font-bold">Just a few steps away...</h2>
                  <p className="mx-auto max-w-sm text-lg leading-relaxed text-white/70">
                    to get started
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BorderSpotlight>
    </motion.div>
  );
}
