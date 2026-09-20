# Mobile — Expo Offline First

## Requisitos

- Node.js 22.13 ou superior;
- Expo Go ou emulador Android/iOS.

> Este laboratório é propositalmente mobile. Web não faz parte do exercício, porque o SQLite no navegador exige configuração adicional.

## Instalar

```bash
cd mobile
npm install
```

Confira se as dependências estão alinhadas com o SDK:

```bash
npx expo install --check
```

Se o Expo indicar versões incompatíveis:

```bash
npx expo install --fix
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
npx expo start
```

Depois abra no Expo Go ou use:

```bash
npm run android
```

Se houver cache de uma configuração anterior:

```bash
npx expo start --clear
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
