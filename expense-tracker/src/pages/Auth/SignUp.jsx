import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    validateConfirmPassword,
    validateEmail,
    validatePassword,
} from '@/utils/helper'
import { TriangleAlert } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [fullname, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    // Handle Sign Up Form Submit
    const handleSignUp = async (e) => {
        e.preventDefault()

        if (!fullname) {
            setError('Please enter your full name')
            return
        }

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

        const confirmationPasswordValidation = validateConfirmPassword(
            password,
            confirmPassword
        )
        if (!confirmationPasswordValidation.isValid) {
            setError(confirmationPasswordValidation.errorMessage)
            setIsPending(false)
            return
        }

        setError('')
    }

    return (
        <form onSubmit={handleSignUp}>
            <Card className='flex flex-col gap-5'>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription className='text-sm text-zinc-600'>
                        Create a new account easily
                    </CardDescription>
                </CardHeader>
                <CardContent className='grid gap-5'>
                    <div className='grid gap-2'>
                        <Label htmlFor='signup-fullname'>Full Name</Label>
                        <Input
                            id='signup-fullname'
                            type='text'
                            value={fullname}
                            placeholder='Please enter your full name!'
                            onChange={({ target }) => setFullName(target.value)}
                        />
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='signup-email'>Email</Label>
                        <Input
                            id='signup-email'
                            type='email'
                            value={email}
                            placeholder='Please enter your email!'
                            onChange={({ target }) => setEmail(target.value)}
                        />
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='signup-password'>Password</Label>
                        <Input
                            id='signup-password'
                            type='password'
                            value={password}
                            placeholder='Please enter your password!'
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='signup-confirm-password'>
                            Confirm Password
                        </Label>
                        <Input
                            id='signup-confirm-password'
                            type='password'
                            placeholder='Please enter your confirmation password!'
                            value={confirmPassword}
                            onChange={({ target }) =>
                                setConfirmPassword(target.value)
                            }
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
                        className='w-full bg-purple-300 disabled:cursor-progress'
                        onClick={handleSignUp}
                        type='submit'
                    >
                        Sign Up
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default SignUp
