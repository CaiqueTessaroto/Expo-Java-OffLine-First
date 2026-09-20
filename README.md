# Expo + Java Offline First

Exemplo didático completo de uma aplicação **Expo / React Native** que funciona em modo **offline first** e sincroniza um formulário com um backend **Java + Spring Boot + H2**.

## Objetivo da aula

Cadastrar:

- nome;
- e-mail;
- telefone.

O usuário deve conseguir salvar mesmo sem internet ou com o backend indisponível.

## Arquitetura

```text
┌──────────────────────────────┐
│          Expo Mobile         │
│                              │
│ Formulário                   │
│    ↓                         │
│ SQLite local                 │
│    ↓                         │
│ Registros pendentes          │
│    ↓                         │
│ Serviço de sincronização     │
│    ↓                         │
│ NetInfo                      │
└──────────────┬───────────────┘
               │ HTTP / JSON
               ↓
┌──────────────────────────────┐
│        Spring Boot           │
│                              │
│ Controller                   │
│    ↓                         │
│ Service                      │
│    ↓                         │
│ Repository / JPA             │
│    ↓                         │
│ H2                           │
└──────────────────────────────┘
```

## Regra principal

> Salvar localmente e sincronizar são operações diferentes.

O fluxo normal é:

```text
SALVAR
  ↓
gera UUID
  ↓
SQLite
  ↓
sincronizado = 0
  ↓
tenta sincronizar quando possível
  ↓
Spring confirma
  ↓
sincronizado = 1
```

## Estrutura

```text
.
├── mobile/
│   ├── App.tsx
│   ├── .env.example
│   └── src/
│       ├── api.ts
│       ├── database.ts
│       └── sync.ts
├── backend/
│   ├── pom.xml
│   └── src/main/...
└── docs/
    ├── ETAPAS.md
    └── ROTEIRO-TESTES.md
```

# Backend

```bash
cd backend
mvn spring-boot:run
```

API:

```text
http://localhost:8080
```

H2 Console:

```text
http://localhost:8080/h2-console
```

JDBC URL:

```text
jdbc:h2:mem:offlinefirst
```

# Mobile

```bash
cd mobile
npm install
npm start
```

Crie `mobile/.env`.

### Celular físico

```env
EXPO_PUBLIC_API_URL=http://IP_DO_COMPUTADOR:8080
```

Exemplo:

```env
EXPO_PUBLIC_API_URL=http://192.168.0.15:8080
```

### Android Emulator

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:8080
```

# API REST

```text
POST /pessoas
GET  /pessoas
```

# Como usar o histórico em aula

Cada commit corresponde a uma etapa do tutorial.

```bash
git log --oneline
```

Consulte:

- `docs/ETAPAS.md`
- `docs/ROTEIRO-TESTES.md`

# Tecnologias

## Mobile

- Expo SDK 57;
- React 19.2.3;
- React Native 0.86;
- TypeScript;
- expo-sqlite;
- expo-crypto;
- NetInfo.

## Backend

- Java 21;
- Spring Boot 4.1.1;
- Spring Data JPA;
- H2.

# Escopo

O exemplo implementa apenas:

```text
CREATE offline
+
sincronização cliente → servidor
```

Evoluções para aulas futuras:

- edição offline;
- exclusão offline;
- sincronização bidirecional;
- conflitos;
- autenticação;
- retry/backoff;
- fila de operações.
