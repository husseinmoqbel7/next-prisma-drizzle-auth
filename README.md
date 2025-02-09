# next-prisma-drizzle-auth

Authentication template for Next.js using Prisma and Drizzle. A modern authentication template built with Next.js 14, featuring both Prisma and Drizzle ORM options. This template includes email/password authentication, OAuth providers (Google, GitHub), and email verification.

## Features

- 🔐 Next-Auth integration with Credentials Provider
- 🚀 OAuth authentication (Google, GitHub)
- ✉️ Email verification with Resend
- 🎨 Styled with Tailwind CSS
- 🎯 TypeScript support
- 📱 Fully responsive design
- 🔄 Database integration (Prisma/Drizzle)
- 🛡️ Server-side form validation
- ⚡ Server Actions
- 🔒 Secure authentication flows
- 📨 Email notifications
- 🎮 Easy-to-use CLI setup

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
# Only for Drizzle
DATABASE_TYPE="postgres" # or "mysql" or "sqlite"
```

2. Generate AUTH_SECRET:

```bash
npx auth
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
├── app/
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   └── ...            # Other app routes
├── components/         # React components
├── lib/               # Utility functions
├── schemas/           # Form validation schemas
└── styles/            # CSS styles
```

## Authentication Flow

1. Users can sign up using email/password or OAuth
2. Email verification is required for email/password signup
3. Password reset functionality available
4. OAuth users are automatically verified
5. Session management handled by Next-Auth

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Repository

This project is maintained at [https://github.com/husseinmoqbel7/next-auth-prisma-starter](https://github.com/husseinmoqbel7/next-auth-prisma-starter)

## Author

Hussein Moqbel

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find this helpful, please give it a ⭐️ on GitHub!

## Acknowledgments

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Resend](https://resend.com)
- [Tailwind CSS](https://tailwindcss.com)
