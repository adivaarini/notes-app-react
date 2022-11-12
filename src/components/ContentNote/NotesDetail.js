import React from 'react'
import { TiDeleteOutline } from 'react-icons/ti'
import { MdOutlineArchive, MdOutlineUnarchive } from 'react-icons/md'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import Skeleton from 'react-loading-skeleton'

export default function NotesDetail({
  notes,
  loading,
  onDelete,
  onArchived,
  onUnArchived,
}) {
  const handleArchived = () => {
    toast("Berhasil! Catatanmu telah diarsipkan");
    onArchived(notes.id);
  };

  const handleUnArchived = () => {
    toast("Berhasil! Catatanmu telah dipindahan");
    onUnArchived(notes.id);
  };

  const handleDelete = () => {
    window.confirm("Yakin hapus catatan? ") && onDelete(notes.id);
    toast("Berhasil! Catatanmu telah dihapus");
  };

  return (
    <section className="all-page">
      <div className="input-new-notes">
        <h3 className="title-all-page">
          {loading === true ? <Skeleton /> : notes.title}
        </h3>
        <p className="date-all-page">
          {loading === true ? <Skeleton /> : notes.createdAt}
        </p>
        <div className="body-all-page">
          {loading === true ? <Skeleton /> : notes.body}
        </div>
    
        <p className="title-limit-char"></p>
        <div className="action-all-page">
          {notes.archived === true ? (
            <>
              <button
                className="action"
                type="button"
                title="archived"
                onClick={handleUnArchived}
              >
                <MdOutlineUnarchive />
              </button>
            </>
          ) : (
            <>
              <button
                className="action"
                type="button"
                title="archived"
                onClick={handleArchived}
              >
                <MdOutlineArchive />
              </button>
            </>
          )}

          <button
            className="action"
            type="button"
            title="delete"
            onClick={handleDelete}
          >
            <TiDeleteOutline />
          </button>
        </div>
      </div>
    </section>
  );
}

NotesDetail.propTypes = {
  notes: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchived: PropTypes.func.isRequired,
  onUnArchived: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
