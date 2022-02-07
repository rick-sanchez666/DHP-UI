
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

function App() {
  return (
    <div className='m-2' >

<Router>
      <div>
      <div className=' d-flex align-items-center justify-content-center'>
        <ul className='d-flex  list-unstyled'>
          <li className='p-2'><a href='/holder'>Holder</a></li>
          <li className='p-2'><a href='/'>Issuer</a></li>
          <li className='p-2'><a href='/verifier'>Verifier</a></li>
        </ul>
      </div>
        <Routes>
         
            <Route exact path='/' element={<Issuer/>}/>
       
          <Route exact path='/verifier' element={<Verifier/>}/>
          <Route exact path='/holder' element={<Holder/>}/>
        </Routes>
      </div>
    </Router>
    


    
    </div>
  );
}

export default App;
