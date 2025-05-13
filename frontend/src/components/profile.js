import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
const { user, dispatch } = useAuthContext();
const navigate = useNavigate();

const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/'); // Redirect to login page after logging out
};

if (!user) {
    // If no user is logged in, you can return early or show a message
    return <p>Please log in to view your profile.</p>;
}

return (
    <div>
    <h2>Hello, {user.firstName}</h2>
    <p>Email: {user.email}</p>
    <button onClick={handleLogout}>Logout</button>
    </div>
);
};

export default Profile;