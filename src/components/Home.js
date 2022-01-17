import React from 'react';
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Home extends React.Component {
    render () {
        console.log("Account Home", this.props.accountBalance);
        return (
            <div id="App">
                <h1 className='title'>Bank of React</h1>
                <div className='container'>
                    <div className='text-center'>
                        <Link to={"/"} className='title'>Home</Link>
                        <Link to={"/UserProfile"} className='title'>User Profile</Link>
                        <Link to={"/Debits"} className='title'>Debits</Link>
                        <Link to={"/Credits"} className='title'>Credits</Link>
                    </div>
                    <div className='text-center'>
                        <AccountBalance accountBalance={this.props.accountBalance}></AccountBalance>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;