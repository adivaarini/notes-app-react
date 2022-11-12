import React, { useState, useContext } from 'react'
import { BiSave } from 'react-icons/bi'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import LanguangeContext from '../../contexts/LanguangeContext'

export default function ActionNew({ addNotes }) {
  const { languange } = useContext(LanguangeContext);

  const [listItem, setListItem] = useState({
    title: "",
    body: "",
  });

  const [limitValue, setLimitValue] = useState(100);

  const bodyValueHandle = (e) => {
    const limit = 100;

    setLimitValue(limit - e.length + 1);

    setListItem({
      ...listItem,
      body: e.slice(0, limit),
    });
  };

  const handleSubmit = () => {
    toast("Berhasil! Catatan telah ditambahkan");
    addNotes(listItem);
  };

  return (
    <section className="new-notes">
      <div className="input-new-notes">
        <input
          type="text"
          className="title-new-notes"
          placeholder={
            languange === "en" ? "Write your title notes here ..." : "Tulis judul catatan Anda disini ..."
          }
          onChange={(e) => {
            setListItem({
              ...listItem,
              title: e.target.value,
            });
          }}
          value={listItem.title}
          required
        />
        <textarea
          name="body"
          id="body"
          className="body-new-notes"
          placeholder={
            languange === "en"
              ? "Write your note here ..."
              : "Tulis catatan Anda disini ..."
          }
          onChange={(e) => {
            bodyValueHandle(e.target.value);
          }}
          value={listItem.body}
        />
        <p className="title-limit-char">
          Sisa Karakter :{limitValue}
        </p>
        <div className="action-homepage">
          <button
            className="action"
            type="button"
            title={languange === "en" ? "Add" : "Tambah"}
            onClick={handleSubmit}
          >
            <BiSave />
          </button>
        </div>
      </div>
    </section>
  );
}

ActionNew.propTypes = {
  addNotes: PropTypes.func.isRequired,
};
