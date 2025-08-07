import React, { FC } from 'react'
import { EcosystemGrid, EcosystemHead } from './components'

interface IEcoSystem {}

const EcoSystem: FC<IEcoSystem> = () => {
  return (
    <div className="flex flex-col pb-40">
      <div className="max-w-[77.5rem] w-full px-5 mx-auto">
        <div className="flex flex-col gap-10 md:gap-20">
          <EcosystemHead />
          <EcosystemGrid />
        </div>
      </div>
    </div>
  )
}

export default EcoSystem
