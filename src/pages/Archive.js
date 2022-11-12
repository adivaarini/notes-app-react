import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ActionArchive from '../components/ArchivePage/ActionArchive'
import ActionSearch from '../components/SearchMenu/ActionSearch'
import { getArchivedNotes } from '../utils/network-data'

export default function Archive() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const [archived, setArchived] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const getDataArchived = async () => {
    setIsLoading(true);
    const { data } = await getArchivedNotes();
    setArchived(data);
    setIsLoading(false);
  };
  const [filterNotes, setFilterNotes] = useState(keyword || "");

  const changeSearchParams = (keyword) => {
    setFilterNotes(keyword);
    setSearchParams({ keyword });
  };

  const resultNotes = archived.filter((e) =>
    (e.title || "").toLowerCase().includes(filterNotes.toLowerCase())
  );

  useEffect(() => {
    getDataArchived();
  }, []);

  return (
    <>
      <ActionSearch
        title="Archive"
        keyword={filterNotes}
        keywordChange={changeSearchParams}
      />
      <ActionArchive archived={resultNotes} loading={isloading} />
    </>
  );
}
