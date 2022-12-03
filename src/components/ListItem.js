import React from 'react'
import { Link } from 'react-router-dom'

const ListItem = ({note}) => {

  let getTitle = (note) => {
    const title = note.body.split('\n')[0]
    if (title.length > 45 ){
      return title.slice(0,45)
    }
    return title
  }

  let getDate = (note) => {
    return new Date(note.updated).toLocaleDateString()
  }

  return (
    <div>
        <Link to={`/note/${note.id}`}>
            <div className="notes-list-item">
                <h3>
                    {getTitle(note)}
                    <p>
                      <span>
                        {getDate(note)}
                      </span>
                    </p>
                </h3>
            </div>
        </Link>
    </div>
  )
}

export default ListItem