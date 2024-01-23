import React from 'react'
import { cn } from '../utils/utils'

const Input = ({ label, id, type, required, errors, register, disabled }) => {
    return (
        <section className='relative'>
            <label
                htmlFor={id}
                className="block text-sm font-medium leading-3 text-gray-600"
            >
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    type={type}
                    autoCapitalize={id}
                    disabled={disabled}
                    {...register(id, { required })}
                    className={cn(`
                    form-input
                    block
                    w-full
                    rounded-md
                    border-0
                    py-1.5
                    text-gray-900
                    shadow-sm
                    ring-1
                    ring-inset
                    ring-gray-300
                    placeholder:text-gray-400
                    focus:ring-2
                    focus:ring-inset
                    focus:ring-primary-600
                    sm:text-sm
                    sm:leading-6`,
                        errors[id] && "focus:ring-rose-500 ring-rose-500",
                        disabled && "opacity-50 cursor-default"
                    )}
                />
            </div>
            {errors[id] && <p className='absolute text-sm text-red-600'>{errors[id].message}</p>}
        </section >
    )
}

export default Input;