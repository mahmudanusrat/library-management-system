import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user, loading } = useAuth();
    
    return (
        <div className="shadow-lg rounded-2xl max-w-md mx-auto w-full">
        <div className="p-8 text-center">
          <div className="justify-center">
            <Link to="/">
              <img
                alt="profile"
                src={user.photoURL}
                className="object-cover rounded-full h-32 w-32 mx-auto border-4 border-gray-300"
              />
            </Link>
          </div>
          <div className="mt-6">
            <p className="text-2xl font-semibold">{user.displayName}</p>
            <p className="text-lg font-extralight">
              <span className="font-semibold">Email: </span> {user.email}
            </p>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;