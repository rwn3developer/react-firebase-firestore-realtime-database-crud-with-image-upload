import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import './style.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {collection,addDoc,getFirestore, doc, updateDoc} from 'firebase/firestore'
import { app } from '../Firebase'

const Edit = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [grid,setGrid] = useState("")
    const [name,setName] = useState("")
    const [phone,setPhone] = useState("")

    const handleSubmit = async(e) => {
       e.preventDefault();
       const db = getFirestore(app)
       const docRef = doc(db,"student",location.state.id);
       await updateDoc(docRef,{
            name : name,
            phone : phone
       })
      alert("Student successfully Update");
      navigate('/');
      
      setGrid("")
      setName("")
      setPhone("")
    }

    useEffect(()=>{
        setGrid(location.state.grid)
        setName(location.state.name)
        setPhone(location.state.phone)
    },[location.state])

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
                                <div className='p-5 w-75 shadow' style={{backgroundColor:"white"}}>
                                <h3 align="center">Edit Student</h3>
                                    <div className="form-group">
                                        <label htmlFor="email">Grid :- </label>
                                        <input type="text" disabled onChange={ (e) => setGrid(e.target.value) } value={grid} className="form-control" id="email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Name :- </label>
                                        <input type="text" onChange={ (e) => setName(e.target.value) } value={name} className="form-control" id="email" />
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="pwd">Phone :- </label>
                                        <input type="number" onChange={ (e) => setPhone(e.target.value) } value={phone} className="form-control" id="pwd" />
                                    </div>
                                   
                                    <button type="submit" className="btn btn-primary mt-4">Submit</button>
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
