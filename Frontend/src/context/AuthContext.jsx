// import React, { createContext, useContext, useState, useEffect } from 'react'
// import API from '../api'

// const AuthContext = createContext()

// export const useAuth = () => useContext(AuthContext)

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [token, setToken] = useState(localStorage.getItem('token'))

//   useEffect(() => {
//     if (token) {
//       API.defaults.headers.common['Authorization'] = `Bearer ${token}`
//       const storedUser = localStorage.getItem('user')
//       if (storedUser) {
//         setUser(JSON.parse(storedUser))
//       }
//     }
//   }, [token])

//   const login = async (email, password) => {
//     const res = await API.post('/login', { email, password })
//     const { token, user } = res.data
//     localStorage.setItem('token', token)
//     localStorage.setItem('user', JSON.stringify(user))
//     setToken(token)
//     setUser(user)
//   }

//   const register = async (username, email, password, role = 'user') => {
//     const res = await API.post('/register', { username, email, password, role })
//     const { token, user } = res.data
//     localStorage.setItem('token', token)
//     localStorage.setItem('user', JSON.stringify(user))
//     setToken(token)
//     setUser(user)
//   }

//   const logout = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('user')
//     setToken(null)
//     setUser(null)
//     delete API.defaults.headers.common['Authorization']
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }


import React, { createContext, useContext, useState, useEffect } from 'react'
import API from '../api'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`

      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
  }, [token])

  // ✅ LOGIN
  const login = async (email, password) => {
    const res = await API.post('/login', { email, password })
    const { token, user } = res.data

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    setToken(token)
    setUser(user)

    return user // ⭐ IMPORTANT
  }

  // ✅ REGISTER
  const register = async (username, email, password, role = 'user') => {
    const res = await API.post('/register', { username, email, password, role })
    const { token, user } = res.data

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))

    setToken(token)
    setUser(user)

    return user // ⭐ IMPORTANT
  }

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
    delete API.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}