# Task Management System API

Backend приложение на NestJS для управления задачами с аутентификацией, авторизацией и системой ролей.

## Технологический стек

- **NestJS** — фреймворк для Node.js
- **PostgreSQL** — база данных
- **Prisma ORM** — работа с базой данных
- **JWT** — аутентификация
- **bcrypt** — хэширование паролей
- **class-validator** — валидация входных данных
- **NestJS Logger** — логирование

## Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка окружения

Создайте файл `.env` в корне проекта:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/task_management?schema=public"
JWT_SECRET="secret-jwt-key"
PORT=3000
```

### 3. Запуск приложения

Миграции и Prisma Client применяются автоматически при запуске — отдельно запускать не нужно.

```bash
# Разработка (migrate dev + watch)
npm run start:dev

# Продакшн (migrate deploy + сборка + запуск)
npm run prod
```

> `npm install` автоматически запускает `prisma generate` через `postinstall`-скрипт.
> Каждый старт автоматически применяет новые миграции перед запуском сервера.

#### Все доступные скрипты запуска

| Скрипт | Миграция | Описание |
|---|---|---|
| `npm run start:dev` | `migrate dev` | Разработка с hot-reload |
| `npm run start:debug` | `migrate dev` | Отладка с hot-reload |
| `npm run start` | `migrate deploy` | Запуск без пересборки |
| `npm run start:prod` | `migrate deploy` | Продакшн (dist уже собран) |
| `npm run prod` | `migrate deploy` | Продакшн с нуля: сборка + запуск |

---

## Роли и права доступа

### USER
- Создавать задачи
- Просматривать свои задачи
- Просматривать, редактировать и удалять свои задачи

### ADMIN
- Просматривать все задачи
- Просматривать, редактировать и удалять любую задачу
- Просматривать, редактировать и удалять любого пользователя

---

## Структура проекта

```
src/
├── auth/
│   ├── decorators/
│   │   └── roles.decorator.ts             
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts              
│   │   └── roles.guard.ts                
│   ├── strategies/
│   │   └── jwt.strategy.ts                
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
├── tasks/
│   ├── dto/
│   │   ├── create-task.dto.ts
│   │   └── update-task.dto.ts           
│   ├── interfaces/
│   │   └── tasks.interface.ts            
│   ├── tasks.controller.ts
│   ├── tasks.module.ts
│   ├── tasks.repository.ts               
│   └── tasks.service.ts
├── users/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts            
│   ├── interfaces/
│   │   └── users.interface.ts           
│   ├── users.controller.ts
│   ├── users.module.ts
│   ├── users.repository.ts                
│   └── users.service.ts
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── common/
│   ├── constants/
│   │   └── injection-tokens.ts            
│   ├── filters/
│   │   └── http-exception.filter.ts       
│   └── interceptors/
│       ├── response-transform.interceptor.ts  
│       └── request-timing.interceptor.ts      
├── app.module.ts
└── main.ts
prisma/
├── schema.prisma
├── prisma.config.ts
└── migrations/
    ├── 20260612210159_init/
    │   └── migration.sql
    └── 20260612214450_uuid/
        └── migration.sql
```

---

## Логирование

Все ошибки и важные события логируются в консоль с помощью NestJS Logger.
