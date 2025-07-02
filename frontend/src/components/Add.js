import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Form.css';

function Add(){

    const navigate=useNavigate();
    const [newUser,setNewUser]=useState({
        username:'',
        email:'',
        dob:'',
    })

    const [errors,setErrors]=useState({
        username:'',
        email:'',
        dob:'',
    })

    
    const handleChange= (e) => {
        const{name,value}=e.target;
        setNewUser((prev) =>({
            ...prev,
            [name]:value
        }));

        setErrors((prev) => ({
            ...prev,[name]:''
        }))
    };

    const handleBlur = async(e) =>{
        const {name,value}=e.target;
        const updatedErrors={...errors};

        if(name === 'username')
        {
            if(value.trim() === '')
            {
                updatedErrors.username='Username is required';
            } 
            else if (value.trim().length < 3) 
            {
                updatedErrors.username = 'Min 3 characters required';
            } 
            else 
            {
                 updatedErrors.username = '';
            }
        }    

        
        if(name === 'email')
        {
                if(value.trim() === '')
                {
                    updatedErrors.email='Email is required';
                } 
                else if (value.indexOf('@') < 3 || value.indexOf('.') - value.indexOf('@') < 5 ||  value.split('.').pop().length < 3)
                {
                    updatedErrors.email = 'Email must be in proper format: atleast 3 letters before @,4 letters after after @ and atleast 3 letters after .eg(abc@gamil.com';
                } 
                else 
                {
                    updatedErrors.email = '';
                }
            }        

            if(name === 'dob')
            {
                const selectedDate=new Date(value);
                const today = new Date();
                if(value === '')
                {
                    updatedErrors.dob='Date of Birth is required';
                } 
                else if (selectedDate > today) 
                {
                    updatedErrors.dob = 'Future date not allowed';
                } 
                else 
                {
                    updatedErrors.dob = '';
                }


            }    
         setErrors(updatedErrors);   
    }



    const handleSubmit =  async(e) =>{
        e.preventDefault();

        await axios.post('http://localhost:5000/api/user',newUser);

        alert('User added Successfully');

        setNewUser({username:'',email:'',dob:''});
        navigate('/');

    }
        
    return(
        <div className="form conatiner">
            <center> <h1> Add User </h1> </center>

            <form onSubmit={handleSubmit}>
                <div className='form-field'>
                <label>Username : </label>
                <input
                name="username"
                placeholder="Enter Username"
                value={newUser.username}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                />
                </div>
                <div className='form-error'> {errors.username} </div>
                <br/>

                

                <div className='form-field'>
                <label>Email : </label>
                <input
                name="email"
                placeholder="Enter Email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser,email:e.target.value})}
                onBlur={handleBlur}
                required
                />
                </div>
                <div className='form-error'> {errors.email}</div>
               
               <br/>

                <div className='form-field'>
                <label>DOB : </label>
                <input
                type="date"
                name="dob"
                placeholder="Enter DOB"
                value={newUser.dob}
                onChange={(e) => setNewUser({...newUser,dob:e.target.value})}
                onBlur={handleBlur}
                required
                />
                </div>
                    <div className='form-error'> {errors.dob}</div>
                <br/> 

                <button type="submit"> Add</button>

                <button type="button" onClick={(e) => setNewUser({username:'',email:'',dob:''})}> Reset</button>



            </form>

        </div>

    );
}

export default Add;