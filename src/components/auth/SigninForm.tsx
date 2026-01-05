"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='flex w-full flex-col'>
      {/* Heading */}
      <h1 className='heading-03 mb-6 text-[rgb(var(--gray-900))]'>
        Sign in to your account
      </h1>

      <form className='flex flex-col gap-5'>
        {/* Email */}
        <div className='flex flex-col gap-2'>
          <label className='body-sm-500 text-[rgb(var(--gray-900))]'>
            Email
          </label>
          <input
            type='email'
            placeholder='Username or email address...'
            className='h-12 rounded-md border border-[rgb(var(--gray-200))] px-4 body-md-400 placeholder:text-[rgb(var(--gray-500))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary-500))]'
          />
        </div>

        {/* Password */}
        <div className='flex flex-col gap-2'>
          <label className='body-sm-500 text-[rgb(var(--gray-900))]'>
            Password
          </label>
          <div className='relative'>
            <input
              type={showPassword ? "text" : "password"}
              placeholder='Password'
              className='h-12 w-full rounded-md border border-[rgb(var(--gray-200))] px-4 pr-10 body-md-400 placeholder:text-[rgb(var(--gray-500))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary-500))]'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--gray-600))]'>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Remember me + Action */}
        <div className='flex items-center justify-between'>
          <label className='flex items-center gap-2 body-sm-400 text-[rgb(var(--gray-600))]'>
            <input type='checkbox' className='h-4 w-4' />
            Remember me
          </label>

          <button
            type='submit'
            className='flex h-12 min-w-35 items-center justify-center rounded-md bg-[rgb(var(--primary-500))] px-6 body-md-600 text-white transition-colors hover:bg-[rgb(var(--primary-600))]'>
            Sign In →
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className='my-6 flex items-center gap-4'>
        <div className='h-px w-full bg-[rgb(var(--gray-200))]' />
        <span className='body-sm-400 text-[rgb(var(--gray-500))]'>
          SIGN IN WITH
        </span>
        <div className='h-px w-full bg-[rgb(var(--gray-200))]' />
      </div>

      {/* Google OAuth */}
      <button className='flex h-12 w-full items-center justify-center gap-3 rounded-md border border-[rgb(var(--gray-200))] body-md-500 text-[rgb(var(--gray-700))] hover:bg-[rgb(var(--gray-50))]'>
        <Image src='/icons/google.svg' width={20} height={20} alt='Google' />
        Continue with Google
      </button>
    </div>
  );
};

export default SigninForm;
