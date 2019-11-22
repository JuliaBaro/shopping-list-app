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
    this.state={ //initial state
      items: [],
      currentItem:{
        text:'', //initially empty
        key:'' //initially empty
      }
    }
    //https://www.freecodecamp.org/news/this-is-why-we-need-to-bind-event-handlers-in-class-components-in-react-f7ea1a6f93eb/
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
    this.handleItem = this.handleItem.bind(this); //***
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  //text entered into textbox with unique key (actual date and time)
  //the text the user is entering gets stored in this obj
  handleItem(e){
    this.setState({
      currentItem:{
        text: e.target.value, //this is the current item entered in the texbox
        key: Date.now() //actual date and time as unique key
      }
    })
  }

  //the user can add new items to the existing array obj (above)
  //the new item is stored in a var so it can be added to the array obj
  addItem(e){
    e.preventDefault();//default behaviour of a button is that it loads again the page - this is how you can prevent the reload
    //it is necessary to bind the this value to constructor function 
    //the this keyword does not point to the class automatically - we need to bind to the constructor
    const newItem = this.state.currentItem; //***
    //console.log(newItem);
    if(newItem.text!=='') { //checking if newItem.text is not empty 
      const newItems = [...this.state.items, newItem]; //destructuring assignment, adding item to our list
      this.setState({
        items: newItems,
        currentItem:{ //setting back current item to empty values - kind of an init
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
        <header className='nowrap tc center pr3'/*'InputBox'*/>{/*keeps button and input in one line*/}
          <form id='shopping-list' onSubmit={this.addItem}>
            <input 
              type='text' 
              placeholder='Enter item...' 
              value={this.state.currentItem.text}
              onChange={this.handleItem}
            />
            <button type='submit'>Add</button>
          </form>
        </header>
          <div className='nowrap white tc center b pb3'>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</div>
          <ListItems 
            items = {this.state.items}
            deleteItem={this.deleteItem}
            setUpdate={this.setUpdate}>
          </ListItems>
      </div>
    );
  }
}

export default App;
