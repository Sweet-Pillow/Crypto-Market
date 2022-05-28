
function getAPI(coin) {
    console.log(`Moeda : ${coin}`)
    let valoresCrypto = fetch(`https://www.mercadobitcoin.net/api/${coin}/ticker/`, { method: 'GET' })
        .then(response => response.json())
        .then(data => addInfo(data, coin))
        .catch(err => console.log(err.message))
}

function caller(){
    getAPI('BTC')
    getAPI('ETH')
    getAPI('ADA')
    getAPI('MENGOFT')
    getAPI('SCCPFT')

}

function loop() {
    setInterval(caller , 1000)

}

function addInfo(data, coin) {
    
    let date = new Date(data.ticker.date * 1000)
    document.querySelector(`.${coin}-valor`).innerHTML = `R$ ${parseFloat(data.ticker.last).toFixed(4)}`
    document.querySelector(`.${coin}-data`).innerHTML = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    document.querySelector(`.${coin}-volume`).innerHTML = `${parseFloat(data.ticker.vol).toFixed(4)}`
    document.querySelector(`.${coin}-maior-oferta`).innerHTML = `${parseFloat(data.ticker.buy).toFixed(4)}`

}

console.log('-----------------------\n')
loop()
console.log('-----------------------\n')