import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import LanguangeContext from '../../contexts/LanguangeContext'

export default function ActionSearch({ title, keyword, keywordChange }) {
  const { languange } = useContext(LanguangeContext);

  return (
    <section className="menu-search">
      <h2>{languange === "en" ? `${title} Note` : `Catatan ${title}`}</h2>
      <input
        type="text"
        placeholder={languange === "en" ? "Browse your notes ..." : "Telusuri catatan Anda ..."}
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </section>
  );
}

ActionSearch.propTypes = {
  title: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};