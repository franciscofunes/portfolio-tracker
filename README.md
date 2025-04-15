# 💼 Portfolio Tracker – Code Challenge

A full-stack financial portfolio tracker built with **Next.js**, **TailwindCSS**, **Prisma**, and **PostgreSQL**. Create portfolios, log trades, and visualize cumulative PnL (Profit and Loss) over time using interactive charts.

---

## 🚀 Tech Stack

- **Frontend**: Next.js (App Router), React
- **Styling/UI**: TailwindCSS, ShadCN UI
- **State Management**: React Hooks / Context
- **Database**: PostgreSQL (via Docker)
- **ORM**: Prisma
- **Charting**: Recharts or Chart.js

---

## ✅ Features

### MVP
- [x] **Portfolio Creation**
  - Name, Initial Value
- [x] **Trade Logging**
  - Ticker, Entry/Exit Price, Quantity, Date
- [x] **Dashboard View**
  - Switch between portfolios
  - View all trades with PnL calculation
- [x] **PnL Chart**
  - Cumulative PnL over time (line chart)

### Bonus (Optional)
- [ ] Edit/Delete Trades
- [ ] Responsive UI
- [ ] Reusable components
- [ ] TypeScript Support
- [ ] CI-Ready Project Structure

---

## 🛠️ Setup Instructions

### 📦 Clone the Repo

```bash
git clone https://github.com/your-username/portfolio-tracker.git
cd portfolio-tracker
```

### ⚙️ Configure PostgreSQL with Docker (WSL-Friendly)

Make sure Docker is installed and running. Then start the PostgreSQL container:

```bash
docker-compose up -d
```

> The repository includes a preconfigured `docker-compose.yml`, so there's no need to create one manually.

---

## 🔌 Prisma ORM Setup

### 1. Install Dependencies

Choose your preferred package manager:

#### Using `pnpm` (recommended)

```bash
pnpm install
```

#### Using `npm`

```bash
npm install
```

#### Using `yarn`

```bash
yarn install
```

### 2. Run Database Migrations

This will create the tables in your local PostgreSQL instance based on the Prisma schema.

```bash
npx prisma migrate dev --name init
```

### 3. Seed the Database (Optional)

If a `prisma/seed.ts` file is provided, you can populate your database with sample data by running:

```bash
npx prisma db seed
```

> This will run the seeding script and insert sample portfolios and trades into the database.

---

### 4. Start the Development Server
To start the development server, run:

```bash
pnpm run dev
```
This will start the Next.js development server and you can access the application in your browser at http://localhost:3000.
