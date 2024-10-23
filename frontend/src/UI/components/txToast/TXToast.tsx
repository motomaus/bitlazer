import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'

import MyModal from '@components/modal/MyModal'
import HowItWorks from '@pages/how-it-works/HowItWorks'
import ConnectWallet from '@pages/connect-wallet/ConnectWallet'
import Roadmap from '@pages/roadmap/Roadmap'
import Features from '@pages/features/Features'

interface ITXToast {
    message: string,
    txHash?: string
}

const TXToast: FC<ITXToast> = ({ message, txHash }) => {

    return (
        <div>
            <p>
                {message}
            </p>
            {
                txHash && (
                    <a href={`https://sepolia.arbiscan.io/tx/${txHash}`}>
                        View on Arbitrum Scan
                    </a>
                )
            }
        </div>
    )
}

export default TXToast
