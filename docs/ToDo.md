# GuidHubFront — Todo

## В работе

## В плане

### 1. Инициализация Vite + React + TS

  - tags: [infra]
  - priority: high
  - defaultExpanded: false
  - steps:
      - [ ] npm create vite (react-ts)
      - [ ] npm install, npm run dev — стартует
      - [ ] Базовая структура src/ под нашу раскладку
      - [ ] Коммит

### 2. Tailwind CSS + shadcn/ui

  - tags: [infra, ui]
  - priority: high
  - defaultExpanded: false
  - steps:
      - [ ] Установка Tailwind, конфиг
      - [ ] Инициализация shadcn/ui
      - [ ] Проверить, что компонент рендерится
      - [ ] Коммит

### 3. Роутер и layout

  - tags: [infra, ui]
  - priority: high
  - defaultExpanded: false
  - steps:
      - [ ] React Router, маршруты из docs/ROUTES.md (заглушки страниц)
      - [ ] Layout: шапка с логотипом и переключателем «Клиент / Гид»
      - [ ] Коммит

### 4. apiClient + TanStack Query

  - tags: [infra, api]
  - priority: high
  - defaultExpanded: false
  - steps:
      - [ ] lib/apiClient (fetch + credentials: 'include', базовый URL)
      - [ ] QueryClientProvider
      - [ ] Хук useMe (GET /users/me) — заготовка
      - [ ] Коммит

### 5. CORS на бэкенде (внешний шаг)

  - tags: [backend, cors]
  - priority: high
  - defaultExpanded: false
  - steps:
      - [ ] Добавить в бэкенд-todo «5.5. CORS для dev-фронта»
      - [ ] (Выполняется в репозитории бэкенда)

### 6. Аутентификация (Telegram Login Widget)

  - tags: [auth]
  - priority: high
  - defaultExpanded: false
  - steps:
      - [ ] Страница входа, встроить Telegram Login Widget
      - [ ] POST /auth/telegram, обработка ответа
      - [ ] Logout (POST /auth/logout)
      - [ ] Проверка сессии при загрузке (useMe)
      - [ ] Коммит

### 7. Профиль

  - tags: [profile]
  - priority: high
  - defaultExpanded: false
  - steps:
      - [ ] Просмотр/редактирование профиля (GET/PUT /users/me)
      - [ ] Приватность (PATCH /users/me/privacy)
      - [ ] Дети (GET/POST/DELETE /users/me/children)
      - [ ] Удаление аккаунта (DELETE /users/me)
      - [ ] Коммит

### 8. Стать гидом + режим «Гид»

  - tags: [guides]
  - priority: high
  - defaultExpanded: false
  - steps:
      - [ ] Страница «Стать гидом» (POST /guides/become)
      - [ ] Логика переключателя режимов: без роли Guide — предложение, отказ → клиент
      - [ ] Коммит

### 9. Мероприятия гида

  - tags: [tours]
  - priority: high
  - defaultExpanded: false
  - steps:
      - [ ] Список моих мероприятий
      - [ ] Создание (POST /tours/events)
      - [ ] Публикация, удаление
      - [ ] Коммит

### 10. Слоты

  - tags: [slots]
  - priority: high
  - defaultExpanded: false
  - steps:
      - [ ] Список слотов мероприятия (публичный)
      - [ ] Создание/отмена слота (гид)
      - [ ] Коммит

### 11. Заявки (клиент)

  - tags: [bookings]
  - priority: high
  - defaultExpanded: false
  - steps:
      - [ ] Создание заявки (POST /bookings)
      - [ ] Мои записи
      - [ ] Коммит

### 12. Заявки (гид)

  - tags: [bookings]
  - priority: high
  - defaultExpanded: false
  - steps:
      - [ ] Список заявок по мероприятию/слоту
      - [ ] Approve / Reject
      - [ ] Коммит

### 13. География

  - tags: [geography]
  - priority: medium
  - defaultExpanded: false
  - steps:
      - [ ] Селекты страна/регион/город/локация (GET)
      - [ ] Создание локации гидом (POST)
      - [ ] Заявка на изменение географии (POST /geography/requests)
      - [ ] Коммит

### 14. Публичные страницы

  - tags: [public]
  - priority: medium
  - defaultExpanded: false
  - steps:
      - [ ] Приветственная главная
      - [ ] Публичный профиль гида (/u/:username)
      - [ ] Карточка мероприятия + слоты
      - [ ] Коммит

### 15. Пост-MVP: отзывы

  - tags: [reviews, post-mvp]
  - priority: low

## Выполнено

### 0. Структура репозитория и документы

  - tags: [infra, docs]
  - priority: high
  - defaultExpanded: false
  - steps:
      - [ ] Структура папок + .gitkeep
      - [ ] docs/PROJECT.md
      - [ ] docs/todo.md
      - [ ] docs/ROUTES.md
      - [ ] docs/API.md
      - [ ] .gitignore, README.md
      - [ ] Коммит

