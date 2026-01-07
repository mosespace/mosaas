'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, MailIcon, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { authClient, signIn } from '@/lib/auth/auth-client';
import { siteConfig } from '@/lib/constants';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pending, startTransition] = useTransition();

  const signInWithGoogle = () => {
    authClient.signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
    });
  };

  const signInWithEmail = () => {
    startTransition(async () => {
      await signIn.email({
        email,
        password,
        callbackURL: '/dashboard',
      });
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F7] px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-linear-to-b from-amber-100/50 to-transparent -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-violet-200/30 rounded-full blur-[100px] -z-10" />

      {/* Brand */}
      <div className="mb-10 flex items-center gap-2 cursor-pointer">
        <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center">
          <Sparkles className="text-white" size={20} />
        </div>
        <span className="text-xl font-black tracking-tighter text-zinc-900">
          {siteConfig.short_name}
        </span>
      </div>

      {/* Card */}
      <div className="w-full max-w-[440px] bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border p-10 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-zinc-900 mb-3">
            Welcome back
          </h1>
          <p className="text-zinc-500 font-medium">
            Enter your details to access your dashboard.
          </p>
        </div>

        <div className="space-y-4">
          {/* Google */}

          <Button
            onClick={signInWithGoogle}
            variant="outline"
            className="w-full h-12 rounded-lg border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 transition-all flex items-center justify-center gap-3 text-base font-semibold text-zinc-700"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4 py-2">
            <div className="h-px flex-1 bg-zinc-100" />
            <span className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">
              Or with email
            </span>
            <div className="h-px flex-1 bg-zinc-100" />
          </div>

          {/* Email */}
          <InputGroup className="h-12">
            <InputGroupAddon>
              <MailIcon className="h-4 w-4 text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>

          {/* Password */}
          <InputGroup className="h-12">
            <InputGroupInput
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputGroupAddon align="inline-end">
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </InputGroupAddon>
          </InputGroup>

          {/* Submit */}
          <Button
            onClick={signInWithEmail}
            disabled={!email || !password || pending}
            className="w-full h-12 rounded-lg bg-zinc-900 text-white font-bold hover:bg-zinc-800"
          >
            {pending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={18} />
                Logging in…
              </span>
            ) : (
              'Log in'
            )}
          </Button>
        </div>

        {/* Legal */}
        <p className="text-xs text-zinc-400 text-center mt-8">
          By continuing, you agree to our{' '}
          <span className="underline cursor-pointer">Terms</span> and{' '}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>

      {/* Footer */}
      <p className="mt-10 text-sm text-zinc-500">
        Don’t have an account?{' '}
        <Link
          href="/auth/register"
          className="text-amber-400 hover:underline font-semibold"
        >
          Get started for free
        </Link>
      </p>
    </div>
  );
}
