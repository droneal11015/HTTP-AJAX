import React from 'react';
import { NavLink } from 'react-router-dom';
import './Friends.css';

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='homePage'>
        <div className='friendsList'>
          {this.props.friends.map(friend => (
            <NavLink to={`/friends/${friend.id}`} className='friend' key={friend.id}>
              <h2>{friend.name}</h2>
            </NavLink>
          ))}
        </div>
        <NavLink to='/friend-form'>
          <button className='addButton'>Add Friend</button>
        </NavLink>
      </div>
    )
  }
}

export default FriendsList;