function Converter() {
  var valorElemento = document.getElementById("valor");
  var valor = valorElemento.value;
  var valorEmReal = parseFloat(valor);

  var dolarEmReal = valorEmReal / 5;
  var euroEmReal = valorEmReal / 6.5;

  var elementoValorConvertidoDolar = document.getElementById(
    "valorConvertidoDolar"
  );
  var valorConvertidoDolar =
    "O resultado em Dólar são R$ " + dolarEmReal.toFixed(2);
  elementoValorConvertidoDolar.innerHTML = valorConvertidoDolar;

  var elementoValorConvertidoEuro = document.getElementById(
    "valorConvertidoEuro"
  );
  var valorConvertidoEuro =
    "O resultado em Euro são R$ " + euroEmReal.toFixed(2);
  elementoValorConvertidoEuro.innerHTML = valorConvertidoEuro;
}
