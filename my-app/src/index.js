import React from 'react';
import ReactDOM from 'react-dom';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {todoUser:[],todoLists: [], newListName: '', todoItemAdders: [],newItemName: '',newItemDesc : '', newItemDeadline: '', newItemStatus : '',updatedObjName : ''};
        this.handleNewListNameChange = this.handleNewListNameChange.bind(this);
        this.handleItemAdderNameChange = this.handleItemAdderNameChange.bind(this);
        this.handleNewList = this.handleNewList.bind(this);
        this.handleDeleteList = this.handleDeleteList.bind(this);
        this.handleNewItem = this.handleNewItem.bind(this);
        this.handleOrderItem = this.handleOrderItem.bind(this);
    }

    componentDidMount() {
        fetch('/lists', {
            method: 'GET',
            credentials: 'same-origin'
        }).then(response => {
            return response.json();

        }).then(json => {
            this.setState({todoLists: json, todoItemAdders: new Array(json.length).fill('')});
        });
    }

    handleItemAdderNameChange(index, name) {
        this.setState(function (prevState) {
            let myTodoItemAdders = prevState.todoItemAdders;
            myTodoItemAdders[index] = name;
            return {
                todoItemAdders: myTodoItemAdders
            };
        });
    }

    handleNewListNameChange(listName) {
        this.setState({newListName: listName});
    }


    handleNewList() {
        let newList = {
            name: this.state.newListName
        };
        fetch('/lists', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(newList),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => {
            return response.json();
        }).then(json => {
            this.setState(function (prevState) {
                let myTodoLists = prevState.todoLists;
                myTodoLists.push(json);
                return {
                    todoLists: myTodoLists,
                    newListName: ''
                };
            });
        });
    }
    

    handleNewItem(index, listId) {
        let newItem = {
            name: this.state.todoItemAdders[index]
        }
        fetch('/lists/' + listId + '/items', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(newItem),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => {
            return response.json();
        }).then(json => {
            this.setState(function (prevState) {
                let myTodoLists = prevState.todoLists;
                myTodoLists.forEach(function (todoList) {
                    if (todoList.id == listId) {
                        todoList.items.push(json);
                    }
                });
                let myTodoItemAdders = prevState.todoItemAdders;
                myTodoItemAdders[index] = '';
                return {
                    todoLists: myTodoLists,
                    todoItemAdders: myTodoItemAdders
                };
            });
        });
    }


    handleDeleteList(listId) {
        fetch('/lists/' + listId, {
            method: 'DELETE',
            credentials: 'same-origin'
        }).then(response => {
            this.setState(function (prevState) {
                let myTodoLists = prevState.todoLists.filter((todoList =>
                    todoList.id !== listId
                ));
                return {
                    todoLists: myTodoLists
                };
            });
        });
    }
    
     handleDeleteItem(listId, itemId) {
        fetch('/lists/' + listId + '/items/' + itemId, {
            method: 'DELETE',
            credentials: 'same-origin'
        }).then(response => {
            this.setState(function (prevState) {
                let myItems = prevState.items.filter(item => item.id !== itemId);
                return {
                    items: myItems
                };
            });
        })
    }
    handleOrderItem()
    {
        
         fetch('/items', {
           method: 'GET',
            credentials: 'same-origin'
        }).then(response => {
            return response.json();
        }).then(json => {
            his.setState(function (prevState, props) {
                let myTodoItem = prevState.items;
                myTodoItem.forEach(function (items) {
                    if (items.id!= '' ) {
                        return {
                    items: myTodoItem,

                };
                    }
                });
               
            });
        });

    }
handleUserLogin()
    {
        
         fetch('/user', {
           method: 'GET',
            credentials: 'same-origin'
        }).then(response => {
            return response.json();
        }).then(json => {
            his.setState(function (prevState, props) {
                let myUser = prevState.user;
                myUser.forEach(function (user) {
                    if (user.id!= '' ) {
                        return {
                    user: myUser,

                };
                    }
                });
               
            });
        });

    }
 handleNewUser() {
     
        let newUser = {
            name: this.state.newUserName
        };
        fetch('/lists', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(newUser),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => {
            return response.json();
        }).then(json => {
            this.setState(function (prevState) {
                let myUser = prevState.todoUser;
                myUser.push(json);
                return {
                    todoUser: myUser,
                    newUserName: ''
                };
            });
        });
    }
    render() {
        const newListName = this.state.newListName;
        const newItemName = this.state.newItemName;

        return (
            <div>
                <AddTodoList listName={newListName}
                             onAddList={this.handleNewList}
                             onListNameChange={this.handleNewListNameChange}/>
                <AddTodoItem itemName={newItemName}
                             onAddItem={this.handleNewItem}/>
                <OrderItem   object = {this.handleOrderItem}/>
                <Register    onAddUser={this.handleNewUser}/>
                <UserLogin   logUser={this.handleUserLogin}/>
                <ListGroup>
                        <ListGroupItem key={lists.id}>
                        <DeleteObject object={items}
                             onDeleteObject={(itemId) => this.handleDeleteItem(listId,itemId)}/>
                        </ListGroupItem>
                        <ListGroupItem>
                        <DeleteObject object={lists}
                             onDeleteObject={(listId) => this.handleDeleteList(listId)}/>         
                        </ListGroupItem>
                </ListGroup>
            </div>
        );
    }

}
class UserLogin extends React.Component{
   state = {
    users,
    username: [],
    userEmail: [],
    userPassword: [],
  }

