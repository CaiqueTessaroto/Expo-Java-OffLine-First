# Roteiro de testes — Offline First

## Cenário final

Queremos demonstrar:

```text
Formulário
    ↓
SQLite
    ↓
Pendente
    ↓
Internet disponível
    ↓
Spring Boot
    ↓
H2
    ↓
Sincronizado
```

---

## Teste 1 — Persistência local

1. Inicie o aplicativo.
2. Mantenha o backend indisponível.
3. Cadastre João e Maria.
4. Feche o aplicativo.
5. Abra novamente.

Resultado esperado:

```text
João   ⟳ Pendente
Maria  ⟳ Pendente
```

Os dados sobrevivem ao reinício do aplicativo.

---

## Teste 2 — Trabalho sem servidor

Com o Spring parado, cadastre:

```text
Pedro
Ana
Carlos
```

Resultado esperado:

```text
Pedro   ⟳ Pendente
Ana     ⟳ Pendente
Carlos  ⟳ Pendente
```

A falha do backend não impede o cadastro local.

---

## Teste 3 — Iniciar o backend

```bash
cd backend
mvn spring-boot:run
```

API:

```text
http://localhost:8080
```

---

## Teste 4 — H2 antes da sincronização

Abra:

```text
http://localhost:8080/h2-console
```

Use:

```text
JDBC URL: jdbc:h2:mem:offlinefirst
User Name: sa
Password:
```

Execute:

```sql
SELECT * FROM PESSOAS;
```

Os registros que existem apenas no celular ainda não devem aparecer.

---

## Teste 5 — Configurar comunicação

### Celular físico

Descubra o IPv4 do computador:

```powershell
ipconfig
```

Exemplo:

```env
EXPO_PUBLIC_API_URL=http://192.168.0.15:8080
```

O celular e o computador devem estar acessíveis na mesma rede.

### Android Emulator

Normalmente:

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:8080
```

> No celular físico, `localhost` é o próprio celular, não o computador.

---

## Teste 6 — Sincronização manual

Pressione:

```text
Sincronizar agora
```

Resultado esperado:

```text
João    ✓ Sincronizado
Maria   ✓ Sincronizado
Pedro   ✓ Sincronizado
Ana     ✓ Sincronizado
Carlos  ✓ Sincronizado
```

---

## Teste 7 — H2 depois da sincronização

Execute novamente:

```sql
SELECT * FROM PESSOAS;
```

Agora os registros devem aparecer no H2 com os mesmos UUIDs gerados no dispositivo.

---

## Teste 8 — Repetição

Pressione novamente:

```text
Sincronizar agora
```

Resultado esperado:

- nenhum registro local pendente;
- nenhuma duplicação criada no servidor.

---

## Teste 9 — Retorno automático da conexão

1. Deixe o backend executando.
2. Desligue a conectividade do celular.
3. Cadastre Fernanda e Paulo.
4. Confirme que aparecem como pendentes.
5. Restaure a conectividade.
6. Aguarde o NetInfo detectar a rede.

Resultado esperado:

```text
Fernanda  ✓ Sincronizado
Paulo     ✓ Sincronizado
```

---

## Teste 10 — Internet ativa, servidor parado

1. Mantenha o celular conectado à internet/rede.
2. Pare o Spring.
3. Cadastre outro registro.

Resultado esperado:

```text
⟳ Pendente
```

Isso demonstra:

> conectividade de rede não garante disponibilidade do backend.

Quando o backend voltar, uma nova tentativa poderá sincronizar o registro.

---

# Conceitos comprovados

- persistência local;
- offline first;
- UUID criado no cliente;
- fila simples de pendências;
- idempotência;
- API REST;
- confirmação do servidor;
- recuperação após falha;
- detecção de conectividade.
