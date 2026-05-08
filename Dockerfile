# --- STAGE 1: Build ---
FROM node:20-slim AS builder

# 1. Install openssl (Dibutuhkan oleh Prisma Engine)
RUN apt-get update && apt-get install -y openssl

WORKDIR /app

# 2. Salin file manifes dependensi
COPY package*.json ./
COPY prisma ./prisma/

# 3. Install semua dependensi (termasuk devDependencies untuk compile TS)
RUN npm install

# 4. Salin semua file source code
COPY . .

# 5. Generate Prisma Client
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npx prisma generate

# 6. Compile TypeScript ke JavaScript
RUN npm run build


# --- STAGE 2: Runner ---
FROM node:20-slim

# Install openssl lagi di stage runner
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 7. Hanya ambil file hasil build dan dependensi yang sudah terpasang
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# 8. Set variabel lingkungan untuk produksi
ENV NODE_ENV=production

# Fly.io biasanya menggunakan port 8080 secara default
ENV PORT=7860
EXPOSE 7860

# 9. Jalankan migrasi database lalu jalankan server
# Perintah ini akan memastikan skema database Anda sinkron sebelum aplikasi menyala
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]