import React, { useContext } from 'react'
import BodyNote from './BodyNote'
import PropTypes from 'prop-types'
import LanguangeContext from '../../contexts/LanguangeContext'
import ThemeContext from '../../contexts/ThemeContext'
import FadeLoader from 'react-spinners/FadeLoader'

export default function ListNote({ notes, loading }) {
  const { languange } = useContext(LanguangeContext);
  const { theme } = useContext(ThemeContext);
  const result = notes.filter((row) => row.archived === false);
  const override = {
    display: "block",
    margin: "auto",
  };
  return (
    <>
      {loading === true ? (
        <FadeLoader
          color={theme === "dark" ? "#FFFFFF" : "#000000"}
          cssOverride={override}
        />
      ) : (
        <div className="list-note">
          {result.length === 0 || undefined ? (
            <div className="list-note">
              <h3>
                {languange === "en" ? "Notes could not be found!" : "Catatan tidak dapat ditemukan!"}
              </h3>
            </div>
          ) : (
            result.map((note) => (
              <BodyNote
                key={note.id}
                id={note.id}
                loading={loading}
                {...note}
              />
            ))
          )}
        </div>
      )}
    </>
  );
}

ListNote.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
};
