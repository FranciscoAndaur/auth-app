export default function ProfileCard() {
    return (
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              className="input"
              placeholder="Enter username"
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              className="input"
              rows={4}
              placeholder="Tell us about yourself"
            />
          </div>
  
          <div className="flex justify-end space-x-3">
            <button className="btn bg-gray-100 text-gray-700 hover:bg-gray-200">
              Cancel
            </button>
            <button className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    )
  }