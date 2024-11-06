import React, { FC, useState } from 'react'
import EcosystemGridItem from '../item/EcosystemGridItem'

import { useMediaQuery } from 'react-responsive'

import image0 from '@images/ecosystem/image0.jpg'
import image1 from '@images/ecosystem/image1.jpg'
import image2 from '@images/ecosystem/image2.jpg'
import image3 from '@images/ecosystem/image3.jpg'
import image4 from '@images/ecosystem/image4.jpg'
import image5 from '@images/ecosystem/image5.jpg'
import image6 from '@images/ecosystem/image6.png'

import logo0 from '@images/ecosystem/logo0.png'
import logo1 from '@images/ecosystem/logo1.png'
import logo2 from '@images/ecosystem/logo2.png'
import logo3 from '@images/ecosystem/logo3.png'
import logo4 from '@images/ecosystem/logo4.png'
import logo5 from '@images/ecosystem/logo5.png'
import logo6 from '@images/ecosystem/logo6.png'
import EcosystemItem, { IEcosystemItem, TypeEcosystemLiveness, TypeEcosystemTag } from '../item/EcosystemItem'
import { DiscordIcon, LinkIcon, XIcon } from '@svgs'
import { InputField, MySelect } from '@components/index'

const ecosystemData: IEcosystemItem[] = [
  {
    imageSrc: image0,
    logoSrc: logo0,
    title: 'Mode Bridge',
    description: 'The Mode Bridge allows you to transfer your assets between L1 and Mode',
    socialIcons: [
      {
        icon: <LinkIcon />,
        href: 'http://',
      },
      {
        icon: <XIcon />,
        href: 'http://',
      },
      {
        icon: <DiscordIcon />,
        href: 'http://',
      },
    ],
  },
  {
    imageSrc: image1,
    logoSrc: logo1,
    title: 'Airpuff',
    description: 'AirPuff emerges as the leading one-stop solution for airdrop leveraging',
    tag: 'bridge',
    liveness: 'live',
    socialIcons: [
      {
        icon: <LinkIcon />,
        href: 'http://',
      },
      {
        icon: <XIcon />,
        href: 'http://',
      },
      {
        icon: <DiscordIcon />,
        href: 'http://',
      },
    ],
  },
  {
    imageSrc: image2,
    logoSrc: logo2,
    title: 'Aori',
    description:
      'Build institutional grade defi applications for decentralized options trading, spot trading, and otc settlement',
    tag: 'defi',
    liveness: 'live',
    socialIcons: [
      {
        icon: <LinkIcon />,
        href: 'http://',
      },
      {
        icon: <XIcon />,
        href: 'http://',
      },
      {
        icon: <DiscordIcon />,
        href: 'http://',
      },
    ],
  },
  {
    imageSrc: image3,
    logoSrc: logo3,
    title: 'Astaria',
    description: 'Astaria allows permissionless leverage for any asset.',
    tag: 'gaming',
    liveness: 'upcoming',
    socialIcons: [
      {
        icon: <LinkIcon />,
        href: 'http://',
      },
      {
        icon: <XIcon />,
        href: 'http://',
      },
      {
        icon: <DiscordIcon />,
        href: 'http://',
      },
    ],
  },
  {
    imageSrc: image4,
    logoSrc: logo4,
    title: 'Atlendis',
    description: 'First RWA Lending Protocol',
    tag: 'infra',
    liveness: 'live',
    socialIcons: [
      {
        icon: <LinkIcon />,
        href: 'http://',
      },
      {
        icon: <XIcon />,
        href: 'http://',
      },
      {
        icon: <DiscordIcon />,
        href: 'http://',
      },
    ],
  },
  {
    imageSrc: image5,
    logoSrc: logo5,
    title: 'Bebop',
    description: 'Bebop is a trading app and a suite of APIs that finds the best route for your trades.',
    tag: 'infra',
    socialIcons: [
      {
        icon: <LinkIcon />,
        href: 'http://',
      },
      {
        icon: <XIcon />,
        href: 'http://',
      },
      {
        icon: <DiscordIcon />,
        href: 'http://',
      },
    ],
  },
  {
    imageSrc: image6,
    logoSrc: logo6,
    title: 'Beefy',
    description: 'Beefy automates yield farming to make DeFi easy, safe and efficient for all.',
    tag: 'bridge',
    liveness: 'upcoming',
    socialIcons: [
      {
        icon: <LinkIcon />,
        href: 'http://',
      },
      {
        icon: <XIcon />,
        href: 'http://',
      },
      {
        icon: <DiscordIcon />,
        href: 'http://',
      },
    ],
  },
]

const tagOptions = [
  { value: 'defi', label: 'DeFi' },
  { value: 'bridge', label: 'Bridge' },
  { value: 'infra', label: 'Infra' },
  { value: 'gaming', label: 'Gaming' },
]

const livenessOptions = [
  { value: 'live', label: 'Live' },
  { value: 'upcoming', label: 'Upcoming' },
]

interface IEcosystemGrid {}

const EcosystemGrid: FC<IEcosystemGrid> = () => {
  const isDesktop = useMediaQuery({ minWidth: 992 })

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<TypeEcosystemTag | null>(null)
  const [selectedLiveness, setSelectedLiveness] = useState<TypeEcosystemLiveness | null>(null)

  const filteredData = ecosystemData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag ? item.tag === selectedTag : true
    const matchesLiveness = selectedLiveness ? item.liveness === selectedLiveness : true
    return matchesSearch && matchesTag && matchesLiveness
  })

  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedTag(null)
    setSelectedLiveness(null)
  }

  return (
    <div className="flex flex-col gap-10 md:gap-20">
      <div className="w-full flex flex-col gap-2 md:gap-4 [&_*]:!pointer-events-auto">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <div className="grid grid-cols-2 gap-2 md:gap-4 flex-1">
            <MySelect
              placeholder="Filter by tags"
              options={tagOptions}
              value={selectedTag ? { value: selectedTag, label: selectedTag } : null}
              onChange={(option) => setSelectedTag(option?.value as TypeEcosystemTag)}
            />
            <MySelect
              placeholder="Filter by liveness"
              options={livenessOptions}
              value={selectedLiveness ? { value: selectedLiveness, label: selectedLiveness } : null}
              onChange={(option) => setSelectedLiveness(option?.value as TypeEcosystemLiveness)}
            />
          </div>
          <button onClick={handleResetFilters} className="h-[2.875rem] w-[2.875rem] custom-button">
            X
          </button>
        </div>
        <InputField
          withoutShadow
          placeholder="Search..."
          className="custom-input h-[2.875rem] min-h-[2.875rem]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-10 md:gap-20">
        {filteredData.length > 0 ? (
          <>
            {isDesktop && <EcosystemItem {...filteredData[0]} />}
            <div className={`grid gap-5 ${isDesktop ? 'md:grid-cols-3' : 'grid-cols-1'}`}>
              {isDesktop
                ? filteredData.slice(1).map((item, index) => <EcosystemGridItem key={index} {...item} />)
                : filteredData.map((item, index) => <EcosystemGridItem key={index} {...item} />)}
            </div>
          </>
        ) : (
          <p>No results found. Try adjusting your filters or search term.</p>
        )}
      </div>
    </div>
  )
}

export default EcosystemGrid
