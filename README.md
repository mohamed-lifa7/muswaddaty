# Muswaddaty

**Version**: 0.1.0

Muswaddaty is an open-source, block-based, collaborative online text editor inspired by Notion. It offers a rich and intuitive user interface for creating and editing content collaboratively.

## Features

- Collaborative real-time text editing.
- Block-based editor.
- User authentication and management.
- Responsive design.
- Export content to PDF.
- Theme support.
- Rich text formatting.

## Tech Stack

Muswaddaty is built with the following technologies:

### Frontend:

- Next.js (React framework)
- Tailwind CSS (CSS framework)
- Shadcn UI (UI components)
- Framer Motion (animations)
- React Hook Form (form management)
- Liveblocks (real-time collaboration)

### Backend:

- Prisma (ORM for database management)
- NextAuth.js (authentication)
- Node.js (runtime environment)

### Utilities:

- TypeScript (static typing)
- ESLint (linting)
- Prettier (code formatting)

## Installation

To get started with Muswaddaty, follow these steps:

1. Clone the repository:

```shell
git clone https://github.com/mohamed-lifa7/muswaddaty.git

cd muswaddaty
```

2. Install dependencies:

```shell
pnpm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add your environment variables. Refer to `.env.example` for required variables.

4. Push the database schema:

```shell
pnpm run db:push
```

5. Generate Prisma client:

```shell
pnpm postinstall
```

6. Start the development server:

```shell
pnpm run dev
```

## Usage

Once the development server is running, you can access the application at `http://localhost:3000`. Here are some basic operations you can perform:

- Create a new document: Click the "New Document" button on the homepage.
- Edit a document: Click on an existing document to open it in the editor.
- Collaborate: Share the document URL with others to start collaborating in real-time.

## Scripts

Here are some useful scripts you can use during development:

- `pnpm run build`: Build the project for production.
- `pnpm run db:push`: Push the Prisma schema to the database.
- `pnpm run db:studio`: Open Prisma Studio for database management.
- `pnpm run dev`: Start the development server.
- `pnpm run lint`: Run ESLint to check for linting errors.
- `pnpm run lint:fix`: Fix linting errors automatically.
- `pnpm run start`: Start the production server.

## Contributing

We welcome contributions from the community! To contribute to Muswaddaty, follow these steps:

1. Fork the repository.
2. Create a new branch:

```shell
git checkout -b feature/your-feature-name
```

3. Make your changes.
4. Commit your changes:

```shell
git commit -m 'Add some feature'
```

5. Push to the branch:

```shell
git push origin feature/your-feature-name
```

6. Open a pull request.

Please ensure your code adheres to the project's coding standards and passes all tests.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

If you have any questions or suggestions, feel free to reach out to us:

Email: [mohamedlifa7@gmail.com](mailto:mohamedlifa7@gmail.com)

GitHub: [Mohamed-lifa7](https://github.com/mohamed-lifa7)

Or one of these :

Graduation poject framer [Dr. Zaiz Fouazi](mailto:zaizfaouzi@gmail.com)

Project Contributor [Ahmed Hafsi](mailto:dzahme33@gmail.com)

Thank you for using Muswaddaty!
