const { readFileSync } = require('fs');

const Repositorio = require('./repositorio.js');
const ServicoCalculoFatura = require('./servico.js');
const gerarFaturaStr = require('./apresentacao.js');

const faturas = JSON.parse(readFileSync('./faturas.json'));

const repo = new Repositorio();
const calc = new ServicoCalculoFatura(repo);

const faturaStr = gerarFaturaStr(faturas, calc);
console.log(faturaStr);

// function gerarFaturaHTML(fatura, calc) {
//   let html = "<html>\n";
//   html += `<p> Fatura ${fatura.cliente} </p>\n`;
//   html += "<ul>\n";
//   for (let apre of fatura.apresentacoes) {
//     html += `<li>  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos) </li>\n`;
//   }
//   html += "</ul>\n";
//   html += `<p> Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))} </p>\n`;
//   html += `<p> Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)} </p>\n`;
//   html += "</html>";
//   return html;
// }

// const faturaHTML = gerarFaturaHTML(faturas, calc);
// console.log(faturaHTML);
