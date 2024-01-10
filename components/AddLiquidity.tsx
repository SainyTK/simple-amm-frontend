import React, { useEffect, useState } from 'react'
import { useAccount, useContractReads, useContractWrite } from 'wagmi'
import { TOKENS } from '../constants/tokens'
import { ADDRESSES } from '../constants/addresses'
import { LPTOKEN_ABI } from '../constants/ABIs/LPToken'
import { maxUint256, parseUnits } from 'viem'
import { ERC20ABI } from '../constants/ABIs/ERC20'

const AddLiquidity = () => {

    const { address } = useAccount();

    const [amount1, setAmount1] = useState("0");
    const [amount2, setAmount2] = useState("0");

    const [loaded, setLoaded] = useState(false);

    const { data, isError, isLoading } = useContractReads({
        contracts: [
            {
                address: ADDRESSES['JPY'],
                abi: ERC20ABI,
                functionName: 'allowance',
                args: [address!, ADDRESSES['LPToken']]
            },
            {
                address: ADDRESSES['THB'],
                abi: ERC20ABI,
                functionName: 'allowance',
                args: [address!, ADDRESSES['LPToken']]
            }
        ]
    })

    const { write: addLiquidity } = useContractWrite({
        address: ADDRESSES['LPToken'],
        abi: LPTOKEN_ABI,
        functionName: "addLiquidity"
    });

    const { write: approve1 } = useContractWrite({
        address: ADDRESSES['JPY'],
        abi: ERC20ABI,
        functionName: "approve"
    })

    const { write: approve2 } = useContractWrite({
        address: ADDRESSES['THB'],
        abi: ERC20ABI,
        functionName: "approve"
    })

    const handleAddLiquidity = () => {
        const parsedAmount1 = parseUnits(amount1, TOKENS['JPY'].decimals)
        const parsedAmount2 = parseUnits(amount2, TOKENS['THB'].decimals)
        addLiquidity({ args: [parsedAmount1, parsedAmount2]});
    }

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

    const token0Allowance = data[0]?.result || BigInt(0);
    const token1Allowance = data[1]?.result || BigInt(0);

    const isAllowance = token0Allowance >= BigInt(amount1) && token1Allowance >= BigInt(amount2)

    // console.log({ isAllowance, token0Allowance, token1Allowance })

    return (
        <div>
            <h3>Add Liquidity</h3>
            <div>
                Japanese Yen: <input onChange={e => setAmount1(e.target.value)}/> JPY
            </div>
            <div>
                Thai Baht: <input onChange={e => setAmount2(e.target.value)} /> THB
            </div>
            <div>
                {
                    isAllowance ? (
                        <button onClick={handleAddLiquidity}>Add</button>
                    ) : (
                        <div>
                            <button onClick={() => approve1({ args: [ADDRESSES['LPToken'], maxUint256]})}>Approve 1</button>
                            <button onClick={() => approve2({ args: [ADDRESSES['LPToken'], maxUint256]})}>Approve 2</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default AddLiquidity