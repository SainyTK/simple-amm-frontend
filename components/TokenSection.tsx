import React from 'react'

const TokenSection = () => {
  return (
    <div>
        <h1>Token Section</h1>

        <div>
            <p>Token Name:</p>
            <input type="text" />
        </div>

        <div>
            <p>Symbol:</p>
            <input type="text" />
        </div>

        <div>
            <p>Initial supply:</p>
            <input type="text" />
        </div>

        <div>
            <button>Deploy</button>
        </div>

    </div>
  )
}

export default TokenSection