import React, { useState } from 'react'
import { getDatabase, ref, update } from "firebase/database"
import { app } from '../Firebase'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateStudent = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [admNo, setAdmNo] = useState(location.state[0])
    const [name, setName] = useState(location.state[1].studentName)
    const [phone, setPhone] = useState(location.state[1].phoneNumber)
    const [selectedfile, setSelectedFile] = useState(null)
    console.log(location)



    const fileHandler = (event) => {
        const file = event.target.files[0]
        setSelectedFile(file)

    }

    const submitHandler = async (event) => {
        event.preventDefault();

        try {

            let imageUrl = location.state[1].imageUrl;

            // If user selected a new image
            if (selectedfile) {

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

                imageUrl = imageData.secure_url;
            }

            const db = getDatabase(app);

            const studentRef = ref(db,'student/' + location.state[0]
            );

            await update(studentRef, {
                studentName: name,
                phoneNumber: phone,
                imageUrl: imageUrl
            });

            navigate('dashboard/StudentList');

        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <form onSubmit={submitHandler}>
                <img src={location.state[1].imageUrl} alt="student" width="100" height="100"/>
                <input disabled value={admNo} onChange={(e) => setAdmNo(e.target.value)} type='text' placeholder='admNo' />
                <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='student name' />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type='number' placeholder='phone' />
                <input onChange={fileHandler} type="file" />
                <button>update</button>
            </form>
        </div>
    )
}

export default UpdateStudent