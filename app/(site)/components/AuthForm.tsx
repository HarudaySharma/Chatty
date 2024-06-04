'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Input from '@/app/components/inputs/Input';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/app/components/Button';
import AuthSocialButton from './AuthSocialButton'
import { BsGithub, BsGoogle } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if(session.status === 'authenticated') {
           console.log('authenticated');
           router.push('/users');
        }
    }, [session.status, router]);

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        }
        if (variant === 'REGISTER') {
            setVariant('LOGIN');
        }
    }, [variant]);

    //form
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (variant === 'REGISTER') {
            setIsLoading(true);
            try {
                const res = await fetch('/api/register', {
                    method: 'POST',
                    body: JSON.stringify(data)
                });

                if (!res.ok) {
                    toast.error('something went wrong');
                    return;
                }
                toast.error('register successfull');
                // automatically login for new user
                await signIn('credentials', data);
            }
            catch (err) {
                console.log("error catched");
                toast.error('something went wrong');
            }
            finally {
                setIsLoading(false);
            }

        }
        if (variant === 'LOGIN') {
            setIsLoading(true);
            try {
                // NextAuth SignIn
                const cb = await signIn('credentials', {
                    ...data,
                    redirect: false
                })
                if (cb?.error) {
                    toast.error('Invalid Credentials');
                    return;
                }
                if (cb?.ok) {
                    toast.error('login successfull');
                    router.push('/users');
                    return;
                }
            }
            catch (err) {
                console.log("error catched");
                toast.error('something went wrong');
            }
            finally {
                setIsLoading(false);
            }
        }
    }

    const socialAction = async (action: string) => {
        setIsLoading(true);
        try {
            // NextAuth Social SignIn
            const cb = await signIn(action, {
                redirect: false
            })
            if (cb?.error) {
                toast.error('Invalid Credentials');
                return;
            }
            if (cb?.ok) {
                toast.success('login successfull');
                router.push('/users');
                return;
            }
        }
        catch (err) {
            toast.error('Something went wrong');
            return;
        }
        finally {
            setIsLoading(false);
        }

    }

    return (
        <div
            className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
        >
            <div
                className='bg-white px-4 py-8 shadow 
                           sm:rounded-lg sm:px-10'
            >
                <form
                    className='space-y-6'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === 'REGISTER' &&
                        <Input
                            type='text'
                            id='name'
                            label='Name'
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                    }
                    <Input
                        type='email'
                        id='email'
                        label='Email Address'
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <Input
                        type='password'
                        id='password'
                        label='Password'
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <Button
                        type='submit'
                        disabled={isLoading}
                        fullWidth
                    >
                        {variant === 'LOGIN' ? "Sign In" : "Sign Up"}
                    </Button>
                </form>

                <div className='mt-6'>

                    <div className='relative'>

                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-300'></div>
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='bg-white px-2 text-gray-300'>
                                Or continue with
                            </span>
                        </div>

                    </div>

                    <div className='mt-6 flex gap-2'>

                        <AuthSocialButton
                            icon={BsGithub}
                            className={`hover:text-gray-900`}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            className={`hover:text-blue-500`}
                            onClick={() => socialAction('google')}
                        />

                    </div>

                    <div className='flex flex-row gap-2 justify-center cursor-pointer text-sm mt-6 px-2 text-gray-500'>

                        <div>
                            {variant === 'LOGIN' ? "New to Chatty?" : "Already have an Account"}
                        </div>
                        <div
                            onClick={toggleVariant}
                            className='underline cursor-pointer'
                        >
                            {variant === 'LOGIN' ? "Create an Account" : "LogIn"}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default AuthForm
