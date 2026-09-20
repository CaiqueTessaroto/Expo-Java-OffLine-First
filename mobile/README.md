# Mobile — Expo Offline First

## Requisitos

- Node.js compatível com Expo SDK 57;
- Expo Go ou emulador.

## Instalar

```bash
cd mobile
npm install
```

## Configurar a URL do backend

Copie o exemplo:

```bash
cp .env.example .env
```

No Windows, também é possível criar `.env` manualmente.

### Celular físico

Descubra o IP do computador:

```powershell
ipconfig
```

Configure, por exemplo:

```env
EXPO_PUBLIC_API_URL=http://192.168.0.15:8080
```

### Android Emulator

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:8080
```

## Executar

```bash
npm start
```

## Banco local

Tabela:

```text
pessoas
├── id
├── nome
├── email
├── telefone
└── sincronizado
```

Estados:

```text
0 = pendente
1 = sincronizado
```

## Regra principal

O botão Salvar sempre grava primeiro no SQLite.

A tentativa de envio ao servidor ocorre depois.

Se a API não estiver disponível, o registro continua localmente como pendente.
