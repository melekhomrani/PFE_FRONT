import React from 'react'
import Role from '../../interfaces/Role'

interface UpdateRoleProps {
  role: Role | null,
  onClose: () => void
}

//TODO: implement update role
function UpdateRole({ role, onClose }: UpdateRoleProps) {
  return (
    <div>UpdateRole</div>
  )
}

export default UpdateRole