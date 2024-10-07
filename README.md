# Full Stack Интернет-магазин Игр

Этот проект представляет собой полный стек интернет-магазина игр, разработанный с использованием современных технологий. Он включает в себя серверную часть на NestJS и клиентскую часть на Next.js.

## Технологии

- **Backend**:

  - [NestJS](https://nestjs.com/) - фреймворк для создания серверных приложений на Node.js.
  - [Prisma](https://www.prisma.io/) - ORM для работы с базами данных.
  - [PostgreSQL](https://www.postgresql.org/) - реляционная база данных.

- **Frontend**:
  - [Next.js](https://nextjs.org/) - фреймворк для серверного рендеринга React-приложений.
  - [Redux Toolkit](https://redux-toolkit.js.org/) - библиотека для управления состоянием приложения.
  - [Tailwind CSS](https://tailwindcss.com/) - утилитарный CSS-фреймворк для быстрой разработки интерфейсов.
  - [React Hook Form](https://react-hook-form.com/) - библиотека для работы с формами в React.

## Установка

### 1. Клонирование репозитория

```bash
git clone https://github.com/yourusername/game-store.git
cd game-store
```

### 2. Настройка Backend

#### 1. Перейдите в папку сервера:

```bash
cd server
```

#### 2.Установите зависимости:

```bash
yarn install
```

#### 3. Настройте переменные окружения. Создайте файл .env в корне папки server и добавьте следующие строки:

```text
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your_jwt_secret"
```

#### 4. Выполните миграции базы данных:

```bash
npx prisma migrate dev --name init
```

#### 5. Запустите сервер:

```bash
yarn run start:dev
```

### 3. Настройка Frontend

#### 1. Перейдите в папку клиента:

```bash
cd client
```

#### 2. Установите зависимости:

```bash
yarn install
```

#### 3. Запустите клиентское приложение:

```bash
yarn run dev
```
