# Frontend - Edulogr

## Overview

This is the frontend part of the Edulogr. It is built using React, TypeScript, Redux Toolkit, RTK Query, Material-UI, and Tailwind CSS.

## Project Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/incident-reporting-system.git
   cd incident-reporting-system/frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**

   ```bash
   npm run build
   ```

5. **Run production build:**
   ```bash
   npm run serve
   ```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run serve`: Serves the production build.
- `npm run lint`: Runs ESLint for code quality.
- `npm run test`: Runs tests.

## Folder Structure

```
frontend/
├── public/                 # Public assets
├── src/
│   ├── app/                # Redux store configuration
│   ├── components/         # React components
│   ├── features/           # Redux slices and APIs
│   ├── pages/              # Page components
│   ├── styles/             # CSS and Tailwind configuration
│   ├── App.tsx             # Main App component
│   ├── index.tsx           # Entry point
│   └── ...                 # Other files
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project metadata and dependencies
└── README.md               # This file
```

## Environment Variables

Create a `.env` file in the root of the `frontend` directory and add the following environment variables:

```
REACT_APP_SERVER_URL=http://localhost:5000
```

## Important Libraries

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript.
- **Redux Toolkit**: State management library.
- **RTK Query**: Data fetching and caching library.
- **Material-UI**: React components for faster and easier web development.
- **Tailwind CSS**: Utility-first CSS framework.

## Learn More

To learn more about the frameworks and libraries used in this project, check out the following resources:

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/introduction/getting-started)
- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- [Material-UI Documentation](https://mui.com/getting-started/usage/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
