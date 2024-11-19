// src/components/Navbar.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Navbar() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleSignIn() {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSignOut() {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">Your Logo</span>
          </div>
          
          <div className="flex items-center">
            {session ? (
              <div className="flex items-center space-x-4">
                
                <span className="text-gray-700">{session.user.email}</span>
                <button
                  onClick={handleSignOut}
                  disabled={loading}
                  className="px-4 py-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-600 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Sign Out'}
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                disabled={loading}
                className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Sign in with Google'}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}