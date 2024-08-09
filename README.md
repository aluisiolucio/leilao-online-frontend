# Frontend da Aplicação de Leilão Online com Lances em Tempo Real

Este repositório contém o frontend da aplicação de leilões online desenvolvida como o projeto de Trabalho de Conclusão de Curso (TCC) em Ciência da Computação. Essa aplicação é o frontend que consome a <a href="https://github.com/aluisiolucio/leilao-online-backend">API Leilão Online com Lances em Tempo Real</a>.

## Tecnologias Utilizadas

[![My Skills](https://skillicons.dev/icons?i=html,css,ts,nodejs,react,tailwind,vite)](https://skillicons.dev)

- **WebSockets**: Para comunicação em tempo real.

## Funcionalidades

- **Gerenciamento de Leilões**: Crie e visualize leilões e seus respectivos lotes, descrições e horários de início e fim.
- **Lances em Tempo Real**: Utiliza WebSockets para permitir que usuários façam e recebam lances em tempo real.
- **Autenticação e Autorização**: Inclui mecanismos para autenticar e autorizar usuários, garantindo que apenas participantes válidos possam fazer lances.

## Como Começar

1. Clone o repositório.
2. Configure o ambiente seguindo as instruções no arquivo `.env.example`.
3. Execute `npm install` para instalar as dependências do package.json.
4. Inicie a aplicação com `npm run dev`
5. Para gerar o build, execute o comando `npm run build`

## Contribuições

Contribuições são bem-vindas! Se você tiver sugestões de melhorias ou encontrar problemas, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).