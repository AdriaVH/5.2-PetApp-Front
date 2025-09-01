import React, { useEffect, useState } from 'react';
import { getPets, deletePet } from '../../api/api';

const PetList = ({ onEdit, refresh }) => {
  const [pets, setPets] = useState([]);

  const fetchPets = async () => {
    try {
      const data = await getPets();
      setPets(data);
    } catch (err) {
      alert('Failed to fetch pets: ' + err.message);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await deletePet(id);
      fetchPets();
    } catch (err) {
      alert('Failed to delete pet: ' + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-w-screen py-10">
      <div className="bg-white px-4 py-6 rounded-lg shadow-md">
  <h2 className="text-lg font-semibold text-gray-700 mb-3">My Pets</h2>
  <ul className="space-y-2">
    {pets.map((pet) => (
      <li
        key={pet.id}
        className="flex justify-between items-center px-2 py-2 border rounded-md bg-gray-50"
      >
        <span className="text-sm">
          {pet.name} ({pet.type}) - Age: {pet.age}
        </span>
        <div className="space-x-1">
          <button
            onClick={() => onEdit(pet)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-2 rounded-md text-sm transition"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(pet.id)}
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md text-sm transition"
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
</div></div>


  );
};

export default PetList;
