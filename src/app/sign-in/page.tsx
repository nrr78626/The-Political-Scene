"use client"
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { signinSchema } from '@/Schema/signinSchema'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Header from '@/components/created-components/Header'
import Footer from '@/components/created-components/Footer'

const page = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    setIsSubmitting(true)
    try {
      const result = await signIn('credentials', {
        redirect: false,
        identifier: data.identifier,
        password: data.password
      })

      if (result?.error) {
        toast({
          title: "Login Failed",
          description: "Incorrect username or password"
        })
      }

      if (result?.url) {
        toast({
          title: "Logged In",
          description: "User has been logged in successfully"
        })
        router.replace("/dashboard")
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An error occurred while trying to login"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver:zodResolver(signinSchema),
    defaultValues:{
      identifier:"",
      password:""
    }
  })
  return (
    <div className='w-full'>
      <Header/>
      <section className="text-zinc-700 body-font relative py-8">
      <div className="container px-5 mx-auto">
        <div className="flex flex-col text-center w-full">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Signin</h1>
          {/* <p className="lg:w-2/3 mx-auto leading-relaxed text-base"></p> */}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-full">
                  <div className="relative">
                    <FormField
                      control={form.control}
                      name='identifier'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Email or Username'
                              {...field}

                              className='text-zinc-900'
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <FormField
                      control={form.control}
                      name='password'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type='password'
                              placeholder='Password'
                              {...field}
                              className='text-zinc-900'
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="px-2 pt-10 w-full">
                  <Button variant={"outline"} className='w-full text-zinc-900' type='submit' disabled={isSubmitting} >
                    {
                      isSubmitting ? <><Loader2 className='mr-2 h-4 w-4 animate-spin text-zinc-900' />...Please wait</> : "Sign In"
                    }
                  </Button>
                </div>
                <div className='text-center mt-4 flex items-center justify-between w-full px-8'>
                  <p className='py-2'>
                    Dont have an account ? {''}
                    <Link href={"/sign-up"} className='text-blue-600 transition-all font-bold hover:text-blue-800'>Sign up</Link>
                  </p>
                  <Link href={"/forgot-password"} className='text-red-400 hover:text-red-600 font-bold'>Forget Password</Link>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
      <Footer/>
    </div>
  )
}

export default page

