import React, { useContext, useEffect, useState } from 'react';
import { create } from 'ipfs-http-client';
import axios from 'axios';
import UserContext from '../UserContext';
import QRCode from "react-qr-code";
import Modal from './Modal';
import FoldeIcon from './Folder';
import CopyIcon from './Copy'
import Dhpid from './Id';
import RecordTitle from './HealthRecordTitle';

const Holder = () => {
    const userContext = useContext(UserContext);


    const [publicKey, setPublicKey] = useState(null);
    const [hashKey, sethashKey] = useState("");
    const [ipfsKey, setipfsKey] = useState(null);
    const [user, setUser] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [qrcodeDisplay, setQrcodeDisplay] = useState(false);
    const [currentViewingDoc, setCurrentViewingDoc] = useState(null)
    useEffect(() => {
        console.log("holder js effect")
        if (userContext && userContext.length > 0) {
            const user = userContext.filter(x => x.userType == 'HOLDER')[0];
            setUser(user);
            setPublicKey(user.publicKey)
        }

        // Update the document title using the browser API

    }, [userContext]);

    useEffect(() => {
        if (!user.hasOwnProperty('publicKey'))
            return;
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
            .then(res => {
                if (res && res.data && res.data.data.file) {
                    const url = `https://ipfs.infura.io/ipfs/${res.data.data.file}`;
                    setipfsKey(url);
                    setCurrentViewingDoc(url)
                }
            })
    }

    const generateQRCode = (e) => {
        e.preventDefault();
        setQrcodeDisplay(true)

    }

    const onClosingQR = (e) => {
        e.preventDefault();
        setQrcodeDisplay(false);
    }


    return (<div>


        <div className='container'>
            <div className='col-md-6 offset-md-3'>
                <div className='row'>
                    <div className='m-4'>
                        <h1 className=' text-center text-success'>Holder</h1>
                        <p className="dhpid "> <Dhpid publicKey={publicKey}  /></p>
                    </div>
                    <div className=''>
                        <RecordTitle title="Health Records" />
                    </div>
                </div>

                <ul className="list-group">
                    {transactions.length > 0 ? transactions.map((x) => {
                        return <li key={x.id} className="list-group-item"><a className='link' role="button" onClick={getAsset}>{x.id}</a></li>
                    }) : <div className='alert alert-warning'>No Records found</div>}
                </ul>
                {ipfsKey && <div className=''>
                    <h6 className='mt-3 mb-3'> Health Reports:
                        <span className='share' onClick={generateQRCode}> <button className='btn btn-sm btn-primary'>Share</button> </span>
                    </h6>
                    {
                        qrcodeDisplay && <Modal onModalClose={onClosingQR} title="Report/Document">
                            <QRCode value={currentViewingDoc} />
                        </Modal>
                    }
                    <div className="row " style={{ height: '500px' }}>
                        <iframe className="col-lg-12 col-md-12 col-sm-12" src={ipfsKey}></iframe>
                    </div>
                </div>}
            </div>
        </div>
    </div>)
}

export default Holder;