# Technical Test Backend - EDI Indonesia

## Project Overview

This project is a technical test for a backend role at EDI Indonesia. It is built with TypeScript and Node.js and
utilizes various packages to ensure the backend functionality.

## Technologies and Tools

- **Node.js**: JavaScript runtime.
- **TypeScript**: Typed superset of JavaScript.
- **Express**: Web framework for Node.js.
- **JWT (jsonwebtoken)**: JSON Web Token for authentication.
- **bcryptjs**: Password hashing.
- **MySQL**: Database.
- **dotenv**: Environment variable management.
- **nodemon**: Utility to monitor changes in the source code automatically restart Node.js server.
- **ts-node**: TypeScript execution engine for Node.js.

## Requirements

- Node.js (>= 14.0.0)
- npm (>= 6.0.0)
- MySQL database

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/technical-test-backend-edi-indonesia.git
   cd technical-test-backend-edi-indonesia
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root of your project and add the necessary environment variables. Below is an example:
   ```env
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASS=your_database_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret
   ```

### Running the project

To run the project, use the following command:

```sh
npm run dev
```

This will start the server in development mode with `nodemon` watching for changes.

## Project Structure

```plaintext
├── src
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── index.ts
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

If you wish to contribute to this project, please fork the repository and submit a pull request.