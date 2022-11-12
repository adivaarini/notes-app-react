import React, { useContext } from 'react'
import LanguangeContext from '../../contexts/LanguangeContext'
import { MdGTranslate } from 'react-icons/md'

export default function ActionLanguange() {
  const { actionLanguange } = useContext(LanguangeContext);

  return (
    <>
      <button
        type="button" 
        onClick={actionLanguange}
        className="action-languange">
          <MdGTranslate />
      </button>
    </>
  );
}
