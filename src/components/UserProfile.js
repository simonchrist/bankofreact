import React from 'react';
import { Link } from 'react-router-dom';

class UserProfile extends React.Component {
    render() {
        return (
            <div id ="App">
                <h1 className='title'>User Profile</h1>
                <div className='container'>
                    <div className='App'>
                        <Link to={"/"} className='title'>Home</Link>
                        <Link to={"/UserProfile"} className='title'>User Profile</Link>
                        <Link to={"/Debits"} className='title'>Debits</Link>
                        <Link to={"/Credits"} className='title'>Credits</Link>
                    </div>

                    <div className='title'>
                        <div className='body'>
                            <div className='text'>
                                <p className='username'><b>Username: </b>{this.props.userName}</p>
                                <p className='membership'><b>Member Since: </b>{this.props.memberSince}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfile;