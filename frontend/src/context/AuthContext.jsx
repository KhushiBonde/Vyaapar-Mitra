import { createContext, useContext, useState } from 'react'
import { mockBusiness } from '../mock/data'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // In MVP, auth is mocked — starts as logged-in for demo
  const [user, setUser] = useState(mockBusiness)
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const login = (email, password) => {
    // Mock login — always succeeds for demo
    setUser(mockBusiness)
    setIsAuthenticated(true)
    return Promise.resolve()
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  const signup = (data) => {
    setUser({ ...mockBusiness, ...data })
    setIsAuthenticated(true)
    return Promise.resolve()
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
