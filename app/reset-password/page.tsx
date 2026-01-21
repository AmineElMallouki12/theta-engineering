'use client'

import { useState, FormEvent } from 'react'

export default function ResetPasswordPage() {
  const [username, setUsername] = useState('admin')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, newPassword }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsSuccess(true)
        setMessage(`✅ Password reset successfully! You can now login with username "${data.username}" and your new password.`)
        setNewPassword('')
      } else {
        setIsSuccess(false)
        setMessage(`❌ Error: ${data.error || 'Failed to reset password'}`)
      }
    } catch (error: any) {
      setIsSuccess(false)
      setMessage(`❌ Error: ${error.message || 'Network error. Make sure your dev server is running.'}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '50px auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>Reset Admin Password</h1>
        
        <div style={{
          background: '#e6e6ff',
          color: '#0000FF',
          border: '1px solid #ccccff',
          marginBottom: '20px',
          padding: '15px',
          borderRadius: '4px'
        }}>
          <strong>Instructions:</strong><br />
          1. Enter your admin username (usually "admin")<br />
          2. Enter your new password (at least 6 characters)<br />
          3. Click "Reset Password"<br />
          4. Then login at <a href="/admin/login" style={{ color: '#0000FF' }}>/admin/login</a>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: 'bold' }}>
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: 'bold' }}>
              New Password:
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Enter new password (min 6 characters)"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '12px',
              background: isLoading ? '#ccc' : '#0000FF',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        {message && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            borderRadius: '4px',
            background: isSuccess ? '#d4edda' : '#f8d7da',
            color: isSuccess ? '#155724' : '#721c24',
            border: `1px solid ${isSuccess ? '#c3e6cb' : '#f5c6cb'}`
          }}>
            {message}
            {isSuccess && (
              <div style={{ marginTop: '10px' }}>
                <a 
                  href="/admin/login" 
                  style={{ 
                    color: '#155724', 
                    fontWeight: 'bold',
                    textDecoration: 'underline'
                  }}
                >
                  Click here to login →
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
