# inline-australia/monorepo

This is monorepo for all code of inline-aus

Detailed instructions for configuring and setting up this repository can be found in a tutorial on [Medium.com](https://medium.com/@patrickvaler/how-to-get-started-with-shadcn-ui-and-next-js-within-a-nx-monorepo-57908f48b4ef). Explore the tutorial for comprehensive insights into the repository's setup, ensuring a smooth and informed integration process.

## Features

- Shared library based on `shadcn/ui` components integrated in Next.js app
- Monorepo structure using Nx for better organization and scalability

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Install npm dependencies

   ```bash
   npm install
   ```

### Run application

```bash
npm start
```

## Add shadcn/ui components

`shadcn/ui` offers a cli to generate ui components.

Use the `add` command to add components and dependencies to your project:

```bash
npx shadcn-ui@latest add [component]
```

Check the `shadcn/ui` [cli docs](https://ui.shadcn.com/docs/cli) for further information.

## Add new app

```bash
`nx g @nx/next:app my-app`
```

Copy contents of below files from an existing app to the new app

1. `tailwind.config.js`
2. `postcss.config.js`
3. `global.css`
