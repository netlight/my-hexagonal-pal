# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Install dependencies**: `pnpm install`
- **Development server**: `pnpm dev` (runs on port 3000)
- **Build**: `pnpm build` (clean + generate API types + compile + copy resources)
- **Lint**: `pnpm lint` (ESLint for TypeScript files)
- **Clean**: `pnpm clean` (removes dist directory)
- **Generate API types**: `pnpm generate-api-types` (from OpenAPI spec)

## Architecture Overview

This is a **Hexagonal Architecture** (Ports & Adapters) Node.js TypeScript application demonstrating clean architecture principles for a personal finance management system.

### Core Architecture Layers

1. **Domain Layer** (`src/core/domain/`):
   - Contains business entities (`Budget`, `Expense`, `IncomeStream`, `Earning`)
   - Domain services (`balanceDomainService.ts`)
   - Domain errors with specific error types
   - Pure business logic with no external dependencies

2. **Application Layer** (`src/core/application/`):
   - **Ports**: Interfaces defining contracts (e.g., `BudgetPersistencePort`)
   - **Use Cases**: Business operations (e.g., `createBudgetUseCase`, `trackExpenseUseCase`)
   - **Services**: Application-level orchestration (`BudgetApplicationService`)

3. **Infrastructure Layer** (`src/infrastructure/`):
   - **Inbound Adapters**: Express HTTP routes and controllers
   - **Outbound Adapters**: MongoDB persistence implementations
   - **Configuration**: Environment, database setup

### Key Patterns

- **Dependency Injection**: Dependencies are injected through constructors and function parameters
- **Port-Adapter Pattern**: Clear separation between business logic and external concerns
- **Value Objects**: Domain entities use strong typing (e.g., `BudgetId`, `ExpenseId`)
- **Domain-Driven Design**: Rich domain models with business validation

### Project Structure

- Domain entities are in `src/core/domain/model/`
- Persistence ports in `src/core/application/port/`
- MongoDB adapters in `src/infrastructure/adapter/out/*/persistence/mongo/`
- HTTP endpoints in `src/infrastructure/adapter/in/*/http/`
- Use cases orchestrate business operations
- Application services provide higher-level domain operations

### Database & External Services

- **MongoDB**: Primary data store with Mongoose ODM
- **OpenAPI**: API specification in `api/my-finance-pal.yml`
- **Docker Compose**: MongoDB container for local development

### Development Environment

- **Package Manager**: pnpm (not npm)
- **TypeScript**: Strict configuration with path mapping
- **Express**: Web framework with OpenAPI validation middleware
- **MongoDB**: Start with `docker-compose up -d`
- **Environment**: Uses `envalid` for environment variable validation

### Key Considerations

- Business logic is pure and testable (domain layer)
- External dependencies are abstracted through ports
- Error handling uses domain-specific error types
- All HTTP routes validate against OpenAPI specification
- Use existing patterns when adding new features (follow the budget/expense examples)