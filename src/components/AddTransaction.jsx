import React, { Component } from 'react'
import firebase from '../firebase/firebase'

export default class AddTransaction extends Component {
  
  state = {
    name:'',
    amount:''
  }

  onChange = (e) => {
    this.setState( { [e.target.name]: e.target.value } );
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTransaction(this.state.name, this.state.amount);
    this.setState( { name:'', amount:'' });
    const db = firebase.firestore();

    if(this.state.name==='' || this.state.amount==='') {
      return false;
    }else{
      db.collection("users").add({
        name: this.state.name,
        amount:this.state.amount,
      })
      console.log('save completed')
    }
  }
  
  render() {
    return (
      <div>
        <form id="add-transaction_form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Transaction Name:</label>
            <input 
              type="text" 
              name="name" 
              className="form-control" 
              placeholder="Expense detail ..."
              onChange={this.onChange}
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount (+:income / -:expense)</label>
            <input 
              type="number" 
              name="amount" 
              className="form-control" 
              placeholder="0.00"
              onChange={this.onChange} 
              value={this.state.amount}
            />
          </div>

          <input type="submit" value="Add Transaction" className="btn btn-primary btn-block"/>
        </form>
      </div>
    )
  }
}
