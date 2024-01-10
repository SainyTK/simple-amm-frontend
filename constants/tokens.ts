export const TOKENS = {
    "JPY": {
        address: "0x4D0005bEF04969A9E87e56DFC748540f1311E660",
        name: "Japanese Yen",
        symbol: "JPY",
        decimals: 18
    },
    "THB": {
        address: "0x5c6BDc944BAE5D3607033d47c3cfFCBC99d4060F",
        name: "Thai Baht",
        symbol: "THB",
        decimals: 18
    }
}

type TokenType = {
    address: string,
    name: string,
    symbol: string,
    decimals: number
}

export const TOKENS_ADDR = Object.values(TOKENS).reduce((prev, cur, index) => {
    prev[cur.address] = cur;
    return prev;
}, {} as Record<string, TokenType>)