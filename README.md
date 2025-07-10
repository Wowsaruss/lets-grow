# LetsGrow

LetsGrow is a modern, community-driven gardening app designed to help gardeners of all experience levels track their plants, share their successes and failures, and learn from each other. The platform makes it easy to manage your personal garden, log journal entries for your plants, and discover best practices from fellow growers. Whether you're a beginner or a seasoned gardener, LetsGrow aims to make gardening more approachable, fun, and successful.

## Features
- **Personal Garden Management:** Add, edit, and track plants in your own garden.
- **Journal Entries:** Log notes, observations, and photos for each plant over time.
- **Community Knowledge:** Learn from others' journal entries and plant data.
- **Role-Based Permissions:** Admins can manage the global plant database.
- **Auth0 Authentication:** Secure login and user management.
- **Modern UI:** Clean, responsive design with consistent, accessible components.

---

## Local Development Setup

### Prerequisites
- Node.js (v16+ recommended)
- Yarn or npm
- PostgreSQL (for backend database)
- Auth0 account (for authentication)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/lets-grow.git
cd lets-grow
```

### 2. Install Dependencies
#### Frontend & Root
```bash
yarn install
# or
npm install
```
#### Backend
```bash
cd server
yarn install
# or
npm install
cd ..
```

### 3. Environment Variables
Create a `.env` file in the project root and in `server/` with the following (see `.env.example` if available):

#### Root `.env` (for frontend)
```
REACT_APP_AUTH_DOMAIN=your-auth0-domain
REACT_APP_AUTH_CLIENT_ID=your-auth0-client-id
REACT_APP_AUTH_AUDIENCE=your-auth0-api-audience
REACT_APP_LETS_GROW_API=http://localhost:7070
```

#### `server/.env` (for backend)
```
PORT=7070
DB_NAME=lets_grow
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
AUTH0_AUDIENCE=your-auth0-api-audience
AUTH0_ISSUER_BASE_URL=https://your-auth0-domain/
SIGNING_ALG=RS256
```

### 4. Database Setup
- Ensure PostgreSQL is running.
- Create the database (if not already):
```bash
cd server
yarn run create-db
# or
npm run create-db
```
- Run migrations:
```bash
yarn run migrate
# or
npm run migrate
```

### 5. Start the Backend
```bash
cd server
yarn start
# or
npm start
```

### 6. Start the Frontend
```bash
yarn start
# or
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000) and the backend on [http://localhost:7070](http://localhost:7070) by default.

---

## Production Deployment

1. **Set environment variables** as above, but use production values.
2. **Build the frontend:**
   ```bash
   yarn build
   # or
   npm run build
   ```
   This outputs static files to `build/`.
3. **Deploy the backend** (Node.js server) to your production server or cloud provider.
4. **Serve the frontend** using a static file server (e.g., Nginx, Vercel, Netlify) or via the backend if configured.
5. **Ensure the backend API and Auth0 are accessible from your frontend domain.**

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
MIT
