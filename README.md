# SkinCraft API

Uma API para recuperar informações de jogadores do Minecraft, skins e capas.

## Funcionalidades

- Obter perfis de jogadores, incluindo histórico de nomes
- Visualizar skins de jogadores com tags e estatísticas de uso
- Acessar capas de jogadores com descrições detalhadas
- Navegar em um banco de dados completo de capas do Minecraft

## Endpoints da API

- `/api/user/:identifier/profile` - Obter perfil completo do jogador
- `/api/user/:identifier/capes` - Obter capas do jogador
- `/api/user/:identifier/skins` - Obter skins do jogador
- `/api/capes` - Listar todas as capas conhecidas do Minecraft
- `/api/names/:length` - Obter nomes que ficarão disponíveis em breve por tamanho
- `/api/names` - Obter os 10 primeiros nomes que ficarão disponíveis em breve
- `/api/name/:username` - Verificar disponibilidade de um nome específico
- `/api/skins/latest` - Obter as skins mais recentes do Minecraft
- `/api/skins/random` - Obter skins aleatórias do Minecraft
- `/api/skins/daily` - Obter skins em tendência diária
- `/api/skins/weekly` - Obter skins em tendência semanal
- `/api/skins/monthly` - Obter skins em tendência mensal

## Implantação no Heroku

### Pré-requisitos

- Uma conta no [Heroku](https://heroku.com)
- [Git](https://git-scm.com) instalado localmente
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) instalado

### Passos para implantação

1. Faça login no Heroku CLI:

```bash
heroku login
```

2. Crie um novo aplicativo Heroku:

```bash
heroku create skincraft-api
```

3. Adicione os buildpacks necessários:

```bash
heroku buildpacks:add --index 1 https://github.com/heroku/heroku-buildpack-apt
heroku buildpacks:add --index 2 heroku/nodejs
```

4. Faça deploy do código:

```bash
git add .
git commit -m "Ready for Heroku deployment"
git push heroku main
```

5. Abra o aplicativo:

```bash
heroku open
```

## Desenvolvimento

### Configuração Local

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Executar em modo de produção
npm start
```

### Variáveis de Ambiente

Nenhuma variável de ambiente é necessária para operação básica.

## Licença

MIT
