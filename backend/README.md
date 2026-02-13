# Backend

## Skeleton Structure

```
/backend
├── /src                      # All source code lives here
│   ├── /config              # Database connection & server settings
│   ├── /controllers         # Logic for each feature
│   │   ├── authController.js      # Login/Signup logic
│   │   ├── itemController.js      # Donation listing logic
│   │   ├── requestController.js   # Application form logic
│   │   └── searchController.js    # Filtering & keyword logic
│   ├── /models              # Database schemas & data definitions
│   │   ├── User.js          # User data rules
│   │   ├── Item.js          # Donation item data rules
│   │   └── Request.js       # Application form data rules
│   ├── /routes              # API endpoint definitions (URL paths)
│   │   ├── authRoutes.js    # /api/auth endpoints
│   │   ├── itemRoutes.js    # /api/items endpoints
│   │   ├── requestRoutes.js # /api/requests endpoints
│   │   └── searchRoutes.js  # /api/search endpoints
│   ├── /middleware          # Security guards & request interceptors
│   ├── /utils               # Global helper functions & reusable tools
│   ├── server.js            # Express app initialization & middleware setup
│   └── index.js             # Entry point: Connects Database & starts server
├── /uploads                 # Storage for uploaded donation images
│   └── .gitkeep             # Ensures the empty folder is tracked by Git
├── .env                     # Private secrets & API keys
├── .env.example             # Template for .env file
├── .gitignore               # List of files to ignore (node_modules, .env)
├── package.json             # Dependencies, metadata, and run scripts
├── package-lock.json        # Exact version history of dependencies
└── README.md                # Documentation: How to set up and run the backend
```

## Available Commands

| Command                | Description                                                 |
| :--------------------- | :---------------------------------------------------------- |
| `npm start`            | Runs the server in production mode.                         |
| `npm run dev`          | Runs the server in development mode (auto-restart on save). |
| `npm run lint`         | Checks code quality and style using ESLint.                 |
| `npm run format`       | **Fixes** code formatting automatically using Prettier.     |
| `npm run format:check` | **Verifies** that the code follows formatting rules.        |

_Note: Please run `npm run format` to fix styling and `npm run lint` to check for code errors before committing your changes._
