const Domain = "https://api.coingecko.com/api/v3/"
const userInput = document.querySelector('input')
const button = document.querySelector('button')
const leftColumn = document.querySelector('#columnL')
//coins/{coinId}/market_chart returns market chart using UNIX timestamps
        //coins/bitcoin/market_chart?vs_currency=usd&days=14&interval=daily'
//parseInt((new Date('YYYY.MM.DD').getTime() / 1000).toFixed(0)) UNIX timestamp converter also check Date.Parse
// Chart explainer https://www.anychart.com/blog/2021/07/28/line-chart-js/
//`https://api.coingecko.com/api/v3/simple/price?ids=${input}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`

button.addEventListener('click', async () =>{ 
    while (leftColumn.firstChild) {
        leftColumn.firstChild.remove()
    }
    const input = userInput.value
    const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${input}`)
    //for (let i=0; i<response.data.coins.length; i++)
    //const results = document.createElement('li')   
    //results.innerHTML =
    console.log(response) 
})