'use client'

import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'

// --- Schema de validation ---
const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
})

interface LoginFormProps extends React.ComponentProps<'div'> {
  onGoogleLogin: () => void
}

export function LoginForm({ onGoogleLogin, className, ...props }: LoginFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('Form values:', values)
      toast.success('Logged in!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to login. Please try again.')
    }
  }

  const [isLoading, setIsLoading] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const loginBtnClasses = cn(
    'w-full',
    !mounted
      ? 'slate-800 text-white'
      : resolvedTheme === 'dark'
      ? 'slate-400 text-white'
      : 'slate-800 text-white'
  )

  const googleBtnClasses = cn(
    'w-full',
    !mounted
      ? 'bg-gray-100 text-gray-900'
      : resolvedTheme === 'dark'
      ? 'bg-gray-800 hover:bg-gray-700 text-gray-100'
      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
  )

  const inputTextClass = cn(
    !mounted
      ? 'text-gray-900'
      : resolvedTheme === 'dark'
        ? 'text-black'
        : 'text-gray-900'
  )

  return (
    <div className={cn('w-full max-w-sm mx-auto', className)} {...props}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@mail.com"
                        autoComplete="email"
                        className={inputTextClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Link href="#" className="text-sm underline">
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput
                        id="password"
                        placeholder="******"
                        autoComplete="current-password"
                        className={inputTextClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className={loginBtnClasses}>
                Login
              </Button>
              <Button
                type="button"
                onClick={onGoogleLogin}
                className={googleBtnClasses}
              >
                Login with Google
              </Button>
            </form>
          </Form>

          {/* Sign up */}
          <div className="mt-4 text-center text-sm">
            Not registered yet?{' '}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
    </div>
  )
}

// --- Page principal ---
const Page: FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const logoSrc = !mounted
    ? '/logo.png'
    : resolvedTheme === 'dark'
    ? '/logo_white.png'
    : '/logo.png'

  const headingColorClass = !mounted
    ? 'text-gray-900'
    : resolvedTheme === 'dark'
    ? 'text-gray-100'
    : 'text-gray-900'

  async function loginWithGoogle() {
    setIsLoading(true)
    try {
      await signIn('google')
    } catch {
      toast.error('Something went wrong with your login.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full flex flex-col items-center space-y-8">
        <img
          src={logoSrc}
          alt="Logo"
          className="mx-auto"
          width="25%"
          height="25%"
        />

        <h2 className={`mt-6 text-center text-3xl font-bold tracking-tight ${headingColorClass}`}>
          Welcome back Sentinelle!
        </h2>

        <LoginForm onGoogleLogin={loginWithGoogle} />
      </div>
    </div>
  )
}

export default Page
