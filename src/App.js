import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedTodos) setTodos(storedTodos);
  }, [])
  // because we pass only an empty [], this is called only once when load up

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  // anytime, everything in the array changes, we apply the first function again

  function toggleTodo (id) { 
    const newTodos = [...todos]; //never modify a state variable
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
   }

  function handleAddTodo(e){
    const name = todoNameRef.current.value;
    if(name === '') return

    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}];
    })
    todoNameRef.current.value = null;
  }
  function clearTodos(){
    const newTodos = todos.filter(todo=>!todo.complete);
    setTodos(newTodos);
  }
  return (
    <>
      <TodoList todos = {todos} toggleTodo = {toggleTodo}/>
      <input ref = {todoNameRef} type="text"/>
      <button onClick={handleAddTodo}>Add Todo</button>  
      <button onClick={clearTodos}>Clear Complete</button>
      <div>{todos.filter(todo=>!todo.complete).length} Left things to do</div>  
    </>
  );
}

export default App;
