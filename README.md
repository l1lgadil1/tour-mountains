# Tour Mountains

A Next.js application for mountain tour booking and management.

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Environment Variables

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Add your Supabase credentials to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3002](http://localhost:3002)

## Deployment on Vercel

### Important: Environment Variables Required

For your Vercel deployment to work, you MUST add the following environment variables in your Vercel project settings:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add these variables:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

Without these environment variables, your app will show a 404 error.

### Database Setup

Before deploying, make sure to:
1. Create a Supabase project
2. Run the SQL scripts in the following order:
   - `supabase/schema.sql` - Creates the tours table
   - `create-social-settings-table.sql` - Creates social settings table
   - `setup-storage-bucket.sql` - Sets up image storage

### Deployment Steps

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables (as mentioned above)
4. Deploy

## Features

- Multi-language support (Russian/Kazakh)
- Tour management admin panel
- Image upload functionality
- Social media integration
- Responsive design

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Supabase (Database & Storage)