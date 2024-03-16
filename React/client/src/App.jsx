import React from "react";
import TodoList from "./Components/TodoList";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div>
      <Container>
        <TodoList/>
      </Container>
    </div>
  );
}

export default App;
