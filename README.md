# Simples Endpoints para teste de CRUD

Essa é uma aplicação simples para testar chamadas HTTP Rest.

Para rodar a aplicação, execute o `npm install` e então:

~~~
node app.js
~~~

O seviço será executado na porta 5000.


## Listar

Para listar os objetos da lista de memória basta fazer um `GET` pelo:

~~~
<servidor:porta>/api/v1/list
~~~


## Adicionar

Para adicionar um objeto na lista de memória basta fazer um `POST` pelo:

~~~
<servidor:porta>/api/v1/add
~~~

Será criado um `id` para o objeto enviado.


## Alterar

Para altera um objeto na lista de memória basta fazer um `PUT` pelo:

~~~
<servidor:porta>/api/v1/update
~~~

É necessário enviar o `id` dentro do objeto para atualizar na lista.


## Remover

Para altera um objeto na lista de memória basta fazer um `DELETE` pelo:

~~~
<servidor:porta>/api/v1/delete
~~~

É necessário enviar o `id` dentro do objeto para atualizar na lista.


## Recuperar Um

Para recuperar um objeto da lista de memória basta fazer um `GET` pelo:

~~~
<servidor:porta>/api/v1/single/:id
~~~

