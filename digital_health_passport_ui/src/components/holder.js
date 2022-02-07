import React, { useContext, useEffect, useState } from 'react';
import { create } from 'ipfs-http-client';
import axios from 'axios';
import UserContext from '../UserContext';

const Holder = () => {
    const userContext = useContext(UserContext);


    const [publicKey, setPublicKey] = useState(null);
    const [hashKey, sethashKey] = useState("");
    const [ipfsKey, setipfsKey] = useState(null);
    const [user, setUser] = useState({});
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        console.log("holder js effect")
        if(userContext && userContext.length > 0) {
            const user = userContext.filter(x => x.userType == 'HOLDER')[0];
            setUser(user);
            setPublicKey(user.publicKey)
        }
       
        // Update the document title using the browser API
       
    }, [userContext]);

    useEffect(() => {
        axios.get(`https://dhp-server.herokuapp.com/search/${user.publicKey}`)
        .then(r => {
            const txData = r.data;
            console.log(txData)
            setTransactions(txData);
        })
    }, [user])


    const getAsset = (event) => {
        event.preventDefault();
        let id = event.target.innerText;
        axios.get(`https://dhp-server.herokuapp.com/transaction/${id}`)
        .then( res => {
            if(res && res.data && res.data.data.file) {
                const url = `https://ipfs.infura.io/ipfs/${res.data.data.file}`;
                setipfsKey(url)
            }
        })
    }


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
                        return <li key={x.id} className="list-group-item"><a className='link' role="button" onClick={getAsset}>{x.id}</a></li>
                    }) : "...Loading"}
                </ul>
               {ipfsKey && <div className=''>
                    <h6>Health Report:</h6>
                    <div className="row " style={{height:'500px'}}>
                        <iframe className="col-lg-12 col-md-12 col-sm-12" src={ipfsKey}></iframe>
                    </div>
                 </div> }
            </div>
        </div>
    </div>)
}

export default Holder;