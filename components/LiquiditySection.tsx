import React, { useEffect, useState } from 'react'
import { useContractReads } from 'wagmi'
import { ADDRESSES } from '../constants/addresses'
import { LPTOKEN_ABI } from '../constants/ABIs/LPToken'
import AddLiquidity from './AddLiquidity'
import RemoveLiquidity from './RemoveLiquidity'
import { formatUnits } from 'viem'
import { TOKENS } from '../constants/tokens'

const LiquiditySection = () => {

    const { data, isLoading, isError } = useContractReads({
        contracts: [
            {
                address: ADDRESSES['LPToken'],
                abi: LPTOKEN_ABI,
                functionName: 'reserve1'
            },
            {
                address: ADDRESSES['LPToken'],
                abi: LPTOKEN_ABI,
                functionName: 'reserve2'
            }
        ]
    });

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true)
    }, []);

    if (!loaded) {
        return <></>
    }

    if (isLoading) {
        return <div>Liquidity is loading..</div>
    }

    if (!data || isError) {
        return <div>Liquidity loading is error..</div>
    }

    const reserve1 = data[0]?.result || BigInt(0)
    const reserve2 = data[1]?.result || BigInt(0)

    return (
        <div>
            <div>
                <h2>Liquidity</h2>
                <div>
                    Japanese Yen: {formatUnits(reserve1, TOKENS['JPY'].decimals)} JPY
                </div>
                <div>
                    Thai Baht: {formatUnits(reserve2, TOKENS['THB'].decimals)} THB
                </div>
            </div>

            <AddLiquidity />

            <RemoveLiquidity />
          
        </div>
    )
}

export default LiquiditySection