# App

Gynpass style app.

# RFs (Requisitos funcionais)

## Obrigatorias
- [x] Deve ser possivel se cadastrar;
- [x] Deve ser possivel se autenticar;
- [x] Deve ser possivel obter o perfil de usuario logado;
- [x] Deve ser possivel obter o numero de check-ins realizados pelo o usuario;
- [x] Deve ser possivel o usuario obter seu historico de check-ins;
- [ ] Deve ser possivel o usuario buscar academias pelo nome;
- [ ] Deve ser possivel o usuario buscar academias proximas;
- [x] Deve ser possivel realizar um check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usuario;
- [x] Deve ser possivel cadastrar uma academia;

## Futuras.
- [ ] Deve ser possivel filtrar academias pelas suas classificacoes;
- [ ] Deve ser possivel o usuario da uma nota de satisfacao da academia;
- [ ] Deve ser possivel filtrar as academias por tipos de planos;

# RNs (Regras de negocio)

- [x] O usuario nao deve poder se cadastar com um email duplicado;
- [x] O usuario nao pode fazer dois check-ins no mesmo dia;
- [x] O usuario nao pode fazer check-in se nao estiver a (100m) da academia;
- [ ] O check-in so pode ser validado ate 20 minutos apos criado;
- [ ] O check-in so pode ser validado por admitradores;
- [ ] A academia so pode ser cadastrada por  admitadores;

## Rns futuras
- [ ] O usuario nao deve classificar a academia mais de uma vez por mes;
- [ ] O usuario nao pode dar duas notas de satisfacao no mesmo mes;

# RNFs (Requisitos nao-funcionais)

- [x] A senha do usuario precisa estar criptografada;
- [x] Os dados da aplicacao precisar estar persistido em um banco postgresSql;
- [x] Todas as listas de dados precisam estar paginada com 20 itens por pagina;
- [ ] O usuario deve ser autenticado por um JWT (JSON-web-token);
- [ ] O jwt tem a duracao de 1 hora;

