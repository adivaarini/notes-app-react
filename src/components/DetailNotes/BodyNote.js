import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { showFormattedDate } from '../../utils/index'

export default function BodyNote({ id, title, createdAt, body, loading }) {
  return (
    <>
      <div className="content-note">
        <div className="content-note-content">
          {loading === true ? (
            <Skeleton />
          ) : (
            <h2 className="title-content-note">
              <Link to={`../detail/${id}`}>{title}</Link>
            </h2>
          )}

          {loading === true ? (
            <Skeleton />
          ) : (
            <p className="date-content-note">{showFormattedDate(createdAt)}</p>
          )}

          {loading === true ? (
            <Skeleton />
          ) : (
            <p className="body-content-note">{body}</p>
          )}
        </div>
      </div>
    </>
  );
}

BodyNote.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};
