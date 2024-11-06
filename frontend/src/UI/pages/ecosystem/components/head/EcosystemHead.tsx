import { Button } from '@components/index'
import React, { FC } from 'react'

interface IEcosystemHead {}

const EcosystemHead: FC<IEcosystemHead> = () => {
  return (
    <section className="flex flex-col gap-16 justify-center items-center text-center min-h-[85vh] pt-20 pb-5">
      <div className="flex flex-col items-center gap-3">
        <h1 className="m-0 md:text-[4rem] text-white uppercase md:leading-[4.375rem] text-[3.8rem] leading-none font-ocr-x-trial">
          Explore the Mode <br />
          <span className="text-lightgreen-100">ecosystem</span>
        </h1>
        <p className="m-0 text-base leading-tight text-white uppercase">The center of community</p>
      </div>
      <div>
        <Button className="w-auto uppercase"> Add Your dapp</Button>
      </div>
    </section>
  )
}

export default EcosystemHead
