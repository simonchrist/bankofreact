import React,  {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AccountBalance from "./AccountBalance";

function Credits(props) {
    const [credits, setCredits] = useState([]);
    const [creditsTotal, setCreditsTotal] = useState(0);

    useEffect(() => {
        getCredits();
    }, [])

    useEffect(() => {
        updateCreditsTotal();
    }, [credits])

    useEffect(() => {
        props.addCredit(creditsTotal);
    }, [creditsTotal])

    const getCredits = async () => {
        await axios
            .get("https://moj-api.herokuapp.com/credits")
            .then(response => {
                setCredits(response.data);
            });
    }

    const updateCreditsTotal = () => {
        let total = 0;
        credits.forEach(event => {
            total += event.amount;
        })
        setCreditsTotal(total);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const date = new Date();
        setCredits([...credits, {
            description: document.getElementById("userDescription").value,
            amount: parseFloat(document.getElementById("userAmount").value),
            date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        }]);
    }

    return (
        <div id ="App">
            <h1 className="title">Credits</h1>
            
            <div className='flex'>
                <Link to={"/"} className='title'>Home</Link>
                <Link to={"/UserProfile"} className='title'>User Profile</Link>
                <Link to={"/Debits"} className='title'>Debits</Link>
                <Link to={"/Credits"} className='title'>Credits</Link>
            </div>

            <AccountBalance accountBalance={props.accountBalance}></AccountBalance>

            <table className="table">
                <thead className="table-2">
                    <tr>
                        <th className="title">Description</th>
                        <th className="title">Amount</th>
                        <th className="title">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        credits.map((item, i) => {
                            return (
                            <tr key={item.id ? item.id : i}>
                                <td>{item.description}</td>
                                <td>{item.amount}</td>
                                <td>{item.date.slice(0,10)}</td>
                            </tr>
                            )
                        })
                    }
                    <tr>
                        <td>
                            <input form="addDebit" required type="text" placeholder="Enter a description" className="flex" id="userDescription"></input>
                        </td>
                        <td>
                            <input form="addDebit" required type="number" step={"any"} min={"0.01"} placeholder="Enter Amount" className="flex" id="userAmount"></input>
                        </td>
                        <td>
                            <form id="addDebit" onSubmit={handleSubmit}>
                                <button type="submit" className="credit-button">Add Credit</button>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Credits;