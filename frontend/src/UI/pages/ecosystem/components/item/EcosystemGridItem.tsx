import React from 'react'
import { IEcosystemItem } from './EcosystemItem'

interface IEcosystemGridItem extends IEcosystemItem {}

const EcosystemGridItem: React.FC<IEcosystemGridItem> = ({ imageSrc, logoSrc, title, description, socialIcons }) => {
  return (
    <article className="flex overflow-hidden flex-col items-center px-2 pt-2 pb-11 w-full rounded-xl bg-neutral-800 max-md:mt-8">
      <div className="flex overflow-hidden relative flex-col gap-5 justify-between items-start self-stretch px-3 pt-3 pb-40 w-full text-sm font-medium leading-none uppercase whitespace-nowrap aspect-[1.815] text-neutral-500 max-md:pb-24">
        <img loading="lazy" src={imageSrc} alt="" className="object-cover absolute inset-0 size-full" />
        <span className="relative px-3 py-2.5 bg-lightgreen-100 rounded">DeFi</span>
        <span className="relative px-3 py-2.5 bg-lightgreen-100 rounded">Live</span>
      </div>
      <img
        loading="lazy"
        src={logoSrc}
        alt={`${title} logo`}
        className="object-contain z-10 -mt-8 w-16 rounded-xl aspect-square"
      />
      <h2 className="mt-10 text-2xl leading-tight text-white uppercase">{title}</h2>
      <p className="mt-3.5 text-sm leading-4 text-center text-white uppercase">{description}</p>
      <div className="flex gap-2.5 mt-11 max-w-full w-[116px] max-md:mt-10">
        {socialIcons.map((icon, index) => (
          <img
            key={index}
            loading="lazy"
            src={icon}
            alt={`Social icon ${index + 1}`}
            className="object-contain shrink-0 w-8 aspect-square"
          />
        ))}
      </div>
    </article>
  )
}

export default EcosystemGridItem
