let prices = [0, 0, 0];
let structure = { toBRL: 0, toUSD: 0, toEUR: 0, toBTC: 0 };
let conversoes = {
  BRL: structure,
  USD: structure,
  EUR: structure,
  BTC: structure
};

function showPrices() {
  document.getElementById("input-dolar").value = prices[0].toFixed(2);
  trataInput(document.getElementById("input-dolar"));

  document.getElementById("input-euro").value = prices[1].toFixed(2);
  trataInput(document.getElementById("input-euro"));

  document.getElementById("input-bitcoin").value = prices[2].toFixed(2);
  trataInput(document.getElementById("input-bitcoin"));
}

function trataInput(componente) {
  var input = componente.value;
  var index = { "input-dolar": 0, "input-euro": 1, "input-bitcoin": 2 };
  var numero = 0;

  if (input <= 0 || isNaN(parseInt(input, 10))) {
    componente.style.color = "#da1e26";
  } else {
    componente.style.color = "#0000cd";
  }

  numero = Number.parseFloat(document.getElementById(componente.id).value);
  if (!isNaN(numero) && numero > 0) {
    prices[index[componente.id]] = numero;
  } else {
    prices[index[componente.id]] = 0;
  }

  createConversionMatrix(prices);
  converterMoedas();
}

// criando uma matriz de conversoes
function createConversionMatrix(prices) {
  // zera a matriz
  conversoes["BRL"] = { toBRL: 0, toUSD: 0, toEUR: 0, toBTC: 0 };
  conversoes["USD"] = { toBRL: 0, toUSD: 0, toEUR: 0, toBTC: 0 };
  conversoes["EUR"] = { toBRL: 0, toUSD: 0, toEUR: 0, toBTC: 0 };
  conversoes["BTC"] = { toBRL: 0, toUSD: 0, toEUR: 0, toBTC: 0 };

  //conversoes de cada moeda para ela mesma
  conversoes.BRL.toBRL = 1;
  conversoes.USD.toUSD = 1;
  conversoes.EUR.toEUR = 1;
  conversoes.BTC.toBTC = 1;

  // conversoes de BRL para outras moedas
  if (!isNaN(prices[0]) && prices[0] > 0) {
    conversoes.BRL.toUSD = 1 / prices[0];
  }
  if (!isNaN(prices[1]) && prices[1] > 0) {
    conversoes.BRL.toEUR = 1 / prices[1];
  }
  if (!isNaN(prices[2]) && prices[2] > 0) {
    conversoes.BRL.toBTC = 1 / prices[2];
  }

  // conversoes de USD para outras moedas
  if (!isNaN(prices[0]) && prices[0] > 0) {
    conversoes.USD.toBRL = prices[0];
    if (!isNaN(prices[1]) && prices[1] > 0) {
      conversoes.USD.toEUR = prices[0] / prices[1];
    }
    if (!isNaN(prices[2]) && prices[2] > 0) {
      conversoes.USD.toBTC = prices[0] / prices[2];
    }
  }

  // conversoes de EUR para outras moedas
  if (!isNaN(prices[1]) && prices[1] > 0) {
    conversoes.EUR.toBRL = prices[1];
    if (!isNaN(prices[0]) && prices[0] > 0) {
      conversoes.EUR.toUSD = prices[1] / prices[0];
    }
    if (!isNaN(prices[2]) && prices[2] > 0) {
      conversoes.EUR.toBTC = prices[1] / prices[2];
    }
  }

  // conversoes de BTC para outras moedas
  if (!isNaN(prices[2]) && prices[2] > 0) {
    conversoes.BTC.toBRL = prices[2];
    if (!isNaN(prices[0]) && prices[0] > 0) {
      conversoes.BTC.toUSD = prices[2] / prices[0];
    }
    if (!isNaN(prices[1]) && prices[1] > 0) {
      conversoes.BTC.toEUR = prices[2] / prices[1];
    }
  }
}

function converterMoedas() {
  var quantidade = document.getElementById("quantidade");
  var coins = [conversoes.BRL, conversoes.USD, conversoes.EUR, conversoes.BTC];
  var conversao = coins[document.getElementById("src-coin").selectedIndex];
  var result = 0;

  if (quantidade.value <= 0 || isNaN(quantidade.value)) {
    quantidade.style.color = "#da1e26";
    return;
  } else {
    quantidade.style.color = "#0000cd";
  }

  // conversao para brl
  result = quantidade.value * conversao.toBRL;
  if (!isNaN(result) && result > 0) {
    document.getElementById("result-brl").innerHTML = result.toFixed(2);
  } else {
    document.getElementById("result-brl").innerHTML = "";
  }

  // conversao para usd
  result = quantidade.value * conversao.toUSD;
  if (!isNaN(result) && result > 0) {
    document.getElementById("result-usd").innerHTML = result.toFixed(2);
  } else {
    document.getElementById("result-usd").innerHTML = "";
  }

  // conversao para EUR
  result = quantidade.value * conversao.toEUR;
  if (!isNaN(result) && result > 0) {
    document.getElementById("result-eur").innerHTML = result.toFixed(2);
  } else {
    document.getElementById("result-eur").innerHTML = "";
  }

  // conversao para btc
  result = quantidade.value * conversao.toBTC;
  if (!isNaN(result) && result > 0) {
    document.getElementById("result-btc").innerHTML = result.toFixed(10);
  } else {
    document.getElementById("result-btc").innerHTML = "";
  }
}

// buscando cotacao em um servico online
async function getPrice(COIN) {
  const url = "https://economia.awesomeapi.com.br/json/last/" + COIN;

  var result = await fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      var field = JSON.stringify(data);
      field = field.replace(/[A-Z]{6}/, "MOEDA");
      field = JSON.parse(field).MOEDA;
      return parseFloat(field.bid);
    });

  if (COIN == "BTC-BRL") {
    const url = "https://www.mercadobitcoin.net/api/BTC/ticker/";
    result = await fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        return Number.parseFloat(data.ticker.last);
      });
  }

  return result;
}

async function getOnline() {
  prices[0] = await getPrice("USD-BRL");
  prices[1] = await getPrice("EUR-BRL");
  prices[2] = await getPrice("BTC-BRL");
  showPrices();
  createConversionMatrix(prices);
}
