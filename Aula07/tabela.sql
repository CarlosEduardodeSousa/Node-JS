create database sistemacadastro;

use sistemacadastro;

create table if not exists usuarios(
	id int not null auto_increment,
    nome varchar(50),
    email varchar(100),
    idade int,
    primary key (id)
);

describe usuarios;
