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
