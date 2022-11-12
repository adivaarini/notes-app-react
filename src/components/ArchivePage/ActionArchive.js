import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import BodyNote from '../DetailNotes/BodyNote'
import FadeLoader from 'react-spinners/FadeLoader'
import LanguangeContext from '../../contexts/LanguangeContext'
import ThemeContext from '../../contexts/ThemeContext'

export default function ActionArchive({ archived, loading }) {
  const { languange } = useContext(LanguangeContext);
  const { theme } = useContext(ThemeContext);
  const override = {
    display: "block",
    margin: "auto",
  };

  return (
    <>
      <h2>{languange === "en" ? "Archive" : "Arsip"}</h2>
      {loading === true ? (
        <FadeLoader
          color={theme === "dark" ? "#FFFFFF" : "#000000"}
          cssOverride={override}
        />
      ) : (
        <div className="list-note">
          {archived.length === 0 || undefined ? (
            <h3>
              {languange === "en" ? "Notes could not be found!" : "Catatan tidak dapat ditemukan!"}
            </h3>
          ) : (
            archived.map((note) => (
              <BodyNote key={note.id} id={note.id} {...note} />
            ))
          )}
        </div>
      )}
    </>
  );
}

ActionArchive.propTypes = {
  archived: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
};