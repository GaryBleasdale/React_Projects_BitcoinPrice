import React, { useEffect, useState } from 'react'

export default function BitcoinPrice(){
  
  const [data, setData] = useState(2)
  const [refresh, setRefresh] = useState(0)
  const [previousPrice,setPrevious] = useState(0)

  

  useEffect(()=>{
    fetch("https://rest-sandbox.coinapi.io/v1/exchangerate/BTC/USD?apikey=7021598A-A282-4952-A0E9-E4852689AEA3")
    .then(response => response.json())
    .then(data => setData(data.rate))
    console.log('ran')
  })

  function calculateDifference(refresh,previousPrice){
     return ((refresh/previousPrice)*100)
.toFixed(3)  }
  


  let variancePositive

  function varianceDirection(){
    if (calculateDifference(refresh,previousPrice) > 0){
      return variancePositive = true;
    } else {
      return variancePositive = false;
    }
  }
  varianceDirection()

  let previousPriceDec=previousPrice.toFixed(2);
  let dataDec=data.toFixed(2);


  return (
    <>
    <div className='price-container'>
      <img src='https://logos-world.net/wp-content/uploads/2020/08/Bitcoin-Logo.png' alt='bitcoin-logo' className='block'/>
      { !!previousPrice && 
      <div className="previous-price block">
        <h2>Previous Price</h2>
        <p>${previousPriceDec}</p>
      </div>
      }
      <div className="current-price block">
        <h2>Current Price</h2>
        <p>${dataDec}</p>
      </div>
      { !!previousPrice && 
      <div className="variance block">
        <h2>% Change</h2>
        <p style={{
          color: variancePositive ? 'green' : 'red'
        }}>{calculateDifference(refresh,previousPrice)}%</p>
      </div>
      }
    </div>
    
      <button onClick={()=>{
        setRefresh(refresh +1);setPrevious(data)
      }}>Click to refresh price</button>
    </>
  )
}