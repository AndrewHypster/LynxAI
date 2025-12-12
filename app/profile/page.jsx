'use client'
import { useSession } from "next-auth/react"

const UserProfile = () => {
  const session = useSession()
  console.log(session);
  
  return (
    <h1>
      {session.data?.user.email}
      <br/>
      {session.data?.user.role}
    </h1>
  );
}

export default UserProfile