import { useDispatch } from 'react-redux'
import { deleteEntry} from '../features/entries/entrySlice'

function EntryItem({ entry }) {
    const dispatch = useDispatch();

  return (
    <div className='entry'>
      <div>{new Date(entry.createdAt).toLocaleString('en-US')}</div>
      <h2>{entry.text}</h2>
          <button onClick={() => dispatch(deleteEntry(entry._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default EntryItem