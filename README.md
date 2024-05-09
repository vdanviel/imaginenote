# Projeto Imaginenote

O **Imaginenote** é um projeto desenvolvido com o objetivo de permitir aos usuários salvar anotações contendo mídias como áudio, vídeo e imagem. A aplicação foi construída utilizando Vue.js para o frontend e integração com uma API Laravel para o backend.

## Funcionalidades

- **Salvar Anotações**: Os usuários podem criar anotações e associar mídias como áudio, vídeo e imagem a elas.
- **Integração com Firebase**: Para o armazenamento seguro e eficiente das mídias, o projeto utiliza o Firebase como provedor de armazenamento.
- **APIs Externas**: O Imaginenote integra-se a outras APIs para enriquecer a experiência do usuário, incluindo a obtenção de informações sobre o usuário com base em seu endereço IP.

## Tecnologias Utilizadas

- **Vue.js**: Framework JavaScript para a construção da interface do usuário.
- **Laravel**: Framework PHP utilizado para a criação da API que alimenta o backend da aplicação ([vdanviel/imaginenote-api](https://duckduckgo.com "vdanviel/imaginenote-api")).
- **Google Firebase**: Plataforma de desenvolvimento de aplicativos móveis e da web do Google, utilizada para armazenamento e hospedagem de mídias.

## Fluxo de Funcionamento

1. O usuário acessa o Imaginenote através de um navegador web e autentica com código enviado por email a ele.
2. Ao criar uma nova anotação, ele pode adicionar mídias como áudio, vídeo ou imagem.
3. As mídias são carregadas e armazenadas de forma segura no Google Firebase.
4. A anotação, juntamente com suas mídias associadas, é enviada para a API Laravel.
5. A API processa e armazena os dados no banco de dados, garantindo a persistência das informações.
6. Em paralelo, a aplicação pode fazer chamadas a APIs externas para enriquecer as informações da anotação, como dados do usuário com base em seu IP.

## Conclusão

O **Imaginenote** oferece uma maneira conveniente e segura para os usuários organizarem suas anotações, enriquecendo-as com mídias como áudio, vídeo e imagem. Ao integrar-se ao Firebase para o armazenamento das mídias e ao Laravel para o backend da aplicação, o projeto garante um fluxo eficiente e confiável para salvar e recuperar informações. Além disso, a integração com APIs externas permite uma experiência ainda mais personalizada, fornecendo dados contextuais relevantes para as anotações dos usuários.
