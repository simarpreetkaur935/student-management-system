import React from 'react'
import { useState } from 'react'
import {getAuth,signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,FacebookAuthProvider,GithubAuthProvider, signInWithPhoneNumber,RecaptchaVerifier} from 'firebase/auth'
import {app} from '../Firebase'
import { useNavigate } from 'react-router-dom';



const Login = () => {
      const[email,setEmail] = useState('');
      const[password,setPassword] = useState('');
      const[phone,setPhone] = useState('');
      const[isotp,setIsotp] = useState(false);
      const[code,setCode] = useState('');
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
    const sendOtp = () => {
  const auth = getAuth(app);

  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "abc",
    {
      size: "normal"
    }
  );

  const appVerifier = window.recaptchaVerifier;

  signInWithPhoneNumber(auth, phone, appVerifier)
    .then((res) => {
      console.log(res);
      window.confirmationResult = res;
      console.log("OTP sent");
      setIsotp(true);
    })
    .catch((err) => {
      console.log(err);
    });
};
        const confirmOtp=()=>{
            window.confirmationResult.confirm(code)
            .then(res=>{
                console.log(res)
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
                  <button type='button' onClick={loginWithGithub}>login with github</button>
                  <br/>
                  <br/>
          </form>
          {!isotp?
          <div>
                    <h3>login with OTP</h3>
                  <input  onChange={(e)=>{setPhone(e.target.value)}} placeholder='phone number'/>
                  <div id='abc'></div>
                  <button type='button' onClick={sendOtp}>send otp</button>
                 </div>
                 :
                 <div>
                    <h3>confirm otp</h3>
                    <input type='text' onChange={(e)=>{setCode(e.target.value)}}/>
                    <button type='button' onClick={confirmOtp}>Submit OTP</button>
                    </div>
}
      </div>
    )
}

export default Login