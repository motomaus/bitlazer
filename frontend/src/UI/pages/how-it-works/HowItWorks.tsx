import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface IHowItWorks {}

const HowItWorks: FC<IHowItWorks> = () => {
  return (
    <div className="w-full min-h-screen relative overflow-hidden flex flex-col justify-center md:py-28 py-32 pt-28">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="max-w-[41.375rem] w-full flex flex-col gap-[0.031rem]">
            <div className="self-stretch rounded-[.115rem] bg-forestgreen flex flex-col  py-[0.187rem] px-[0.125rem]">
              <div className="self-stretch shadow-[-1.8px_-0.9px_3.69px_rgba(215,_215,_215,_0.18)_inset,_1.8px_1.8px_1.84px_rgba(0,_0,_0,_0.91)_inset] rounded-[.115rem] bg-darkolivegreen-200 flex flex-row items-center justify-between py-[0.25rem] pl-[0.875rem] pr-[0.25rem] gap-[1.25rem] mq450:flex-wrap">
                <div className="text-lightgreen-100 font-ocr-x-trial uppercase text-[1.25rem]">
                  How It Works
                </div>

                <Link
                  to={'/'}
                  className="h-[2.025rem] w-[1.881rem] text-lightgreen-100 hover:text-lightgreen-100 shadow-[1.8px_1.8px_1.84px_rgba(0,_0,_0,_0.91)_inset] rounded-[.115rem] bg-darkolivegreen-200 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-[1.8px_1.8px_1.84px_1.4px_rgba(0,_0,_0,_0.91)_inset]"
                >
                  X
                </Link>
              </div>
            </div>
            <div className="self-stretch -mt-px flex flex-col text-[1rem] text-white ">
              <div className="flex-1 rounded-12xs bg-black font-ocr-x-trial border-forestgreen border-[.1875rem] border-solid box-border flex flex-col gap-[1.668rem] md:max-h-[40rem] scroller overflow-y-auto">
                <div className="flex flex-col gap-6 md:gap-[2.375rem] md:p-10 px-4 py-6 ">
                  <div className="tracking-[-0.06em] leading-[1.313rem]">## HOW IT WORKS</div>
                  <div className="flex flex-col gap-[2.375rem]">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-4">
                        <span>[ Stage 1 ] </span>
                        <span className="text-fuchsia uppercase">
                          Users wrap their WBTC to receive LBTC
                        </span>
                      </div>
                      <div className="tracking-[-0.06em] leading-[1.313rem] max-w-[29.5rem]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
                        odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed sit
                        amet sapien eget magna dapibus tincidunt. Pellentesque habitant morbi
                        tristique senectus et netus et malesuada fames ac turpis egestas.
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-4">
                        <span>[ Stage 2 ] </span>
                        <span className="text-fuchsia uppercase">
                          Users bridge their LBTC to Bitlazer’s Arbitrum L3
                        </span>
                      </div>
                      <div className="tracking-[-0.06em] leading-[1.313rem] max-w-[29.5rem]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
                        odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed sit
                        amet sapien eget magna dapibus tincidunt. Pellentesque habitant morbi
                        tristique senectus et netus et malesuada fames ac turpis egestas.
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-4">
                        <span>[ Stage 3 ] </span>
                        <span className="text-fuchsia uppercase">
                          User’s stake their LBTC and earn LBTC alongside LZR tokens
                        </span>
                      </div>
                      <div className="tracking-[-0.06em] leading-[1.313rem] max-w-[29.5rem]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
                        odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed sit
                        amet sapien eget magna dapibus tincidunt. Pellentesque habitant morbi
                        tristique senectus et netus et malesuada fames ac turpis egestas.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
