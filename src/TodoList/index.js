import React from 'react';
import './TodoList.css'

function TodoList(props) { /* Puedo hacer destructuring para que quede mejor */
  const renderFunc = props.children || props.render;
  
  return (
    <section className="TodoList-container">
      {props.error && props.onError()}
      
      {props.loading && props.onLoading()}
      
      {(!props.loading && !props.totalTodos) && props.onEmptyTodos()}

      {(!!props.totalTodos  && !props.searchedTodos.length) && props.onEmptySearchResults(props.searchText)} {/* !!props.totalTodos  =  que sea diferente de 0 */}

      {/* {props.searchedTodos.map(todo => props.render(todo))} */}

      {props.searchedTodos.map(renderFunc)}

      {/* Acá usamos solo children, arriba usamos los render props  
        <ul>
          {props.children}
        </ul> 
      */}
    </section>
  );
}

export { TodoList };
