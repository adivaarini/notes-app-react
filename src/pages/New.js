import React from 'react'
import { useNavigate } from 'react-router-dom'
import ActionNew from '../components/NewNotes/ActionNew'
import { addNote } from '../utils/network-data'

export default function New() {
  const navigate = useNavigate();

  const addNotesHandler = async (data) => {
    await addNote(data);
    navigate("/");
  };

  return (
    <>
      <ActionNew addNotes={addNotesHandler} />
    </>
  );
}
