import React, { FC } from 'react'
import logo from '../../../assets/images/logowhite.svg'
import { Link } from 'react-router-dom'

interface IHeader {}

const Header: FC<IHeader> = () => {
  return (
    <header className="w-full absolute top-0 left-0 z-50">
      <div className="container">
        <div className="flex flex-row items-center justify-between gap-4">
          <Link
            to={'/'}
            className="h-[5.625rem] w-[9.606rem] flex items-center justify-center flex-shrink-0"
          >
            <img className="w-full h-full object-contain" loading="lazy" alt="" src={logo} />
          </Link>

          <div className="items-center gap-[4.875rem] hidden md:flex">
            <nav className="whitespace-nowrap text-[1.25rem] text-lightgreen-100 font-ocr-x-trial">
              <ul className="flex items-center space-x-8">
                <li>
                  <Link to="/about">[ABOUT]</Link>
                </li>
                <li>
                  <Link to="/bridge">[BRIDGE]</Link>
                </li>
                <li>
                  <Link to="/how-it-works">[HOW IT WORKS]</Link>
                </li>
                <li>
                  <Link to="/features"> [FEATURES]</Link>
                </li>
                <li>
                  <Link to="/roadmap">[ROADMAP]</Link>
                </li>
                <li>
                  <Link to="/faq">[FAQ]</Link>
                </li>
              </ul>
            </nav>

            <Link
              to={'/connect-wallet'}
              className="font-ocr-x-trial cursor-pointer rounded-[.115rem] h-[2.875rem] text-lightgreen-100 text-[1.25rem] whitespace-nowrap bg-forestgreen flex py-[0.187rem] px-[0.125rem] transition-all duration-300 group"
            >
              <span className="px-[0.875rem] h-full bg-darkolivegreen-200 shadow-[-1.8px_-0.9px_3.69px_rgba(215,_215,_215,_0.18)_inset,_1.8px_1.8px_1.84px_rgba(0,_0,_0,_0.91)_inset] rounded-[.115rem] flex items-center justify-center text-center transition-all duration-300 group-hover:bg-darkolivegreen-100 w-full">
                CONNECT WALLET
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
