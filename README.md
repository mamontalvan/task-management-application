# Task Management Application

A full-stack task management application built with NestJS (backend) and React (frontend), featuring authentication, task management, and PostgreSQL database integration.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v16+ (download from https://nodejs.org/)
- **npm** or **yarn**: Package managers (comes with Node.js)
- **Docker & Docker Compose**: For running PostgreSQL database
- **Git**: For version control

### System Requirements

- macOS, Linux, or Windows
- At least 4GB RAM
- 500MB free disk space

## Project Structure

```
├── task-management/           # NestJS Backend
│   ├── src/
│   │   ├── auth/             # Authentication module
│   │   ├── tasks/            # Task management module
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   └── ...
│   ├── docker/               # Docker configuration
│   ├── package.json
│   └── ...
│
└── task-management-frontend/  # React Frontend
    ├── src/
    │   ├── components/       # React components
    │   ├── pages/           # Page components
    │   ├── services/        # API services
    │   ├── stores/          # Mobx stores (state management)
    │   └── ...
    ├── package.json
    └── ...
```

## Backend Setup (Task Management)

### Step 1: Navigate to Backend Directory

```bash
cd task-management
```

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### Step 3: Set Up PostgreSQL Database

Navigate to the docker directory and start the PostgreSQL container:

```bash
cd docker
docker-compose up -d
```

This will start:
- **PostgreSQL** on port 5432
- **pgAdmin** on port 8080 (PostgreSQL administration tool)

### Step 4: Configure Environment Variables

Create a `.env` file in the backend root directory:

```bash
cp .env.example .env
```

Or manually create `.env` with the following variables:

```env
# Environment stage
STAGE=dev

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-pass
DB_DATABASE=your-database-name

# JWT Configuration
JWT_SECRET=your-secret-key-change-this-in-production
```

**Important**: Change `JWT_SECRET` to a strong, unique value for production environments.

### Step 5: Run Database Migrations

The application uses TypeORM to manage the database schema. Run the application in development mode (handles migrations automatically):

```bash
yarn start:dev
```

### Step 6: Backend is Ready!

The backend API will be running on `http://localhost:3000`

```
✓ Application is running on: http://localhost:3000
```

## Frontend Setup (Task Management Frontend)

### Step 1: Navigate to Frontend Directory (in a new terminal window)

```bash
cd task-management-frontend
```

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### Step 3: Configure Backend URL

The frontend is pre-configured to connect to the backend at `http://localhost:3000`. If you're running the backend on a different URL, update the API base URL in:

- [src/services/base-http.service.js](task-management-frontend/src/services/base-http.service.js)

### Step 4: Start the Frontend Development Server

```bash
yarn start
```

The frontend will automatically open at `http://localhost:3001`

```
✓ Compiled successfully!
✓ You can now view nestjs-course-frontend in the browser.
  Local: http://localhost:3001
```

## Running the Full Application

### Terminal 1 - Backend

```bash
cd task-management
yarn start:dev
```

### Terminal 2 - Database (if not already running)

```bash
cd task-management/docker
docker-compose up
```

### Terminal 3 - Frontend

```bash
cd task-management-frontend
yarn start
```

Now you can access:
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:3000
- **pgAdmin**: http://localhost:8080

## Available Scripts

### Backend (task-management)

```bash
# Development mode with auto-reload
yarn start:dev

# Production build and run
yarn build
yarn start:prod

# Run tests
yarn test              # Unit tests
yarn test:watch       # Watch mode
yarn test:cov         # Coverage report
yarn test:e2e         # End-to-end tests

# Linting and formatting
yarn lint              # ESLint with auto-fix
yarn format            # Prettier formatting
```

### Frontend (task-management-frontend)

```bash
# Development server
yarn start

# Production build
yarn build

# Run tests
yarn test

# Eject configuration (⚠️ irreversible - only if needed)
yarn eject
```

### Database (Docker)

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Restart services
docker-compose restart
```

## API Endpoints

### Authentication

- `POST /auth/signup` - Register a new user
- `POST /auth/signin` - Sign in with credentials

### Tasks

- `GET /tasks` - Get all tasks (with optional filters)
- `GET /tasks/:id` - Get specific task
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `PATCH /tasks/:id/status` - Update task status
- `DELETE /tasks/:id` - Delete task

## Features

### Backend

- ✅ User Authentication (JWT-based)
- ✅ Password Encryption (bcrypt)
- ✅ Task CRUD Operations
- ✅ Task Filtering and Sorting
- ✅ Environment Configuration
- ✅ Validation & Error Handling
- ✅ CORS Support

### Frontend

- ✅ User Sign Up & Sign In
- ✅ Task Creation and Management
- ✅ Task Filtering
- ✅ Responsive UI (Material-UI)
- ✅ State Management (Mobx)
- ✅ Protected Routes

## Troubleshooting

### PostgreSQL Connection Error

If you get a connection error:

1. Verify Docker containers are running:
   ```bash
   docker ps
   ```

2. Check PostgreSQL logs:
   ```bash
   docker-compose logs db
   ```

3. Restart the database:
   ```bash
   docker-compose down
   docker-compose up -d
   ```

### Port Already in Use

If ports are already in use:

- **Backend (3000)**: Kill process or change port in `src/main.ts`
- **Frontend (3001)**: Use PORT=3002 yarn start
- **PostgreSQL (5432)**: Change `POSTGRES_PORT` in docker-compose.yml

### CORS Errors

If you encounter CORS errors, ensure the backend is running and accessible at `http://localhost:3000`. The backend has CORS enabled by default.

### Dependencies Issues

If you have issues with package installation:

```bash
# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Environment Variables Explanation

| Variable | Description |
|----------|-------------|
| `STAGE` | Environment stage: `dev`, `test`, or `prod` |
| `DB_HOST` | PostgreSQL host address |
| `DB_PORT` | PostgreSQL port (default: 5432) |
| `DB_USERNAME` | PostgreSQL username |
| `DB_PASSWORD` | PostgreSQL password |
| `DB_DATABASE` | Database name |
| `JWT_SECRET` | Secret key for JWT token generation |

## Development Workflow

1. **Start Backend**: Terminal 1
2. **Start Database**: Terminal 2 (if needed)
3. **Start Frontend**: Terminal 3

Watch the console output for:
- ✅ No compilation errors
- ✅ Successful database connection
- ✅ API endpoints accessible at http://localhost:3000
- ✅ Frontend accessible at http://localhost:3001

## Production Deployment

### Backend

1. Create `.env` file with production values:
   ```env
   STAGE=prod
   JWT_SECRET=<strong-random-secret>
   DB_HOST=<production-db-host>
   DB_PORT=5432
   DB_USERNAME=<db-username>
   DB_PASSWORD=<db-password>
   DB_DATABASE=task_management
   ```

2. Build and run:
   ```bash
   yarn build
   yarn start:prod
   ```

### Frontend

1. Build optimized bundle:
   ```bash
   yarn build
   ```

2. Deploy the `build/` directory to your hosting provider (Vercel, Netlify, etc.)

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [React Documentation](https://react.dev)
- [TypeORM Documentation](https://typeorm.io)
- [Docker Documentation](https://docs.docker.com)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

## Support & Issues

For issues or questions:

1. Check the Troubleshooting section above
2. Review console output for error messages
3. Verify all prerequisites are installed
4. Ensure environment variables are properly configured

## License

UNLICENSED

---

**Happy coding!** 🚀
