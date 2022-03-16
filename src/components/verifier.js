import React, { useEffect, useState } from 'react';
import { create } from 'ipfs-http-client';
import axios from 'axios';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";


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
                    <div className='m-4'>
                        <h1 className=' text-center text-success'>MCI Airport</h1>
                        <p className=" ">public key: {publicKey}</p>
                    </div>

                    <div className='text-center '>
                        <button className='btn btn-md btn-primary' onClick={onStartScanning}>Start Scanning</button>

                        { displayScanner &&
                                <>
                                     <BarcodeScannerComponent
                            width={500}
                            height={500}
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
             <div className=''>
             <h6>Health Report:</h6>
             <div className="row " style={{ height: '500px' }}>
                 <iframe className="col-lg-12 col-md-12 col-sm-12" src={data}></iframe>
             </div>
         </div>
        }
        </div>
    </div>)
}

export default Verifier;