# sage-marigold
Repository for Team Sage Marigold - Spring 2026 Cohort

## Tech Stack
- **Frontend:** Vite + React (JavaScript + SWC)
- **Backend:** Node.js / Express
- **Database:** PostgreSQL 15 (via Docker)
- **CI/CD:** GitHub Actions (Build Checks)

---

## Getting Started

### 1. Clone the Repo
```bash
git clone <your-repo-url>
cd sage-marigold
```

### 2. Infrastructure (Docker & Database)
We use Docker to ensure everyone has the same Database environment.
- Requirements: Ensure Docker Desktop is running.
- Configuration: Copy .env.example to .env in the root folder.
- Launch: 
```bash
docker compose up -d
```
Verify Connection: Visit http://localhost:3000/test-db. You should see a success message.

Note: The init.sql script automatically creates the test_connection table on the first run.

### 3. Backend Setup
```bash
cd backend
# 1. Copy environment variables
cp .env.example .env
# 2. Install dependencies
npm install
# 3. Start development server
npm run dev
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev    # Frontend will be running at http://localhost:5173
```

## Troubleshooting
Database Tables missing? If you don't see the tables, your Docker volume might be outdated. 
```bash
docker compose down -v && docker compose up -d
```

Connection Error? Double-check that your backend/.env file exists and matches the credentials in the root .env

## CI/CD Pipeline
- We use a custom GitHub Action called sage-marigold CI Pipeline.

- It automatically runs every time you push to a Pull Request.

- It checks if the frontend and backend projects build correctly.

- Note: Always check the "Actions" tab if your PR shows a red "X".

###  Contribution
Please read our [Contributing Guide](./CONTRIBUTING.md) before starting any work to understand our branching and commit conventions.
