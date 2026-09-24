# AI FAQ Assistant — Complete Starter

## Stack
Node.js 18+, Express, MongoDB/Mongoose, JWT, bcrypt, Google Gemini, Postman.

## Setup
1. Install Node.js and MongoDB (or use MongoDB Atlas).
2. Open this folder in VS Code.
3. Run `npm install`.
4. Copy `.env.example` to `.env`.
5. Set `MONGODB_URI`, `JWT_SECRET`, and `GEMINI_API_KEY`.
6. Run `npm run dev`.
7. Test `GET http://localhost:5000/health`.

## API testing order
1. POST `/api/auth/register`
2. POST `/api/auth/login` → copy JWT
3. GET `/api/auth/profile` with `Authorization: Bearer TOKEN`
4. Make the demo user `creator` in MongoDB if you need to create FAQs.
5. POST `/api/faqs`
6. GET `/api/faqs`
7. GET `/api/faqs/search?q=configure`
8. PUT `/api/faqs/:id`
9. DELETE `/api/faqs/:id`
10. POST `/api/ai/generate-faq`

## Example bodies
Register:
{"name":"Priya Sharma","email":"priya@writeflow.com","password":"securepassword123"}

Create FAQ:
{"question":"How do I configure custom category tags?","answer":"Navigate to settings panel and save the tags.","category":"Configuration"}

Generate AI FAQ:
{"topic":"Mongoose schema indexing validation runtime workflow optimization"}

## Project structure
src/server.js
src/app.js
src/config/db.js
src/controllers/{authController,faqController,aiController,categoryController}.js
src/middleware/{authMiddleware,errorMiddleware}.js
src/models/{User,FAQ,Category}.js
src/routes/{authRoutes,faqRoutes,aiRoutes,categoryRoutes}.js
src/services/geminiService.js
src/utils/token.js

## Important
The supplied PDF describes “semantic search” but its concrete demo endpoint is keyword search (`GET /api/faqs/search?q=configure`). This starter implements the concrete keyword/text behavior; the PDF does not specify an embedding/vector database implementation.
