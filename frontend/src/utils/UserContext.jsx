import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { URL_API } from './constants';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('authentication-token');
            if (token) {
                try {
                    const response = await axios.get(URL_API + "/users", {
                        headers: {
                            'authentication-token': localStorage.getItem('authentication-token')
                        }
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user data', error);
                }
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
