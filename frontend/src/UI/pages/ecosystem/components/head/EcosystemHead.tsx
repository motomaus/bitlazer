import { Button } from '@components/index'
import React, { FC } from 'react'

interface IEcosystemHead {}

const EcosystemHead: FC<IEcosystemHead> = () => {
  return (
    <section className="flex flex-col justify-center items-center text-center min-h-screen py-10">
      <h1 className="self-center text-[4rem] text-white uppercase leading-[4.375rem] max-md:text-4xl max-md:leading-10 font-ocr-x-trial">
        Explore the Mode <br />
        <span className="text-lightgreen-100">ecosystem</span>
      </h1>
      <p className="self-center mt-7 text-base leading-tight text-white uppercase">The center of community</p>

      <Button className="mt-16 w-auto"> Add Your dapp</Button>
    </section>
  )
}

export default EcosystemHead
