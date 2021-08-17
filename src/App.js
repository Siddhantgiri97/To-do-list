import Header from './Components/Header';
import { Footer } from './Components/Footer';
import { Todos } from './Components/Todos';
import { AddTodo } from './Components/AddTodo';
import { About } from './Components/About';
import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  let initTodo;
  if (localStorage.getItem('todos') === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem('todos'))
  }



  const onDelete = (todo) => {
    console.log('onDelete', todo);
    setTodos(todos.filter((e) => {
      return e !== todo;
    }))
    localStorage.setItem('todos', JSON.stringify(todos))
  }
  const [todos, setTodos] = useState(initTodo)
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))

  }, [todos])

  const addTodo = (title, desc) => {
    let sno;
    if (todos.length === 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }

    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo])
    console.log(myTodo)


  }
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/" render={() => {
          return (
            <>
              <AddTodo addTodo={addTodo} />
              <Todos todos={todos} onDelete={onDelete} />
            </>
          )
        }}>

        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>


      <Footer />
    </Router>
  );
}

export default App;
