import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import './style.css'
import { Link ,useNavigate } from 'react-router-dom'
import { collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore'
import { app } from '../Firebase'

const View = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([])

    const getUser = async () => {
        const db = getFirestore(app);
        const data = collection(db, "student")
        const docSnap = await getDocs(data);

        //record fetch firestore
        const record = docSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        setStudents(record)
    }

    const deleteUser = async(id) => {
        const db = getFirestore(app);
        const dataRef = doc(db,"student",id)
        await deleteDoc(dataRef)
        alert("Student successfully delete");
        getUser();
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
                    <h3 align="center">View Student</h3>
                        <table className="p-3 table table-hover shadow">
                            <thead className="table-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    students.map((student,i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{++i}</td>
                                                <td>{student.name}</td>
                                                <td>{student.phone}</td>
                                                <td>
                                                    <button onClick={ () => deleteUser(student.id) } className='btn btn-danger btn-sm m'>Delete</button>
                                                    <button onClick={ ()=>{navigate('/edit',{state:student})} } className='btn btn-primary btn-sm ms-2'>Edit</button>
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