  componentDidMount() {
    const { users, username,userEmail,userPassword} = this.state;

    username = users.map(i => i.name);
    userEmail = users.map(i => i.email);
    userPassword = users.map(i => i.password);

    this.setState({ username },{userEmail},{userPassword})

  }
   constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

       handleClick() {
           if(this.userEmail==this.props.logEmail)
           {
               if(this.userPassword==this.props.logPassword)
               {this.props.logUser();}
           }
        
    }

    handleSubmit(e) {
        e.preventDefault();
        this.handleClick();
    }

  render() {
    const { logEmail,logPassword} = this.state;
      return (
            <form onSubmit={this.handleSubmit}>
        <ListGroup>
            <input
              type="text"
              name="email"
              value={logEmail}
              onChange={this.onChange}
            />
            <input
              type="text"
              name="password"
              value={logPassword}
              onChange={this.onChange}
            />
            </ListGroup>
                    />
                    <Button bsStyle="default" onClick={this.handleClick}>Log in</Button>
                
            </form>
        );
  } 
}
class Register extends React.Component{
   constructor(props) {
        super(props);
         this.state = {
          username: '',
          userEmail: '',
          userPassword: '',
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick() {
        this.props.onAddUser();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.handleClick();
    }

    render() {
        const { username, userEmail, userPassword } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
        <ListGroup>
             <input
              type="text"
              name="user name"
              value={username}
              onChange={this.onChange}
            />
            <input
              type="text"
              name="email"
              value={userEmail}
              onChange={this.onChange}
            />
            <input
              type="text"
              name="password"
              value={userPassword}
              onChange={this.onChange}
            />
            </ListGroup>
                    />
                    <Button bsStyle="default" onClick={this.handleClick}>Register</Button>
                
            </form>
        );
    }
}


class OrderItem extends React.Component {

  state = {
    items,
    itemName: [],
    itemDesc: [],
    itemDeadline: [],
  }

  componentDidMount() {
    const { items, itemName,itemDesc,itemDeadline} = this.state;

    itemName = items.map(i => i.name);
    itemDesc = items.map(i => i.description);
    itemDeadline = items.map(i => i.deadline);

    this.setState({ itemName },{itemDesc},{itemDeadline})
  }

  sortAscending = () => {
    const { itemName,itemDesc,itemDeadline } = this.state;
    itemName.sort((a, b) => a - b)    
    itemDesc.sort((a, b) => a - b) 
    itemDeadline.sort((a, b) => a - b) 
    this.setState({ itemName },{itemDesc},{itemDeadline})
  }

  render() {
      let o=props.this.object;
    const { itemName,itemDesc,itemDeadline} = this.state;
    return (
      <div>
        <ul>
          {
            itemName.map((i, o) => {
              return <li>{o} -{i}</li>;
            })
          }
        </ul>
        <button onClick={this.sortAscending}>order by name</button>
        <ul>
          {
            itemDesc.map((i, o) => {
              return <li>{o} -{i}</li>;
            })
          }
        </ul>
        <button onClick={this.sortAscending}>order by description</button>
        <ul>
          {
            itemDeadline.map((i, o) => {
              return <li>{o} -{i}</li>;
            })
          }
        </ul>
        <button onClick={this.sortAscending}>order by deadline</button>
      </div>
    );
  }
}
class DeleteObject extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    }

    handleSubmit(e, objId) {
        e.preventDefault();
        this.handleDeleteButtonClick(objId);
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }

    handleDeleteButtonClick(objId) {
        this.props.onDeleteObject(objId);
    }

    render() {
        let obj = this.props.object;
        return (
            <form onSubmit={(e) => this.handleSubmit(e, obj.id)}>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Enter text"
                            value={this.props.onNameChange}
                            onChange={this.handleNameChange}
                        />
                        <InputGroup.Button>
                            <Button onClick={() => this.handleDeleteButtonClick(obj.id)}>Delete Item</Button>
                        </InputGroup.Button>
                        <InputGroup.Button>
                            <Button bsStyle="danger"
                                    onClick={() => this.handleDeleteButtonClick(obj.id)}>Delete List</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </form>
        );
    }

}



class AddTodoList extends Component {
    constructor(props) {
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
        this.props.onListNameChange(e.target.value);
    }

    handleClick() {
        this.props.onAddList();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.handleClick();
    }

    render() {
        const listName = this.props.listName;
        return (
            <form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <ControlLabel>Enter a name for your new list:</ControlLabel>
                    <FormControl
                        type="text"
                        value={listName}
                        placeholder="Enter text"
                        onChange={this.handleChange}
                    />
                    <Button bsStyle="default" onClick={this.handleClick}>Add List</Button>
                </FormGroup>
            </form>
        );
    }
}

class AddTodoItem extends Component {
    constructor(props) {
        super(props);
         this.state = {
          newItemName: '',
          newItemDesc: '',
          newItemDeadline: '',
          newItemStatus: '',
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick() {
        this.props.onAddItem();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.handleClick();
    }

    render() {
        const { newItemName, newItemDesc, newItemDeadline , newItemStatus } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
        <ListGroup>
             <input
              type="text"
              name="newItemName"
              value={newItemName}
              onChange={this.onChange}
            />
            <input
              type="text"
              name="newItemDesc"
              value={newItemDesc}
              onChange={this.onChange}
            />
            <input
              type="text"
              name="newItemDeadline"
              value={newItemDeadline}
              onChange={this.onChange}
            />
             <input
              type="text"
              name="newItemStatus"
              value={newItemStatus}
              onChange={this.onChange}
            />
            </ListGroup>
                    />
                    <Button bsStyle="default" onClick={this.handleClick}>Add Item</Button>
                
            </form>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('root'));
