---
description: Implementa a próxima funcionalidade do DMS preservando sua arquitetura.
name: evoluir-dms
argument-hint: descreva a funcionalidade a implementar
agent: agent
---

# Evoluir o Document Management System

Revise o estado atual do projeto e implemente esta funcionalidade:
`${input:funcionalidade:funcionalidade a implementar}`

Consulte a especificação em `docs/specs/dms-spec.md` e preserve o comportamento já implementado.

Restrições:

- Backend em Node.js, Express CommonJS e Clean Architecture simples.
- Frontend em React funcional com hooks e comunicação via `fetch` usando `/api`.
- Upload de arquivos exclusivamente local com `multer.diskStorage` em `backend/storage`.
- Metadados mantidos em memória nesta fase.
- Não introduza banco de dados, armazenamento externo, autenticação completa ou TypeScript.
- Preserve o fluxo `routes -> controllers -> services -> repositories` no backend.
- Evite duplicação e mantenha alterações pequenas e coerentes com o código existente.

Antes de editar:

1. Identifique o código existente relacionado à funcionalidade.
2. Explique brevemente a hipótese de implementação.
3. Faça alterações pequenas e preserve a compatibilidade.
4. Adicione ou atualize testes quando houver cobertura aplicável.
5. Execute o teste backend e o build frontend.
6. Informe resumidamente os arquivos alterados e a validação realizada.
