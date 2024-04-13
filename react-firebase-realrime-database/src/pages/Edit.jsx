import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import './style.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { getDatabase, ref, set, update } from 'firebase/database'
import { app } from '../Firebase'

import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'




const Edit = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [grid, setGrid] = useState(location.state[0]);
    const [name, setName] = useState(location.state[1].name)
    const [phone, setPhone] = useState(location.state[1].phone)
    const [image, setImage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        //validation
        if (!grid || !name || !phone) {
            alert("All field is required");
            return false
        }

        //update record
        if (image) {
            const db = getDatabase(app);

            //image upload code start
            const storage = getStorage(app)
            const myRef = storageRef(storage, `images/${location.state[0]}`)
            const imageUrl = await getDownloadURL(myRef);
            await uploadBytes(myRef, image)
            //image upload code end 

            const studentRef = ref(db, 'student/' + location.state[0])
            update(studentRef, {
                name: name,
                phone: phone,
                imageUrl: imageUrl
            }).then((res) => {
                alert("Student successfuly Update")
                navigate('/')
            }).catch((err) => {
                console.log(err);
            })
        }else{
            const db = getDatabase(app);
            const studentRef = ref(db, 'student/' + location.state[0])
            update(studentRef, {
                name: name,
                phone: phone
            }).then((res) => {
                alert("Student successfuly Update")
                navigate('/')
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    return (
        <div>
            <Header />
            <div className='view-user'>
                <div className="container">
                    <div className="row">
                        <div className='addbtn d-flex justify-content-end mt-3 mb-3'>
                            <Link to={`/`}>
                                <button type='button' className='btn btn-success'>View</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className='p-5 w-75 shadow' style={{ backgroundColor: "white" }}>
                                    <div className="form-group">
                                        <label htmlFor="email">Grid :- </label>
                                        <input type="number" disabled className="form-control" onChange={(e) => setGrid(e.target.value)} value={grid} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Name :- </label>
                                        <input type="name" className="form-control" onChange={(e) => setName(e.target.value)} value={name} />
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="pwd">Phone :- </label>
                                        <input type="number" className="form-control" onChange={(e) => setPhone(e.target.value)} value={phone} />
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="pwd">Image :- </label>
                                        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" />
                                    </div>

                                    <button type="submit" className="btn btn-primary mt-4">Edit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit
