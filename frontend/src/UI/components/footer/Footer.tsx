import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface IFooter {}

const Footer: FC<IFooter> = () => {
  return (
    <footer className="absolute bottom-0 left-0 z-10 w-full text-base text-gray-100 font-maison-neue-trial z-30">
      <div className="container">
        <div className="flex md:flex-row flex-col items-center justify-between gap-5 border-dimgray-100 border-0 border-t-[.075rem] border-dashed pt-5 pb-[1.625rem] ">
          <nav className="tracking-[-0.02em]">
            <ul className="flex items-center gap-5">
              <li>
                <Link to="/about">ABOUT</Link>
              </li>
              <li>
                <Link to="/features">FEATURES</Link>
              </li>
              <li>
                <Link to="/roadmap">ROADMAP</Link>
              </li>
              <li>
                <Link to="/faw">FAQ</Link>
              </li>
            </ul>
          </nav>
          <ul className="flex items-center gap-5 tracking-[-0.02em]">
            <li>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                TWITTER
              </a>
            </li>
            <li>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                TELEGRAM
              </a>
            </li>
            <li>
              <Link to="/sign-up">SIGN UP</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
