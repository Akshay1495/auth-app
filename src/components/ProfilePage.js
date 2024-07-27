// src/components/ProfilePage.js
import React, { useEffect, useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.id) {
        try {
          const response = await fetch(`https://dummyjson.com/users/${storedUser.id}`);
          const data = await response.json();
          console.log('User Data:', data);
          localStorage.setItem('userDetails', JSON.stringify(data));
          setUser(data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h2>Profile Information</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>Gender:</strong> {user.gender}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
    </div>
  );
};

export default ProfilePage;
