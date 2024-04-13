import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import { app } from '../Firebase'

//record get library
import { getDatabase, onValue, ref, remove } from 'firebase/database'

//record delete library
import {getStorage,ref as storageRef,deleteObject} from 'firebase/storage'


const View = () => {

    const [studentData, setStudentData] = useState("");
    const navigate = useNavigate();

    const getUser = () => {
        const db = getDatabase(app);
        const studentRef = ref(db, 'student');
        onValue(studentRef, (snapshot) => {
            const data = snapshot.val();
            setStudentData(data)
        })
    }

    const deleteRecord = (id) => {
        const db = getDatabase(app);

        //image remove firebase storage
        const storage = getStorage(app)
        
        const studentRef = ref(db,'student/'+id);
        const myRef = storageRef(storage,`images/`+id);
        deleteObject(myRef)
        .then(res => {
            remove(studentRef)
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <div>
            <Header />
            <div className='view-user'>
                <div className="container">
                    <div className="row">
                        <div className='addbtn d-flex justify-content-end mt-3 mb-3'>
                            <Link to={`/add`}>
                                <button type='button' className='btn btn-success'>Add</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <table className="p-3 table table-hover shadow">
                            <thead className="table-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    studentData && Object.entries(studentData).map(([key, value]) => {
                                        return (
                                            <tr>
                                                <td>{key}</td>
                                                <td>{value.name}</td>
                                                <td>{value.phone}</td>
                                                <td>
                                                    <img src={value.imageUrl} width="100"/>
                                                </td>
                                                <td>
                                                    <button onClick={ () => deleteRecord(key) } className='btn btn-danger btn-sm m'>Delete</button>
                                                   
                                                        <button onClick={ () => navigate(`edit`,{state : [key,value]}) } className='btn btn-primary btn-sm ms-2'>Edit</button>
                                                   
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default View
