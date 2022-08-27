import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import EntryForm from '../components/EntryForm'
import EntryItem from '../components/EntryItem'
import Spinner from '../components/Spinner'
import { getEntries } from '../features/entries/entrySlice'
import {reset} from "../features/auth/authSlice"


function Dashboard() {
  const navigate = useNavigate()
    const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { entries, isLoading, isError, message } = useSelector(
    (state) => state.entries
  )


  useEffect(() => {

        if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }
    
    dispatch(getEntries())
    
    return () => {
      dispatch(reset())
    }

  }, [user, navigate, isError, message, dispatch]) //dependencies

    if (isLoading) {
    return <Spinner />
  }


  return (<>
       <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Melodic Moments Dashboard</p>
      </section>

      <EntryForm/>

            <section className='content'>
        {entries.length > 0 ? (
          <div className='entries'>
            {entries.map((entry) => (
              <EntryItem key={entry._id} entry={entry} />
            ))}
          </div>
        ) : (
          <h3>You have not created any Melodic Moments</h3>
        )}
      </section>
  </>
  )
      
}

export default Dashboard