import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
// import Input from '../../components/Inputs/Input'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { ComicText } from '@/components/ui/comic-text'
import { Input } from '@/components/ui/input'
import Login from './Login'
import SignUp from './SignUp'

const Authenticate = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    // const { updateUser } = useContext(UserContext)
    const navigate = useNavigate()

    // Handle login Form Submit
    const handleLogin = async (e) => {
        e.preventDefault()

        if (!validateEmail(email)) {
            setError('Please enter a valid email address')
            return
        }

        if (!password) {
            setError('Please enter the password')
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
        <AuthLayout>
            <div className='w-9/10  py-3 flex flex-col justify-center items-center'>
                <div className='flex flex-col justify-center items-center mb-3 px-4'>
                    <span className='text-md font-bold'>Welcome to </span>{' '}
                    <div className='-mt-1 '>
                        <ComicText
                            fontSize={2.5}
                            backgroundColor='var(--color-violet-500)'
                            dotColor='white'
                        >
                            Expense Track
                        </ComicText>
                    </div>
                    <p className='text-[12px] text-gray-700 text-center mt-2 '>
                        Join us now!
                    </p>
                </div>
                <Tabs defaultValue='signin' className='max-w-[500px]'>
                    <TabsList className='grid w-full grid-cols-2'>
                        <TabsTrigger value='signin'>Sign In</TabsTrigger>
                        <TabsTrigger value='signup'>Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value='signin'>
                        <Login />
                    </TabsContent>

                    <TabsContent value='signup'>
                        <SignUp />
                    </TabsContent>
                </Tabs>
            </div>
        </AuthLayout>
    )
}

export default Authenticate
