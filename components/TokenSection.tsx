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
                <div>Token Name: {data[0].result}</div>
                <div>Balance: {formatUnits(data[3].result!, data[2].result!)} {data[1].result}</div>
                <button onClick={() => transferJPY({ args: [receiver as `0x${string}`, parseUnits(amount, data[2].result!)] })}>Transfer</button>
            </div>
            <div>
                <div>Token Name: {data[4].result}</div>
                <div>Balance: {formatUnits(data[7].result!, data[6].result!)} {data[5].result}</div>
                <button onClick={() => transferTHB({ args: [receiver as `0x${string}`, parseUnits(amount, data[6].result!)] })}>Transfer</button>
            </div>
      
        </div>
    )
}

export default TokenSection