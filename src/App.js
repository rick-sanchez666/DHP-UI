
import './App.css';
import Issuer from './components/issuer';
import {
  BrowserRouter as Router,
  Fragment,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Holder from './components/holder';
import Verifier from './components/verifier';
import UserContext from './UserContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [users, setUsers]  = useState([]);

  useEffect(() => {
    console.log("app js effect")
    // Update the document title using the browser API: change
    axios.get(`https://dhp-server.herokuapp.com/allusers`)
      .then(res => {
        console.log("data received")
        setUsers(res.data);
      })
  }, []);

  return (
    <div className='m-2'>
      <Router>
        <div>
          <div className=' d-flex align-items-center justify-content-center'>
            <ul className='d-flex  list-unstyled'>
              <li className='p-2'><a href='/holder'>Holder</a></li>
              <li className='p-2'><a href='/'>Issuer</a></li>
              <li className='p-2'><a href='/verifier'>Verifier</a></li>
            </ul>
          </div>
          <UserContext.Provider value={[...users]}>
            <Routes>
              <Route exact path='/' element={<Issuer />} />
              <Route exact path='/verifier' element={<Verifier />} />
              <Route exact path='/holder' element={<Holder />} />
            </Routes>
          </UserContext.Provider>
        </div>
      </Router>
    </div>
  );
}

export default App;
