import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../utils/AuthContext";
const Header = () => {
	const {user, logoutUser} = useAuth()

  return (
    <div className="header">
        <div className="links--wrapper">
            <>
                <Link to="/" className="header--link">Home</Link>
                

                <button onClick={logoutUser} className="btn">Logout</button>
            </>
            {/* <>

                <Link className="btn" to="/login">Login</Link>
            </> */}
            
        </div>
    </div>
  )
}

export default Header