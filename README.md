# React + Supabase Authentication Project

A modern web application built with React, Vite, and Supabase, featuring Google Authentication and user profile management with FRAN token system.

## 🚀 Features

- Google OAuth Authentication
- User Profile Management
- FRAN Token System
- Real-time Data Updates
- Responsive Design with Tailwind CSS
- Secure Data Management with Supabase

## 🛠️ Tech Stack

- **Frontend:**
  - React
  - Vite
  - Tailwind CSS
  - React Router

- **Backend:**
  - Supabase (PostgreSQL)
  - Google OAuth

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (v7 or higher)
- A Supabase account
- A Google Cloud Console account (for OAuth)

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 📁 Project Structure

```
my-app/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Profile.jsx
│   │   └── ui/
│   ├── lib/
│   │   └── supabaseClient.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── .env
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🗄️ Database Schema

### Users Table
```sql
create table "Users" (
    id uuid references auth.users(id),
    username text,
    fran_tokens bigint default 500,
    avatar_url text,
    biography text,
    location text,
    website text,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now()),
    primary key (id)
);
```

## 🔐 Supabase Setup

1. Create a new Supabase project
2. Set up Google OAuth:
   - Configure OAuth in Google Cloud Console
   - Add credentials to Supabase Auth settings
3. Enable Row Level Security (RLS)
4. Set up database triggers for new users

## 🚀 Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy using your preferred hosting service (e.g., Vercel, Netlify)

## 🔄 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🛡️ Security

- Row Level Security (RLS) enabled
- Secure authentication flow
- Environment variables for sensitive data
- Protected API routes

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop
- Tablet
- Mobile devices

## 🎨 Styling

Using Tailwind CSS with custom configuration:
- Custom color scheme
- Responsive utilities
- Custom components
- Dark mode support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details

## 👏 Acknowledgments

- Supabase for the amazing backend service
- Tailwind CSS for the utility-first CSS framework
- Vite for the blazing fast build tool
- React for the awesome frontend library

## 📧 Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/project-name](https://github.com/yourusername/project-name)

## 🔮 Future Enhancements

- [ ] Add user search functionality
- [ ] Implement token transfer system
- [ ] Add user activity tracking
- [ ] Enhance profile customization options
- [ ] Add social features