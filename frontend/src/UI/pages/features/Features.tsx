import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import img1 from '../../../assets/images/group-1364.svg'
import img2 from '../../../assets/images/group-1365.svg'
import img3 from '../../../assets/images/group-1366.svg'
import img4 from '../../../assets/images/group-1367.svg'

interface IFeatures {}

const Features: FC<IFeatures> = () => {
  return (
    <div className="w-full min-h-screen relative overflow-hidden flex flex-col justify-center md:py-28 py-32 pt-28">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="max-w-[50rem] w-full flex flex-col gap-[0.031rem]">
            <div className="self-stretch rounded-[.115rem] bg-forestgreen flex flex-col  py-[0.187rem] px-[0.125rem]">
              <div className="self-stretch shadow-[-1.8px_-0.9px_3.69px_rgba(215,_215,_215,_0.18)_inset,_1.8px_1.8px_1.84px_rgba(0,_0,_0,_0.91)_inset] rounded-[.115rem] bg-darkolivegreen-200 flex flex-row items-center justify-between py-[0.25rem] pl-[0.875rem] pr-[0.25rem] gap-[1.25rem] mq450:flex-wrap">
                <div className="text-lightgreen-100 font-ocr-x-trial text-[1.25rem] uppercase">
                  KEY FEATURES
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
              <ul className="flex-1 rounded-12xs bg-black font-ocr-x-trial border-forestgreen border-[.1875rem] border-solid box-border flex flex-col md:max-h-[40rem] scroller overflow-y-auto">
                <li className="flex flex-col md:p-10 md:pl-20 px-4 py-6 border-forestgreen border-0 border-b-[.1875rem] border-solid last:!border-0">
                  <div className="flex md:flex-row flex-col items-center gap-6 md:gap-[4.187rem]">
                    <div className="md:h-[11.588rem] md:w-[10.763rem] h-[8rem] w-[8rem] flex-shrink-0">
                      <img
                        className="w-full h-full object-contain"
                        loading="lazy"
                        alt=""
                        src={img1}
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                      <div className="uppercase text-xl">Native BTC Yield</div>
                      <div className="text-base tracking-[-0.06em] leading-[1.313rem] font-maison-neue-trial">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
                        odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed sit
                        amet sapien eget magna dapibus tincidunt. Pellentesque habitant morbi
                        tristique senectus et netus et malesuada fames ac turpis egestas.
                      </div>
                    </div>
                  </div>
                </li>
                <li className="flex flex-col md:p-10 md:pl-20 px-4 py-6 border-forestgreen border-0 border-b-[.1875rem] border-solid last:!border-0">
                  <div className="flex md:flex-row flex-col items-center gap-6 md:gap-[4.187rem]">
                    <div className="md:h-[11.588rem] md:w-[10.763rem] h-[8rem] w-[8rem] flex-shrink-0">
                      <img
                        className="w-full h-full object-contain"
                        loading="lazy"
                        alt=""
                        src={img2}
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                      <div className="uppercase text-xl">Seamless Bridging</div>
                      <div className="text-base tracking-[-0.06em] leading-[1.313rem] font-maison-neue-trial">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
                        odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed sit
                        amet sapien eget magna dapibus tincidunt. Pellentesque habitant morbi
                        tristique senectus et netus et malesuada fames ac turpis egestas.
                      </div>
                    </div>
                  </div>
                </li>
                <li className="flex flex-col md:p-10 md:pl-20 px-4 py-6 border-forestgreen border-0 border-b-[.1875rem] border-solid last:!border-0">
                  <div className="flex md:flex-row flex-col items-center gap-6 md:gap-[4.187rem]">
                    <div className="md:h-[11.588rem] md:w-[10.763rem] h-[8rem] w-[8rem] flex-shrink-0">
                      <img
                        className="w-full h-full object-contain"
                        loading="lazy"
                        alt=""
                        src={img3}
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                      <div className="uppercase text-xl">Fast Settlements</div>
                      <div className="text-base tracking-[-0.06em] leading-[1.313rem] font-maison-neue-trial">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
                        odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed sit
                        amet sapien eget magna dapibus tincidunt. Pellentesque habitant morbi
                        tristique senectus et netus et malesuada fames ac turpis egestas.
                      </div>
                    </div>
                  </div>
                </li>
                <li className="flex flex-col md:p-10 md:pl-20 px-4 py-6 border-forestgreen border-0 border-b-[.1875rem] border-solid last:!border-0">
                  <div className="flex md:flex-row flex-col items-center gap-6 md:gap-[4.187rem]">
                    <div className="md:h-[11.588rem] md:w-[10.763rem] h-[8rem] w-[8rem] flex-shrink-0">
                      <img
                        className="w-full h-full object-contain"
                        loading="lazy"
                        alt=""
                        src={img4}
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                      <div className="uppercase text-xl">low fees</div>
                      <div className="text-base tracking-[-0.06em] leading-[1.313rem] font-maison-neue-trial">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia
                        odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Sed sit
                        amet sapien eget magna dapibus tincidunt. Pellentesque habitant morbi
                        tristique senectus et netus et malesuada fames ac turpis egestas.
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features
