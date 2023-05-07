import React from 'react'
import Role from '../../interfaces/Role'

interface UpdateRoleProps {
  role: Role | null,
  onClose: () => void
}

function UpdateRole({ role, onClose }: UpdateRoleProps) {
  return (
    <div>UpdateRole</div>
  )
}

export default UpdateRole