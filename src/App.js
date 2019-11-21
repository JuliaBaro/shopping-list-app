//https://www.youtube.com/watch?v=N8kYlimhuLw //To Do App in React (Adding, Editing and Deleting items) | Deploy in Github for freeTutorial

import React, {Component} from 'react';
import './App.css';
import ListItems from './ListItems';

//https://github.com/FortAwesome/react-native-fontawesome
/*
$ npm i --save @fortawesome/fontawesome-svg-core
$ npm i --save @fortawesome/free-solid-svg-icons
$ npm i --save @fortawesome/react-fontawesome
*/
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash)

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      items: [],
      currentItem:{
        text:'',
        key:''
      }
    }
    this.handleItem = this.handleItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  handleItem(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key: Date.now()
      }
    })
  }

  addItem(e){
    e.preventDefault();//the page does not get refreshed
    const newItem = this.state.currentItem;
    console.log(newItem);
    if(newItem.text!=='') { //if newItem.text is not empty 
      const newItems = [...this.state.items, newItem]; //destructuring assignment
      this.setState({
        items: newItems,
        currentItem:{
          text:'',
          key:''
        }
      })
    }
  }

  deleteItem(key){
    const filteredItems = this.state.items.filter(item => 
    item.key!==key);  
    this.setState({
      items: filteredItems
    })
  }

  setUpdate(text, key){
    const items = this.state.items;
    items.map(item => {
      if(item.key===key){
        item.text=text;
      }
    })
    this.setState({
      items: items
    })
  }

  render(){
    return (
      <div className='App'>
        <h1 className='Title'>My Shopping List</h1>
        <header className='InputBox'>
          <form id='shopping-list' onSubmit={this.addItem}>
            <input type='text' placeholder='enter text' 
              value={this.state.currentItem.text}
              onChange={this.handleItem}/>
            <button type='submit'>Add</button>
          </form>
        </header> 
        <ListItems items = {this.state.items}
        deleteItem={this.deleteItem}
        setUpdate={this.setUpdate}></ListItems>
      </div>
    );
  }
}

export default App;
