
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import AddStudent from './Components/AddStudent';
import StudentList from './Components/StudentList';
import UpdateStudent from './Components/UpdateStudent';
import Signup from './Components/Signup';
import Login from './Components/Login';

const myRouter =createBrowserRouter([
  {path:'signup',element:<Signup/>},
  {path:'login',element:<Login/>},
  {path:'dashboard',element:<Dashboard/>,children:[
     {path:'',element:<StudentList/>},
    {path:'addStudent',element:<AddStudent/>},
    {path:'studentList',element:<StudentList/>},
    {path:'updatestudent',element:<UpdateStudent/>}

  ]}
])

function App() {
  return (
    <>
     <RouterProvider router={myRouter}/>
    
    </>
  );
}

export default App;
