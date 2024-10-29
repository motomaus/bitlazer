import React from 'react'

export interface IEcosystemItem {
  imageSrc: string
  logoSrc: string
  title: string
  description: string
  socialIcons: string[]
}

const EcosystemItem: React.FC<IEcosystemItem> = ({ imageSrc, logoSrc, title, description, socialIcons }) => {
  return (
    <article className="overflow-hidden rounded-xl bg-neutral-800">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-[73%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            src={imageSrc}
            alt=""
            className="object-contain grow w-full aspect-[1.72] max-md:mt-8 max-md:max-w-full"
          />
        </div>
        <div className="flex flex-col ml-5 w-[27%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col items-start self-stretch my-auto w-full max-md:mt-10">
            <img
              loading="lazy"
              src={logoSrc}
              alt={`${title} logo`}
              className="object-contain w-16 rounded-xl aspect-square"
            />
            <h2 className="mt-7 text-2xl leading-tight text-white uppercase">{title}</h2>
            <p className="self-stretch mt-3.5 text-sm leading-4 text-white uppercase">{description}</p>
            <div className="flex gap-2.5 mt-56 max-md:mt-10">
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
          </div>
        </div>
      </div>
    </article>
  )
}

export default EcosystemItem
