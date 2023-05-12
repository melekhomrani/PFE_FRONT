// check user role and redirect to the right page
// Compare this snippet from src\components\RoleGuard.tsx:
import { Navigate, useNavigate } from 'react-router-dom'
import { ReactNode } from 'react'
import useMe from '../hooks/useMe'

interface RoleGuardProps {
  children: ReactNode
  role: string
}

export default function RoleGuard({ children, role }: RoleGuardProps) {
  const navigate = useNavigate()
  const { data, error, isSuccess } = useMe()

  if (isSuccess && data) {
    if (data.role.name !== role) {
      navigate('/')
    }
  }
  return (
    <>
      {children}
    </>
  )
}