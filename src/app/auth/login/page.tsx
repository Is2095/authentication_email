
import Button from '@/elements/Button'
import TextBox from "@/elements/TextBox"
import { useRef } from "react"

function LoginPage() {
    const userName = useRef('')
    const pass = useRef('')

    const onSubmit = async () => {

    }
  return (
    <div className="flex justify-center h-screen bg-gradient-to-b from-cyan-300 to-cyan-600">
        <div className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">
            <TextBox
                lableText='User Name'
                onChange ={(e: React.ChangeEvent<HTMLInputElement>)=>(userName.current = e.target.value)}
            />
            <TextBox
                lableText='Password'
                type={'password'}
                onChange = {(e: React.ChangeEvent<HTMLInputElement>) => (pass.current = e.target.value)}
            />
            <Button onClick={onSubmit}>Login</Button>
        </div>    
        
    
    </div>
  )
}

export default LoginPage