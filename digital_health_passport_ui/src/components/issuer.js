import React, { useEffect, useState } from 'react';
import { create } from 'ipfs-http-client';
import axios from 'axios';

const Issuer = () => {

    const [file, setFile] = useState(null);
    const [publicKey, setPublicKey] = useState(null);
    const [hashKey, sethashKey] = useState("");
    const [user, setUser] = useState(null)
    const [reciverPublicKey, setReciverPublicKey] = useState();

    useEffect(() => {
        // Update the document title using the browser API
        axios.get(`https://dhp-server.herokuapp.com/allusers`)
            .then(res => {
                const user = res.data.filter(x => x.userType == 'ISSUER')[0];
                console.log(user)
                setUser(user);
                setPublicKey(user.publicKey)
            })
    }, []);


    // On file select (from the pop up)
    const onFileChange = (event) => {
        // Update the state
        setFile(event.target.files[0]);
    };


    const receiverHandler = (event) => {
        setReciverPublicKey(event.target.value);
    }
    const onFileUpload = async () => {

        // here the address to upload a file 
        const client = await create('https://ipfs.infura.io:5001/api/v0');

        // uploading data
        const cid = client.add(file)

        //returns a promice , path has the hash key
        cid.then(result => {
            const url = `https://ipfs.infura.io/ipfs/${result.path}`
            sethashKey(url)

           const creatTransaction= { 

                "senderUserID": user._id, 
             
                "fileHash": result.path, 
             
                "metaData": publicKey, 
             
                "receiverPublicKey":publicKey, 
             
                "receiverUserId": "62005b5c50798ca67025659c" 
             
             }
             
             axios.post('https://dhp-server.herokuapp.com/create',creatTransaction).then(x=>{
               console.log( x.data);
             })

        })
    }



    return (<div>


        <div className='container'>
            <div className='col-md-6 offset-md-3'>
                <div className='row'>
                    <div className='m-4'>
                        <h1 className=' text-center text-success'>NWMSU Wellness Services</h1>
                        <p className=" ">public key: {publicKey}</p>
                    </div>
                    <div className='mb-2'>

                        <label class="form-label" htmlFor="healthRecord">Upload Health Record</label>
                        <input type="file" className="form-control" onChange={onFileChange} id="healthRecord" />
                    </div>
                    <div className=''>
                        <label class="form-label" htmlFor="patientKey">Patient Key</label>
                        <input type='text' className='form-control' value={reciverPublicKey} onInput={receiverHandler} id='patientKey' placeholder='Patient public key' />
                    </div>
                    <div className='text-end mt-2'>
                        <button type="button" disabled={file == null} className={file == null ? 'btn btn-secondary' : 'btn btn-primary'} onClick={onFileUpload} >Upload</button>
                    </div>

                    <div>
                        <h6>Hash Key of the file:</h6>
                        <a href={hashKey}>{hashKey}</a>

                    </div>

                </div>

            </div>



        </div>




    </div>)
}

export default Issuer;