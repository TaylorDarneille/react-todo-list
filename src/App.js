import React, { Component } from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: '',
      toDos: ['Mow the lawn','Get groceries', 'Wash dog', 'Do homework', 'Put away laundry'],
      newItem: ''
    }
  }

  clear = () => {
    this.setState({ toDos: [] });
  }

  deleteItem = (item) => {
    console.log('parent component delete');
    console.log(item);
    let toDosLocal = this.state.toDos;
    let itemIndex = toDosLocal.indexOf(item);
    if(itemIndex >=0) {
      toDosLocal.splice(itemIndex, 1);
      this.setState({toDos: toDosLocal});
    } else {
      this.setState({error: "Couldn't find item to delete!"});
    }
  }

  add = (e) => {
    e.preventDefault();
    console.log(this.state.newItem);
    if(this.state.newItem){
      //newItem is a non-empty string
      let toDosLocal = this.state.toDos;
      toDosLocal.push(this.state.newItem);
      this.setState({error: '', newItem: '', toDos: toDosLocal});
    } else {
      //newItem is empty; don't add it
      this.setState({error: "Please type something in the box!"});
    }
  }

  newItemChange = (e) => {
    this.setState({ newItem: e.target.value, error: '' });
  }

  render() {
    const tooltip = (
      <Tooltip id="tooltip"><strong>Whoa! Hold on!</strong> Do you really want to delete EVERYTHING??</Tooltip>
    );

    return (
      <div className="container">
        <header className="header-background">
          <h1 className="header-title">My To-Do List</h1>
        </header>

      {/* To-do list goes here! */}
      <ToDoList items={this.state.toDos} onDelete={this.deleteItem} />

      {/* Error handling/error message goes here! */}
      <p className="text-danger">{this.state.error}</p>

      {/* Form to add a new list item. */}
      <form onSubmit={this.add}>
        <input type="text" className="form-control" placeholder="What are you doing?" onChange={this.newItemChange} value={this.state.newItem} />
      </form>

      {/* Button to clear the list. */}
      <div className="text-left">
        <button className="btn btn-primary" onClick={this.add}>Add</button>
        <OverlayTrigger placement="right" overlay={tooltip}>
          <button className="btn btn-warning" onClick={this.clear}>Clear</button>
        </OverlayTrigger>
      </div>

      </div>
    );
  }
}

class ToDoList extends Component {

  render(){

    const toDoItems = this.props.items.map(thing => {
      return (<ListItem key={thing} item={thing} onDelete={this.props.onDelete}/>);
    });

    return (
        <ul className="list-group">{toDoItems}</ul>
    );
  }
}

class ListItem extends Component {

  deleteHandler = () => {
    console.log('delete handler');
    this.props.onDelete(this.props.item);
  }

  render(){
    return(
      <li className="list-group-item">
        {this.props.item}
        <button className="btn-xs btn-danger pull-right" onClick={this.deleteHandler}>x</button>
      </li>
    );
  }
}



export default App;
