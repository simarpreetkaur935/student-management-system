import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import{app} from '../Firebase'
import { getAuth,signOut } from 'firebase/auth'

const Dashboard = () => {
     const navigate = useNavigate()
    const Logout =()=>{
        const auth = getAuth(app)
        signOut(auth)
        .then(res=>{
         navigate('/login')
        })
    }
        
  return (
    <div style={{display:'flex', FlexDirection:'row'}}>
        <div style={{width:'20%', backgroundColor:'blue',height:'100vh'}} >
          <Link to='dashboard/addstudent'style={{display:'block',color:'white'}}>Add Student</Link>
          <Link to='dashboard/studentlist' style={{display:'block',color:'white'}}>Student List</Link>
          <br/>
          <button type='button' onClick={Logout}>Logout</button>
        </div>
        <div style={{width:'70%',height:'100vh'}}>
       <Outlet/>
        </div>
    </div>
  )
    }

export default Dashboard