import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Home';
import Add from './components/Add';
import View from './components/View';
import Edit from './components/Edit';
import './Home.css';

function App() {

  return (
    
    <>
        <center> <h1 className='title'> User Crud </h1> </center>
        <BrowserRouter>
            <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/add' element={<Add/>}/>
                  <Route path='/view' element={<View/>}/>
                   <Route path='/edit' element={<Edit/>}/>
            </Routes>
       </BrowserRouter>
    
    
    </>
  );
}

export default App;
