import { signIn } from "next-auth/react"
 
export function SignIn() {
  return <button className="w-1/2 p-2 font-bold border-2 border-black rounded-md" onClick={() => signIn()}>Sign In With Facebook</button>
}