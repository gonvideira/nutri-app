import { auth } from '../utilities/firebase';
import { useNavigate } from 'react-router-dom';

// Custom hook for sign out and navigation
const useSignOut = () => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            navigate("/"); // Redirect after signing out
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return handleSignOut;
};

export default useSignOut;
