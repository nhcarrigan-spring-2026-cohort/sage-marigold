# sage-marigold
Repository for Team Sage Marigold - Spring 2026 Cohort

## Tech Stack
- **Frontend:** Vite + React (JavaScript + SWC)
- **Backend:** Node.js / Express
- **CI/CD:** GitHub Actions (Build Checks)

---

## Getting Started

### 1. Clone the Repo
```bash
git clone <your-repo-url>
cd sage-marigold
```

### 2. Frontend Setup (First Time Only)
If the frontend is not yet initialized, follow these steps:

```bash
cd frontend
npm install
npm run dev    #Frontend will be running at http://localhost:5173
```

### 3. Backend Setup
```bash

cd backend
npm init -y
# Install your dependencies (express, etc.)
npm install
```

## CI/CD Pipeline
- We use a custom GitHub Action called sage-marigold CI Pipeline.

- It automatically runs every time you push to a Pull Request.

- It checks if the frontend and backend projects build correctly.

- Note: Always check the "Actions" tab if your PR shows a red "X".

###  Contribution
Please read our [Contributing Guide](./CONTRIBUTING.md) before starting any work to understand our branching and commit conventions.