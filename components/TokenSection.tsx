import React, { useEffect, useState } from 'react'
import { useAccount, useContractReads, useContractWrite } from 'wagmi'
import { ERC20ABI } from '../constants/ABIs/ERC20'
import { ADDRESSES } from '../constants/addresses'
import { formatUnits, parseEther, parseUnits } from 'viem'

const TokenSection = () => {

    const { address } = useAccount();

    const [loaded, setLoaded] = useState(false);
    const [receiver, setReceiver] = useState("");
    const [amount, setAmount] = useState("0");

    const { data, isLoading, isError } = useContractReads({
        contracts: [
            {
                address: ADDRESSES['JPY'],
                abi: ERC20ABI,
                functionName: "name"
            },
            {
                address: ADDRESSES['JPY'],
                abi: ERC20ABI,
                functionName: "symbol"
            },
            {
                address: ADDRESSES['JPY'],
                abi: ERC20ABI,
                functionName: "decimals"
            },
            {
                address: ADDRESSES['JPY'],
                abi: ERC20ABI,
                functionName: "balanceOf",
                args: [address!]
            },
            {
                address: ADDRESSES['THB'],
                abi: ERC20ABI,
                functionName: "name"
            },
            {
                address: ADDRESSES['THB'],
                abi: ERC20ABI,
                functionName: "symbol"
            },
            {
                address: ADDRESSES['THB'],
                abi: ERC20ABI,
                functionName: "decimals"
            },
            {
                address: ADDRESSES['THB'],
                abi: ERC20ABI,
                functionName: "balanceOf",
                args: [address!]
            }
        ]
    });


    const { write: transferJPY } = useContractWrite({
        address: ADDRESSES['JPY'],
        abi: ERC20ABI,
        functionName: 'transfer'
    })

    const { write: transferTHB } = useContractWrite({
        address: ADDRESSES['THB'],
        abi: ERC20ABI,
        functionName: 'transfer'
    })

    useEffect(() => {
        setLoaded(true)
    }, []);

    if (!loaded) {
        return <></>
    }

    if (isLoading) {
        return <div>Token is loading..</div>
    }

    if (!data || isError) {
        return <div>Token loading is error..</div>
    }

    const token0Name = data[0]?.result || "";
    const token0Symbol = data[1]?.result || "";
    const token0Decimals = data[2]?.result || 18;
    const token0Balance = data[3]?.result || BigInt(0);

    const token1Name = data[4]?.result || "";
    const token1Symbol = data[5]?.result || "";
    const token1Decimals = data[6]?.result || 18;
    const token1Balance = data[7]?.result || BigInt(0);

    return (
        <div>
            <div>
                <span>Receiver: </span>
                <input onChange={e => setReceiver(e.target.value)}/>
            </div>
            <div>
                <span>Amount: </span>
                <input onChange={e => setAmount(e.target.value)}/>
            </div>
            <div>
                <div>Token Name: {token0Name}</div>
                <div>Balance: {formatUnits(token0Balance, token0Decimals)} {token0Symbol}</div>
                <button onClick={() => transferJPY({ args: [receiver as `0x${string}`, parseUnits(amount, token0Decimals)] })}>Transfer</button>
            </div>
            <div>
                <div>Token Name: {token1Name}</div>
                <div>Balance: {formatUnits(token1Balance, token1Decimals)} {token1Symbol}</div>
                <button onClick={() => transferTHB({ args: [receiver as `0x${string}`, parseUnits(amount, token1Decimals)] })}>Transfer</button>
            </div>
      
        </div>
    )
}

export default TokenSection