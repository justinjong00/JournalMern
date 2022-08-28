import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import EntryForm from '../components/EntryForm'
import EntryItem from '../components/EntryItem'
import Spinner from '../components/Spinner'
import { getEntries } from '../features/entries/entrySlice'
import {reset} from "../features/auth/authSlice"
import SpotifyWebApi from 'spotify-web-api-js'
import {useState} from 'react'
import axios from 'axios'
import SongArtist from '../components/SongArtist'




function Dashboard() {
    const CLIENT_ID = "2d66cef16c264c4b8bc489a1ae3496d8"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPE = "user-read-private user-read-email user-read-playback-state user-read-currently-playing";

    const [token, setToken] = useState("")
    const [song, setSong] = useState("")
    const [artist, setArtist] = useState("")


    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        // getToken()


        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    
        console.log("Token--", token)

    }, [])

        const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }



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

  const getSong = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })


    setSong(data.item.name)
    


    console.log(data.item.name)

    const songArtists = data.item.artists.map((item) => {
      return item.name
    })

    console.log(songArtists)

    setArtist(songArtists[0])


  }


  return (<>
       <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Melodic Moments Dashboard</p>
      </section>
      {!token ? 
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
: <button onClick={logout}> Logout of Spotify </button>}

{token ? 
<form onSubmit= {getSong}>
  <button type = {"submit"}> Get Current Song     
  </button>
</form>
:<></>
}
{song ? <SongArtist song={song} artist={artist} /> : <></>}


      <EntryForm spotify={SongArtist}/>


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