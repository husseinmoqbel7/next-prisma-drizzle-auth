# next-prisma-drizzle-auth

Authentication template for Next.js using Prisma and Drizzle. A modern authentication template built with Next.js 14, featuring both Prisma and Drizzle ORM options. This template includes email/password authentication, OAuth providers (Google, GitHub), and email verification.

## Key Features

### Authentication & Security

- 🔐 Next-auth v5 (Auth.js) with robust authentication
- 🔑 Credentials & OAuth Providers (Google, GitHub)
- ✉️ Email verification
- 📱 Two-factor authentication (2FA)
- 🔒 Forgot password functionality

### User Management

- 👥 User roles (Admin & User)
- 🚪 Login/Logout capabilities
- 🛂 Role-based access control
- 👤 User hooks and utilities

### Components

- 🔓 Login (redirect or modal)
- 📝 Registration
- 🤔 Password recovery
- ✅ Verification
- ⚠️ Error handling

### Development & Extensibility

- 🚀 Next.js 14 with server actions
- 🔍 Middleware integration
- 📈 Extended next-auth session management
- 🛡️ API & server action protection

### Settings & Customization

- 📧 Email change with verification
- 🔑 Password modification
- 🔔 Two-factor auth toggle
- 🔄 User role management (dev purposes)

### Technical Highlights

- 🎨 Tailwind CSS styling
- 🎯 TypeScript support
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Database (PostgreSQL, MySQL, or SQLite)
- Resend account for email services

### Installation

1. Create a new project using our CLI:

```bash
npx next-prisma-drizzle-auth my-app
```

2. Select your preferred ORM when prompted (Prisma or Drizzle)

3. Navigate to the project directory:

```bash
cd my-app
```

### Configuration

1. Set up your environment variables in `.env`:

```env
DATABASE_URL=""
AUTH_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
RESEND_API_KEY=""
NEXT_PUBLIC_APP_URL="http://localhost:3000"
RESEND_EMAIL=""
```

2. Generate AUTH_SECRET:

```bash
npx auth secret
```

3. Set up OAuth providers:

   - Create a Google OAuth app: [Google Cloud Console](https://console.cloud.google.com)
   - Create a GitHub OAuth app: [GitHub Developer Settings](https://github.com/settings/developers)

4. Get your Resend API key from [Resend](https://resend.com)

### Database Setup

#### For Prisma:

1. Update your DATABASE_URL in `.env`
2. Generate Prisma client:

```bash
npx prisma generate
```

3. Push the schema to your database:

```bash
npx prisma db push
```

#### For Drizzle:

1. Set your DATABASE_TYPE in `.env` ("postgres", "mysql", or "sqlite")
2. Update your DATABASE_URL in `.env`
3. Push the schema to your database:

```bash
npm run db:push
```

### Running the Application

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## Project Structure

```
src
├── actions           # Server Actions
│
├── app
│   ├── auth          # Authentication Routes
│   │
|   ├── api           # API Routes
|
├── components
│   ├── auth          # Authentication Components
│   ├── ui.tsx        # Shadcn UI Components
│
├── db                # Database
|
├── hooks
|
├── lib
│   ├── shchemas      # Authentication Schemas using Zod
│   ├── auth          # Authentication Utilities
│   ├── mail          # Email Utilities
│   ├── tokens        # Token Utilities
|
├── middleware.ts     # Middleware Configuration for Next-Auth
|
├── auth.ts           # Next-Auth Configuration
|
├── next-auth.d.ts     # Next-Auth Custom Types
|
├── routes            # Next-Auth Routes
```

## Authentication Flow

1. Users can sign up using email/password or OAuth
2. Email verification is required for email/password signup
3. Password reset functionality available
4. Two-factor authentication (2FA) is optional for email/password signup
5. OAuth users are automatically verified
6. Session management handled by Next-Auth

## Repository

This project is maintained at [https://github.com/husseinmoqbel7/next-prisma-drizzle-auth](https://github.com/husseinmoqbel7/next-prisma-drizzle-auth)

## Author

Hussein Moqbel - [https://github.com/husseinmoqbel7](https://github.com/husseinmoqbel7)

## Support

If you find this helpful, please give it a ⭐️ on GitHub!

## Acknowledgments

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Resend](https://resend.com)
- [Tailwind CSS](https://tailwindcss.com)
