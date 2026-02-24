import React from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  return (
    <main style={{ fontFamily: 'system-ui', padding: 24 }}>
      <h1>da-web-upgrade</h1>
      <p>Frontend is running.</p>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
