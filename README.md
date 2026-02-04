# 🐕 WagOnTime

A modern dog walking reminder and tracking application built with Next.js and Supabase.

## ✨ Features

- 📝 **Walk Tracking**: Record and track dog walking sessions
- 📊 **Walk History**: View all past walking logs with timestamps
- 💾 **Cloud Storage**: All data securely stored in Supabase
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- ⚡ **Real-time Updates**: Instant data synchronization

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript
- **Deployment**: [Vercel](https://vercel.com/)

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Supabase account ([sign up here](https://supabase.com))
- Git installed

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/WagOnTime.git
   cd WagOnTime
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key
   ```

4. **Set up Supabase database**
   
   Create a `walks` table in your Supabase project:
   ```sql
   CREATE TABLE walks (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     pet_id TEXT,
     walker_id TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     ended_at TIMESTAMPTZ
   );
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
wag-on-time/
├── src/
│   ├── app/
│   │   ├── api/              # API routes (backend)
│   │   │   └── walks/        # Walk tracking endpoints
│   │   ├── dashboard/        # Dashboard page
│   │   ├── walklog/          # Walk history page
│   │   └── page.tsx          # Home page
│   └── lib/
│       └── supabase.ts       # Supabase client configuration
├── public/                   # Static assets
├── .env.local               # Environment variables (not in git)
└── package.json
```

## 🎯 Usage

### Recording a Walk

1. Navigate to the Dashboard
2. Click the "Walk Complete" button
3. The walk is automatically recorded with the current timestamp
4. View all walks in the Walk Log page

### Viewing Walk History

1. Click on "Walk Log" in the navigation
2. See all recorded walks with timestamps
3. View walk duration and details

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side) | Yes |

### Supabase Setup

1. Create a new project in [Supabase](https://supabase.com)
2. Navigate to Settings > API
3. Copy your Project URL and API keys
4. Create the `walks` table using the SQL editor

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in the Vercel dashboard
5. Deploy!

Your app will be live at `https://your-app.vercel.app`

## 🛣️ Roadmap

- [ ] User authentication
- [ ] Multiple pet support
- [ ] Weather integration
- [ ] Push notifications
- [ ] Calendar view
- [ ] Statistics and analytics
- [ ] Social sharing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

- GitHub: [@yhuuuu](https://github.com/yhuuuu)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Supabase](https://supabase.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

Made with ❤️ for dog lovers
