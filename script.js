
let list_btc = [0, 0]
let list_eth = [0, 0]
let list_ada = [0, 0]
let list_mengoft = [0, 0]
let list_sccpft = [0, 0]

function getAPI(coin, list_value) {
    fetch(`https://www.mercadobitcoin.net/api/${coin}/ticker/`, { method: 'GET' })
        .then(response => response.json())
        .then(data => addInfo(data, coin, list_value))
        .catch(err => console.log(err.message))
}

function caller(){
    getAPI('BTC', list_btc)
    getAPI('ETH', list_eth)
    getAPI('ADA', list_ada)
    getAPI('MENGOFT', list_mengoft)
    getAPI('SCCPFT', list_sccpft)

}

function loop() {
    setInterval(caller , 1000)

}

function addInfo(data, coin, list_value) {
    
    let date = new Date(data.ticker.date * 1000)

    list_value[1] = parseFloat(data.ticker.last).toFixed(4)

    document.querySelector(`.${coin}-valor`).innerHTML = `R$ ${list_value[1]}`
    document.querySelector(`.${coin}-data`).innerHTML = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    document.querySelector(`.${coin}-volume`).innerHTML = `${parseFloat(data.ticker.vol).toFixed(4)}`
    document.querySelector(`.${coin}-maior-oferta`).innerHTML = `${parseFloat(data.ticker.buy).toFixed(4)}`

    if (list_value[1] > list_value[0]) {
        document.querySelector(`.${coin}-status`).style.color = "green"
        document.querySelector(`.${coin}-status`).innerHTML = '↑'

    } else if (list_value[1] < list_value[0]){
        document.querySelector(`.${coin}-status`).style.color = "red"
        document.querySelector(`.${coin}-status`).innerHTML = '↓'
    }

    list_value[0] = list_value[1]
}

loop()