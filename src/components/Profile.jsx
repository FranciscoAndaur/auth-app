// src/components/Profile.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Profile() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({
    username: '',
    fran_tokens: 0,
    avatar_url: '',
    // Add any other profile fields you want to track
  })

  useEffect(() => {
    getProfile()
  }, [])

  async function getProfile() {
    try {
      setLoading(true)
      
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        // Fetch profile data from users table
        const { data, error } = await supabase
          .from('users')
          .select(`
            username,
            fran_tokens,
            avatar_url
          `)
          .eq('id', user.id)
          .single()

        if (error) throw error

        if (data) {
          setProfile({
            username: data.username || '',
            fran_tokens: data.fran_tokens || 0,
            avatar_url: data.avatar_url || '',
          })
        }
      }
    } catch (error) {
      alert('Error loading user data!')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile() {
    try {
      setLoading(true)

      const { error } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          username: profile.username,
          avatar_url: profile.avatar_url,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Profile</h2>
        
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              value={user?.email || ''}
              disabled
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={profile.username || ''}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* FRAN Tokens */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              FRAN Tokens
            </label>
            <input
              type="number"
              value={profile.fran_tokens}
              disabled
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
            />
          </div>

          {/* Avatar URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Avatar URL
            </label>
            <input
              type="text"
              value={profile.avatar_url || ''}
              onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={updateProfile}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Update Profile'}
            </button>
          </div>
        </div>
      </div>

      {/* Token Transaction History */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Transaction History</h3>
        {/* Add transaction history here */}
      </div>
    </div>
  )
}