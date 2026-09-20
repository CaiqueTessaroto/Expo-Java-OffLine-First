# Expo + Java Offline First

Projeto didático para demonstrar, passo a passo, como uma aplicação **Expo / React Native** pode trabalhar no modelo **offline first** e sincronizar um formulário simples com um backend **Java + Spring Boot + H2**.

## Objetivo

Construir uma aplicação de cadastro de pessoas com:

- nome;
- e-mail;
- telefone;
- persistência local com SQLite;
- UUID gerado no dispositivo;
- status de sincronização;
- API REST em Spring Boot;
- persistência remota em H2;
- sincronização manual;
- sincronização automática quando a conexão retorna.

## Como estudar este repositório

O histórico de commits faz parte do tutorial. Cada commit corresponde a uma etapa incremental da aula.

Ao final, a estrutura será:

```text
.
├── mobile/   # Expo / React Native
├── backend/  # Spring Boot / H2
└── docs/     # roteiro de testes e material de apoio
```

## Fluxo final

```text
Formulário
    ↓
SQLite local
    ↓
sincronizado = false
    ↓
há conexão?
  ↙       ↘
não       sim
 ↓         ↓
fica      POST /pessoas
local       ↓
         Spring Boot
             ↓
             H2
             ↓
        resposta de sucesso
             ↓
       sincronizado = true
```

## Tecnologias

### Mobile

- Expo SDK 57
- React Native
- TypeScript
- expo-sqlite
- expo-crypto
- @react-native-community/netinfo

### Backend

- Java 21
- Spring Boot 4.1.1
- Spring Web
- Spring Data JPA
- H2 Database

## Observação

Em celular físico, `localhost:8080` aponta para o próprio celular. Para acessar o Spring executando no computador, configure a URL da API com o IP do computador na rede local.
