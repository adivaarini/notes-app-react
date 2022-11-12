import React from 'react'
import PropTypes from 'prop-types'
import ListNote from './ListNote'

export default function NotesApp({ data, loading }) {
  return (
    <>
      <ListNote notes={data} loading={loading} />
    </>
  );
}

NotesApp.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
};
