<div align="center">
  <img src="public/logo.svg" alt="logo" width="200" height="auto" />
  <h1>Todo List</h1>
  <p>
    Master Your ToDos: Simplify Your Productivity with Seamless Task Management!
  </p>
  <h4>
    <a href="https://gh.ashthe.dev/todo/">View Demo</a>
    &emsp;&emsp;
    <a href="https://github.com/AshtonHeald/todo/issues/new">Report Bug</a>
  </h4>
</div>

## Table of Contents
- [About](#about)
  - [Screenshots](#screenshots)
  - [Description](#description)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Deployment](#deployment)
- [License](#license)

<!-- About -->
##  About
### Screenshots
  
|<img src="public/screenshot1.webp" alt="light-todos" />|<img src="public/screenshot3.webp" alt="light-todo-edit" />|
|:---:|:---:|
|<img src="public/screenshot2.webp" alt="dark-todos-full" />|<img src="public/screenshot4.webp" alt="dark-todos-trash" />|

### Description
  <p>Todo App is a dynamic web application designed to streamline your task management experience; Allowing users to organize their tasks effortlessly. With CRUD functionality, drag-and-drop sorting, modals for detailed task views, and local storage capabilities, Todo App ensures seamless task management and productivity enhancement.</p>

> [!NOTE]
>This app uses local storage, data will not carry over to/from other devices.

### Features

<dl>
  <dt>CRUD Functionality</dt>
  <dd>Seamlessly Create, Read, Update, and Delete tasks, ensuring flexibility and control over task management.</dd>
  <dt>Drag and Drop Sorting</dt>
  <dd>Facilitate intuitive task organization through drag-and-drop functionality. (press and hold item to drag)</dd>
  <dt>Modals</dt>
  <dd>Enhance user interaction with modal windows, providing a focused view for task editing and trash handling.</dd>
  <dt>Local Storage</dt>
  <dd>Persist task data locally, ensuring seamless access and preservation of tasks across sessions.</dd>
</dl>

### Tech Stack

<div>
<img height="32" width="32" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" />
<img height="32" width="32" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
<img height="32" width="32" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
<img height="32" width="32" src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/shadcnui.svg" />
<img height="32" width="32" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" />
</div>

<p><b>Other:</b> DnD-Kit, Lucide, Fontsource</p>

<!-- Getting Started -->
##  Getting Started
### Prerequisites
This project uses pnpm as package manager
```bash
 npm install --global pnpm
```

### Installation

Clone the repository
```bash
git clone https://github.com/AshtonHeald/todo.git
```

Install dependencies
```
pnpm install
```

### Development

Start Vite dev server in the current directory.
```bash
pnpm run dev
```

Locally preview the production build. Do not use this as a production server as it's not designed for it.
```bash
pnpm run preview
```

### Deployment

Build for production. [Static Deploy](https://vitejs.dev/guide/static-deploy.html)
```bash
pnpm run build
```

---

<!-- Licence -->
### License

Distributed under the MIT License. See `LICENSE.md` for more information.
