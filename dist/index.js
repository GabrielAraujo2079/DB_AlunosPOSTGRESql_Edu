"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const readlineSync = __importStar(require("readline-sync"));
// Configuração do pool de conexão com PostgreSQL
const pool = new pg_1.Pool({
    user: 'aluno',
    host: 'localhost',
    database: 'db_profedu',
    password: 'aluno',
    port: 5432,
});
// Função para buscar todas as matérias cadastradas
async function buscarMaterias() {
    try {
        const result = await pool.query('SELECT Id_Materia as id, NomeMateria as nome FROM Materias ORDER BY Id_Materia');
        return result.rows;
    }
    catch (error) {
        console.error('Erro ao buscar matérias:', error);
        throw error;
    }
}
// Função para cadastrar um novo aluno
async function cadastrarAluno(aluno) {
    try {
        const result = await pool.query('INSERT INTO Alunos(Nome, Serie, Idade) VALUES ($1, $2, $3) RETURNING Id_Aluno', [aluno.nome, aluno.serie, aluno.idade]);
        return result.rows[0].id_aluno;
    }
    catch (error) {
        console.error('Erro ao cadastrar aluno:', error);
        throw error;
    }
}
// Função para cadastrar notas e calcular média
async function cadastrarNotas(idAluno, idMateria, notas) {
    try {
        // Calcula a média das 8 notas
        const media = notas.reduce((sum, nota) => sum + nota, 0) / notas.length;
        // Insere a média no banco de dados
        await pool.query('INSERT INTO Aluno_Materia(id_aluno, id_materias, nota) VALUES ($1, $2, $3)', [idAluno, idMateria, media]);
        console.log(`Média cadastrada: ${media.toFixed(2)}`);
    }
    catch (error) {
        console.error('Erro ao cadastrar notas:', error);
        throw error;
    }
}
// Função para validar nota (0 a 10)
function validarNota(nota) {
    return nota >= 0 && nota <= 10;
}
// Função para pesquisar e exibir todos os alunos com suas médias
async function pesquisarAlunos() {
    try {
        console.log('\n╔═══════════════════════════════════════════════════════════════╗');
        console.log('║        RELATÓRIO COMPLETO DE ALUNOS E SUAS MÉDIAS           ║');
        console.log('╚═══════════════════════════════════════════════════════════════╝\n');
        // Busca todos os alunos
        const resultAlunos = await pool.query('SELECT Id_Aluno, Nome, Serie, Idade FROM Alunos ORDER BY Nome');
        if (resultAlunos.rows.length === 0) {
            console.log('Nenhum aluno cadastrado no sistema.\n');
            return;
        }
        // Para cada aluno, busca suas notas por matéria
        for (const aluno of resultAlunos.rows) {
            console.log('─────────────────────────────────────────────────────────────');
            console.log(`📚 ALUNO: ${aluno.nome}`);
            console.log(`   ID: ${aluno.id_aluno} | Série: ${aluno.serie} | Idade: ${aluno.idade} anos`);
            console.log('─────────────────────────────────────────────────────────────');
            // Busca as notas do aluno
            const resultNotas = await pool.query(`SELECT m.NomeMateria, am.nota 
         FROM Aluno_Materia am 
         JOIN Materias m ON am.id_materias = m.Id_Materia 
         WHERE am.id_aluno = $1
         ORDER BY m.NomeMateria`, [aluno.id_aluno]);
            if (resultNotas.rows.length === 0) {
                console.log('   ⚠️  Nenhuma nota cadastrada para este aluno.\n');
            }
            else {
                console.log('\n   NOTAS POR MATÉRIA:');
                let somaMedias = 0;
                resultNotas.rows.forEach(row => {
                    const media = parseFloat(row.nota);
                    somaMedias += media;
                    const status = media >= 7 ? '✅ APROVADO' : media >= 5 ? '⚠️  RECUPERAÇÃO' : '❌ REPROVADO';
                    console.log(`   • ${row.nomemateria.padEnd(20)} → Média: ${media.toFixed(2)} ${status}`);
                });
                // Calcula média geral do aluno
                const mediaGeral = somaMedias / resultNotas.rows.length;
                console.log('\n   ═══════════════════════════════════════════════════════');
                console.log(`   📊 MÉDIA GERAL DO ALUNO: ${mediaGeral.toFixed(2)}`);
                console.log('   ═══════════════════════════════════════════════════════\n');
            }
        }
        console.log('═════════════════════════════════════════════════════════════\n');
    }
    catch (error) {
        console.error('Erro ao pesquisar alunos:', error);
        throw error;
    }
}
// Função para cadastrar novo aluno
async function cadastrarNovoAluno() {
    try {
        console.log('\n=== CADASTRO DE NOVO ALUNO ===\n');
        // Coleta dados do aluno
        const nome = readlineSync.question('Nome do aluno: ');
        const serie = readlineSync.question('Serie (ex: 3C): ');
        const idadeStr = readlineSync.question('Idade: ');
        const idade = parseInt(idadeStr);
        if (isNaN(idade)) {
            console.error('Idade inválida!');
            return;
        }
        // Cadastra o aluno
        console.log('\nCadastrando aluno...');
        const idAluno = await cadastrarAluno({ nome, serie, idade });
        console.log(`✅ Aluno cadastrado com sucesso! ID: ${idAluno}\n`);
        // Busca matérias disponíveis
        const materias = await buscarMaterias();
        if (materias.length === 0) {
            console.log('⚠️  Nenhuma matéria cadastrada no sistema!');
            return;
        }
        console.log('=== MATÉRIAS DISPONÍVEIS ===');
        materias.forEach(materia => {
            console.log(`${materia.id} - ${materia.nome}`);
        });
        console.log();
        // Para cada matéria, coleta 8 notas
        for (const materia of materias) {
            console.log(`\n--- ${materia.nome} ---`);
            const notas = [];
            for (let i = 1; i <= 8; i++) {
                let notaValida = false;
                while (!notaValida) {
                    const notaStr = readlineSync.question(`Nota ${i} (0-10): `);
                    const nota = parseFloat(notaStr);
                    if (isNaN(nota)) {
                        console.log('❌ Por favor, digite um número válido!');
                    }
                    else if (!validarNota(nota)) {
                        console.log('❌ Nota deve estar entre 0 e 10!');
                    }
                    else {
                        notas.push(nota);
                        notaValida = true;
                    }
                }
            }
            // Cadastra as notas (salvando a média)
            await cadastrarNotas(idAluno, materia.id, notas);
        }
        console.log('\n✅ CADASTRO CONCLUÍDO COM SUCESSO! ✅');
    }
    catch (error) {
        console.error('Erro durante o cadastro:', error);
        throw error;
    }
}
// Menu principal
async function exibirMenu() {
    console.log('\n╔═══════════════════════════════════════════════╗');
    console.log('║   SISTEMA DE GERENCIAMENTO DE NOTAS          ║');
    console.log('╚═══════════════════════════════════════════════╝');
    console.log('\n1 - Cadastrar novo aluno');
    console.log('2 - Pesquisar todos os alunos');
    console.log('3 - Sair\n');
}
// Função principal
async function main() {
    try {
        let continuar = true;
        while (continuar) {
            await exibirMenu();
            const opcao = readlineSync.question('Escolha uma opcao: ');
            switch (opcao) {
                case '1':
                    await cadastrarNovoAluno();
                    break;
                case '2':
                    await pesquisarAlunos();
                    readlineSync.question('\nPressione ENTER para continuar...');
                    break;
                case '3':
                    console.log('\n👋 Encerrando o sistema...');
                    continuar = false;
                    break;
                default:
                    console.log('\n❌ Opção inválida! Tente novamente.');
            }
        }
    }
    catch (error) {
        console.error('Erro durante a execução:', error);
    }
    finally {
        await pool.end();
        console.log('✅ Conexão com o banco de dados encerrada.\n');
    }
}
// Executa o programa
main();
