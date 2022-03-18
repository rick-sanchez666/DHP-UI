import React, { useEffect, useState } from 'react';
import { create } from 'ipfs-http-client';
import axios from 'axios';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import Dhpid from './Id';
import RecordTitle from './HealthRecordTitle';


const FileIcon = props => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"  width="16px" height="16px" viewBox="0 0 384 512"><path d="M0 64C0 28.65 28.65 0 64 0H224V128C224 145.7 238.3 160 256 160H384V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64zM256 128V0L384 128H256z"/></svg>
    )
}

const Verifier = () => {


    const [publicKey, setPublicKey] = useState(null);
    const [hashKey, sethashKey] = useState("");
    const [user, setUser] = useState(null);
    const [ipfsKey, setipfsKey] = useState();
    const [data, setData] = React.useState('Not Found');
    const [displayScanner, setDisplayScanner] = useState(false);

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

    const onStartScanning = (e) => {
        e.preventDefault();
        setDisplayScanner(true)
    }



    return (<div>


        <div className='container'>
            <div className='col-md-6 offset-md-3'>
                <div className='row'>
                    <div>
                        <h1 className=' text-center text-success'>Verifier</h1>
                        <p className="text-center"><Dhpid publicKey={publicKey}  /></p>
                    </div>

                    <div className='text-center '>
                        <button className='btn btn-md btn-primary' onClick={onStartScanning}>Start Scanning</button>

                        { displayScanner &&
                                <>
                                     <BarcodeScannerComponent
                            width="100%"
                            height="100%"
                            onUpdate={(err, result) => {
                                if (result) {
                                    setData(result.text);
                                    setDisplayScanner(false);
                                } 
                                else setData('Not Found')
                            }}
                        />
                        <p>{data}</p>
                                </>
                        }
                       
                    </div>
                </div>

            </div>

        {
            data!="Not Found" &&
             <div className='verifier-record'>
              <RecordTitle title="Health Record"> <FileIcon /> </RecordTitle>
             <div className="row " style={{ height: '500px' }}>
                 <iframe className="col-lg-12 col-md-12 col-sm-12" src={data}></iframe>
             </div>
         </div>
        }
        </div>
    </div>)
}

export default Verifier;