import React, { FC } from 'react'

interface IHome {}

const Home: FC<IHome> = () => {
  return (
    <div className="w-full min-h-screen relative overflow-hidden flex flex-col justify-center py-24">
      <div className="container">
        <section className="self-stretch relative z-10 gap-[1.875rem] flex flex-col items-center text-center text-[3rem] text-white font-ocr-x-trial">
          <div className="flex flex-col gap-[1.625rem]">
            <h1 className="m-0 max-w-[32.1rem] w-full text-inherit uppercase font-normal">
              Lazer fast Bitcoin yield
            </h1>
            <div className="max-w-[32.131rem] relative text-[1.25rem] tracking-[-0.06em] leading-[1.625rem] font-maison-neue-trial">
              Supercharged Bitcoin yield with Layer 3 speed and ultra-low transaction fees
            </div>
          </div>
          <div className="flex items-center gap-[1.625rem] flex-wrap">
            <button className="font-ocr-x-trial min-w-[11.75rem] cursor-pointer rounded-[.115rem] h-[2.875rem] text-lightgreen-100 text-[1.25rem] whitespace-nowrap bg-darkslategray-200 flex py-[0.187rem] px-[0.125rem] transition-all duration-300 group">
              <span className="px-[0.875rem] h-full bg-darkslategray-200 shadow-[-1.8px_-0.9px_3.69px_rgba(215,_215,_215,_0.18)_inset,_1.8px_1.8px_1.84px_rgba(0,_0,_0,_0.91)_inset] rounded-[.115rem] flex items-center justify-center text-center transition-all duration-300 group-hover:bg-dimgray-200 w-full">
                LEARN MORE
              </span>
            </button>
            <button className="font-ocr-x-trial min-w-[11.5rem] cursor-pointer rounded-[.115rem] h-[2.875rem] text-lightgreen-100 text-[1.25rem] whitespace-nowrap bg-forestgreen flex py-[0.187rem] px-[0.125rem] transition-all duration-300 group">
              <span className="px-[0.875rem] h-full bg-darkolivegreen-200 shadow-[-1.8px_-0.9px_3.69px_rgba(215,_215,_215,_0.18)_inset,_1.8px_1.8px_1.84px_rgba(0,_0,_0,_0.91)_inset] rounded-[.115rem] flex items-center justify-center text-center transition-all duration-300 group-hover:bg-darkolivegreen-100 w-full">
                BRIDGE & EARN
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
