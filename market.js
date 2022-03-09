const Domain = "https://api.coingecko.com/api/v3/"
const userInput = document.querySelector('input')
const button = document.querySelector('button')
const leftColumn = document.querySelector('#searchResults')
const rightColumn = document.querySelector('#columnR')
const clearColumn = document.querySelector('#Clear')
const rightList = document.querySelector('.list')
// Chart explainer https://www.anychart.com/blog/2021/07/28/line-chart-js/

clearColumn.addEventListener('click', () => {
    while (rightList.firstChild) {                     //Removes previous searches
        rightList.firstChild.remove()
    } 
})

button.addEventListener('click', async () =>{           //Event listener for search bar on Homepage
    while (leftColumn.firstChild) {                     //Removes previous searches
        leftColumn.firstChild.remove()
    }
    const input = userInput.value
    const response = await axios.get(`https://api.coingecko.com/api/v3/search?query=${input}`)
    for (let i=0; i<response.data.coins.length; i++) {
        const results = document.createElement('li') 
        const thumb = document.createElement('span')
        results.innerHTML =(`${response.data.coins[i].symbol}, ${response.data.coins[i].name}`)
        thumb.innerHTML = `<img src="${response.data.coins[i].thumb}"</img>`
        leftColumn.append(results)
        results.append(thumb)
        results.addEventListener('click', moveData,)     //Adds event listener to appended DOM element    

async function moveData () {                            //Function to expand info from left column to the right column
    const marketInput = `${response.data.coins[i].id}`
    const marketResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${marketInput}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false`)
    const marketData = document.createElement('div')
    const marketHead = document.createElement('h2')
    marketHead.innerHTML =(`${response.data.coins[i].name}`)
    rightList.append(marketHead)
    marketData.innerHTML = (`<img src="${marketResponse.data.image.small}"</img><br> 
        <details><summary><strong>Description</strong></summary>${marketResponse.data.description.en}</details> <br> 
        <table><tr> <td><strong>Current Price:</strong> $${marketResponse.data.market_data.current_price.usd}</td> <td><strong>Hourly Change:</strong> ${marketResponse.data.market_data.price_change_percentage_1h_in_currency.usd}%</td> <td><strong>24hr Change:</strong> ${marketResponse.data.market_data.price_change_percentage_24h}%, $${marketResponse.data.market_data.price_change_24h}</td></tr>
        <tr> <td><strong>Market Cap:</strong> $${marketResponse.data.market_data.market_cap.usd}</td> <td><strong>Circulating Supply:</strong> ${marketResponse.data.market_data.circulating_supply}</td> <td><strong>Max Supply:</strong> ${marketResponse.data.market_data.max_supply}</td></tr>
        <tr> <td><strong>ATH:</strong> $${marketResponse.data.market_data.ath.usd}</td> <td><strong>Off ATH:</strong> ${marketResponse.data.market_data.ath_change_percentage.usd}%</td> <td><strong>Updated:</strong> ${marketResponse.data.last_updated}</tr></table>`)
    rightList.append(marketData)
    makeChart()        
    }
async function makeChart () {                           //AnyChart Function. Loaded from AnyChart Module
    const chartInput = `${response.data.coins[i].id}`
    const chartResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${chartInput}/market_chart?vs_currency=usd&days=1&interval=hourly`)
    const chartData = chartResponse.data.prices
    const chartDiv = document.createElement('div')
    for (let i=0; i<chartData.length; i++) {
        let nDate1 = chartData[i][0]
        let nDate = new Date(nDate1)
        chartData[i][0] = nDate

      }

    function getData() {
     
        return chartData     
    }
    
    const data = anychart.data.set(getData())
    const dataMap = data.mapAs({x:0, value:1})
    const chart = anychart.line()
    const lineChart = chart.line(dataMap)
    chart.container(chartDiv)
    chart.background().enabled(true).fill('#b8b8b8b6').stroke('#000000').cornerType('round').corners(10) //Sets .fill('Background Color').stroke('Border COlor').cornerType('round').corners(10)
    chart.draw()
    chart.yAxis().title('Price')
    chart.xAxis().title('Time')
    rightList.append(chartDiv)


    
    console.log(chartData)
        }
    }
}
)
