# Flow of setup till now:

    - shadcn (ligt/dark mode test) -> ORM -> DB -> Authentication -> Create room

# For DB:

    - This project uses postgres created using docker compose file.

# ORM and Studio(similar to mongodb compass)

    - Drizzle is used as an ORM to interact with the created db.
    - And Drizzle kit is used for schema migrations. Schema migrations is simply changing of schema overtime.
    - Everytime schema changes, we can run the drizzle kit script added in package.json.
    - Drizzle studio for performing db operation(insert, delete, update)

- For Migrations, we added the following in package.json script:
  "db:push": "drizzle-kit push:pg --config=drizzle.config.ts",

- For db live preview using drizzle studio, we added following in package.json:
  "db:studio": "drizzle-kit studio"

# To start project:

    - Open 3 terminals:
        -  yarn dev(nextjs),
        - docker compose up (for running postgres db from docker),
        - db:push and db:studio(pushes new schemas and runs the db studio)

# TEMPLATE for other projects:

- Go to github and find the `next auth final setup` commit from this project and copy those to get started with authentication and drizzle setup with postgres template to work in anther project.

# Server Actions:

- Server actions is a feature in nextjs that we can use to do operations related to server like db access, mutation etc on client side.

- We use 'use server' directive, this can be used inline for funcitons and also for the whole page(function page not components page)

- Rather than making api's in folders like app/api/<name>, we can simply write the server operations code in client using the 'use server' directive.
  Check: Great reads

# Data access and actions files and folder

- Data access as it name suggests relates to db CRUD operaions. It simply performs the operations and returns.
