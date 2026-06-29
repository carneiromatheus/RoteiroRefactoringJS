const { readFileSync } = require('fs');

function gerarFaturaStr (fatura, pecas) {
    let totalFatura = 0;
    let creditos = 0;
    let faturaStr = `Fatura ${fatura.cliente}\n`;
    function formatarMoeda(valor) {
      return new Intl.NumberFormat("pt-BR",
        { style: "currency", currency: "BRL",
          minimumFractionDigits: 2 }).format(valor/100);
    }

    function getPeca(apre) {
      return pecas[apre.id];
    }

    function calcularCredito(apre) {
      let creditosLoc = 0;
      creditosLoc += Math.max(apre.audiencia - 30, 0);
      if (getPeca(apre).tipo === "comedia")
        creditosLoc += Math.floor(apre.audiencia / 5);
      return creditosLoc;
    }

    function calcularTotalApresentacao(apre) {
      const peca = getPeca(apre);
      let total = 0;
  
      switch (peca.tipo) {
      case "tragedia":
        total = 40000;
        if (apre.audiencia > 30) {
          total += 1000 * (apre.audiencia - 30);
        }
        break;
      case "comedia":
        total = 30000;
        if (apre.audiencia > 20) {
           total += 10000 + 500 * (apre.audiencia - 20);
        }
        total += 300 * apre.audiencia;
        break;
      default:
          throw new Error(`Peça desconhecia: ${peca.tipo}`);
      }
      return total;
    }

    function calcularTotalFatura() {
      let total = 0;
      for (let apre of fatura.apresentacoes) {
        total += calcularTotalApresentacao(apre);
      }
      return total;
    }

    function calcularTotalCreditos() {
      let total = 0;
      for (let apre of fatura.apresentacoes) {
        total += calcularCredito(apre);
      }
      return total;
    }

    // corpo principal reduzido: apenas apresentação
    for (let apre of fatura.apresentacoes) {
      faturaStr += `  ${getPeca(apre).nome}: ${formatarMoeda(calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
    }
    faturaStr += `Valor total: ${formatarMoeda(calcularTotalFatura())}\n`;
    faturaStr += `Créditos acumulados: ${calcularTotalCreditos()} \n`;
    return faturaStr;
  }

const faturas = JSON.parse(readFileSync('./faturas.json'));
const pecas = JSON.parse(readFileSync('./pecas.json'));
const faturaStr = gerarFaturaStr(faturas, pecas);
console.log(faturaStr);
