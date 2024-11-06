import { Button } from '@components/index'
import React, { FC } from 'react'

interface IEcosystemHead {}

const EcosystemHead: FC<IEcosystemHead> = () => {
  return (
    <section className="flex flex-col gap-16 justify-center items-center text-center min-h-[85vh] pt-20 pb-5 flex flex-col items-center text-center text-[2.5rem] text-white font-ocrx">
      <div className="flex flex-col items-center gap-3 text-center text-[3rem] text-white font-ocrx">
        <h1 className="m-0 max-w-[32.1rem] w-full text-inherit uppercase font-normal">
          {/* <h1 className="m-0 md:text-[2.5rem] text-white uppercase md:leading-[4.375rem] text-[2.8rem] leading-none font-ocrx font-thin"> */}
          Explore the Bitlazer <br />
          <span className="text-lightgreen-100">ecosystem</span>
        </h1>
        <div className="max-w-[32.131rem] relative text-[1.25rem] tracking-[-0.06em] leading-[1.625rem] font-maison-neue">
          The center of Bitlazer Dapps
        </div>
      </div>
      <div>
        <Button link="https://ga82o8jex7e.typeform.com/to/j9Otl7Fc" target="_blank" className="w-auto uppercase">
          Add Your dapp
        </Button>
      </div>
    </section>
  )
}

export default EcosystemHead
