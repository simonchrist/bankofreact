import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/LogIn';
import Debits from './components/Debits';
import Credits from './components/Credits';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      creditsTotal: 0,
      debitsTotal: 0,
      accountBalance: 0,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      }
    }
  }

  mockLogin = (logInInfo) => {
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser});
  }

  addCredit = (value) => {
    this.setState({
      creditsTotal: value
    }, () => {
      this.updateAccountBalance();
    });
  }

  addDebit = (value) => {
    this.setState({
      debitsTotal: value
    }, () => {
      this.updateAccountBalance();
    });
  }

  updateAccountBalance = () => {
    this.setState(() => {
      return {accountBalance: this.state.creditsTotal - this.state.debitsTotal}
    })
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home accountBalance={this.state.accountBalance}/>}></Route>
          <Route exact path="/LogIn" element={<LogIn user={this.state.currentUser} mockLogin={this.mockLogin} {...this.props}></LogIn>}></Route>
          <Route exact path="/UserProfile" element={<UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}></UserProfile>}></Route>
          <Route exact path="/Debits" element={<Debits addDebit={this.addDebit} accountBalance={this.state.accountBalance}></Debits>}></Route>
          <Route exact path="/Credits" element={<Credits addCredit={this.addCredit} accountBalance={this.state.accountBalance}></Credits>}></Route>
        </Routes>
      </Router>
    );
  }
}

export default App;