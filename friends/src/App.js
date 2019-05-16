import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import FriendsList from './components/FriendsList';
import FriendForm from './components/FriendForm';
import FriendCard from './components/FriendCard';
import './App.css';

const baseUrl = 'http://localhost:5000/';

const blankFriend = {
  name: '',
  age: '',
  email: ''
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      friend: blankFriend,
      error: '',
      isLoading: true,
      isUpdating: false
    }
  }

  componentDidMount() {
    axios.get(`${baseUrl}/friends`)
    .then(response => {
      this.setState({
        friends: response.data,
        isLoading: false
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleChanges = event => {
    event.persist();
    this.setState(prevState => {
      return {
        friend: {
          ...prevState.friend,
          [event.target.name]: event.target.value
        }
      };
    });
  };

  addFriend = () => {
    axios
      .post(`${baseUrl}/friends`, this.state.friend)
      .then(result => {
        console.log(result.data)
        this.setState({ friends: result.data});
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteFriend = (event, friendId) => {
    event.preventDefault();
    axios
      .delete(`${baseUrl}/friends/${friendId}`)
      .then(result => {
        this.setState({ friends: result.data});
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
      })
  }

  populateForm = (event, id) => {
    event.preventDefault();
    this.setState({
      friend: this.state.friends.find(friend => friend.id === id),
      isUpdating: true
    })
    this.props.history.push('/friend-form');
  }

  updateFriend = () => {
    axios
      .put(`${baseUrl}/friends/${this.state.friend.id}`, this.state.friend)
      .then(result => {
        this.setState({
          friends: result.data,
          isUpdating: false,
          friend: blankFriend
        });
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="App">
        <nav className ='tempHeader'>
          <h1>Friends List</h1>
          <div className='navLinks'>
            <NavLink exact to='/'>
              Home
            </NavLink>
          </div>
        </nav>
        <Route 
          exact path='/'
          render={props => (
            <FriendsList
              {...props}
              friends={this.state.friends}
            />
          )}
        />
        <Route 
          path='/friend-form'
          render={props => (
            <FriendForm
              {...props}
              isUpdating={this.state.isUpdating}
              addFriend={this.addFriend}
              handleChanges={this.handleChanges}
              friend={this.state.friend}
              updateFriend={this.updateFriend}
            />
          )} 
        />
        {!this.state.isLoading && 
          <Route
            path='/friends/:friendId'
            render={props => (
              <FriendCard
                {...props}
                friends={this.state.friends}
                handleChanges={this.handleChanges}
                deleteFriend={this.deleteFriend}
                updateFriend={this.updateFriend}
                populateForm={this.populateForm}
                isUpdating={this.isUpdating}
              />
            )}
          />
        }
      </div>
    );
  }
}

export default App;