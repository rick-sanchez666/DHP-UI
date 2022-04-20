import './App.css';
import { Route, BrowserRouter as Router, Routes, useNavigate, Redirect, Navigate  } from 'react-router-dom';
import NavBar from './components/Header';
import IssuerSignupForm from './components/Registration';
import LoginForm from './components/Login';
import IssuerHome from './components/IssuerHome';
import AddReportForm from './components/AddReport';
import SuccessBanner from './components/UploadSucces';
import VerifyDoc from './components/VerifyDoc';
import AuthContext from './services/auth-context';
import React,{ useContext, useEffect, useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import { Button, Result } from 'antd';


function App() {
const authContext = useContext(AuthContext);
const userRole = authContext.user && authContext.user['role']
  return (
      <div className="App">
          <NavBar /> 
          <main>
            <Routes>
                <Route exact path='/signup' element={<IssuerSignupForm />} />
                <Route exact path='/login' element={<LoginForm />} />
                {
                  userRole === "ISSUER" ?
                  <Route path="/" element={<ProtectedRoute role="ISSUER" element={<IssuerHome />} redirectPath="/login"/>}/>
                  :
                  <Route path="/" element={<ProtectedRoute role="VERIFIER" element={<VerifyDoc />} redirectPath="/login"/>}/>          
                }
                <Route path="/addreport" element={<ProtectedRoute role="ISSUER" element={<AddReportForm />} redirectPath="/login"/>}/>
                <Route path="/success" element={<ProtectedRoute role="ISSUER" element={<SuccessBanner />} redirectPath="/login"/>}/>
                <Route path="*" element={ <Result
                          status="404"
                          title="404"
                          subTitle="Sorry, the page you visited does not exist."
                          extra={<Button type="primary">Back Home</Button>}
                />} /> 
            </Routes>
          </main>
        <footer></footer>
      </div>
  );
}

export default App;
