'use client'

import { useEffect, useState } from 'react'

interface HttpsWarningProps {
  children: React.ReactNode
}

export function HttpsWarning({ children }: HttpsWarningProps) {
  const [showWarning, setShowWarning] = useState(false)
  const [isHttps, setIsHttps] = useState(true)

  useEffect(() => {
    // Check if we're in the browser and using HTTP on a non-localhost domain
    if (typeof window !== 'undefined') {
      const protocol = window.location.protocol
      const hostname = window.location.hostname
      
      const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1'
      const isHttp = protocol === 'http:'
      
      setIsHttps(!isHttp)
      
      // Show warning if using HTTP on IP address (not localhost)
      if (isHttp && !isLocalhost) {
        setShowWarning(true)
      }
    }
  }, [])

  if (showWarning) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          
          <h2 className="text-xl font-bold text-white mb-2">HTTPS Required</h2>
          
          <p className="text-gray-300 mb-4">
            Wallet functionality requires HTTPS connection. 
            Please use one of these options:
          </p>
          
          <div className="space-y-2 text-sm text-gray-400 mb-6">
            <div className="bg-gray-700 p-3 rounded">
              <strong className="text-white">Option 1:</strong> Use localhost
              <br />
              <code className="text-blue-400">http://localhost:3000</code>
            </div>
            
            <div className="bg-gray-700 p-3 rounded">
              <strong className="text-white">Option 2:</strong> Start HTTPS server
              <br />
              <code className="text-blue-400">npm run dev:https</code>
            </div>
          </div>
          
          <button
            onClick={() => {
              window.location.href = 'http://localhost:3000' + window.location.pathname
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Switch to localhost
          </button>
          
          <button
            onClick={() => setShowWarning(false)}
            className="w-full mt-2 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Continue anyway (limited functionality)
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
