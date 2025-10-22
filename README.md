# 📘 Projeto FaculdadePost

### 👥 INTEGRANTES:
- GABRIEL ARAUJO SANTOS (2508678)  
- Paulo André Silva de Lima (2512630)  
- Paulo Vitor Macieira Carvalho (2508725)  
- Geovanna Cristina dos Santos (2504583)  
- Leonardo da Graça Moraes (2512238)

---

## 🎒 1. Pré-requisitos

Você precisa ter instalado:

- Node.js  
- PostgreSQL  

---

## 📁 2. Estrutura do projeto

/faculdadepost
├── src/
│ └── index.ts ← código principal
├── dist/ ← gerado após build
├── package.json
├── tsconfig.json

---

## 🧱 3. Criação das tabelas e inserção de dados no banco de dados

### Tabela de Alunos
```
CREATE TABLE Alunos (
    Id_Aluno SERIAL PRIMARY KEY,
    Nome VARCHAR(100),
    Serie CHAR(3),
    Idade INTEGER
);
Tabela de Materias
CREATE TABLE Materias (
    Id_Materia SERIAL PRIMARY KEY,
    NomeMateria VARCHAR(20)
);
Tabela de relacionamento Aluno_Materia
CREATE TABLE Aluno_Materia (
    id_aluno INT REFERENCES Alunos(Id_Aluno),
    id_materias INT REFERENCES Materias(Id_Materia),
    nota NUMERIC
);
Inserção de dados exemplo
INSERT INTO Alunos(Nome, Serie, Idade) 
VALUES ('Paulo', '3C', 20);

INSERT INTO Materias(NomeMateria) 
VALUES ('Matematica'), ('Geografica'), ('Historia');

INSERT INTO Aluno_Materia(id_aluno, id_materias, nota) 
VALUES (1, 1, 10);
🛠️ 4. Instalando dependências
No terminal, dentro da pasta do projeto, execute:


npm install
npm install readline-sync pg
npm install -D typescript ts-node @types/node @types/pg @types/readline-sync
🧪 5. Rodando o projeto
Depois de criar seu index.ts (já feito no seu caso), execute:

npm run build
npm start
