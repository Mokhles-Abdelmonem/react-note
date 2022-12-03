import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
// import notes from '../assets/data';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg';
import { useNavigate } from 'react-router-dom';



const NotePage = (props, history) => {
  const { id } = useParams();
  const navigate = useNavigate();
  let [note, setNotes] = useState(null);
  useEffect(() => {
    getNotes()
  }, [id]);

  let getNotes =  async () => {
    if (id === "new") return
    let response = await fetch(`http://localhost:8000/notes/${id}`)
    console.log(`http://localhost:8000/notes/${id}`)
    let data = await response.json()
    setNotes(data)
  };
   let updateNotes = async () => {
     await fetch(`http://localhost:8000/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...note, "updated":new Date() }),
     })
   
  };

  let handeleSubmit  = () => {
    if (id !== 'new' &&  !note.body){
      deleteNote()
    } else if (id !== 'new') {
      updateNotes()
    } else if (id === 'new') {
      createNote()
    }
    navigate("/")
  };

  let createNote = async () => {
    await fetch(`http://localhost:8000/notes`, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({...note, "updated":new Date() }),
    })
  
 };

  let deleteNote = async () => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
     })
     navigate("/");
  };
  return (
    <div className='note'>
        <div className='notes-header'>
            <h3>
              <Link to="/">
                <ArrowLeft onClick={handeleSubmit} />
              </Link>
            </h3>
            {id !== 'new' ? (
              <button onClick={deleteNote}>Delete</button>
            ):(
              <button onClick={handeleSubmit}>Create</button>
            )}

            
        </div>
        <textarea onChange={(e) => {setNotes({...note, 'body' : e.target.value })}} value={note?.body}>
          
        </textarea>
    </div>
  )
}

export default NotePage