import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import NotesApp from '../components/DetailNotes/NotesApp'
import ActionSearch from '../components/SearchMenu/ActionSearch'
import { BiListPlus } from 'react-icons/bi'
import { getActiveNotes } from '../utils/network-data'

import LanguangeContext from '../contexts/LanguangeContext'

export default function Home() {
  const { languange } = useContext(LanguangeContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const changeSearchParams = (keyword) => {
    setFilterNotes(keyword);
    setSearchParams({ keyword });
  };

  const [notes, setNotes] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const getDataNotes = async () => {
    setIsLoading(true);
    const { data } = await getActiveNotes();
    setNotes(data);
    setIsLoading(false);
  };

  const [filterNotes, setFilterNotes] = useState(keyword || "");

  const navigate = useNavigate();

  const resultNotes = notes.filter((e) =>
    (e.title || "").toLowerCase().includes(filterNotes.toLowerCase())
  );

  useEffect(() => {
    getDataNotes();
  }, []);

  return (
    <>
      <ActionSearch
        title={languange === "en" ? "Active" : "Aktif"}
        keyword={filterNotes}
        keywordChange={changeSearchParams}
      />
      <NotesApp data={resultNotes} loading={isloading} />

      <div className="homepage__action">
        <button
          className="action"
          type="button"
          title={languange === "en" ? "Add" : "Tambah"}
          onClick={() => navigate("/add")}
        >
          <BiListPlus />
        </button>
      </div>

      <ToastContainer autoClose={1500} />
    </>
  );
}
