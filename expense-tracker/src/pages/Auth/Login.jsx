import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { validateEmail, validatePassword } from '@/utils/helper'
import { TriangleAlert } from 'lucide-react'
import axiosInstance from '@/utils/axiosInstance'
import { API_PATHS } from '@/utils/apiPaths'
import { UserContext } from '@/context/UserContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const { updateUser } = useContext(UserContext)
    const navigate = useNavigate()

    // Handle login Form Submit
    const handleLogin = async (e) => {
        e.preventDefault()
        setError(null)
        setIsPending(true)

        if (!validateEmail(email)) {
            setError('Please enter a valid email address')
            return
        }

        const passwordValidation = validatePassword(password)
        if (!passwordValidation.isValid) {
            setError(passwordValidation.errorMessage)
            setIsPending(false)
            return
        }

        setError('')

        //Login API Call
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            })
            const { token, user } = response.data

            if (token) {
                localStorage.setItem('token', token)
                updateUser(user)
                navigate('/dashboard')
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message)
            } else {
                setError('Something went wrong. Please try again.')
            }
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <Card className='flex flex-col gap-5'>
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription className='text-sm text-zinc-600'>
                        Access your account securely
                    </CardDescription>
                </CardHeader>
                <CardContent className='grid gap-5'>
                    <div className='grid gap-2'>
                        <Label htmlFor='signin-email'>Email</Label>
                        <Input
                            id='signin-email'
                            label='Email Address'
                            value={email}
                            placeholder='Please enter your email!'
                            onChange={({ target }) => setEmail(target.value)}
                        />
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='signin-password'>Password</Label>
                        <Input
                            id='signin-password'
                            type='password'
                            value={password}
                            placeholder='Please enter your password!'
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>

                    {error && (
                        // <p className='text-red-500 text-xs pb-2.5'>
                        <p className='text-red-500 text-sm flex flex-row items-center justify-center gap-2 font-bold'>
                            <TriangleAlert className='w-4' />
                            {error}
                        </p>
                    )}
                </CardContent>
                <CardFooter>
                    <Button
                        className='w-full bg-purple-400 disabled:cursor-progress'
                        // onClick={handleLogin}
                        disabled={isPending}
                    >
                        {isPending ? 'Signing in...' : 'Sign In'}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default Login
