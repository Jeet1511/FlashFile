# ⚡ FlashFile

Temporary file sharing platform. Upload any file, get a **short code** and **QR code**. Anyone with the code can download it. Files auto-expire.

## Features

- 📤 **Drag & drop upload** — up to 50 MB per file
- 🔑 **6-character access code** — easy to share verbally or via text
- 📱 **QR code** — scan to download on any device
- ⏱️ **Auto-expiry** — files vanish after 24 hours (configurable)
- 📊 **Dashboard** — see your uploaded files and download stats
- 🔒 **No sign-up** — session tracked via hashed IP

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, TypeScript |
| Backend | Express, TypeScript |
| Database | MongoDB (Mongoose) |
| Storage | Local disk |

## Quick Start

### Prerequisites

- **Node.js** 18+
- **MongoDB** running locally (or via Docker)

### 1. Start MongoDB

```bash
# Option A: Docker
docker run -d -p 27017:27017 --name flashfile-mongo mongo:7

# Option B: Local MongoDB
mongod
```

### 2. Install & Run Server

```bash
cd server
npm install
npm run dev
```

Server starts at `http://localhost:5000`

### 3. Install & Run Client

```bash
cd client
npm install
npm run dev
```

Client starts at `http://localhost:5173`

### 4. Open the app

Visit **http://localhost:5173** — upload a file and get your code!

## Docker Compose (Alternative)

```bash
docker compose up
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/upload` | Upload a file (multipart) |
| `GET` | `/api/files/:code` | Get file info by code |
| `GET` | `/api/files/:code/download` | Download file |
| `GET` | `/api/dashboard` | Dashboard (your files) |
| `GET` | `/api/health` | Health check |

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Server port |
| `MONGO_URI` | `mongodb://localhost:27017/flashfile` | MongoDB URI |
| `FILE_TTL_HOURS` | `24` | File expiry time (hours) |
| `MAX_FILE_SIZE_MB` | `50` | Max upload size |
| `CLIENT_URL` | `http://localhost:5173` | Frontend URL (for CORS & QR) |

## Project Structure

```
flashfile/
├── client/          # React frontend (Vite)
├── server/          # Express backend
├── shared/          # Shared TypeScript types
├── .env             # Environment config
├── docker-compose.yml
└── README.md
```

## License

MIT
