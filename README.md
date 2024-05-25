# Репозиторий для тествого задания Backend

> Сделайте форк этого репозитория и выполняйте задание в нем

## Задание

Необходимо написать API для блога с возможностью авторизоваться (Cookie JWT), создать пост, создать категорию, подкатегорию, получить список всех постов/категорий или удалить один из своих постов/категорий. Посты должны фильтроваться по slug'у категории.
Для каждого поста должна быть задана категория/подкатегория. Sequelize/TypeORM должны использоваться только для синхронизации моделей базы данных, все SELECT'ы, UPDATE'ы, DESTROY'и должны быть написаны вручную. Категории и посты должны вытаскиваться из бд через slug, не через id. Соответственно все slug'и должны быть уникальными.

### В реализации вы должны использовать

- [NestJS](https://nestjs.com/)
- PostgreSQL
- [Sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript)/[TypeORM](https://typeorm.io/)
