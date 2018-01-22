--CREATE DATABASE adsnoobs;

CREATE LOGIN adsnoobs
	WITH PASSWORD = 'noobs@123';
GO


CREATE TABLE Conta
(
	Codigo INTEGER IDENTITY(1,1) NOT NULL,
	Descricao VARCHAR(100) NOT NULL,
	CONSTRAINT PK_Conta PRIMARY KEY(Codigo)
);

CREATE TABLE Categoria
(
	Codigo INTEGER IDENTITY(1,1) NOT NULL,
	Descricao VARCHAR(100) NOT NULL,
	CONSTRAINT PK_Categoria PRIMARY KEY(Codigo)
);

CREATE TABLE TipoMovimento
(
	Codigo INTEGER IDENTITY(1,1) NOT NULL,
	Descricao VARCHAR(100) NOT NULL,
	DebitoCredito CHAR(1) NOT NULL,
	CONSTRAINT PK_TipoMovimento PRIMARY KEY(Codigo)
);

CREATE TABLE Movimento
(
	Codigo INTEGER IDENTITY(1,1) NOT NULL,
	Descricao VARCHAR(100) NOT NULL,
	Data SMALLDATETIME NOT NULL,
	Valor NUMERIC(15, 2) NOT NULL,
	Efetivado CHAR(1) NULL DEFAULT 'N',

	ContaCodigo INT NOT NULL,
	CategoriaCodigo INT NOT NULL,
	TipoMovimentoCodigo INT NOT NULL,

	CONSTRAINT PK_Movimento PRIMARY KEY(Codigo),
	CONSTRAINT FK_Movimento_Tipo FOREIGN KEY (TipoMovimentoCodigo) 
		REFERENCES TipoMovimento (Codigo),
	CONSTRAINT FK_Movimento_Categoria FOREIGN KEY (CategoriaCodigo)
		REFERENCES Categoria (Codigo),
	CONSTRAINT FK_Movimento_Conta FOREIGN KEY (ContaCodigo)
		REFERENCES Conta (Codigo)
);