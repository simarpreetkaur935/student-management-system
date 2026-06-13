import React from 'react'
import { useState } from 'react'
import {getAuth,signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,FacebookAuthProvider,GithubAuthProvider} from 'firebase/auth'
import {app} from '../Firebase'
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const[email,setEmail] = useState('');
      const[password,setPassword] = useState('');
      const navigate = useNavigate()
  
      const submitHandler=(event)=>{
          event.preventDefault();
          const auth = getAuth(app)
          signInWithEmailAndPassword(auth,email,password)
          .then(userData=>{
            console.log(userData.user)
            navigate('/dashboard')
          })
          .catch(err=>{
            console.log(err)
          })
        }      
          const loginWithGoogle=()=>{
            const auth = getAuth(app)
            const provider = new GoogleAuthProvider()
            signInWithPopup(auth,provider)
            .then(result=>{
                console.log(result)
                navigate('/dashboard')
            })
            .catch(err=>{
                console.log(err)
            })
        }
            const loginWithFacebook=()=>{
            const auth = getAuth(app)
            const provider = new FacebookAuthProvider()
            signInWithPopup(auth,provider)
            .then(result=>{
                console.log(result)
                navigate('/dashboard')
            })
            .catch(err=>{
                console.log(err)
            })


       
      }
      const loginWithGithub=()=>{
            const auth = getAuth(app)
            const provider = new GithubAuthProvider()
            signInWithPopup(auth,provider)
            .then(result=>{
                console.log(result)
                navigate('/dashboard')
            })
            .catch(err=>{
                console.log(err)
            })
        }
    return (
      <div>
          <h1>login</h1>
          <form onSubmit={submitHandler}>
              <input onChange={(e)=>{setEmail(e.target.value)}} type='email' placeholder='email'/>
              <input onChange={(e)=>{setPassword(e.target.value)}} type='password' placeholder='password'/>
              <button type='submit'>login</button>
              <br/>
              <br/>
               <button type='button' onClick={loginWithGoogle}>login with google</button>
                <button type='button' onClick={loginWithFacebook}>login with facebook</button>
                  <button type='button' onClick={loginWithGithub}>login with facebook</button>
          </form>
      </div>
    )
}

export default Login