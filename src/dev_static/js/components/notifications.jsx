import React from 'react';
import Notification from './notification'

class Notifications extends React.Component {
  render(){

    const notes = this.props.notes.map((note) =>
        <Notification key={note.note_id} note={note}/>
    );
    
    return (
      <div className="notifications_list">
        {notes}
      </div>
    );
  }
}

export default Notifications;