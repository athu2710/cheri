# Chéri Ecommerce

```text
.
├── frontend/          # React + TypeScript + Vite
│   ├── src/
│   └── assets/
├── backend/           # Express + TypeScript
│   └── src/index.ts
└── package.json       # npm workspaces
```

## Chạy local

Yêu cầu Node.js 20+ và npm.

```bash
npm install
copy backend\.env.example backend\.env
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Kiểm tra API: http://localhost:3000/api/health

Vite tự động proxy `/api` sang backend.

## Scripts

```bash
npm run dev
npm run dev:frontend
npm run dev:backend
npm run build
npm run lint
```
