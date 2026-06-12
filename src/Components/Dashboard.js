import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div style={{display:'flex', FlexDirection:'row'}}>
        <div style={{width:'20%', backgroundColor:'blue',height:'100vh'}} >
          <Link to='dashboard/addstudent'style={{display:'block',color:'white'}}>Add Student</Link>
          <Link to='dashboard/studentlist' style={{display:'block',color:'white'}}>Student List</Link>
        </div>
        <div style={{width:'70%',height:'100vh'}}>
       <Outlet/>
        </div>
    </div>
  )
}

export default Dashboard