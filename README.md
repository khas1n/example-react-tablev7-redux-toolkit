# About this project

This repository contains code Example how to use react-table-v7 and redux-toolkit written using **React** and **Typescript**.
Build with  **react-table v7** lightweigth hooks for building table/datagrid from the scratch. Also using **redux-toolkit** for state management.

**Tech Stack:**

* **Fornt-end Framework:** [React](https://reactjs.org/)

* **CSS Framework:** [Tailwind](https://tailwindcss.com/)

* **Bundler:** [Vite](https://vitejs.dev/)

* **Package Manager:** [PNPM](https://pnpm.io/)

## Prerequisite

* Node 16.13.1 or higher
* PNPM

## Run Locally

Clone the project

```bash
  git clone https://github.com/khas1n/example-react-tablev7-redux-toolkit
```

Go to the project directory

```bash
  cd personal-project-ajaib
```

Install dependencies

```bash
  pnpm install
```

Start the server

```bash
  pnpm dev
```

## Running Tests

To run tests, run the following command

```bash
  pnpm test
```

## Build

To build this project for production run

```bash
  pnpm build
```

result is in `dist` directory

## Architecture

### State management

we use [Redux-Toolkit](https://redux-toolkit.js.org/) for state management.
Redux-Toolkit is toolset for write efficient Redux store.

[immerjs](immerjs.github.io/immer/):
Redux-toolkit is support [immerjs](immerjs.github.io/immer/) out of the box, this make us super easy to write immutable state.
(say goodbye to deep nested spread operator)

```javascript
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    randomUserRecieved: (state, action: PayloadAction<RandomUser[]>) => {
      state.entities = action.payload;
    },
  },
```

Redux-toolkit also comes with async middleware for Redux or thunk, `createAsyncThunk` simplifies thunk process that make us only focus with the actual logic.

```javascript
const fetchRandomUsers = createAsyncThunk<ApiResponse<RandomUser[]>, GetRandomUsersParameters, { rejectValue: string }>(
  "randomUser/fetchRandomUsers",
  async (arg: GetRandomUsersParameters, thunkApi) => {
    try {
      const { data } = await getRandomUsers(arg);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkApi.rejectWithValue(error.message);
      } else {
        return thunkApi.rejectWithValue("An unexpected error occurred");
      }
    }
  }
);
```

### React-table v7

[react-table](https://react-table-v7.tanstack.com/) is headless (only hooks) that allow us have more control how table renders. React-table comes with all we need to build proper table/datagrid.

### ESLint + Prettier

We recommend to develop this project using [VSCODE](https://code.visualstudio.com/) with installed recommend extension below :

* dbaeumer.vscode-eslint (ESLint)
* esbenp.prettier-vscode (Prettier)

That allow us to get best experience for development.

### Project Directory

- `components/` - UI components that use in this project.
* `api/` -  Services that handle connecting with API server.
* `hooks/` - Custom hooks that use in this project.
* `state/` - State management directory.
* `types/` - TypeScript types + interfaces.
