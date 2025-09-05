import React, { useEffect, useState } from 'react';
import { getPets, deletePet } from '../../api/api';

const PetList = ({ onEdit, refresh }) => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPets = async () => {
    try {
      setIsLoading(true);
      const data = await getPets();
      setPets(data);
    } catch (err) {
      alert('Failed to fetch pets: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePet(id);
      fetchPets();
    } catch (err) {
      alert('Failed to delete pet: ' + err.message);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [refresh]);

  if (isLoading) return null;
  if (!pets.length) return null;

  return (
    <div className="flex items-center justify-center min-w-screen py-20">
      <div className="flex flex-col bg-white px-4 py-4 rounded-lg shadow-2xl shadow-black">
        <h2 className="text-3xl self-center font-bold text-gray-700 mb-5">My Pets</h2>
        <ul className="space-y-3 px-20 w-full">
          {pets.map((pet) => (
            <li key={pet.id} className="flex justify-between w-[300px] items-center px-2 py-2 border rounded-md bg-gray-50">
              <span className="text-sm">
                {pet.name} ({pet.type.replaceAll('_', ' ')}) - Age: {pet.age}
              </span>
              <div className="space-x-1">
                <button onClick={() => onEdit(pet)} className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-2 rounded-md text-sm transition">
                  Edit
                </button>
                <button onClick={() => handleDelete(pet.id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md text-sm transition">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PetList;
