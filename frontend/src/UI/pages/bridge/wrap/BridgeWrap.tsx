import { Button, InputField, TXToast } from '@components/index'
import React, { FC, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useAccount, useBalance, useReadContract, useSwitchChain } from 'wagmi'
import { erc20Abi, formatUnits } from 'viem'
import { waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { arbitrum, mainnet } from 'wagmi/chains'
import { config } from 'src/web3/config'
import { ERC20_CONTRACT_ADDRESS, TokenKeys, WRAP_CONTRACT } from 'src/web3/contracts'
import { lzrBTC_abi } from 'src/assets/abi/lzrBTC'
import { parseEther, formatEther } from 'ethers/lib/utils'
import { toast } from 'react-toastify'
import { BigNumber } from 'ethers/lib/ethers'
import Cookies from 'universal-cookie'
import { handleChainSwitch } from 'src/web3/functions'
import { use } from 'i18next'

interface IBridgeWrap {}

const BridgeWrap: FC<IBridgeWrap> = () => {
  const [selectedToken, setSelectedToken] = useState<TokenKeys>('wbtc')
  const [selectedTokenUnwrap, setSelectedTokenUnwrap] = useState<TokenKeys>('wbtc')
  const { switchChain } = useSwitchChain()
  const { address, isConnected, chainId } = useAccount()
  const [approval, setApproval] = useState<boolean>(false)
  const [refresh, setRefresh] = useState<boolean>(false)
  const [reverseApproval, setReverseApproval] = useState<boolean>(false)
  const [holderBalance, setHolderBalance] = useState<string | undefined>(undefined)

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      amount: '',
    },
    mode: 'onChange',
  })

  const {
    handleSubmit: handleUnwrapSubmit,
    control: unwrapControl,
    setValue: unwrapSetValue,
    watch: unwrapWatch,
    getValues: unwrapGetValues,
    trigger: unwrapTrigger,
    formState: { errors: unwrapErrors, isValid: isUnwrapValid },
  } = useForm({
    defaultValues: {
      amount: '',
    },
    mode: 'onChange',
  })

  const { data: balanceData, isLoading: balanceLoading } = useBalance({
    address,
    token: ERC20_CONTRACT_ADDRESS[selectedToken],
    chainId: arbitrum.id,
    scopeKey: refresh.toString(),
  })

  const { data: lzrBTCBalanceData, isLoading: lzrBTCBalanceLoading } = useBalance({
    address,
    token: ERC20_CONTRACT_ADDRESS['lzrBTC'],
    chainId: arbitrum.id,
    scopeKey: refresh.toString(),
  })

  const { data: wbtcBalance, isLoading: wbtcBalanceLoading } = useBalance({
    address,
    token: ERC20_CONTRACT_ADDRESS['wbtc'],
    chainId: arbitrum.id,
    scopeKey: refresh.toString(),
  })

  const { data: approvalData, isLoading: isLoadingApproval } = useReadContract({
    abi: erc20Abi,
    address: ERC20_CONTRACT_ADDRESS[selectedToken],
    functionName: 'allowance',
    args: [address || '0x', WRAP_CONTRACT],
    chainId: arbitrum.id,
    scopeKey: refresh.toString(),
  })

  const { data: reverseApprovalData } = useReadContract({
    abi: erc20Abi,
    address: WRAP_CONTRACT,
    functionName: 'allowance',
    args: [address || '0x', ERC20_CONTRACT_ADDRESS[selectedToken]],
    chainId: arbitrum.id,
    scopeKey: refresh.toString(),
  })

  // getHolderBalance

  const { data: wbtcHolderBalance } = useReadContract({
    abi: lzrBTC_abi,
    address: WRAP_CONTRACT,
    functionName: 'getHolderBalance',
    args: [address || '0x', ERC20_CONTRACT_ADDRESS['wbtc']],
    chainId: arbitrum.id,
    scopeKey: refresh.toString(),
  })

  // Check if WBTC is supported
  const { data: supportedWBTC } = useReadContract({
    abi: lzrBTC_abi,
    address: WRAP_CONTRACT,
    functionName: 'supportedWrappers',
    args: [ERC20_CONTRACT_ADDRESS['wbtc']],
    chainId: arbitrum.id,
    scopeKey: refresh.toString(),
  })

  useEffect(() => {
    if (selectedTokenUnwrap === 'wbtc') {
      setHolderBalance(wbtcHolderBalance as string)
    }
  }, [selectedTokenUnwrap, wbtcHolderBalance])

  useEffect(() => {
    if (approvalData !== undefined) {
      if (BigNumber.from(approvalData).gte(parseEther(getValues('amount') || '0'))) {
        setApproval(true)
      } else {
        setApproval(false)
      }
    }
  }, [approvalData, watch('amount'), refresh])

  const handleApprove = async () => {
    const amount = getValues('amount')
    const amountInWei = parseEther(amount)
    
    console.log('=== APPROVE TRANSACTION DEBUG ===')
    console.log('1. Approval amount (string):', amount)
    console.log('2. Approval amount in Wei:', amountInWei.toString())
    console.log('3. Token to approve:', selectedToken)
    console.log('4. Token contract address:', ERC20_CONTRACT_ADDRESS[selectedToken])
    console.log('5. Spender (WRAP_CONTRACT):', WRAP_CONTRACT)
    
    const approvalArgs = {
      abi: erc20Abi, // Use standard ERC20 ABI for approval
      address: ERC20_CONTRACT_ADDRESS[selectedToken],
      functionName: 'approve',
      args: [WRAP_CONTRACT, amountInWei],
    }
    
    console.log('6. Approval args:', {
      address: approvalArgs.address,
      functionName: approvalArgs.functionName,
      args: approvalArgs.args.map((arg: any) => arg.toString ? arg.toString() : arg),
    })

    let approvalTransactionHash
    try {
      console.log('7. Calling writeContract for approval...')
      approvalTransactionHash = await writeContract(config, approvalArgs)
      console.log('8. Approval transaction hash:', approvalTransactionHash)
    } catch (error: any) {
      console.log('=== APPROVAL ERROR ===')
      console.log('Error object:', error)
      console.log('Error message:', error.message)
      console.log('Error details:', error.details)
      toast(<TXToast {...{ message: 'Approval failed', error }} />)
      return
    }
    const approvalReceipt = await waitForTransactionReceipt(config, {
      hash: approvalTransactionHash,
    })
    console.log('9. Approval receipt:', approvalReceipt)
    setRefresh((prev) => !prev)
    if (approvalReceipt.status === 'success') {
      const txHash = approvalReceipt.transactionHash
      toast(<TXToast {...{ message: 'Approval successful', txHash }} />)
    } else {
      toast(<TXToast {...{ message: 'Transaction failed' }} />)
    }
    setApproval(true)
  }

  const handleDeposit = async () => {
    const amount = getValues('amount')
    const amountInWei = parseEther(amount)
    
    console.log('=== WRAP TRANSACTION DEBUG ===')
    console.log('1. Input amount (string):', amount)
    console.log('2. Amount in Wei (BigNumber):', amountInWei.toString())
    console.log('3. Selected token:', selectedToken)
    console.log('4. Token address:', ERC20_CONTRACT_ADDRESS[selectedToken])
    console.log('5. Wrap contract address:', WRAP_CONTRACT)
    console.log('6. User address:', address)
    console.log('7. Chain ID:', chainId)
    console.log('8. Is WBTC supported in contract?:', supportedWBTC)
    console.log('9. Supported WBTC address from contract:', supportedWBTC !== '0x0000000000000000000000000000000000000000' ? supportedWBTC : 'NOT SET')
    
    // Check if WBTC is properly configured
    if (supportedWBTC === '0x0000000000000000000000000000000000000000' || !supportedWBTC) {
      console.error('ERROR: WBTC is not configured as a supported wrapper in the contract!')
      toast(<TXToast {...{ message: 'WBTC is not configured in the contract. Please contact admin.' }} />)
      return
    }
    
    const args = {
      abi: lzrBTC_abi,
      address: WRAP_CONTRACT,
      functionName: 'mint',
      args: [amountInWei, ERC20_CONTRACT_ADDRESS[selectedToken]],
    } as any
    
    console.log('10. Transaction args:', {
      address: args.address,
      functionName: args.functionName,
      args: args.args.map((arg: any) => arg.toString ? arg.toString() : arg),
    })
    console.log('11. ABI being used has mint function?:', lzrBTC_abi.find((item: any) => item.name === 'mint'))

    try {
      console.log('9. Calling writeContract...')
      const transactionHash = await writeContract(config, args)
      console.log('10. Transaction hash received:', transactionHash)
      
      const receipt = await waitForTransactionReceipt(config, {
        hash: transactionHash,
      })
      console.log('11. Transaction receipt:', receipt)
      
      if (receipt.status === 'success') {
        const txHash = receipt.transactionHash
        toast(<TXToast {...{ message: 'Wrap successful', txHash }} />)
        const cookies = new Cookies()
        cookies.set('hasWrapped', 'true', { path: '/' })
      } else {
        toast(<TXToast {...{ message: 'Wrap failed' }} />)
      }
    } catch (error: any) {
      console.log('=== WRAP TRANSACTION ERROR ===')
      console.log('Error object:', error)
      console.log('Error message:', error.message)
      console.log('Error details:', error.details)
      console.log('Error cause:', error.cause)
      
      if (!error.message.includes('User rejected the request.')) {
        toast(<TXToast {...{ message: 'Failed to Wrap.' }} />)
        console.log(error.message)
      } else {
        toast(<TXToast {...{ message: 'Transaction Rejected.' }} />)
      }
    }
    setTimeout(() => {
      setRefresh((prev) => !prev)
    }, 1000)
  }

  const handleUnwrap = async () => {
    const args = {
      abi: lzrBTC_abi,
      address: WRAP_CONTRACT,
      functionName: 'burn',
      args: [parseEther(unwrapGetValues('amount')), ERC20_CONTRACT_ADDRESS[selectedTokenUnwrap]],
    } as any

    try {
      const transactionHash = await writeContract(config, args)
      const receipt = await waitForTransactionReceipt(config, {
        hash: transactionHash,
      })
      if (receipt.status === 'success') {
        const txHash = receipt.transactionHash
        toast(<TXToast {...{ message: 'Deposit successful', txHash }} />)
        const cookies = new Cookies()
        cookies.set('hasWrapped', 'true', { path: '/' })
      } else {
        toast(<TXToast {...{ message: 'Unwrap failed' }} />)
      }
    } catch (error: any) {
      if (!error.message.includes('User rejected the request.')) {
        toast(<TXToast {...{ message: 'Failed to Unwrap' }} />)
      } else {
        toast(<TXToast {...{ message: 'Transaction Rejected.' }} />)
      }
    }
    setTimeout(() => {
      setRefresh((prev) => !prev)
    }, 1000)
  }

  const onSubmit = async (data: any) => {
    approval ? handleDeposit() : handleApprove()
  }

  return (
    <div className="flex flex-col gap-7">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
        <div className="flex flex-col relative gap-[0.75rem]">
          <label className="text-lightgreen-100">## WRAP {selectedToken.toUpperCase()} TO lzrBTC</label>
          <div className="font-ocrx w-full pt-3 rounded-[.115rem] h-[2.875rem] text-lightgreen-100 text-[1.25rem] whitespace-nowrap bg-darkslategray-200 flex border border-solid border-lightgreen-100 ">
            <div className="flex-1 flex items-center justify-center h-full">
              <span className="text-lightgreen-100">WBTC</span>
            </div>
            <div className="flex items-center justify-center h-full">
              <span className="text-lightgreen-100 mx-2">→</span>
            </div>

            <div className="flex-1 flex items-center justify-center h-full">
              <span className="text-lightgreen-100">lzrBTC</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[0.687rem] max-w-full">
          <Controller
            name="amount"
            control={control}
            rules={{
              required: 'Amount is required',
              min: { value: 0.00001, message: 'Amount must be greater than 0.00001' },
              max: {
                value: balanceData?.formatted || '0',
                message: 'Amount must be less than balance',
              },
            }}
            render={({ field }) => (
              <InputField
                placeholder="0.00"
                label="ENTER AMOUNT"
                type="number"
                {...field}
                error={errors.amount ? errors.amount.message : null}
              />
            )}
          />
          <div className="flex flex-row items-center justify-between gap-[1.25rem] text-gray-200">
            <div className="tracking-[-0.06em] leading-[1.25rem] inline-block">
              Balance:{' '}
              {balanceLoading ? 'Loading...' : `${balanceData?.formatted || '0'} ${selectedToken.toUpperCase()}`}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault()
                setValue('amount', balanceData?.formatted || '0')
                trigger('amount')
              }}
              className="shadow-[1.8px_1.8px_1.84px_#66d560_inset] rounded-[.115rem] bg-darkolivegreen-200 flex flex-row items-start justify-start pt-[0.287rem] pb-[0.225rem] pl-[0.437rem] pr-[0.187rem] shrink-0 text-[0.813rem] text-lightgreen-100 disabled:opacity-40 disabled:pointer-events-none disabled:touch-none"
            >
              <span className="relative tracking-[-0.06em] leading-[0.563rem] inline-block [text-shadow:0.2px_0_0_#66d560,_0_0.2px_0_#66d560,_-0.2px_0_0_#66d560,_0_-0.2px_0_#66d560] min-w-[1.75rem]">
                MAX
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[0.687rem]">
          {chainId === arbitrum.id ? (
            <>
              <Button type="submit" disabled={!isValid || isLoadingApproval}>
                {approval ? 'WRAP' : 'APPROVE'}
              </Button>
            </>
          ) : (
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                handleChainSwitch(false)
              }}
            >
              SWITCH CHAIN
            </Button>
          )}
        </div>
      </form>

      <div className="h-px w-full bg-[#6c6c6c]"></div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleUnwrap()
        }}
        className="flex flex-col gap-7"
      >
        <div className="flex flex-col relative gap-[0.75rem]">
          <label className="text-lightgreen-100">## UNWRAP lzrBTC TO {selectedTokenUnwrap.toUpperCase()}</label>
          <div className="font-ocrx w-full pt-3 rounded-[.115rem] h-[2.875rem] text-lightgreen-100 text-[1.25rem] whitespace-nowrap bg-darkslategray-200 flex border border-solid border-lightgreen-100 ">
            <div className="flex-1 flex items-center justify-center h-full">
              <span className="text-lightgreen-100">lzrBTC</span>
            </div>
            <div className="flex items-center justify-center h-full">
              <span className="text-lightgreen-100 mx-2">→</span>
            </div>

            <div className="flex-1 flex items-center justify-center h-full">
              <span className="text-lightgreen-100">WBTC</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[0.687rem] max-w-full">
          <Controller
            name="amount"
            control={unwrapControl}
            rules={{
              required: 'Amount is required',
              min: { value: 0.001, message: 'Amount must be greater than 0.001' },
              max: {
                value: formatEther(holderBalance?.toString() || '0'),
                message: 'Amount must be less than balance',
              },
            }}
            render={({ field }) => (
              <InputField
                placeholder="0.00"
                label="ENTER AMOUNT"
                type="number"
                {...field}
                error={unwrapErrors.amount ? unwrapErrors.amount.message : null}
              />
            )}
          />
          <div className="flex flex-row items-center justify-between gap-[1.25rem] text-gray-200">
            <div className="tracking-[-0.06em] leading-[1.25rem] inline-block">
              Balance: {lzrBTCBalanceLoading ? 'Loading...' : `${formatEther(holderBalance?.toString() || '0')} lzrBTC`}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault()
                unwrapSetValue('amount', formatEther(holderBalance?.toString() || '0'))
                unwrapTrigger('amount')
              }}
              className="shadow-[1.8px_1.8px_1.84px_#66d560_inset] rounded-[.115rem] bg-darkolivegreen-200 flex flex-row items-start justify-start pt-[0.287rem] pb-[0.225rem] pl-[0.437rem] pr-[0.187rem] shrink-0 text-[0.813rem] text-lightgreen-100 disabled:opacity-40 disabled:pointer-events-none disabled:touch-none"
            >
              <span className="relative tracking-[-0.06em] leading-[0.563rem] inline-block [text-shadow:0.2px_0_0_#66d560,_0_0.2px_0_#66d560,_-0.2px_0_0_#66d560,_0_-0.2px_0_#66d560] min-w-[1.75rem]">
                MAX
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[0.687rem]">
          {/* <div className="flex flex-row items-center justify-between gap-[1.25rem]">
          <div className="relative tracking-[-0.06em] leading-[1.25rem] inline-block min-w-[4.188rem]">GAS FEE</div>
          <div className="w-[2.75rem] relative tracking-[-0.06em] leading-[1.25rem] text-right inline-block">00.00</div>
        </div> */}
          {chainId === arbitrum.id ? (
            <Button type="submit" disabled={!isUnwrapValid || holderBalance === '0'}>
              UNWRAP
            </Button>
          ) : (
            // <>
            //   {
            //     (selectedToken === 'abtc' && BigNumber.from(abtcUnwrapAllowance).gte(unwrapGetValues("amount")))
            //       || (selectedToken === 'tbtc' && BigNumber.from(tbtcUnwrapAllowance).gte(unwrapGetValues("amount")))
            //       || (selectedToken === 'wbtc' && BigNumber.from(wbtcUnwrapAllowance).gte(unwrapGetValues("amount")))
            //       ? (
            //         <Button type="submit" disabled={!isValid}>
            //           UNWRAP
            //         </Button>
            //       ) : (
            //         <Button type="submit">
            //           APPROVE
            //         </Button>
            //       )
            //   }
            // </>
            <Button
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                handleChainSwitch(false)
              }}
            >
              SWITCH CHAIN
            </Button>
          )}
          {/* <div className="h-[0.688rem] relative tracking-[-0.06em] leading-[1.25rem] text-gray-200 inline-block">
          Transaction number
        </div> */}
        </div>
      </form>
    </div>
  )
}

export default BridgeWrap
