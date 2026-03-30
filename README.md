# 🚀 Como rodar o projeto

Este projeto utiliza:
- Vite (React)
- json-server (API fake)

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar o frontend (Vite)

```bash
npm run dev
```

### 3. Rodar o backend (json-server)

```bash
npm run server
```

### ⚠️ Observações

Ao instalar o json-server, foi utilizada automaticamente a versão mais recente, que ainda está em beta. Durante o desenvolvimento, observei que, ao criar um novo produto, o formato de geração do identificador único (ID) havia sido alterado para UUID (string), em vez do padrão numérico incremental utilizado nas versões estáveis.

Para corrigir esse comportamento e manter consistência com a estrutura esperada da aplicação, foi necessário instalar uma versão estável do json-server. Além disso, realizei a adequação dos dados existentes, convertendo os IDs de string para o formato numérico.