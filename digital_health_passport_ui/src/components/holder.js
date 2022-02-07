import React, { useEffect, useState } from 'react';
import { create } from 'ipfs-http-client';
import axios from 'axios';

const Holder = () => {


    const [publicKey, setPublicKey] = useState(null);
    const [hashKey, sethashKey] = useState("");
    const [user, setUser] = useState({});
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Update the document title using the browser API
        axios.get(`https://dhp-server.herokuapp.com/allusers`)
            .then(res => {
                const user = res.data.filter(x => x.userType == 'HOLDER')[0];
                console.log(user)
                setUser(user);
                setPublicKey(user.publicKey)
                axios.get(`https://dhp-server.herokuapp.com/search/31LQ5RrKKtzxUGFQWTLq8Jg7PRHkntcmm4KdMqA3hqq9`)
                    .then(r => {
                        const txData = r.data;
                        console.log(txData)
                        setTransactions(txData);

                    })
            })


    }, []);






    return (<div>


        <div className='container'>
            <div className='col-md-6 offset-md-3'>
                <div className='row'>
                    <div className='m-4'>
                        <h1 className=' text-center text-success'>Holder</h1>
                        <p className=" ">public key: {publicKey}</p>
                    </div>
                    <div className=''>
                        <label className="form-label">Health Records</label>
                    </div>
                </div>

                <ul className="list-group">
                    {transactions.length > 0 ? transactions.map((x) => {
                        return <li key={x.id} className="list-group-item"><a href={x.id}>{x.id}</a></li>
                    }) : "...Loading"}
                </ul>
            </div>
        </div>
    </div>)
}

export default Holder;