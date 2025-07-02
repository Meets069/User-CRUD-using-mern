import React from 'react';
import {Link} from 'react-router-dom';
import View from './components/View';
import './Home.css';

function Home()
{
    return(
            <>
            <div className='container'>
                

                <Link to="/add" className='add-btn'>Add User</Link>

                <View></View>


                
                
            </div>
            </>
            
    );
}
export default Home;