import React, { useState } from 'react';
import PetForm from '../components/pets/PetForm';
import PetList from '../components/pets/PetList';

function Dashboard() {
  const [editingPet, setEditingPet] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleSave = () => {
    setEditingPet(null);
    setRefresh((prev) => !prev);
  };

  return (
    <div className="dashboard-custom-bg">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">My Virtual Pets</h1>
        <PetForm petToEdit={editingPet} onSave={handleSave} />
        <PetList onEdit={setEditingPet} refresh={refresh} />
      </div>
    </div>
  );
}

export { Dashboard };