import React, { useState } from 'react'
import Header from '../component/Header'
import './style.css'
import { Link } from 'react-router-dom'

import {getDatabase,ref,set} from 'firebase/database'
import { app } from '../Firebase'

import {getStorage, ref as storageRef,uploadBytes,getDownloadURL} from 'firebase/storage'

const Add = () => {

    const [grid,setGrid] = useState("");
    const [name,setName] = useState("")
    const [phone,setPhone] = useState("")
    const [image,setImage] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault();

        //file upload code start
        const storage = getStorage(app);
        const myRef = storageRef(storage,`images/${grid}`)
        await uploadBytes(myRef,image)
        const imageUrl = await getDownloadURL(myRef)
         //file upload code end

        //validation
        if(!grid || !name || !phone){
            alert("All field is required");
            return false
        }

        //add record
        const db = getDatabase(app);
        set(ref(db,'student/'+grid),{
            name : name,
            phone : phone,
            imageUrl : imageUrl
        })

        alert("Student successfuly add")
        setGrid(" ")
        setName(" ")
        setPhone(" ")
       
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
                                <div className='p-5 w-75 shadow' style={{backgroundColor:"white"}}>
                                    <div className="form-group">
                                        <label htmlFor="email">Grid :- </label>
                                        <input type="number" className="form-control" onChange={ (e) => setGrid(e.target.value) }/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Name :- </label>
                                        <input type="name" className="form-control" onChange={ (e) => setName(e.target.value) }/>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="pwd">Phone :- </label>
                                        <input type="number" className="form-control" onChange={ (e) => setPhone(e.target.value) }/>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="pwd">Image :- </label>
                                        <input type="file" onChange={ (e) => setImage(e.target.files[0]) } className="form-control"/>
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

export default Add
