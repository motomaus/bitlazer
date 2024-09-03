'use client'

import React, { InputHTMLAttributes, useState, forwardRef } from 'react'
import { UseFormRegister, Control } from 'react-hook-form'

import clsx from 'clsx'

import { EyeHideIcon, EyeIcon } from '@svgs'
import { useTranslation } from 'react-i18next'
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  info?: string
  name?: string
  register?: UseFormRegister<any>
  control?: Control<any>
  error?: any
  isLarge?: boolean
  required?: boolean
  type?: string
  refPhone?: any
  iconBefore?: JSX.Element
  button?: JSX.Element
  inputClassName?: string
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      required = false,
      className,
      inputClassName,
      label,
      info,
      placeholder,
      name,
      register,
      error,
      isLarge,
      type = 'text',
      control,
      refPhone,
      button,
      iconBefore,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation('Index')
    const [showPassword, setShowPassword] = useState(false)
    const [cardNumber, setCardNumber] = useState('')

    const togglePasswordVisibility = () => setShowPassword(!showPassword)

    const maskCardNumber = (value: string) => {
      const maskedValue = value
        .replace(/\D/g, '')
        .slice(0, 16)
        .replace(/(\d{4})/g, '$1 ')
      setCardNumber(maskedValue)
    }

    const validateEmail = (value: string) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
      return emailRegex.test(value) || t('invalid-email-address')
    }

    const validatePhone = (value: string) => {
      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
      return phoneRegex.test(value) || t('invalid-phone-number')
    }

    const validatePassword = (value: string) => {
      const minLength = 6
      if (value.length < minLength) {
        return `Password must be at least ${minLength} characters long`
      }
      return true
    }

    return (
      <div
        className={clsx('flex flex-col w-full', className, error && 'error', isLarge && 'large')}
      >
        {(label || info) && (
          <div className="mb-1 flex items-center justify-between gap-1">
            {label && <span className="text-white text-sm ">{label}</span>}
            {info && (
              <div className="text-white opacity-40 text-[.625rem] leading-[.75rem] font-light text-right">
                {info}
              </div>
            )}
          </div>
        )}
        {type === 'password' ? (
          <div className="flex w-full relative">
            {iconBefore && (
              <span className="icon fill-white absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none">
                {iconBefore}
              </span>
            )}

            <input
              autoFocus={true}
              ref={ref}
              className={clsx(
                'w-full text-left h-11 min-h-11 px-4 py-2.5  border-none justify-start items-center gap-4 flex text-sm font-light bg-[#4c4c4c33] border-black border-2rounded-sm transition-all duration-300 focus:outline-none pr-10 placeholder:text-white/opacity-50',
                iconBefore && '!pl-12',
                inputClassName,
              )}
              placeholder={placeholder}
              type={showPassword ? 'text' : type}
              id={name}
              {...(register &&
                name &&
                register(name, {
                  required: required ? t('the-field-is-required') : false,
                  validate: type === 'password' ? validatePassword : undefined,
                }))}
              {...props}
            />
            {button && button}
            <div
              className={
                'w-6 h-6 icon absolute top-3 right-3 fill-[#33363F]  hover:fill-white cursor-pointer z-[5] select-none'
              }
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeHideIcon /> : <EyeIcon />}
            </div>
          </div>
        ) : (
          <div className="flex w-full relative">
            {iconBefore && (
              <span className="icon fill-white absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none">
                {iconBefore}
              </span>
            )}
            <input
              autoFocus={true}
              ref={ref}
              className={clsx(
                'w-full text-left h-11 min-h-11 px-4 py-2.5  border-none justify-center items-center gap-4 flex text-sm font-light bg-[#4c4c4c33] border-black border-2 rounded-sm  transition-all duration-300 focus:outline-none placeholder:text-white/opacity-50',
                iconBefore && '!pl-12',
                inputClassName,
              )}
              placeholder={placeholder}
              type={type === 'cardNumber' ? 'text' : type}
              id={name}
              value={name === 'cardNumber' ? cardNumber : undefined}
              onChange={(e) => {
                if (name === 'cardNumber') {
                  maskCardNumber(e.target.value)
                } else {
                  props.onChange && props.onChange(e)
                }
              }}
              {...(register &&
                name &&
                register(name, {
                  required: required ? t('the-field-is-required') : false,
                  validate:
                    type === 'email'
                      ? validateEmail
                      : type === 'tel'
                        ? validatePhone
                        : type === 'password'
                          ? validatePassword
                          : undefined,
                }))}
              {...props}
            />
            {button && button}
          </div>
        )}
        {error && <small className="mt-1 text-xs font-light text-red-500">{error.message}</small>}
      </div>
    )
  },
)

InputField.displayName = 'InputField'

export default InputField
