import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const [userId, setUserId]=useState('')
  const [password, setPassword]=useState('')
  const navigate=useNavigate()
  return (
    <div id="sign-up">
      <p>Sign Up</p>
      <form >
        <input type="text" name="userId" id='userId' placeholder="User Name" value={userId} onChange={(e)=>{
          setUserId(e.target.value)
        }}/>
        <input type="text" name="password" id="password" placeholder="Password" value={password} onChange={(e)=>{
          setPassword(e.target.value)
        }} />
      </form>
      <button style={{backgroundColor:'rgb(60, 74, 93)'}}>Sign Up</button>
      <button style={{backgroundColor:'rgb(188, 39, 39)'}} onClick={()=>{
        navigate('/login')
      }}>Sign In</button>
    </div>
  )
}
export default SignUp