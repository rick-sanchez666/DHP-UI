import { Button, Col, Empty, PageHeader, Row } from "antd";
import React, { useEffect, useState } from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { getAFile } from "../util/api";

const VerifyDoc = props => {
    const [data, setData] = useState(null);
    const [displayScanner, setDisplayScanner] = useState(false);
    const [file, setFile] = useState(null);
    useEffect(() => {
        // Update the document title using the browser API
       getAFile(data)
       .then( res => {
           console.log(res.data);
           setFile(res.data.url);
           setDisplayScanner(false);
       })
    }, [data]);


    const onStartScanning = (e) => {
        e.preventDefault();
        setDisplayScanner(true)
    }


    const onStopScanning = (e) => {
        e.preventDefault();
        setDisplayScanner(false)
    }

    return (
        <section>
            {/* <PageHeader
                className="verifier-page-header"
                title="Welcome!" /> */}
            <Row>
                <Col span={8}>
                    <div className="scan-section">
                     <div className="scan">
                        { displayScanner &&
                             <BarcodeScannerComponent
                             width={300}
                             height={300}
                             onUpdate={(err, result) => {
                                 if (result) {
                                     setData(result.text);
                                     setDisplayScanner(false);
                                 } 
                             //    else setData('Not Found')
                             }}
                         /> 
                        }
                           
                            <span> <Button type="primary" onClick={onStartScanning}>Scan QR</Button>
                            <Button type="danger" disabled={!displayScanner} onClick={onStopScanning} >Stop Scan</Button>
                            </span>
                        </div> 
                        <div>
                            <span> <Button disabled type="primary">Approve</Button></span>
                            <Button disabled type="danger">Decline</Button>
                        </div>
                    </div>


                </Col>
                <Col span={16}>
                    <h2 style={{ 'textAlign': 'center', marginTop: '1rem' }}>Health Report:</h2>
                    <div className="result" style={{ height: '500px' }}>
                        { !file && <Empty description="Scan to view the document" /> }
                        {file &&  <iframe style={{"width": "100%", "height": "100%"}} src={file}></iframe> }
                    </div>
                </Col>
            </Row>
        </section>
    )
}

export default VerifyDoc;