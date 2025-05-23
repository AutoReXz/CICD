# Notes Application

Aplikasi Notes dengan arsitektur microservices yang di-deploy ke Google Cloud Platform.

## Struktur Proyek

```
.
├── be/                   # Backend service (Node.js)
│   ├── config/           # Konfigurasi database
│   ├── controllers/      # Logic aplikasi
│   ├── models/           # Model database
│   ├── routes/           # API routes
│   └── utils/            # Utility functions
├── fe/                   # Frontend service
│   ├── app.yaml          # Konfigurasi App Engine
│   └── ...
├── cloudbuild.backend.yaml  # Konfigurasi CI/CD untuk backend
└── cloudbuild.frontend.yaml # Konfigurasi CI/CD untuk frontend
```

## Teknologi yang Digunakan

- **Backend**: Node.js dengan Express
- **Frontend**: HTML, JavaScript
- **Database**: MySQL
- **Deployment**: Google Cloud Platform (Cloud Run & App Engine)
- **CI/CD**: Cloud Build

## Deployment

### Backend (Cloud Run)

Backend di-deploy ke Cloud Run dengan konfigurasi di `cloudbuild.backend.yaml`:

1. Build Docker image
2. Push ke Container Registry
3. Deploy ke Cloud Run

### Frontend (App Engine)

Frontend di-deploy langsung ke App Engine menggunakan `cloudbuild.frontend.yaml`.

## Setup Lokal

### Backend

```bash
cd be
npm install
npm start
```

### Frontend

```bash
cd fe
npm install
npm start
```

## CI/CD Pipeline

Proyek ini menggunakan Google Cloud Build untuk continuous integration dan deployment:

- Perubahan pada backend akan memicu build dan deploy ke Cloud Run
- Perubahan pada frontend akan memicu deploy ke App Engine

## Database

Backend terhubung ke database MySQL. Lihat `be/MYSQL_SETUP.md` untuk detail konfigurasi database.
