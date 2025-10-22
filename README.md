► INTEGRANTES:
  GABRIEL ARAUJO SANTOS (2508678)
  Paulo André Silva de Lima (2512630)
  Paulo Vitor Macieira Carvalho (2508725)
  Geovanna Cristina dos Santos (2504583)
  Leonardo da Graça Moraes (2512238)

 
  
  Codigo Do PostGrelql:
    CREATE TABLE Alunos (
  	Id_ALuno SERIAL PRIMARY KEY,
  	Nome VARCHAR(100),
  	Serie CHAR(3),
  	Idade INTEGER
  );
  
  CREATE TABLE Materias (
  	Id_Materia SERIAL PRIMARY KEY,
  	NomeMateria VARCHAR(20)
  );
  
  CREATE TABLE Aluno_Materia (
  	id_aluno INT REFERENCES Alunos(Id_Aluno),
  	id_materias INT REFERENCES materias(Id_Materia),
  	nota NUMERIC
  	);
  
  
  	INSERT INTO Alunos(Nome,Serie,Idade) 
  	VALUES ('Paulo', '3C', 20);
  
  	SELECT *FROM Alunos;
  	SELECT *FROM Materias;
  	SELECT *FROM Aluno_Materia;
  	
  	INSERT INTO Materias(NomeMateria) 
  	VALUES ('Matematica'),('Geografica'),('Historia');
  
  	INSERT INTO Aluno_Materia(id_aluno, id_materias,nota) 
  	VALUES (1, 1, 10);
  
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


  As medias das 8 notas são salvas no Banco de dados.

  Baixe o arquivo entre no termianl e digite npm install
  Depois: 
  npm install readline-sync
  npm install -D @types/readline-sync
  




