import React from 'react';
import './Friends.css';

class FriendForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.isUpdating) {
      this.props.updateFriend();
    } else {
      this.props.addFriend();
    }
  }

  render() {
    return(
      <div className='friendForm'>
        <h2>{this.props.isUpdating ? 'Update' : 'Add new'} Friend</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='input'>
            <input
              type='text'
              name='name'
              value={this.props.friend.name}
              placeholder='Name...'
              onChange={this.props.handleChanges}
            />
            <input
              type='number'
              name='age'
              value={this.props.friend.age}
              placeholder='Age...'
              onChange={this.props.handleChanges}
            />
            <input
              type='text'
              name='email'
              value={this.props.friend.email}
              placeholder='E-mail address...'
              onChange={this.props.handleChanges}
            />
            <button type='submit' className='formButton'>
              {this.props.isUpdating ? 'Update Friend' : 'Add Friend'}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default FriendForm;