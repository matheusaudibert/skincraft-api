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

## Implantação na Vercel

### Pré-requisitos

- Uma conta na [Vercel](https://vercel.com)
- [Git](https://git-scm.com) instalado localmente

### Passos para implantação

1. Faça login na Vercel usando sua conta GitHub, GitLab ou Bitbucket

2. No dashboard da Vercel, clique em "Import Project" e selecione seu repositório

3. Configure o projeto:

   - Framework Preset: Other
   - Build Command: Deixe vazio ou use `npm run vercel-build`
   - Output Directory: Deixe vazio
   - Install Command: `npm install`

4. Clique em "Deploy" e aguarde a implantação do projeto

5. Ao concluir, você receberá uma URL para acessar sua API

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
