import React,{useState} from 'react';
import './Edit.css';
import './Form.css';


function Edit({user,cancelEdit,onSave})
{
    const [updatedUser,setUpdatedUser]=useState({
        username:user.username,
        email:user.email,
        dob:user.dob ? user.dob.split('T')[0] : '',
    });
    const [errors,setErrors]=useState({
        username:'',
        email:'',
        dob:'',
    })
    const handleChange= (e) => {
        const{name,value}=e.target;
        setUpdatedUser((prev) =>({
            ...prev,
            [name]:value
        }));

        setErrors((prev) => ({
            ...prev,[name]:''
        }))
    };

    const handleBlur = (e) => {
    const { name, value } = e.target;
    const updatedErrors = { ...errors };


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




    const handleSubmit= (e) => {
        e.preventDefault();
        onSave(user._id,updatedUser);
        alert('User edited');
    };

    return(
        <div className="modal-overlay">
            <div className="modal-content">

            <form onSubmit={handleSubmit}>
                <div className='form-field'>
                <label>Username : </label>
                <input
                name="username"
                placeholder="Enter Username"
                value={updatedUser.username}
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
                value={updatedUser.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                />
                </div>
                <div className='form-error'> {errors.email} </div>
                <br/> 

                <div className='form-field'>
                <label>DOB : </label>
                <input
                type="date"
                name="dob"
                placeholder="Enter DOB"
                value={updatedUser.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                />
                </div>
                <div className='form-error'> {errors.dob} </div>
                <br/> 

                <button type="submit"> Add</button>

                <button type="button" onClick={cancelEdit}> Reset</button>
            </form>
            </div>
        </div>
    );
}
export default Edit;
