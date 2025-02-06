# 🌟 Sistema de Gerenciamento de Notas e Frequência - Frontend 📚

## Descrição
Este repositório contém o frontend para o Sistema de Gerenciamento de Notas e Frequência. Ele oferece uma interface para gerenciar alunos, suas notas e frequências, exibindo informações cruciais como a média da turma, alunos com desempenho excepcional ou crítico e permitindo o cadastro dos alunos.

## Funcionalidades 🚀

- **Cadastro de alunos** 📝: Adicione novos alunos com nome, notas e frequência.
- **Exibição de alunos** 👀: Visualize a lista de alunos com suas respectivas médias de notas e frequências.
- **Destaques** 🌟:
  - Alunos com **média acima da turma** são destacados em verde 🍀.
  - Alunos com **frequência abaixo de 75%** são destacados em laranja 🍊.
- **Atualização de dados** 🔄: Recalcule as médias da turma e atualize as informações dos alunos.
- **Visualização de alunos específicos** 🔍:
  - Exiba alunos com **média superior** à da turma.
  - Exiba alunos com **frequência abaixo de 75%**.

## Tecnologias Usadas 🛠️
- **React** ⚛️: Biblioteca JavaScript para a criação da interface de usuário.
- **TypeScript** 🖥️: Superset do JavaScript para uma tipagem mais robusta e segura.
- **Material UI (MUI)** 🎨: Framework de componentes React para design com material.
- **Axios** 📡: Biblioteca para realizar requisições HTTP ao backend.
- **Node.js** 🌐: Ambiente de execução JavaScript para rodar o frontend.

## Instalação e Execução ⚙️

### Pré-requisitos ⚡
1. **Node.js e npm**: Certifique-se de ter o [Node.js](https://nodejs.org/) e o [npm](https://www.npmjs.com/) instalados.

### Passos para Execução 🚶‍♂️

1. **Clonar o repositório**:
   ```bash
   git clone https://github.com/sabarense/frontend-challenge
   cd frontend-challenge
   ```
2. **Instalar dependências**:
    ```bash
    npm install
    ```
3. **Executar o projeto: Inicie o servidor de desenvolvimento com o comando**:
   ```bash
   npm start
   ```

## Decisões de Projeto 💡
Estrutura de Componentes: A aplicação foi organizada com dois componentes principais:

- AlunoForm: Para criar novos alunos 🖊️.
- AlunoList: Para exibir a lista de alunos e suas informações 📋.
- Uso de Material UI: Optado o uso Material UI para garantir uma interface moderna, responsiva e agradável ao usuário 🎨.

- Requisições Assíncronas com Axios: As interações com o backend são feitas de forma assíncrona com Axios, proporcionando uma experiência de usuário fluida ⚡.

- Destaque Visual de Alunos: Alunos com desempenho excepcional ou crítico são destacados visualmente, facilitando a gestão das informações 🔍.

## Contribuições 🤝 
Se você quiser contribuir com o projeto, fique à vontade para abrir issues e pull requests.
## Licença 📄
Este projeto está licenciado sob a MIT License.
