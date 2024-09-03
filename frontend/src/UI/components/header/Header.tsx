import React, { FC, useState } from 'react'
import logo from '../../../assets/images/logowhite.svg'
import { Link } from 'react-router-dom'
import Button from '@components/button/Button'

interface IHeader {}

const Header: FC<IHeader> = () => {
  const [isActive, setIsActive] = useState(false)

  const toggleMenu = () => {
    setIsActive(!isActive)
  }

  const closeMenu = () => {
    setIsActive(false)
  }

  const navLinks = [
    { path: '/about', label: '[ABOUT]' },
    { path: '/bridge', label: '[BRIDGE]' },
    { path: '/how-it-works', label: '[HOW IT WORKS]' },
    { path: '/features', label: '[FEATURES]' },
    { path: '/roadmap', label: '[ROADMAP]' },
    { path: '/faq', label: '[FAQ]' },
  ]

  return (
    <header className="w-full fixed md:absolute top-0 left-0 z-50 bg-black md:bg-transparent">
      <div className="container">
        <div className="flex flex-row items-center justify-between gap-4">
          <Link
            to={'/'}
            className="h-[5.625rem] w-[9.606rem] flex items-center justify-center flex-shrink-0"
          >
            <img className="w-full h-full object-contain" loading="lazy" alt="" src={logo} />
          </Link>
          <button
            id="burger"
            onClick={toggleMenu}
            className="w-7 h-7 flex-col justify-center items-center gap-[.3125rem] inline-flex flex-shrink-0 block md:hidden ml-auto"
          >
            <span className="w-7 h-0.5 bg-lightgreen-100 rounded-[.1875rem]"></span>
            <span className="w-7 h-0.5 bg-lightgreen-100 rounded-[.1875rem]"></span>
            <span className="w-7 h-0.5 bg-lightgreen-100 rounded-[.1875rem]"></span>
          </button>
          <div
            className={`flex h-screen flex-col text-white fixed transition-all md:p-0 px-4 py-8 pt-24 duration-300 z-[100] bg-black w-full top-0 overflow-y-auto md:overflow-visible md:top-auto md:w-auto md:h-auto md:bg-transparent md:static md:z-auto ${
              isActive ? 'right-0' : '-right-[100vw]'
            }`}
          >
            <button
              onClick={closeMenu}
              className="md:hidden absolute top-4 right-4 z-10 h-[2.025rem] w-[1.881rem] text-lightgreen-100 hover:text-lightgreen-100 rounded-[.115rem] bg-darkolivegreen-200 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-[1.8px_1.8px_1.84px_1.4px_rgba(0,_0,_0,_0.91)_inset]"
            >
              X
            </button>
            <div className="items-center gap-[4.875rem] flex md:flex-row flex-col">
              <nav className="whitespace-nowrap text-[1.25rem] text-lightgreen-100 font-ocr-x-trial">
                <ul className="flex md:flex-row flex-col items-center gap-8">
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path} onClick={closeMenu}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <Button link={'/connect-wallet'} className="!w-auto">
                CONNECT WALLET
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
