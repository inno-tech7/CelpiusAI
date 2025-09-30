'use client';

import type React from 'react';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { useModal } from '@/components/modal-provider';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Image from 'next/image';
import BorderSpotlight from '@/components/BorderSpotlight';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { showModal } = useModal();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await signIn(email, password);

    if (result.success) {
      if (email === 'admin@celpius.ai') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } else {
      showModal('Error', result.error || 'An unknown error occurred. Please try again.');
    }

    setIsLoading(false);
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
            <div className="flex flex-col justify-center px-[2rem] max-1024:px-[3rem] max-1024:py-[3rem] max-435:px-[1rem]">
              <div className="flex justify-center xl:hidden max-1024:mb-[3rem]">
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
                <div className="mb-8">
                  <h1 className="mb-2 text-3xl font-bold text-white">Log in to your Account</h1>
                  <p className="text-white/70">Welcome back! Select method to log in:</p>
                </div>

                <div className="mb-6 space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex w-full items-center gap-3 border-white/20 bg-white/10 text-white hover:bg-white/20"
                    onClick={() => {
                      window.location.href = `https://accounts.google.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/callback/google')}&response_type=code&scope=email profile`;
                    }}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="flex w-full items-center gap-3 border-white/20 bg-white/10 text-white hover:bg-white/20"
                    onClick={() => {
                      window.location.href = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/callback/facebook')}&scope=email&response_type=code`;
                    }}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>

                <div className="relative mb-6">
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-transparent px-2 text-white/70">
                      or continue with email
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-medium text-white/90">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 z-10 h-4 w-4 text-white/50" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-white/20 bg-white/10 pl-10 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="font-medium text-white/90">
                        Password
                      </Label>
                      <Link href="#" className="text-sm text-blue-400 hover:text-blue-300">
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 z-10 h-4 w-4 text-white/50" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-white/20 bg-white/10 pl-10 pr-10 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-0 top-0 flex h-full items-center justify-center px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 cursor-pointer text-white/50 transition-colors hover:text-white/90" />
                        ) : (
                          <Eye className="h-4 w-4 cursor-pointer text-white/50 transition-colors hover:text-white/90" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="rounded border-white/20 bg-white/10 text-blue-600 focus:ring-blue-400/20"
                    />
                    <Label htmlFor="remember" className="text-white/70">
                      Remember me
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Log In'}
                  </Button>
                </form>

                <div className="mt-6 flex flex-row justify-center gap-[1rem] text-center max-1024:flex max-1024:flex-col">
                  <p className="text-white/70">Don't have an account? </p>

                  <Link
                    href="/auth/signup"
                    className="font-medium text-blue-400 hover:text-blue-300"
                  >
                    Create an account
                  </Link>
                </div>
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
