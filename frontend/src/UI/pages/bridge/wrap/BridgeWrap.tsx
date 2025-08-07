import { Button, InputField, TXToast } from '@components/index'
import React, { FC, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useAccount, useBalance, useReadContract, useSwitchChain } from 'wagmi'
import { erc20Abi, formatUnits } from 'viem'
import { waitForTransactionReceipt, writeContract, simulateContract } from '@wagmi/core'
import { arbitrum, mainnet } from 'wagmi/chains'
import { config } from 'src/web3/config'
import { ERC20_CONTRACT_ADDRESS, TokenKeys, WRAP_CONTRACT } from 'src/web3/contracts'
import { lzrBTC_abi } from 'src/assets/abi/lzrBTC'
import { parseEther, formatEther } from 'ethers/lib/utils'
import { toast } from 'react-toastify'
import { BigNumber } from 'ethers'
import { parseUnits } from 'viem'
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

  const { data: lzrBTCBalanceData, isLoading: lzrBTCBalanceLoading, refetch: refetchLzrBTC } = useBalance({
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

  // Check if contract is paused
  const { data: isPaused } = useReadContract({
    abi: [
      {
        inputs: [],
        name: 'paused',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    address: WRAP_CONTRACT,
    functionName: 'paused',
    chainId: arbitrum.id,
  })

  // Check decimals conversion flag
  const { data: decimalsConversion } = useReadContract({
    abi: [
      {
        inputs: [],
        name: '__apply8To18DecimalsConversion',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    address: WRAP_CONTRACT,
    functionName: '__apply8To18DecimalsConversion',
    chainId: arbitrum.id,
  })

  // Check if WBTC is set as supported wrapper
  const { data: supportedWBTCAddress } = useReadContract({
    abi: [
      {
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'supportedWrappers',
        outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    address: WRAP_CONTRACT,
    functionName: 'supportedWrappers',
    args: [ERC20_CONTRACT_ADDRESS['wbtc'] as `0x${string}`],
    chainId: arbitrum.id,
  })


  useEffect(() => {
    if (selectedTokenUnwrap === 'wbtc') {
      setHolderBalance(wbtcHolderBalance as string)
    }
  }, [selectedTokenUnwrap, wbtcHolderBalance])

  useEffect(() => {
    if (approvalData !== undefined) {
      const amount = getValues('amount') || '0'
      if (!amount || amount === '0') {
        setApproval(false)
        return
      }
      
      let requiredApproval: bigint
      try {
        if (selectedToken === 'wbtc') {
          // When __apply8To18DecimalsConversion is true, the contract expects 18 decimals
          // So we need to check if the user has approved the 18-decimal amount
          const amountIn8Decimals = parseUnits(amount, 8)
          requiredApproval = amountIn8Decimals * BigInt(10 ** 10) // Convert to 18 decimals
        } else {
          requiredApproval = parseUnits(amount, 18)
        }
        
        // approvalData is already a bigint from the contract read
        if (BigInt(approvalData) >= requiredApproval) {
          setApproval(true)
        } else {
          setApproval(false)
        }
      } catch (error) {
        // Invalid amount format
        setApproval(false)
      }
    }
  }, [approvalData, watch('amount'), refresh, selectedToken])

  const handleApprove = async () => {
    const amount = getValues('amount')
    
    // For WBTC with __apply8To18DecimalsConversion, we need to approve the 18-decimal amount!
    let amountForApproval: bigint
    if (selectedToken === 'wbtc') {
      // The contract expects 18 decimals, so approve that amount
      const amountIn8Decimals = parseUnits(amount, 8)
      amountForApproval = amountIn8Decimals * BigInt(10 ** 10) // Convert to 18 decimals for approval
      console.log('WBTC approval: ', amount, ' WBTC -> ', amountIn8Decimals.toString(), ' (8 dec) -> ', amountForApproval.toString(), ' (18 dec for approval)')
    } else {
      amountForApproval = parseUnits(amount, 18) // Standard ERC20 has 18 decimals
    }
    
    console.log('=== APPROVE TRANSACTION DEBUG ===')
    console.log('1. Approval amount (string):', amount)
    console.log('2. Approval amount (bigint):', amountForApproval.toString())
    console.log('3. Token to approve:', selectedToken)
    console.log('4. Token contract address:', ERC20_CONTRACT_ADDRESS[selectedToken])
    console.log('5. Spender (WRAP_CONTRACT):', WRAP_CONTRACT)
    
    const approvalArgs = {
      abi: erc20Abi, // Use standard ERC20 ABI for approval
      address: ERC20_CONTRACT_ADDRESS[selectedToken] as `0x${string}`,
      functionName: 'approve' as const,
      args: [WRAP_CONTRACT as `0x${string}`, amountForApproval] as const,
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
    // IMPORTANT: When __apply8To18DecimalsConversion is true, the contract expects 18 decimals!
    let amountToSend: bigint
    if (selectedToken === 'wbtc') {
      // Convert WBTC from 8 decimals to 18 decimals for the contract
      const amountIn8Decimals = parseUnits(amount, 8)
      amountToSend = amountIn8Decimals * BigInt(10 ** 10) // Convert to 18 decimals
      console.log('WBTC amount for mint: ', amount, ' WBTC -> ', amountIn8Decimals.toString(), ' (8 dec) -> ', amountToSend.toString(), ' (18 dec for contract)')
    } else {
      amountToSend = parseUnits(amount, 18)
    }
    
    console.log('=== WRAP TRANSACTION DEBUG ===')
    console.log('1. Input amount (string):', amount)
    console.log('2. Amount to send (bigint):', amountToSend.toString())
    console.log('3. Selected token:', selectedToken)
    console.log('4. Token address:', ERC20_CONTRACT_ADDRESS[selectedToken])
    console.log('5. Wrap contract address:', WRAP_CONTRACT)
    console.log('6. User address:', address)
    console.log('7. Chain ID:', chainId)
    console.log('8. Contract is paused?:', isPaused)
    console.log('9. Decimals conversion enabled?:', decimalsConversion)
    console.log('10. User WBTC balance:', balanceData?.formatted)
    console.log('11. WBTC supported wrapper address:', supportedWBTCAddress)
    console.log('12. Is WBTC configured?:', supportedWBTCAddress !== '0x0000000000000000000000000000000000000000')
    console.log('13. Current WBTC allowance:', approvalData?.toString())
    
    const args = {
      abi: lzrBTC_abi,
      address: WRAP_CONTRACT as `0x${string}`,
      functionName: 'mint' as const,
      args: [amountToSend, ERC20_CONTRACT_ADDRESS[selectedToken] as `0x${string}`] as const,
    }
    
    console.log('14. Transaction args:', {
      address: args.address,
      functionName: args.functionName,
      args: args.args.map((arg: any) => arg.toString ? arg.toString() : arg),
    })
    console.log('15. ABI being used has mint function?:', lzrBTC_abi.find((item: any) => item.name === 'mint'))

    try {
      console.log('16. Calling writeContract...')
      
      // First, let's try to estimate gas to see if the transaction would succeed
      try {
        const { request } = await simulateContract(config, {
          ...args,
          account: address as `0x${string}`,
        })
        console.log('17. Simulation successful, request:', request)
      } catch (simulationError: any) {
        console.error('=== SIMULATION ERROR ===')
        console.error('Simulation failed:', simulationError)
        console.error('Error message:', simulationError.message)
        console.error('Error cause:', simulationError.cause)
        
        // Check for specific revert reasons
        if (simulationError.message?.includes('Wrapper not supported')) {
          toast(<TXToast {...{ message: 'WBTC is not configured as a supported wrapper' }} />)
          return
        }
        if (simulationError.message?.includes('paused')) {
          toast(<TXToast {...{ message: 'Contract is paused' }} />)
          return
        }
        if (simulationError.message?.includes('Insufficient')) {
          toast(<TXToast {...{ message: 'Insufficient WBTC balance' }} />)
          return
        }
        
        // If simulation fails, the transaction will likely fail too
        toast(<TXToast {...{ message: `Transaction will fail: ${simulationError.message || 'Unknown error'}` }} />)
        return
      }
      
      const transactionHash = await writeContract(config, args)
      console.log('18. Transaction hash received:', transactionHash)
      
      const receipt = await waitForTransactionReceipt(config, {
        hash: transactionHash,
      })
      console.log('19. Transaction receipt:', receipt)
      
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
    const amount = unwrapGetValues('amount')
    let amountToSend: bigint
    if (selectedTokenUnwrap === 'wbtc') {
      // Convert to 18 decimals when __apply8To18DecimalsConversion is true
      const amountIn8Decimals = parseUnits(amount, 8)
      amountToSend = amountIn8Decimals * BigInt(10 ** 10)
    } else {
      amountToSend = parseUnits(amount, 18)
    }
    
    const args = {
      abi: lzrBTC_abi,
      address: WRAP_CONTRACT as `0x${string}`,
      functionName: 'burn' as const,
      args: [amountToSend, ERC20_CONTRACT_ADDRESS[selectedTokenUnwrap] as `0x${string}`] as const,
    }

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
      {/* Show balances */}
      <div className="bg-darkslategray-200 border border-lightgreen-100 rounded p-4">
        <div className="text-lightgreen-100 font-bold mb-2">Your Balances:</div>
        <div className="text-gray-200">
          WBTC: {balanceData?.formatted || '0'} WBTC (raw: {balanceData?.value?.toString() || '0'})
        </div>
        <div className="text-gray-200">
          lzrBTC: {lzrBTCBalanceData?.formatted || '0'} lzrBTC
        </div>
        <div className="text-gray-200">
          Current Allowance: {approvalData?.toString() || '0'} 
          {selectedToken === 'wbtc' && decimalsConversion && (
            <span className="text-yellow-400">
              (needs 18-decimal format due to contract conversion)
            </span>
          )}
        </div>
      </div>
      
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
              {/* Only show reset if allowance is wrong and NOT due to decimals conversion */}
              {approvalData && selectedToken === 'wbtc' && 
               !decimalsConversion && // Only show reset if conversion is NOT enabled
               BigInt(approvalData) > BigInt(balanceData?.value || 0) && (
                <Button 
                  type="button"
                  onClick={async (e) => {
                    e.preventDefault()
                    console.log('Resetting WBTC allowance to 0...')
                    try {
                      const resetTx = await writeContract(config, {
                        abi: erc20Abi,
                        address: ERC20_CONTRACT_ADDRESS[selectedToken] as `0x${string}`,
                        functionName: 'approve' as const,
                        args: [WRAP_CONTRACT as `0x${string}`, BigInt(0)] as const,
                      })
                      await waitForTransactionReceipt(config, { hash: resetTx })
                      toast(<TXToast {...{ message: 'Allowance reset to 0. Now approve the correct amount.' }} />)
                      setRefresh((prev) => !prev)
                    } catch (error) {
                      console.error('Reset failed:', error)
                    }
                  }}
                  className="bg-red-600"
                >
                  RESET ALLOWANCE (Required)
                </Button>
              )}
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
