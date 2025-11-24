# Smart Health Care Platform

AI-assisted telehealth experience powered by a Node/Express API, MongoDB, and a modern React + Vite frontend. Patients can register, submit symptoms, and receive structured medical guidance backed by Google Gemini, while clinicians (or the same users) can review past consultations in a secure dashboard.

## Features
- **AI consultation engine** – Generates empathetic, structured JSON responses (diagnosis, treatment, medication, immediate actions) via Gemini with automatic text highlighting.
- **Secure authentication** – Email/password workflow backed by bcrypt, JWT, and protected Express routes plus guarded React screens.
- **Consultation history** – Paginated history with persisted AI responses so users can revisit past guidance.
- **Responsive UI** – React Router, Tailwind CSS, and Lucide icons provide a polished multi-page experience.
- **Robust API layer** – Centralized error handling, validation helpers, and health checks keep the service reliable.

## Tech Stack
- **Frontend:** React 18, Vite, Tailwind CSS, React Hook Form, React Router DOM, Axios
- **Backend:** Node.js, Express 5, MongoDB (Mongoose), JWT, bcrypt, Google Generative AI SDK
- **Tooling:** Nodemon for local dev, PostCSS pipeline, ESLint-ready project (configure as needed)

## Project Structure
```
SmartHealthCareComplete/
├── backend/
│   ├── src/
│   │   ├── controllers/      # auth + consultation flows
│   │   ├── middlewares/      # auth guards, async handler, errors
│   │   ├── models/           # Mongoose schemas (User, Consultation)
│   │   ├── routes/           # REST endpoints
│   │   ├── services/         # Gemini integration
│   │   └── utils/            # JWT + password helpers
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── Pages/            # Home, Dashboard, Consult, History, Auth
│   │   ├── components/       # Layout + form primitives
│   │   └── api/              # Axios client + feature APIs
│   └── package.json
└── README.md
```

## Prerequisites
- Node.js 18+ (for native fetch + Vite compatibility)
- npm 9+ (or pnpm/yarn if you adapt the scripts)
- MongoDB instance (local or Atlas)
- Google Gemini API key with access to a `gemini-2.5-*` model

## Environment Variables
Create the following files before running any scripts.

### `backend/.env`
```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster/db
JWT_SECRET=replace-with-strong-secret
GEMINI_API_KEY=your-google-gemini-key
GEMINI_MODEL=gemini-2.5-flash   # optional override
```

### `frontend/.env`
```
VITE_API_BASE_URL=http://localhost:5000/api
```
Adjust the base URL when deploying the backend elsewhere.

## Getting Started
1. **Install backend dependencies**
	```bash
	cd backend
	npm install
	```
2. **Install frontend dependencies**
	```bash
	cd ../frontend
	npm install
	```
3. **Run the backend API** (from `backend/`)
	```bash
	npm run dev
	```
4. **Run the frontend app** (from `frontend/`)
	```bash
	npm run dev
	```
5. Visit the Vite dev server URL (default `http://localhost:5173`) and ensure it can reach the API running on port 5000.

## Available Scripts
| Location  | Command        | Description                              |
|-----------|----------------|------------------------------------------|
| backend   | `npm run dev`  | Starts Express with nodemon + hot reload |
| frontend  | `npm run dev`  | Starts Vite dev server                   |
| frontend  | `npm run build`| Builds the production React bundle       |
| frontend  | `npm run preview` | Serves the production build locally |

## API Snapshot
| Method | Endpoint                    | Description                       |
|--------|-----------------------------|-----------------------------------|
| POST   | `/api/auth/register`        | Create a new account              |
| POST   | `/api/auth/login`           | Authenticate & receive JWT        |
| GET    | `/api/consultations`        | Fetch paginated history (auth)    |
| POST   | `/api/consultations`        | Create consultation + AI plan     |
| GET    | `/health`                   | Simple service health check       |

All consultation endpoints require the `Authorization: Bearer <token>` header.

## Deployment Notes
- Serve the backend behind HTTPS and configure CORS to the production origin.
- Point `VITE_API_BASE_URL` to the deployed API before running `npm run build` in the frontend.
- Use environment-specific JWT secrets and rotate API keys regularly.

## Future Enhancements
- Role-based dashboards for clinicians vs. patients
- Notification channels (email/SMS) for urgent AI flags
- Structured analytics on symptom trends
- Integration tests covering auth + consultation flows

Contributions and issue reports are welcome. Happy building!
