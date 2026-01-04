"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className='flex min-h-full flex-col justify-center'>
      {/* Heading */}
      <h1 className='heading-03 mb-6 text-[rgb(var(--gray-900))]'>
        Create your account
      </h1>

      <form className='flex flex-col gap-5'>
        {/* Full Name */}
        <div className='flex flex-col gap-2'>
          <label className='body-sm-500 text-[rgb(var(--gray-900))]'>
            Full Name
          </label>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <input
              type='text'
              placeholder='First name...'
              className='h-12 rounded-md border border-[rgb(var(--gray-200))] px-4 body-md-400 placeholder:text-[rgb(var(--gray-500))] focus:ring-2 focus:ring-[rgb(var(--primary-500))]'
            />
            <input
              type='text'
              placeholder='Last name'
              className='h-12 rounded-md border border-[rgb(var(--gray-200))] px-4 body-md-400 placeholder:text-[rgb(var(--gray-500))] focus:ring-2 focus:ring-[rgb(var(--primary-500))]'
            />
          </div>
        </div>

        {/* Username */}
        <div className='flex flex-col gap-2'>
          <label className='body-sm-500 text-[rgb(var(--gray-900))]'>
            Username
          </label>
          <input
            type='text'
            placeholder='Username...'
            className='h-12 rounded-md border border-[rgb(var(--gray-200))] px-4 body-md-400 placeholder:text-[rgb(var(--gray-500))] focus:ring-2 focus:ring-[rgb(var(--primary-500))]'
          />
        </div>

        {/* Email */}
        <div className='flex flex-col gap-2'>
          <label className='body-sm-500 text-[rgb(var(--gray-900))]'>
            Email
          </label>
          <input
            type='email'
            placeholder='Email address'
            className='h-12 rounded-md border border-[rgb(var(--gray-200))] px-4 body-md-400 placeholder:text-[rgb(var(--gray-500))] focus:ring-2 focus:ring-[rgb(var(--primary-500))]'
          />
        </div>

        {/* Passwords */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {/* Password */}
          <div className='flex flex-col gap-2'>
            <label className='body-sm-500 text-[rgb(var(--gray-900))]'>
              Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                placeholder='Create password'
                className='h-12 w-full rounded-md border border-[rgb(var(--gray-200))] px-4 pr-10 body-md-400 placeholder:text-[rgb(var(--gray-500))] focus:ring-2 focus:ring-[rgb(var(--primary-500))]'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--gray-600))]'>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className='flex flex-col gap-2'>
            <label className='body-sm-500 text-[rgb(var(--gray-900))]'>
              Confirm Password
            </label>
            <div className='relative'>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder='Confirm password'
                className='h-12 w-full rounded-md border border-[rgb(var(--gray-200))] px-4 pr-10 body-md-400 placeholder:text-[rgb(var(--gray-500))] focus:ring-2 focus:ring-[rgb(var(--primary-500))]'
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--gray-600))]'>
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Terms */}
        <label className='flex items-start gap-2 body-sm-400 text-[rgb(var(--gray-600))]'>
          <input type='checkbox' className='mt-1 h-4 w-4' />
          <span>
            I agree with all of your{" "}
            <span className='cursor-pointer text-[rgb(var(--primary-500))]'>
              Terms & Conditions
            </span>
          </span>
        </label>

        {/* Submit */}
        <button
          type='submit'
          className='mt-1 flex h-12 w-full items-center justify-center rounded-md bg-[rgb(var(--primary-500))] body-md-600 text-white hover:bg-[rgb(var(--primary-600))]'>
          Create Account →
        </button>
      </form>

      {/* Divider */}
      <div className='my-6 flex items-center gap-4'>
        <div className='h-px w-full bg-[rgb(var(--gray-200))]' />
        <span className='body-sm-400 text-[rgb(var(--gray-500))]'>
          SIGN UP WITH
        </span>
        <div className='h-px w-full bg-[rgb(var(--gray-200))]' />
      </div>

      {/* Google OAuth */}
      <button className='flex h-12 w-full items-center justify-center gap-3 rounded-md border border-[rgb(var(--gray-200))] body-md-500 text-[rgb(var(--gray-700))] hover:bg-[rgb(var(--gray-50))]'>
        <Image
          src='/icons/google.svg'
          width={20}
          height={20}
          alt='Google'
          className='h-5 w-5'
        />
        Continue with Google
      </button>
    </div>
  );
};

export default SignupForm;
