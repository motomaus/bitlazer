import React, { FC } from 'react'
import EcosystemGridItem from '../item/EcosystemGridItem'

const ecosystemData = [
  {
    imageSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/cb3ff285c3cc61f55daf5ea70a94d550cc1a5215f7d2a6e0e108fbf40c2010b2?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
    logoSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/6d398283ba44b01dd5ebc955b4096ea69656ae4231b745dc9206162305a2a9b9?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
    title: 'Airpuff',
    description: 'AirPuff emerges as the leading one-stop solution for airdrop leveraging',
    socialIcons: [
      'https://cdn.builder.io/api/v1/image/assets/TEMP/2eb9eac6089750e6482e56dbec3861f21bfca1976ec050431192fa3b8efbcb7c?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
      'https://cdn.builder.io/api/v1/image/assets/TEMP/2579ff35e3647bce0f0596ddde4aef188653bb39d53fb29557087d7c4b52b505?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
      'https://cdn.builder.io/api/v1/image/assets/TEMP/940d80b2a3d5b3c0776a23bea3461fc1c8796b0e552eb6c2a6a2d089d6a8a331?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
    ],
  },
  {
    imageSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/dc3e1a722d1e582676be0f1b0e2877fa7202737fe34f8b1e738b37a6a57fd3b2?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
    logoSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/91ea31bb9caa7fdce65d97844a8c3eafcbf0ae23f28d9744687c581083cd4aa7?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
    title: 'Aori',
    description:
      'Build institutional grade defi applications for decentralized options trading, spot trading, and otc settlement',
    socialIcons: [
      'https://cdn.builder.io/api/v1/image/assets/TEMP/3dc88ff82cc68bc5974f31bf795a4db059c91d9bcc0f9bddf25fcb4cc2cc65a0?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
      'https://cdn.builder.io/api/v1/image/assets/TEMP/80936c85e0ce80e390519cc5653f2970439b482dd1a8f17aedd82230d8145623?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
      'https://cdn.builder.io/api/v1/image/assets/TEMP/5798e56d9048145365dbb05e09624f041bc4f4f41510f265e758a8cce0923542?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
    ],
  },
  {
    imageSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/dc81dbd1751b2f5081e824398817a2b21dd308b92176d07db42d9d6ccb89f427?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
    logoSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/6e81f39b8054cd09724dbad9cf22a2a346efaf9fe7a54c301340f94ebe9b52f9?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
    title: 'Astaria',
    description: 'Astaria allows permissionless leverage for any asset.',
    socialIcons: [
      'https://cdn.builder.io/api/v1/image/assets/TEMP/c5941706cf5d4ab1f9a0a2d7a69dcfb4870cc27883a50c6835b3f6862dcffbf0?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
      'https://cdn.builder.io/api/v1/image/assets/TEMP/f02dd6ee7a40e8295b4478ead307bbe0faadb8e0e4e14e183f4fa7d27d9cfe59?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
      'https://cdn.builder.io/api/v1/image/assets/TEMP/deceae9aca88d3f3ccf05258a14d3d1bb76a6ec60b1d63d501427b5eb4c10ba1?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
    ],
  },
  {
    imageSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/c4877c30a480f713a6886d58382a481cf149b59f1c510ea3051444b1af3e2888?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
    logoSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/e56e8031f8182bb1f1c6a3d0cd6285b61d01bfb283b1007903ae418db44a299d?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
    title: 'Atlendis',
    description: 'First RWA Lending Protocol',
    socialIcons: [
      'https://cdn.builder.io/api/v1/image/assets/TEMP/953a37bb074fb288bf186d6b8a9e26b540689bbdb8c3f851fb7fd6371c549c17?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
      'https://cdn.builder.io/api/v1/image/assets/TEMP/3be8c5fed15eabf035781819477546226df57b2b13f7269688c231dc78b19801?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
      'https://cdn.builder.io/api/v1/image/assets/TEMP/f94f15e5d5ac43e3a38964b601ada7e079c181fc2a938d110a1530b682c878d8?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
    ],
  },
  {
    imageSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/9ee3190e36e73cfdbbda46b222e219eed2d9808251a9ce69e36156eec4ca10d4?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
    logoSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/53e0bc04097a2dbed714f1a3de98d0c6c905be6014063326fcaa1e32c0bf0125?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
    title: 'Bebop',
    description: 'Bebop is a trading app and a suite of APIs that finds the best route for your trades.',
    socialIcons: [
      'https://cdn.builder.io/api/v1/image/assets/TEMP/4875d2911abe29e289e33931d2500a30a533ef167edabb1fc97a86c7b363f40b?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
      'https://cdn.builder.io/api/v1/image/assets/TEMP/1a831af50b2d54b8fb0b3165faafbbdefdc41fabdbdd7f67611e058df7a5792c?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
      'https://cdn.builder.io/api/v1/image/assets/TEMP/5d3bff4c2a0c5d55ff9d693fca894a39ad0c91d8b639d01f14af776cb41b9b8a?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
    ],
  },
  {
    imageSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/b33b8bca965aac75464ad9661d915b1ca74af2d07833e3942ad1bd5d085d3c74?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
    logoSrc:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/9af6a2c6982726fa011d791cc1cd127b740c4db201e41d4fb8cb6ab4ff94768d?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
    title: 'Beefy',
    description: 'Beefy automates yield farming to make DeFi easy, safe and efficient for all.',
    socialIcons: [
      'https://cdn.builder.io/api/v1/image/assets/TEMP/df3543679a7c1e42c1ea44fc84283109fc4c945501debff32bb20c9448c01eb5?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
      'https://cdn.builder.io/api/v1/image/assets/TEMP/6c6a34520099b3f0f066bf809fba8ccb2a75a85541f3ce1c6217829d53493cc2?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
      'https://cdn.builder.io/api/v1/image/assets/TEMP/60194fc63c26674b63551bd7ef7572844b6b0d292a8f049a9211675d7f4f08c6?placeholderIfAbsent=true&apiKey=2d69966dae52443ca1418044351bbca9',
    ],
  },
]

interface IEcosystemGrid {}

const EcosystemGrid: FC<IEcosystemGrid> = () => {
  return (
    <div className="">
      <div className="grid md:grid-cols-3 gap-5">
        {ecosystemData.map((item, index) => (
          <EcosystemGridItem key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

export default EcosystemGrid
