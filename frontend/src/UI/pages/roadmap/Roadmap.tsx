import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface IRoadmap {}

const Roadmap: FC<IRoadmap> = () => {
  return (
    <div className="w-full min-h-screen relative overflow-hidden flex flex-col justify-center md:py-28 py-32 pt-28">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="max-w-[41.375rem] w-full flex flex-col gap-[0.031rem]">
            <div className="self-stretch rounded-[.115rem] bg-forestgreen flex flex-col  py-[0.187rem] px-[0.125rem]">
              <div className="self-stretch shadow-[-1.8px_-0.9px_3.69px_rgba(215,_215,_215,_0.18)_inset,_1.8px_1.8px_1.84px_rgba(0,_0,_0,_0.91)_inset] rounded-[.115rem] bg-darkolivegreen-200 flex flex-row items-center justify-between py-[0.25rem] pl-[0.875rem] pr-[0.25rem] gap-[1.25rem] mq450:flex-wrap">
                <div className="text-lightgreen-100 font-ocr-x-trial text-[1.25rem] uppercase">
                  ROADMAP
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
                  <div className="tracking-[-0.06em] leading-[1.313rem]">
                    ## WHERE THIS IS GOING
                  </div>
                  <div className="flex flex-col gap-[2.375rem]">
                    <div className="flex flex-col gap-4">
                      <div>
                        <span>[ Stage 1 | </span>
                        <span className="text-fuchsia uppercase">Launch and Bridging</span>
                        <span> ] </span>
                      </div>
                      <div className="tracking-[-0.06em] leading-[1.313rem] max-w-[29.5rem]">
                        <p className="m-0">
                          / Bitlazer launch, enabling the bridging of WBTC to Arbitrum L3.
                        </p>
                        <p className="m-0">/ Staking and yield enabled.</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <span>[ Stage 2 | </span>
                        <span className="text-fuchsia uppercase">
                          Ecosystem Bootstrap with LZR Airdrop
                        </span>
                        <span> ] </span>
                      </div>
                      <div className="tracking-[-0.06em] leading-[1.313rem] max-w-[29.5rem]">
                        <p className="m-0">
                          / Conduct an airdrop of 20% of LZR tokens to early community builders.
                        </p>
                        <p className="m-0">
                          / Encourage the creation of decentralized applications (dApps) and
                          innovative projects on the platform.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <span>[ Stage 3 | </span>
                        <span className="text-fuchsia uppercase">STAKE</span>
                        <span> ] </span>
                      </div>
                      <div className="tracking-[-0.06em] leading-[1.313rem] max-w-[29.5rem]">
                        <p className="m-0">
                          / Implement a native BTC bridge using a light client with Stylus smart
                          contracts on Arbitrum.
                        </p>
                        <p className="m-0">
                          / Facilitate seamless transfers and interactions with native BTC within
                          the Bitlazer ecosystem.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <span>[ Stage 4 | </span>
                        <span className="uppercase text-fuchsia">Earn yield</span>
                        <span> ] </span>
                      </div>
                      <div className="tracking-[-0.06em] leading-[1.313rem] max-w-[29.5rem]">
                        <p className="m-0">
                          / Optimize transaction sequencing and withdrawal processing.
                        </p>
                        <p className="m-0">
                          / Enable native sequencing of L3 roll-up payloads and withdrawals,
                          ensuring secure handling of native BTC requests.
                        </p>
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

export default Roadmap
