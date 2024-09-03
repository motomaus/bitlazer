import clsx from 'clsx'
import { Link } from 'react-router-dom'
import React, { PropsWithChildren } from 'react'

type Props = {
  icon?: JSX.Element
  iconAfter?: JSX.Element
  link?: string
  disabled?: boolean
  isPersonal?: boolean
  className?: string
  classNameWrapper?: string
  variant?:
    | 'transparent'
    | 'white'
    | 'mini'
    | 'outlined'
    | 'bordered'
    | 'opacity'
    | 'dark'
    | 'secondary'
    | 'mini-dark'
  type?: 'submit' | 'reset' | 'button'
  onClick?: (...e: any) => void
  target?: string
  rel?: string
  isLoading?: boolean
}

const Button = ({
  icon,
  link,
  disabled,
  className,
  classNameWrapper,
  children,
  type,
  variant,
  onClick,
  target,
  rel,
  isLoading,
  iconAfter,
  ...props
}: PropsWithChildren<Props>) => {
  const buttonClassNames = clsx(
    className,
    `w-full h-11 p-4 gap-4 relative bg-[#4c4c4cbd]
     transition-all duration-300 pr-10
      placeholder:text-white/opacity-50 justify-center 
      items-center inline-flex text-center text-white text-sm font-extrabold
       uppercase transition-all duration-300 active:opacity-80 
      active:outline-none active:shadow-white disabled:opacity-50 disabled:pointer-events-none
      rounded-md
      `,

    variant === 'transparent'
      ? ''
      : variant === 'white'
        ? 'border-white bg-none bg-white !text-black drop-shadow-none'
        : variant === 'mini'
          ? '!h-10 !px-4 !py-2.5 rounded-lg'
          : variant === 'bordered'
            ? ''
            : variant === 'outlined'
              ? 'border-white text-white bg-none drop-shadow-none hover:bg-white hover:text-main'
              : variant === 'dark'
                ? 'bg-none bg-neutral-700 !border-stroke_25 !font-light'
                : variant === 'mini-dark'
                  ? '!h-10 !px-4 !py-2.5 rounded-lg bg-none bg-neutral-700 !border-stroke_25 !font-light [&>.icon]:w-4 [&>.icon]:h-4'
                  : variant === 'secondary'
                    ? 'text-white text-sm !font-light !h-10 !p-4 bg-none bg-neutral-700 rounded-2xl border !border-stroke_25 backdrop-blur-[3.125rem] justify-center items-center gap-2.5 hover:!bg-[#444852] hover:!scale-100'
                    : variant === 'opacity'
                      ? ''
                      : null,
  )

  if (link) {
    return (
      <Link
        rel={rel}
        target={target}
        to={link}
        className={buttonClassNames}
        onClick={(e) => onClick && onClick(e)}
        {...(isLoading || disabled ? { tabIndex: -1, 'aria-disabled': true } : {})}
        {...props}
      >
        {!isLoading ? (
          <>
            {icon && <small className="icon w-6 h-6 fill-white">{icon}</small>}
            <span className="text-nowrap inline-flex gap-2">{children}</span>
            {iconAfter && <small className="icon w-6 h-6 fill-white ">{iconAfter}</small>}
          </>
        ) : (
          <span className="loader flex-1">
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4  text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#49ACF8"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </span>
        )}
      </Link>
    )
  } else {
    return (
      <button
        disabled={disabled || isLoading}
        onClick={(e) => onClick && onClick(e)}
        type={type}
        className={buttonClassNames}
        {...props}
      >
        {!isLoading ? (
          <>
            {icon && <small className="icon w-6 h-6 fill-white">{icon}</small>}
            <span className={clsx(classNameWrapper, 'text-nowrap inline-flex gap-2')}>
              {children}
            </span>
            {iconAfter && <small className="icon w-6 h-6 fill-white">{iconAfter}</small>}
            {variant === 'bordered' && (
              <span className="w-full h-full z-10 pointer-events-none touch-disable select-none rounded-md border border-white/opacity-20 absolute top-0 left-0 transition-all duration-300" />
            )}
          </>
        ) : (
          <span className="loader flex-1">
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4  text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#49ACF8"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </span>
        )}
      </button>
    )
  }
}

export default Button
