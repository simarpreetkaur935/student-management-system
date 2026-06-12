import React, { useEffect, useState } from 'react'
import {getDatabase,onValue,ref, remove} from 'firebase/database'
import {app}  from'../Firebase'
import { useNavigate } from 'react-router-dom'

const StudentList = () => {
    const[studentData,setStudentData] = useState(null)
    const navigate = useNavigate()
   useEffect(()=>{
        const db = getDatabase(app)
        const studentRef = ref(db,'student')
        onValue(studentRef,(snapshot)=>{
            const data = snapshot.val()
            console.log(data)
            setStudentData(data)

        })

    },[])
    const deleteData = async (key) => {
  const db = getDatabase(app);
  const studentRef = ref(db, 'student/' + key);

  try {
    await remove(studentRef);
    console.log("Student deleted successfully");
  } catch (err) {
    console.log(err);
  }
}
  return (
    <div>
        <h1> student list</h1>
        { studentData && (
            <div>
                {Object.entries(studentData).map(([key,value])=>{
                    return(
                        <div key={key}>
                        <img src={value.imageUrl} width="100" height="100" alt="student" />
                        <p>{value.studentName} {value.phoneNumber}</p>
                        <button onClick={()=>{deleteData(key)}}>Delete</button>
                        <button onClick={()=>{navigate('/updateStudent',{state:[key,value]})}}>Update</button>
                        </div>
                    )
                })}
            </div>
        )

        }
    </div>
  )
}

export default StudentList