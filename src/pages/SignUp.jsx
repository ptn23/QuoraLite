import { useState } from 'react'
import { useNavigate } from 'react-router';
import { supabase } from '../client'

const SignUp = () => {

    const [user, setUser] = useState({
        'email': '',
        'username': '',
        'password': ''
    });

    const handleChange = (event) => {
        const {name, value} = event.target
        setUser( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createUser = async(event) => {
        event.preventDefault();
        const {data, error} = await supabase.from('users').insert([{
            email: user.email,
            username: user.username,
            password: user.password
        }]).select();
        if (error) {
            console.error('Error creating user:', error.message);
            alert('Error creating user: ' + error.message);
        } 
        else {
            window.location = '/';
        }
    }
    return  (
        <>
        <form onSubmit={createUser}>
            <label htmlFor="email">Email</label> <br />
            <input type="email" id="email" name="email" value={user.email} onChange={handleChange} required/>
            <br />
            <br/>

            <label htmlFor="username"> Username </label> <br/>
            <input type="text" id="username" name="username" value={user.username} onChange={handleChange}></input>
            
            <br/>

            <label htmlFor="password"> Password </label> <br/>
            <input type="password" id="password" name="password" value={user.password} onChange={handleChange}></input>
            <br/>

            <button type="submit"> Create Account</button>
        </form>   
        </>
    )
}
export default SignUp;