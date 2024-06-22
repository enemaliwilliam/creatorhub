import { signOut } from "next-auth/react"
 
export function SignOut() {
  return <button className="w-1/2 p-2 font-bold border-2 border-black rounded-md" onClick={() => signOut()}>Sign Out</button>
}