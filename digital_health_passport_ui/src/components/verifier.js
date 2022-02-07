import React, { useEffect, useState } from 'react';
import { create } from 'ipfs-http-client';
import axios from 'axios';


const Verifier = () => {


    const [publicKey, setPublicKey] = useState(null);
    const [hashKey, sethashKey] = useState("");
    const [user, setUser] = useState(null);
    const [ipfsKey, setipfsKey] = useState();

    useEffect(() => {
        // Update the document title using the browser API
        axios.get(`https://dhp-server.herokuapp.com/allusers`)
            .then(res => {
                const user = res.data.filter(x => x.userType == 'VERIFIER')[0];
                console.log(user)
                setUser(user);
                setPublicKey(user.publicKey)
            })
    }, []);

    const onInputHandler = (event) => {
        sethashKey(event.target.value);
    }


    const getTransaction = async () => {
        axios.get(`https://dhp-server.herokuapp.com/transaction/${hashKey}`)
            .then(res => {
                const data = res.data;
                console.log(data.data.file);
                const url = `https://ipfs.infura.io/ipfs/${data.data.file}`;
                setipfsKey(url)
            })
    }



    return (<div>


        <div className='container'>
            <div className='col-md-6 offset-md-3'>
                <div className='row'>
                    <div className='m-4'>
                        <h1 className=' text-center text-success'>MCI Airport</h1>
                        <p className=" ">public key: {publicKey}</p>
                    </div>

                    <div>
                        <input type="search" id="form1" className="form-control" value={hashKey} onInput={onInputHandler} placeholder='hash key of document' />

                    </div>


                    <div className='text-end mt-2'>
                        <button type="button" disabled={hashKey == ''} className={hashKey == null ? 'btn btn-secondary' : 'btn btn-primary'} onClick={getTransaction} >Search</button>
                    </div>




                </div>

            </div>

            <div className=''>

                <h6>Health Report:</h6>


                <div className="row " style={{height:'500px'}}>
                    <iframe className="col-lg-12 col-md-12 col-sm-12" src={ipfsKey}></iframe>
                </div>

            </div>



        </div>




    </div>)
}

export default Verifier;