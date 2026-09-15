insert into usuarios (id, nome, email, idade) values
(default, 'Victor Lima', 'victorlima@gmail.com', 17),
(default, 'Gabriel Souza', 'gabrielsouza@gmail.com', 26),
(default, 'Fabiane Rodrigues', 'fabianerodrigues@gmail.com',30),
(default, 'Luiz Fernando', 'luizfernando@gmail.com',22),
(default, 'Ana Carla', 'anacarla@gmail.com', 24);

select * from usuarios;

select nome, email from usuarios where idade = 30;

select nome, email, idade from usuarios where idade > 18;