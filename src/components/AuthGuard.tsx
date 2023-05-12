import { Navigate, useNavigate } from 'react-router-dom'
import axios from '../axios'
import { useAuthStore } from '../context/AuthStore'
import { ReactNode, useEffect } from 'react'
import useMe from '../hooks/useMe'

interface AuthGuardProps {
  children: ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const user = useAuthStore(state => state.user)
  const setUser = useAuthStore(state => state.setUser)
  const setToken = useAuthStore(state => state.setToken)
  const localStorageToken = localStorage.getItem('token')
  const { data, error, isSuccess } = useMe()

  if (!localStorageToken || error) {
    return <Navigate to="/login" />
  }
  useEffect(() => {
    if (isSuccess && data) {
      setToken(localStorageToken);
      setUser(data)
      localStorage.setItem("role", data.role.name)
    }
  }, [isSuccess, data, setToken, setUser])

  return (
    <>
      {children}
    </>
  )
}
