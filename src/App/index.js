import React from 'react';
import { useTodos } from './useTodos';

import { TodoHeader } from '../TodoHeader';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodosError } from '../TodosError';
import { TodosLoading } from '../TodosLoading';
import { EmptyTodos } from '../EmptyTodos';
import { TodoForm } from '../TodoForm';
import { CreateTodoButton } from '../CreateTodoButton';
import { Modal } from '../Modal';

/* function App() {
  const [state, setState] = React.useState('Gaato')

  return (
    <>
      <TodoHeader>
          <TodoCounter />
          <TodoSearch />
      </TodoHeader>
      <TodoList>
        <TodoItem state={state}/>
      </TodoList>
    </>
  )
}

function TodoHeader({ children }) {
  return (
    <header>
      {children}
    </header>
  )
}

function TodoList({ children}) {
  return (
    <section>
      {children}
    </section>
  )
} 

function TodoCounter() {
  return <p>Contador</p>
}

function TodoSearch() {
  return <p>Todosearch</p>
}

function TodoItem({ state }) {
  return <p>Todo Item: {state}</p>
}
Lo anterior era sobre composicion de componentes*/ 
function App() {
  const {
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
    totalTodos, 
    completedTodos,
    searchValue, 
    setSearchValue,
    addTodo
  } = useTodos();
  
  /* 
    Usamos composicion de componentes para eliminar el react context 
    no era necesario ya que solo con nuestro custom hook podemos manejar
    todo el estado de nuestraa aplicación sin necesidar de agregar el provider
    del context
  */

  return (
    <React.Fragment>
      <TodoHeader> {/* Acá aplicamos composicion , asi podemos eliminar la capa de react context */}
        <TodoCounter 
          totalTodos={totalTodos}
          completedTodos={completedTodos}
        />
        <TodoSearch 
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </TodoHeader>

      {/*       
        <TodoList>
          {error && <TodosError />}
          {loading && <TodosLoading />}
          {(!loading && !searchedTodos.length) && <EmptyTodos />}
          
          {searchedTodos.map(todo => (
            <TodoItem
              key={todo.text}
              text={todo.text}
              completed={todo.completed}
              onComplete={() => completeTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
            />
          ))}
        </TodoList> 
      */}

      {/* 
        Usamos render props para simplificar el codigo y hacerlo mejor 
        ejemplo de render props =  onLoading={()  => <TodosLoading />}
      */}
      <TodoList 
        error={error}
        loading={loading}
        searchedTodos={searchedTodos}
        totalTodos={totalTodos}
        searchText={searchValue}
        onError={()  => <TodosError />}
        onLoading={()  => <TodosLoading />}
        onEmptyTodos={()  => <EmptyTodos />}
        onEmptySearchResults={
          (searchText)  => <p>No hay resultados para {searchText} </p>
        }
        /*  
        Esta de abajo es una render prop       
        render={ todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        )} 
        */
      >
        {/* Esto es una render function */}
        {todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        )}
      </TodoList>

      {!!openModal && (
        <Modal>
          <TodoForm 
            addTodo={addTodo} 
            setOpenModal={setOpenModal}
          />
        </Modal>
      )}

      <CreateTodoButton
        setOpenModal={setOpenModal}
      />
    </React.Fragment>
  );
}

export default App;
