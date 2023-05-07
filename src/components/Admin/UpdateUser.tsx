import User from "../../interfaces/User"


interface UpdateUserProps {
  user: User,
  onClose(): void
}


function UpdateUser({ user, onClose }: UpdateUserProps) {
  return (
    <div>UpdateUser</div>
  )
}

export default UpdateUser