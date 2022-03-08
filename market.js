const Domain = "https://api.coingecko.com/api/v3/"
const userInput = document.querySelector('input')
const button = document.querySelector('button')
const leftColumn = document.querySelector('#searchResults')
const rightColumn = document.querySelector('#columnR')
// Chart explainer https://www.anychart.com/blog/2021/07/28/line-chart-js/

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
        results.addEventListener('click', moveData)     //Adds event listener to appended DOM element    

async function moveData () {                            //Function to expand info from left column to the right column
    const marketInput = `${response.data.coins[i].id}`
    const marketResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${marketInput}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false`)
    const marketData = document.createElement('div')
    const marketHead = document.createElement('h2')
    marketHead.innerHTML =(`${response.data.coins[i].name}`)
    rightColumn.append(marketHead)
    marketData.innerHTML = (`<img src="${marketResponse.data.image.small}"</img><br> 
        <strong><button id = 'desc'>Toggle Description:</button> </strong><p style="display:none;" id = description>${marketResponse.data.description.en}</p> <br> 
        <table><tr> <td><strong>Current Price:</strong> $${marketResponse.data.market_data.current_price.usd}</td> <td><strong>Hourly Change:</strong> ${marketResponse.data.market_data.price_change_percentage_1h_in_currency.usd}%</td> <td><strong>24hr Change:</strong> ${marketResponse.data.market_data.price_change_percentage_24h}%, $${marketResponse.data.market_data.price_change_24h}</td></tr>
        <tr> <td><strong>Market Cap:</strong> $${marketResponse.data.market_data.market_cap.usd}</td> <td><strong>Circulating Supply:</strong> ${marketResponse.data.market_data.circulating_supply}</td> <td><strong>Max Supply:</strong> ${marketResponse.data.market_data.max_supply}</td></tr>
        <tr> <td><strong>ATH:</strong> $${marketResponse.data.market_data.ath.usd}</td> <td><strong>Off ATH:</strong> ${marketResponse.data.market_data.ath_change_percentage.usd}%</td> <td><strong>Updated:</strong> ${marketResponse.data.last_updated}</tr></table>`)
    rightColumn.append(marketData)

    const description = document.querySelector('#description')
        document.querySelector("#desc").addEventListener('click', () => {
            if (description.style.display !== "none") {
                description.style.display = "none"
            } else {
                description.style.display = "block"
            }
        })
    console.log(marketResponse)
    }
}
}
)
