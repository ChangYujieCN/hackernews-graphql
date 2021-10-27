更改schema.prisma后的工作流
```sh
npx prisma migrate dev --name "add-user-model"
npx prisma generate
```