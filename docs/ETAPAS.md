# Etapas do tutorial

O histórico do Git faz parte do material didático. Cada commit introduz uma etapa.

## 0 — Visão geral

```text
docs: initialize offline-first tutorial repository
```

Apresenta o problema, o fluxo offline first e as tecnologias.

## 1 — Formulário Expo

```text
feat(expo): create basic person form
```

O formulário captura nome, e-mail e telefone, mas ainda não persiste os dados.

## 2 — SQLite local

```text
feat(expo): persist people locally with SQLite
```

Passa a:

- criar UUID no dispositivo;
- salvar no SQLite;
- iniciar todo registro com `sincronizado = 0`.

## 3 — Listagem e status

```text
feat(expo): show local people and synchronization status
```

A interface passa a exibir:

```text
⟳ Pendente
✓ Sincronizado
```

## 4 — Spring Boot + H2

```text
feat(spring): add Spring Boot backend with JPA and H2
```

Cria:

- Spring Boot;
- entidade `Pessoa`;
- `PessoaRepository`;
- banco H2;
- H2 Console.

## 5 — API REST

```text
feat(spring): expose idempotent people REST API
```

Endpoints:

```text
POST /pessoas
GET  /pessoas
```

O UUID recebido do cliente também é a chave primária no servidor.

## 6 — Cliente REST no Expo

```text
feat(expo): add Spring REST API client
```

Cria o cliente HTTP e a configuração `EXPO_PUBLIC_API_URL`.

## 7 — Sincronização manual

```text
feat(expo): add manual pending-record synchronization
```

O botão de sincronização deixa o algoritmo explícito:

```text
buscar pendentes
      ↓
enviar um por um
      ↓
servidor confirmou?
  ↙            ↘
não            sim
 ↓              ↓
mantém 0     marca 1
```

## 8 — Sincronização automática

```text
feat(expo): synchronize automatically when connectivity returns
```

NetInfo detecta a conectividade e reutiliza a mesma rotina de sincronização.

## 9 — Teste de ponta a ponta

```text
docs: add end-to-end classroom test guide
```

Documenta a demonstração final da aula.

---

# Navegando entre etapas

Listar commits:

```bash
git log --oneline
```

Abrir uma etapa temporariamente:

```bash
git checkout <hash-do-commit>
```

Voltar para a versão final:

```bash
git switch main
```
