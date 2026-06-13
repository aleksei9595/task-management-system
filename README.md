# Task Management System

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
DATABASE_URL="postgresql://postgres:1234@localhost:5432/task_management?schema=public"
JWT_SECRET="secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=3000
```

### 3. Применение миграций

```bash
npx prisma migrate dev
```

### 4. Запуск приложения в режиме разработки

```bash
npm run start:dev
```
После запуска приложения в режиме разработки, оно будет доступно по адресу ```http://localhost:3000```

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
├── auth/                                  # Модуль аутентификации и авторизации
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
├── tasks/                                 # Модуль управления задачами
│   ├── dto/
│   │   ├── create-task.dto.ts
│   │   └── update-task.dto.ts             
│   ├── interfaces/
│   │   └── tasks.interface.ts             
│   ├── tasks.controller.ts
│   ├── tasks.module.ts
│   ├── tasks.repository.ts                
│   └── tasks.service.ts
├── users/                                 # Модуль управления пользователями
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts             
│   ├── interfaces/
│   │   └── users.interface.ts            
│   ├── users.controller.ts
│   ├── users.module.ts
│   ├── users.repository.ts               
│   └── users.service.ts
├── prisma/                                # Глобальный модуль для работы с БД
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── common/                                # Общие компоненты приложения
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

## Логирование

Используется встроенный `Logger` из NestJS. Логируются ключевые бизнес-события, все ошибки приложения и время выполнения каждого HTTP-запроса.

