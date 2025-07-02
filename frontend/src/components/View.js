import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Edit from './Edit';
import './View.css';

function View(){

            const [users,setUsers]=useState([]);
            const [editingUser,setEditingUser]=useState(null);

            const fetchUsers= async() =>{

                const result=await axios.get('http://localhost:5000/api/user');
                // axios return the data that's why result.data
                setUsers(result.data); 
            }; 

            useEffect(() =>{
                fetchUsers();
            },[]);

            const startingEditing = (user) => {

                setEditingUser(user);
            };

            const cancelEdit= () => {
                setEditingUser(null);
            };

            const handleUpdate = async(id,updatedData) => {
                await axios.put(`http://localhost:5000/api/user/${id}`,updatedData);
                setEditingUser(null);
                fetchUsers();
            }

            const deleteUser = async(id) => {
                await axios.delete(`http://localhost:5000/api/user/${id}`);
                fetchUsers();
                 alert('User Deleted Successfully');

            };

    return(

        <>
        <div className='container'>
               <h2> List of Users </h2>


               {editingUser && (

                <Edit
                  user={editingUser}
                  onCancel={cancelEdit}
                  onSave={handleUpdate}
                  />
               )}


                <table border="2" className='user-table'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Actions</th>
                            
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (

                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{new Date().getFullYear()-new Date(user.dob).getFullYear()}</td>
                           
                            <td className='actions'>
                                    <button onClick={() =>deleteUser(user._id)} className='delete-btn'> Delete</button> {' '}
                                    <button onClick={() =>startingEditing(user)} className='edit-btn'> Edit</button>
                            </td>
                            
                        </tr>
                    
                        ))}
                    </tbody>

                </table>

        </div>
        </>
    );
}
export default View;