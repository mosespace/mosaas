'use client';

import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { signIn, signUp } from '@/lib/auth/auth-client';
import { siteConfig } from '@/lib/constants';
import { Eye, EyeOff, Loader2, Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useState, useTransition } from 'react';

export default function RegisterForm() {
  const [pending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const onChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [key]: e.target.value });

  const registerWithEmail = () => {
    startTransition(async () => {
      await signUp.email({
        email: form.email,
        password: form.password,
        name: `${form.firstName} ${form.lastName}`,
        callbackURL: '/dashboard',
      });
    });
  };

  const registerWithGoogle = () => {
    signIn.social({
      provider: 'google',
      callbackURL: '/dashboard',
    });
  };

  return (
    <div className="min-h-screen max-w-full mx-auto flex flex-col items-center justify-center bg-[#F2F2F7] px-4 relative overflow-hidden">
      {/* Main Container */}
      <div className="w-full max-w-[480px] bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white p-10 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-2">
            Create your account
          </h1>
          <p className="text-zinc-500 font-medium italic">
            Join 500+ developers building with{' '}
            <span className="capitalize">{siteConfig.short_name}</span>.
          </p>
        </div>

        {/* Google Action */}
        <Button
          onClick={registerWithGoogle}
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

        <div className="flex items-center gap-4 my-8">
          <div className="h-px flex-1 bg-zinc-100" />
          <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
            Secure Email Sign Up
          </span>
          <div className="h-px flex-1 bg-zinc-100" />
        </div>

        {/* Registration Form */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <InputGroup className="h-12 bg-zinc-50/50 focus-within:ring-4 focus-within:ring-amber-100 transition-all flex-1">
              <InputGroupAddon>
                <User className="h-4 w-4 text-zinc-400" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="First name"
                value={form.firstName}
                onChange={onChange('firstName')}
                className="text-base"
              />
            </InputGroup>

            <InputGroup className="h-12 bg-zinc-50/50 focus-within:ring-4 focus-within:ring-amber-100 transition-all flex-1">
              <InputGroupInput
                placeholder="Last name"
                value={form.lastName}
                onChange={onChange('lastName')}
                className="text-base"
              />
            </InputGroup>
          </div>

          <InputGroup className="h-12 bg-zinc-50/50 focus-within:ring-4 focus-within:ring-amber-100 transition-all">
            <InputGroupAddon>
              <Mail className="h-4 w-4 text-zinc-400" />
            </InputGroupAddon>
            <InputGroupInput
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={onChange('email')}
              className="text-base"
            />
          </InputGroup>

          <InputGroup className="h-12 bg-zinc-50/50 focus-within:ring-4 focus-within:ring-amber-100 transition-all">
            <InputGroupInput
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              value={form.password}
              onChange={onChange('password')}
              className="text-base"
            />
            <InputGroupAddon align="inline-end">
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-zinc-400 hover:text-amber-600 p-2 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </InputGroupAddon>
          </InputGroup>

          <Button
            onClick={registerWithEmail}
            disabled={
              pending ||
              !form.firstName ||
              !form.lastName ||
              !form.email ||
              !form.password
            }
            className="w-full h-12 bg-zinc-900 text-white font-bold text-lg hover:bg-zinc-800 transition-all active:scale-[0.98] mt-4"
          >
            {pending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={20} />
                Encrypting...
              </div>
            ) : (
              'Create account'
            )}
          </Button>
        </div>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm font-medium text-zinc-500">
          Already a member?{' '}
          <Link
            href="/auth/login"
            className="text-amber-400 font-bold hover:underline transition-all"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
