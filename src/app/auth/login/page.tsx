'use client';
import React from 'react';

import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(4, 'Password must have more than 4 characters'),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface Props {}

const Login = (props: Props) => {
  const {
    register: login,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data);
  };
  return (
    <div className="min-h-full relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">
      <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-semibold leading-6 my-3"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            {...login('email')}
            className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
          />
          {errors.email && (
            <span className="text-red-800 block mt-2">
              {errors.email?.message}
            </span>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-semibold leading-6 my-3"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...login('password')}
            className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
          />
          {errors.password && (
            <span className="text-red-800 block mt-2">
              {errors.password?.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-zinc-800 text-white hover:bg-zinc-600 w-full"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
