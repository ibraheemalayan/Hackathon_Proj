import React from 'react';
import SwipeToDelete from 'react-swipe-to-delete-ios'

class Notification extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      is_read: this.props.note.is_read,
      is_cleared: this.props.note.is_cleared
    };

    this.click = this.click.bind(this);
    this.clear = this.clear.bind(this);
}

  click(){
    fetch('/notifications/click/' + this.props.note.note_id)
    .then((data) => {
      console.log("Click")
      this.setState({
        is_read: true,
        is_cleared: this.state.is_cleared
      })
    })
    .catch(console.log);
  }

  clear(){
    fetch('/notifications/clear/' + this.props.note.note_id)
    .then((data) => {
      this.setState({
        is_read: true,
        is_cleared: true
      })
    })
    .catch(console.log);
  }

  render(){

    
    let note_class = ( this.state.is_read ) ? "read_note" : "new_note";
    let note_clear_class = ( this.state.is_cleared ) ? "cleared_note" : "";
    let clear_btn = ( this.state.is_read ) ? (<div className="clear_note" onClick={this.clear} >×</div>): (<div></div>);
    
    return (
      <div className={"notification " + note_class + " " + note_clear_class} onClick={this.click} >
        {clear_btn}
        <div className="note_date">{this.props.note.date}</div>
        <div className="note_msg">{this.props.note.message}</div>
      </div>
    );
  }

}

export default Notification;