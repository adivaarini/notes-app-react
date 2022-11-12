/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import NotFound from '../pages/NotFound'
import NotesDetail from '../components/ContentNote/NotesDetail'
import {
  deleteNote,
  unarchiveNote,
  archiveNote,
  getNote,
} from '../utils/network-data'



export default function All() {
  const navigate = useNavigate();
  const init_value = {
    id: "",
    title: "",
    body: "",
    createdAt: "",
    archived: false,
    owner: "",
  };
  const { id } = useParams();
  const updateData = () => {
    getNoteById(id);
  };
  const [result, setResult] = useState(init_value);
  const [isloading, setIsLoading] = useState(false);

  const getNoteById = async (idData) => {
    setIsLoading(true);
    const { data } = await getNote(idData);
    setResult(data);
    setIsLoading(false);
  };

  const archiveNoteHandler = async (data) => {
    await archiveNote(data);
    navigate("/");
  };

  const unarchiveNoteHandler = async (data) => {
    await unarchiveNote(data);
    navigate("/");
  };

  const deleteNoteHandler = async (data) => {
    await deleteNote(data);

    navigate("/");
  };

  useEffect(() => {
    updateData();
  }, [id]);

  if (result === null) {
    return (
      <section>
        <h2>Data Tidak Dapat Ditemukan !</h2>
      </section>
    );
  }

  return (
    <>
      {result === undefined ? (
        <NotFound />
      ) : (
        <NotesDetail
          notes={result}
          loading={isloading}
          onDelete={deleteNoteHandler}
          onArchived={archiveNoteHandler}
          onUnArchived={unarchiveNoteHandler}
        />
      )}
    </>
  );
}
