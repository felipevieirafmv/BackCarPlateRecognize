CREATE DATABASE IF NOT EXISTS CarPlateDB;
USE CarPlateDB;

CREATE TABLE Endereco (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Cep INT NOT NULL,
    Cidade VARCHAR(100) NOT NULL,
    Bairro VARCHAR(100) NOT NULL,
    Rua VARCHAR(100) NOT NULL,
    Complemento VARCHAR(100),
    Uf CHAR(2) NOT NULL
);

CREATE TABLE Funcionario (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(80) NOT NULL,
    EDV CHAR(8) NOT NULL,
    Senha LONGTEXT,
    Salt VARCHAR(200),
    Adm BIT NOT NULL,
    EnderecoID INT,
    FOREIGN KEY (EnderecoID) REFERENCES Endereco(ID)
);

CREATE TABLE Carro (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Cor VARCHAR(50) NOT NULL,
    Placa VARCHAR(7) NOT NULL,
    Modelo VARCHAR(100),
    Ano SMALLINT NOT NULL,
    FuncionarioID INT,
    FOREIGN KEY (FuncionarioID) REFERENCES Funcionario(ID)
);

CREATE TABLE Log (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    CarroID INT,
    FuncionarioID INT,
    DiaEntrada DATE,
    HoraEntrada TIME,
    DiaSaida DATE,
    HoraSaida TIME,
    FOREIGN KEY (CarroID) REFERENCES Carro(ID),
    FOREIGN KEY (FuncionarioID) REFERENCES Funcionario(ID)
);

select * from log