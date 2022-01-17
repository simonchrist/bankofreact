import React, { useEffect } from 'react';

class AccountBalance extends React.Component {
    render() {
        return (
            <div className='App'>
                Account Balance: {(this.props.accountBalance).toFixed(2)}
            </div>
        );
    }
}

export default AccountBalance;