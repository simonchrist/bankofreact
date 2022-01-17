import React from 'react';
import { Navigate } from 'react-router-dom';

class LogIn extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {
                userName: "",
                password: ""
            },
            redirect: false
        }
    }

    handleChange = (event) => {
        const updatedUser = {...this.state.user};
        const inputField = event.target.name;
        const inputValue = event.target.value;
        updatedUser[inputField] = inputValue;

        this.setState({user: updatedUser});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.mockLogin(this.state.user);
        this.setState({redirect: true});
    }

    render() {
        if (this.state.redirect) {
            return (<Navigate to="/UserProfile"></Navigate>)
        }

        return (
            <div className='App'>
                <form onSubmit={this.handleSubmit}>
                    <div className='text'>
                        <label htmlFor='userName' className='form'>Username: </label>
                        <input type="text" name='userName' onChange={this.handleChange} value={this.state.user.userName} className='form-control'></input>
                    </div>
                    <div className='text'>
                        <label htmlFor='password' className='form'>Password: </label>
                        <input type="password" name="password" className='form-control'></input>
                    </div>
                    <button className='login-button'>Log In</button>
                </form>
            </div>
        )
    }
}

export default LogIn;