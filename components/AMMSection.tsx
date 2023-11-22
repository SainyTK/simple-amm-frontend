import React from 'react'

const AMMSection = () => {
  return (
    <div>

        <h1>AMMSection</h1>

        <div>
            <h2>Token A</h2>
            <div>
                Address: <input />
            </div>
            <div>
                Amount: <input />
            </div>
        </div>

        <div>
            <h2>Token B</h2>
            <div>
                Address: <input />
            </div>
            <div>
                Amount: <input />
            </div>
        </div>

        <div>
            <button>Swap</button>
            <button>Add</button>
            <button>Remove</button>
        </div>

    </div>
  )
}

export default AMMSection