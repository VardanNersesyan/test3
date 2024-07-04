## Description

Test task, spent 8-10 hours for complete.

## Installation

```bash
$ 1) yarn install
$ 2) setup configuration, example includet into project (.env.example)
$ 3) run migrations
$ 4) run seedings
```

## Useful cli commands

```bash
# create new migration
$ yarn sequelize migration:create --name=filename

# create seed
$ yarn sequelize seed:create --name=work_fields_initial_data

# Run migration
$ yarn migrate

# Run migration rollback
$ yarn rollback

# Run seeders to insert initial data
$ yarn seed:all

# Run undo seeders to delete initial data
$ yarn seed:undo:all

```
