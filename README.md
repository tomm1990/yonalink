# Personal Expense Tracker

## Overview
This project is a **Personal Expense Tracker** web application that allows users to track their daily expenses efficiently.
The application includes a **frontend** built with **React TypeScript (Vite)**, a **backend** using **Node.js Express**, and a **MySQL database**.
The backend communicates with the database to store and retrieve expense data, while the frontend provides a user-friendly interface to manage expenses.

### Features
- **Add a new expense** with the following fields:
  - Date (default to today)
  - Category (Food, Travel, Shopping, etc.)
  - Description (required)
  - Amount (required)
- **View** a list of expenses with sorting by updatedAt.
- **Edit** or **Delete** an expense.
- **Display total expenses** for the current month.
- **Responsive UI** for both mobile and desktop users.
- **API** endpoints for CRUD operations.

## Setup Instructions

### 1. Configure the `.env` File
To set up the project, copy the `.env.example` file and create a `.env` file in the root directory.

Run the following command in the terminal:
```sh
cp .env.example .env
```

Then, open the `.env` file and modify the environment variables as needed:

#### Example `.env` File:
```ini
DB_ROOT_PASSWORD=rootpassword
DB_NAME=yonalink_db
DB_USER=yonalink_user
DB_PASSWORD=strongpassword
DB_PORT=3306
```

This file contains the required database credentials for MySQL.

### 2. Run the Application with Docker Compose
This project uses **Docker Compose** to set up all services together. The `docker-compose.yaml` file defines three services:
1. `yl-db` - MySQL 8.0 database service
2. `yl-back` - Node.js Express backend service
3. `yl-front` - React TypeScript Vite frontend service

#### To start all services, run:
```sh
docker-compose up --build
```
This command will:
- Pull the necessary Docker images.
- Build the backend and frontend services.
- Start the database, backend, and frontend containers.

#### To stop all services, run:
```sh
docker-compose down
```

#### To restart the application after stopping it, run:
```sh
docker-compose up
```

### 3. Access the Application
Once the services are running, access the frontend at:
- **Frontend:** [http://localhost:5173/main](http://localhost:5173/main)
- **Backend API:** [http://localhost:3000](http://localhost:3000)

You can also connect to the MySQL database using a MySQL desktop client with the following credentials:
- **Host:** `localhost`
- **Port:** `3306`
- **User:** `yonalink_user`
- **Password:** `strongpassword`
- **Database:** `yonalink_db`

### Future Enhancements
- Implement a **user authentication system**.
- Allow users to define **custom expense categories**.
