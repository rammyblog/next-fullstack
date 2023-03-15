'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  RegisterSchemaType,
  registerSchema,
} from '../../../../schema/user.schema';

interface Props {}

const Register = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (userData) => {
    try {
      const { data, status } = await axios.post('/api/register', userData);
      //   redirect to login page
      console.log(data, status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-full relative flex flex-1 flex-col items-center justify-center pt-12 pb-16">
      <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-semibold leading-6 my-3"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
            {...register('name')}
          />
          {errors.name && (
            <span className="text-red-800 block mt-2">
              {errors.name?.message}
            </span>
          )}
        </div>
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
            className="mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200"
            {...register('email')}
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
            {...register('password')}
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
          className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-zinc-800 text-white hover:bg-zinc-600 w-full"
          disabled={isSubmitting}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
