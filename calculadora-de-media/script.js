var nome = prompt("Qual seu nome?")
var notaPrimeiroBimestre = parseFloat(prompt("Qual sua nota no primeiro bimestre?"));
var notaSegundoBimestre = parseFloat(prompt("Qual sua nota no segundo bimestre?"));
var notaTerceiroBimestre = parseFloat(prompt("Qual sua nota no terceiro bimestre?"));
var notaQuartoBimestre = parseFloat(prompt("Qual sua nota no quarto bimestre?"));

var notaFinal = (notaPrimeiroBimestre + notaSegundoBimestre + notaTerceiroBimestre + notaQuartoBimestre) / 4;

var notaFixada = notaFinal.toFixed(1);

alert("Olá, " + nome + "\nA média das suas notas foram: " + notaFixada);

if (notaFixada > 5) {
  alert("Parabéns, você passou de ano!")
} else {
  alert("Você foi reprovado, estude mais!")
}