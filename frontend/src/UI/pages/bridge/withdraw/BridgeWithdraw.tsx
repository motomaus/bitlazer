import React, { FC } from 'react'

interface IBridgeWithdraw {}

const BridgeWithdraw: FC<IBridgeWithdraw> = () => {
  return (
    <form className="flex flex-col gap-7">
      <div className="flex flex-col gap-[0.687rem] max-w-full">
        <div className="relative tracking-[-0.06em] leading-[1.25rem] mb-1">## WITHDRAW</div>
        <div className="relative tracking-[-0.06em] leading-[1.25rem]">ENTER AMOUNT</div>
        <label className="shadow-[0px_0px_12px_#68d861] rounded-[1.84px] relative w-full  ">
          <span className="shadow-[-1.8px_-0.9px_3.69px_rgba(215,_215,_215,_0.31)_inset,_1.8px_1.8px_1.84px_rgba(104,_216,_97,_0.22)_inset] rounded-[.115rem] w-full block h-full">
            <input
              type="text"
              value={'0.00'}
              className="placeholder:lightgreen-300 text-lightgreen-100 py-[0.812rem] px-[1.25rem] text-[1.25rem] rounded-[.115rem] w-full font-ocr-x-trial text-center "
            />
          </span>
        </label>
        <div className="flex flex-row items-center justify-between gap-[1.25rem] text-gray-200">
          <div className="tracking-[-0.06em] leading-[1.25rem] inline-block">
            Balance: 2,321.99 WBTC
          </div>
          <button className="shadow-[1.8px_1.8px_1.84px_#66d560_inset] rounded-[.115rem] bg-darkolivegreen-200 flex flex-row items-start justify-start pt-[0.287rem] pb-[0.225rem] pl-[0.437rem] pr-[0.187rem] shrink-0 text-[0.813rem] text-lightgreen-100">
            <span className="relative tracking-[-0.06em] leading-[0.563rem] inline-block [text-shadow:0.2px_0_0_#66d560,_0_0.2px_0_#66d560,_-0.2px_0_0_#66d560,_0_-0.2px_0_#66d560] min-w-[1.75rem]">
              MAX
            </span>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-[0.687rem]">
        <button className="font-ocr-x-trial w-full cursor-pointer rounded-[.115rem] h-[2.875rem] text-lightgreen-100 text-[1.25rem] whitespace-nowrap bg-forestgreen flex py-[0.187rem] px-[0.125rem] transition-all duration-300 group">
          <span className="px-[0.875rem] h-full bg-darkolivegreen-200 shadow-[-1.8px_-0.9px_3.69px_rgba(215,_215,_215,_0.18)_inset,_1.8px_1.8px_1.84px_rgba(0,_0,_0,_0.91)_inset] rounded-[.115rem] flex items-center justify-center text-center transition-all duration-300 group-hover:bg-darkolivegreen-100 w-full">
            WITHDRAW
          </span>
        </button>
      </div>
    </form>
  )
}

export default BridgeWithdraw
