import React from "react";

/* TodoHeader solo se encarga de ser un contenedor para los componentes que manejan estado*/
const TodoHeader = ({ children }) => {
  return (
    <header>
        {children}
    </header>

  )
}

export { TodoHeader };