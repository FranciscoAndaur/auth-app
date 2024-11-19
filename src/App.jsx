import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { supabase } from './lib/supabaseClient'
import Auth from './components/Auth'
import Profile from './components/Profile'
import Navbar from './components/Navbar'
import './index.css'  // or './App.css' depending on your file name

console.log('App component loaded')
console.log('Supabase client:', supabase)

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div>
       <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Your main content goes here */}
        <Profile />
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Your App</h1>
    
      </main>
    </div>
      {!session ? (
        <Auth />
      ) : (
        <div className="p-4">
          <h1>Welcome {session.user.email}</h1>
          <button
            onClick={() => supabase.auth.signOut()}
            className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}


//FOR TESTING - BASIC WELCOME to MY APP with BUTTON
// export default function App() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="rounded-lg bg-white p-8 shadow-md">
//         <h1 className="text-2xl font-bold text-gray-800">Welcome to My App</h1>
//         <button
//           onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
//           className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
//         >
//           Sign in with Google
//         </button>
//       </div>
//     </div>
//   )
// }
