"use client"
import { signupSchema } from '@/Schema/signupSchema'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from 'axios'
import { useToast } from '@/hooks/use-toast'
import { ApiResponse } from '@/types/ApiResponse'
import { useRouter } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'


const Signup = () => {
    const { toast } = useToast()
    const router = useRouter()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [pass, setPass] = useState({ password: "", cpassword: "" })

    const handleOnSubmit = async (data: z.infer<typeof signupSchema>) => {
        setIsSubmitting(true)
        try {
            const response = await axios.post<ApiResponse>("/api/sign-up", data)
            toast({
                title: "Registered",
                description: response.data.message
            })
            if (response.data.success) {
                router.replace("/sign-in")
            }
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message
            toast({
                title: "Not registered",
                description: errorMessage
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            cpassword: "",
            password: "",
            contact: "",
            email: ""
        }
    })
    return (
        <section className="text-gray-600 body-font mb-10">
            <div className="container px-5 pt-2 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Signup</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base"></p>
                </div>
                <div className="flex w-full flex-col">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleOnSubmit)} className='w-full' >
                            <div className='flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end'>
                                <div className="relative flex-grow w-full">
                                    <FormField
                                        name='name'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Fullname</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className='className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                                                        placeholder='Fullname'
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e)
                                                        }}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className='flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end'>
                                <div className="relative flex-grow w-full">
                                    <FormField
                                        name='password'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className='className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                                                        placeholder='Password'
                                                        {...field}
                                                        type='password'
                                                        onChange={(e) => {
                                                            field.onChange(e)
                                                            setPass({ ...pass, [e.target.name]: e.target.value })
                                                        }}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="relative flex-grow w-full">
                                    <FormField
                                        name='cpassword'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className='className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                                                        placeholder='Confirm Password'
                                                        {...field}
                                                        type='password'
                                                        onChange={(e) => {
                                                            field.onChange(e)
                                                            setPass({ ...pass, [e.target.name]: e.target.value })
                                                        }}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className='flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end'>
                                <div className="relative flex-grow w-full">
                                    <FormField
                                        name='contact'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Contact</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className='className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                                                        placeholder='Contact'
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e)
                                                        }}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="relative flex-grow w-full">
                                    <FormField
                                        name='email'
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className='className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                                                        placeholder='Email'
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e)
                                                        }}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center items-center mt-10 w-full'>
                                <Button className='w-[250px]' disabled={isSubmitting} type='submit' >
                                    {
                                        isSubmitting ? <><Loader2 className='mr-1 h-4 w-4 animate-spin' />... Please wait</> : "Submit"
                                    }
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </section>
    )
}

export default Signup
