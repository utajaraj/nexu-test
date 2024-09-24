The project is linted; to ensure lint run npm run lint.

You will need a mysql database to run the project. Once you have one, add the url to the .env file and run the following commands with the prisma CLI. If you don't have the prisma CLI installed you can install it by following the instructions in the following link: https://www.prisma.io/docs/orm/tools/prisma-cli



To build the project do the following:

    npx prisma db push
    npx prisma generate

If you want to import data, migrations are already set up to import data you can do so by running the prisma migrations, a command is already set up, run:

    npm run data-migration

Lastly run the regular
    npm install
    npm run build