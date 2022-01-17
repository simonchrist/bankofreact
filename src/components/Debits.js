import React,  {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AccountBalance from "./AccountBalance";

function Debits(props) {
    const [debits, setDebits] = useState([]);
    const [debitsTotal, setDebitsTotal] = useState(0);

    const getDebits = async () => {
        await axios
            .get("https://moj-api.herokuapp.com/debits")
            .then(response => {
                setDebits(response.data);
            });
    }

    const updateDebitsTotal = () => {
        let total = 0;
        debits.forEach(event => {
            total += event.amount;
        })
        setDebitsTotal(total);
    }
    
    useEffect(() => {
        getDebits();
    }, [])

    useEffect(() => {
        updateDebitsTotal();
    }, [debits])

    useEffect(() => {
        props.addDebit(debitsTotal);
    }, [debitsTotal])

    const handleSubmit = (event) => {
        event.preventDefault();
        const date = new Date();
        setDebits([...debits, {
            description: document.getElementById("userDescription").value,
            amount: parseFloat(document.getElementById("userAmount").value),
            date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        }]);
    }

    return (
        <div>
            <h1 className="title">Debits</h1>
            
            <div className='App'>
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
                        debits.map((item, i) => {
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
                            <input form="addDebit" required type="text" placeholder="Enter Description" className="flex" id="userDescription"></input>
                        </td>
                        <td>
                            <input form="addDebit" required type="number" step={"any"} min={"0.01"} placeholder="Enter Amount" className="flex" id="userAmount"></input>
                        </td>
                        <td>
                            <form id="addDebit" onSubmit={handleSubmit}>
                                <button type="submit" className="debit-button">Add Debit</button>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Debits;