# 📘 Projeto FaculdadePost

### 👥 INTEGRANTES:
- GABRIEL ARAUJO SANTOS (2508678)  
- Paulo André Silva de Lima (2512630)  
- Paulo Vitor Macieira Carvalho (2508725)  
- Geovanna Cristina dos Santos (2504583)  
- Leonardo da Graça Moraes (2512238)

---

## 🧱 Estrutura do Banco de Dados

### Tabela de Alunos
```sql
CREATE TABLE Alunos (
    Id_Aluno SERIAL PRIMARY KEY,
    Nome VARCHAR(100),
    Serie CHAR(3),
    Idade INTEGER
);
Tabela de Materias
sql
CREATE TABLE Materias (
    Id_Materia SERIAL PRIMARY KEY,
    NomeMateria VARCHAR(20)
);
Tabela de Relacionamento Aluno_Materia
sql
CREATE TABLE Aluno_Materia (
    id_aluno INT REFERENCES Alunos(Id_Aluno),
    id_materias INT REFERENCES Materias(Id_Materia),
    nota NUMERIC
);
Inserindo dados
sql
-- Inserindo aluno
INSERT INTO Alunos(Nome, Serie, Idade) 
VALUES ('Paulo', '3C', 20);

-- Inserindo matérias
INSERT INTO Materias(NomeMateria) 
VALUES ('Matematica'), ('Geografica'), ('Historia');

-- Inserindo nota do aluno na matéria
INSERT INTO Aluno_Materia(id_aluno, id_materias, nota) 
VALUES (1, 1, 10);
Consultas
sql
SELECT * FROM Alunos;
SELECT * FROM Materias;
SELECT * FROM Aluno_Materia;
Consulta com JOIN para exibir dados completos
sql
SELECT 
    a.Id_Aluno,
    a.Nome AS NomeAluno,
    a.Serie,
    a.Idade,
    m.Id_Materia,
    m.NomeMateria,
    am.nota
FROM Aluno_Materia am
INNER JOIN Alunos a ON am.id_aluno = a.Id_Aluno
INNER JOIN Materias m ON am.id_materias = m.Id_Materia
ORDER BY a.Id_Aluno, m.Id_Materia;
🎒 1. PRÉ-REQUISITOS
Você precisa ter instalado:

Node.js

PostgreSQL

📁 2. ESTRUTURA DO PROJETO
pgsql
Copiar código
/faculdadepost
├── src/
│   └── index.ts       ← onde tudo vai acontecer
├── dist/              ← gerado após o build
├── package.json
├── tsconfig.json
🛠️ 3. INSTALANDO AS LIBS
No terminal, dentro da pasta do projeto, rode:

bash
npm install
npm install readline-sync pg
npm install -D typescript ts-node @types/node @types/pg @types/readline-sync
📦 4. SEU package.json
{
  "name": "faculdadepost",
  "version": "1.0.0",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@types/pg": "^8.15.5",
    "pg": "^8.16.3",
    "readline-sync": "^1.4.10",
    "ts-node": "^10.9.2"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/readline-sync": "^1.4.8",
    "typescript": "^5.9.3"
  }
}
🧱 5. NO BANCO DE DADOS
Você vai precisar das seguintes tabelas:

Alunos

Materias

Aluno_Materia

🧪 6. COMO RODAR O PROJETO
Depois de criar seu index.ts, execute:

bash
Copiar código
npm run build
npm start
