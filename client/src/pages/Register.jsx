import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Input from '../components/Input';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import axios from '../api/axios.js';
import { toast } from 'react-hot-toast';
import useTitle from '../hooks/useTitle';

const Register = () => {
    useTitle('SignUp');
    const [isLoading, setIsLoading] = useState(false);

    // Yup Validation Schema
    const registerSchema = Yup.object({
        name: Yup.string().required('Please enter your name'),
        email: Yup.string().email('Invalid email').required('Please enter your email'),
        password: Yup.string().required('Please enter your password').min(8, 'Password must be atleast 8 characters'),
    });

    // Formik 
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    // OnSubmit
    const onSubmit = (data) => {
        console.log("🚀 ~ file: Register.jsx:33 ~ onSubmit ~ data:", data)

        setIsLoading(true);
        axios
            .post('/user', data)
            .then((res) => {
                toast.success(res?.data?.message);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message);
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <div className="flex flex-col justify-center min-h-screen px-3 py-12 bg-gray-100 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* <Image
                    alt="Logo"
                    height="48"
                    width="48"
                    className="w-auto mx-auto"
                    src="/images/logo-color.png"
                /> */}
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">
                    Create your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="px-4 py-8 bg-white rounded-lg shadow sm:px-10">
                    <form
                        className="space-y-7"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* Form Inputs */}
                        <Input
                            id="name"
                            label="Name"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                            required
                        />

                        <Input
                            id="email"
                            label="Email address"
                            type="email"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                            required
                        />
                        <Input
                            id="password"
                            label="Password"
                            type="password"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                            required
                        />

                        <section>
                            <Button
                                type="submit"
                                fullWidth
                                isLoading={isLoading}
                            >
                                Register
                            </Button>
                        </section>
                    </form>

                    <div className="flex justify-center gap-2 px-2 mt-6 text-sm text-gray-500">
                        <div>Already have an account?</div>
                        <div className="underline cursor-pointer">
                            <Link to={'/login'}>
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register