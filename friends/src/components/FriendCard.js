import React from 'react';

class FriendCard extends React.Component {
    constructor(props) {
        super(props);
        this.friend = this.props.friends.find(
            friend => '${friend.id}' === this.props.match.params.friendId
        );
    }

    render() {
        return(
            <div>
                <div className = 'friend-info'>
                    <h2>{this.friend.name}</h2>
                    <p>{this.friend.age} years old.</p>
                    <p>{this.friend.email}</p>
                </div>

                <div className = 'buttons'>
                    <button 
                        onClick={event => this.props.populateForm(event, this.friend.id)}>
                        Update Friend
                    </button>
                    <button
                        onClick={event => this.props.deleteFriend(event, this.friend.id)}>
                        Delete Friend
                    </button>
                </div>
            </div>
        )
    }
}

export default FriendCard;