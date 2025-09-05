import React, { useState, useEffect } from 'react';
import { createPet, updatePet } from '../../api/api';

const PET_TYPES = [
  "DOG",
  "CAT",
  "FERRET",
  "RABBIT",
  "GUINEA_PIG",
  "HAMSTER",
  "ORNAMENTAL_FISH",
  "BIRD_OF_PREY"
];

const PetForm = ({ petToEdit, onSave }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState(PET_TYPES[0]);
  const [age, setAge] = useState('');

  useEffect(() => {
    if (petToEdit) {
      setName(petToEdit.name);
      setType(petToEdit.type);
      setAge(petToEdit.age);
    } else {
      setName('');
      setType(PET_TYPES[0]);
      setAge('');
    }
  }, [petToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (petToEdit) await updatePet(petToEdit.id, { name, type, age });
      else await createPet({ name, type, age });
      onSave?.();
    } catch (err) {
      alert('Failed to save pet: ' + err.message);
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="w-1/3 bg-white px-4 py-5 rounded-md shadow-2xl shadow-black">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">{petToEdit ? 'Edit Pet' : 'Add Pet'}</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full mb-2 px-2 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"/>
        <select value={type} onChange={(e) => setType(e.target.value)} required className="w-full mb-2 px-2 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
          {PET_TYPES.map((petType) => (
            <option key={petType} value={petType}>{petType.replaceAll('_', ' ')}</option>
          ))}
        </select>
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required className="w-full mb-3 px-2 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"/>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-sm transition">{petToEdit ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default PetForm;
