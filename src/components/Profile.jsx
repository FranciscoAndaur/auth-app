// src/components/Profile.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Profile() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  // Separate state for form data
  const [formData, setFormData] = useState({
    username: '',
    biography: '',
    location: '',
    website: '',
    avatar_url: ''
  })

  useEffect(() => {
    getProfile()
  }, [])

  async function getProfile() {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data, error } = await supabase
          .from('Users')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error && error.code === 'PGRST116') {
          // Profile doesn't exist, create one
          const { data: newUser, error: createError } = await supabase
            .from('Users')
            .insert([
              {
                id: user.id,
                username: user.email.split('@')[0],
                fran_tokens: 500
              }
            ])
            .select()
            .single()

          if (createError) throw createError
          setFormData(newUser)
        } else if (error) {
          throw error
        } else {
          // Set form data with existing profile data
          setFormData(data)
        }

        setUser(user)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function updateProfile(e) {
    e.preventDefault()
    
    try {
      setLoading(true)

      if (!user) throw new Error('No user')

      const { error } = await supabase
        .from('Users')
        .update({
          username: formData.username,
          biography: formData.biography,
          location: formData.location,
          website: formData.website,
          avatar_url: formData.avatar_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

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
        
        <form onSubmit={updateProfile} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-black">
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
              name="username"
              value={formData.username || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Biography */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Biography
            </label>
            <textarea
              name="biography"
              value={formData.biography || ''}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              type="url"
              name="website"
              value={formData.website || ''}
              onChange={handleChange}
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
              value={formData.fran_tokens || 0}
              disabled
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};