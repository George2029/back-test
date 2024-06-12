# Репозиторий для тествого задания Backend

## запуск:

- с докером
- без него

### Docker

- создать папку `environment`, туда поместить `nest.env` и `postgres.env`
- в `nest.env` добавить следующие данные: 

```
JWT_SECRET=
POSTGRES_HOST=pg
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_PASSWORD=
```

- в postgres.env добавить следующие данные: 

```
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_PASSWORD=
```

> `docker-compose up`

### Без докера

В этом случае необходимо создать бд, настроить пользователя и пароль.

Также нужно создать `.env` файлик в главной директории, заполнить его соответствующе настройкам бд: (здесь хост = локалхост)

```
JWT_SECRET=
POSTGRES_USER=
POSTGRES_DB=
POSTGRES_PASSWORD=
```

> `npm run start:dev`

