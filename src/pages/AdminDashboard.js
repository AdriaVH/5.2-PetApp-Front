import React from 'react';
import PetList from '../components/pets/PetList';

export const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Pets (Admin)</h1>
      <PetList />
    </div>
  );
};
