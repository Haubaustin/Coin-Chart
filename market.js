const Domain = "https://api.coingecko.com/api/v3/"
const userInput = document.querySelector('input')
const button = document.querySelector('button')
const leftColumn = document.querySelector('#searchResults')
//coins/{coinId}/market_chart returns market chart using UNIX timestamps
        //coins/bitcoin/market_chart?vs_currency=usd&days=14&interval=daily'
//parseInt((new Date('YYYY.MM.DD').getTime() / 1000).toFixed(0)) UNIX timestamp converter also check Date.Parse
// Chart explainer https://www.anychart.com/blog/2021/07/28/line-chart-js/
//`https://api.coingecko.com/api/v3/simple/price?ids=${input}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`


//Event listener for search bar on Homepage
button.addEventListener('click', async () =>{ 
    while (leftColumn.firstChild) { //Removes previous searches
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
        results.addEventListener('click', sayHello) //Adds event listener to appended DOM element
    console.log(response) 
}})

function sayHello () {
    console.log('Youre smart af')
}

