Copyright (C) 2023 - All Rights Reserved

- You may not use, distribute and modify this code under the terms of the legal license.

# CO2ACCOUNTING

- Description: `Accounting software for carbon tax regulations and audits`.
- Author: Nick Jang
- Created: 202308010540

## Setup Project:

```
npm install

cd ./main/fe
npm install --legacy-peer-deps

cd ./main/be
npm install
```

## Code Formatting and Quality Checks

This project enforces coding standards and styling using ESLint and Prettier. These tools are executed through pre-commit hooks and available scripts. To ensure your contributions adhere to the established code standards, please read the following guidelines carefully.

### Pre-commit Hook

Upon running `npm install` in the root directory, a pre-commit hook is automatically configured to execute Prettier and ESLint on staged files (`git add .`).

#### Troubleshooting with GitHub Desktop

If you encounter issues with the pre-commit hook while using GitHub Desktop, you can temporarily disable it. To do so, comment out the line `npx lint-staged` in the `.husky` directory at the project root.

### Manual Execution of Formatting and Linting

Alternatively, you can manually trigger these code quality checks by running the following scripts from the root directory:

- **Lint staged files (prettier + eslint)**: `npx lint-staged`
- **Format (prettier)**: `npm run format`
- **Lint (eslint)**: `npm run lint`
- **Lint + fix (eslint)**: `npm run lint:fix`

### IDE Configuration: Visual Studio Code

If you're using Visual Studio Code, the IDE will automatically detect the project's `.eslintrc.json` and `.prettierrc.json` configuration files. Make sure you have the ESLint and Prettier extensions installed for an integrated and seamless coding experience.

## Local

> Run project:

- **Windows Users**: Change the `start` script in `./main/fe/package.json` to `"start": "set PORT=3001 && react-scripts start"`

```
cd ./main/fe
npm start

cd ./main/be
npm start
```

> Open app:

- App: http://localhost:3001 (Make sure it is `http` not `https`)
- Server: http://localhost:8000/api
- API Docs: http://localhost:8000/api/docs

## Docker

- Run project:

```
cd ./main
docker compose down && docker compose build & docker-compose up
```

- Re-build project:

```
docker-compose build --no-cache && docker-compose up
docker-compose down --rmi all && docker compose build & docker compose up
```
