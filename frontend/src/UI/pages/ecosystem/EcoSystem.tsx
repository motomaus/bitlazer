import React, { FC } from 'react'
import { EcosystemGrid, EcosystemHead, EcosystemItem } from './components'

interface IEcoSystem {}

const EcoSystem: FC<IEcoSystem> = () => {
  return (
    <div className="flex flex-col pb-32">
      <div className="max-w-[77.5rem] w-full px-5 mx-auto">
        <div className="flex flex-col gap-10 md:gap-20">
          <EcosystemHead />
          <EcosystemItem
            imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/12a4e17894619b425efac701fdcad01b05797731e026a50e6d5aefd3643ac66d?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9"
            logoSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/e91c4d162afb8877ad6a0709d33e4c308219eca99593da05310ec196c1cdea9b?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9"
            title="Mode Bridge"
            description="The Mode Bridge allows you to transfer your assets between L1 and Mode"
            socialIcons={[
              'https://cdn.builder.io/api/v1/image/assets/TEMP/ecc21e10112f0b540417a8643e71152cfb40fc58ff8cd187931f5be9338ec151?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
              'https://cdn.builder.io/api/v1/image/assets/TEMP/b7fefec358cea471cf6288ab60537ee285e00b3d77982062506c8eb9c4b4e5df?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
              'https://cdn.builder.io/api/v1/image/assets/TEMP/98f280f9f68761b01e7d7ed0527c542e62aba33e929b7c04613403ea8526da7a?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
            ]}
          />
          <EcosystemGrid />
        </div>
      </div>
    </div>
  )
}

export default EcoSystem
