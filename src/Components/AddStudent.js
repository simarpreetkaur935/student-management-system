import React, { useState } from 'react'
import { getDatabase,ref,set} from"firebase/database"
import{app} from '../Firebase'
import { useNavigate } from 'react-router-dom'

const AddStudent = () => {
    const[admNo,setAdmNo] = useState('')
    const[name,setName] = useState('')
    const[phone,setPhone] = useState(null)
    const[selectedfile,setSelectedFile] = useState(null)
    const navigate = useNavigate()

    const fileHandler =(event)=>{
        const file = event.target.files[0]
        setSelectedFile(file)

    }

    const submitHandler = async (event) => {
  event.preventDefault();

  try {
    const formData = new FormData();

    formData.append("file", selectedfile);
    formData.append("upload_preset", "student_upload");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dy2n1h1lh/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const imageData = await response.json();

    const imageUrl = imageData.secure_url;

    const db = getDatabase(app);

    await set(ref(db, 'student/' + admNo), {
      studentName: name,
      phoneNumber: phone,
      imageUrl: imageUrl
    });

    console.log("Data Added Successfully");

    navigate('/dashboard/StudentList');

  } catch (err) {
    console.log(err);
  }

  
   console.log(name,phone,admNo);
}   
  return (
    <div>
       <form onSubmit={submitHandler}>
         <input onChange={(e)=>setAdmNo(e.target.value)}  type='text' placeholder='admNo'/> 
        <input onChange={(e)=>setName(e.target.value)}  type='text' placeholder='student name'/> 
          <input onChange={(e)=>setPhone(e.target.value)}  type='number' placeholder='phone'/> 
          <input onChange={fileHandler}type='file'/>
        <button>submit</button>
       </form>
    </div>
  )
}

export default AddStudent