import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface IConnectWallet {}

const ConnectWallet: FC<IConnectWallet> = () => {
  return (
    <div className="w-full min-h-screen relative overflow-hidden flex flex-col justify-center md:py-28 py-32 pt-28">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="max-w-[21.688rem] w-full flex flex-col gap-[0.031rem]">
            <div className="self-stretch rounded-[.115rem] bg-forestgreen flex flex-col  py-[0.187rem] px-[0.125rem]">
              <div className="self-stretch shadow-[-1.8px_-0.9px_3.69px_rgba(215,_215,_215,_0.18)_inset,_1.8px_1.8px_1.84px_rgba(0,_0,_0,_0.91)_inset] rounded-[.115rem] bg-darkolivegreen-200 flex flex-row items-center justify-between py-[0.25rem] pl-[0.875rem] pr-[0.25rem] gap-[1.25rem] mq450:flex-wrap">
                <div className="text-lightgreen-100 font-ocr-x-trial text-[1.25rem]">
                  CONNECT WALLET
                </div>

                <Link
                  to={'/'}
                  className="h-[2.025rem] w-[1.881rem] text-lightgreen-100 hover:text-lightgreen-100 shadow-[1.8px_1.8px_1.84px_rgba(0,_0,_0,_0.91)_inset] rounded-[.115rem] bg-darkolivegreen-200 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-[1.8px_1.8px_1.84px_1.4px_rgba(0,_0,_0,_0.91)_inset]"
                >
                  X
                </Link>
              </div>
            </div>
            <div className="self-stretch -mt-px flex flex-col text-[1rem] text-white font-maison-neue-trial">
              <div className="flex-1 rounded-12xs bg-black border-forestgreen border-[.1875rem] border-solid box-border flex flex-col py-[1.25rem] px-[0.562rem] gap-[1.668rem] ">
                <div className="tracking-[-0.06em] leading-[1.25rem]">
                  Choose wallet to connect:
                </div>
                <div className="flex-1 flex flex-col gap-[0.562rem]">
                  <button className="font-ocr-x-trial w-full cursor-pointer rounded-[.115rem] h-[2.875rem] text-lightgreen-100 text-[1.25rem] whitespace-nowrap bg-darkslategray-200 flex py-[0.187rem] px-[0.125rem] transition-all duration-300 group">
                    <span className="px-[0.875rem] h-full bg-darkslategray-200 shadow-[-1.8px_-0.9px_3.69px_rgba(215,_215,_215,_0.18)_inset,_1.8px_1.8px_1.84px_rgba(0,_0,_0,_0.91)_inset] rounded-[.115rem] flex items-center justify-center text-center transition-all duration-300 group-hover:bg-dimgray-200 w-full">
                      METAMASK
                    </span>
                  </button>
                  <button className="font-ocr-x-trial w-full cursor-pointer rounded-[.115rem] h-[2.875rem] text-lightgreen-100 text-[1.25rem] whitespace-nowrap bg-darkslategray-200 flex py-[0.187rem] px-[0.125rem] transition-all duration-300 group">
                    <span className="px-[0.875rem] h-full bg-darkslategray-200 shadow-[-1.8px_-0.9px_3.69px_rgba(215,_215,_215,_0.18)_inset,_1.8px_1.8px_1.84px_rgba(0,_0,_0,_0.91)_inset] rounded-[.115rem] flex items-center justify-center text-center transition-all duration-300 group-hover:bg-dimgray-200 w-full">
                      WALLET CONNECT
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConnectWallet
