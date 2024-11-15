import "./App.css";
import styled from "styled-components";
import { useState } from "react";
import Header from "./components/Header";
import { TodoList } from "./components/TodoList";

function App() {
  const [dark, setDark] = useState(false);

  return (
    <Body dark={dark}>
      <Top dark={dark}>
        <Header setDark={setDark} dark={dark} />
        <TodoList dark={dark} />
      </Top>
    </Body>
  );
}

export default App;

const Top = styled.div`
  width: 100%;
  height: 200px;
  transition: all 0.5s;

  @media screen and (min-width: 375px) {
  }
  @media screen and (min-width: 768px) {
    height: 300px;
    background-size: 100vw;
  }
`;

const Body = styled.div`
  min-height: 100vh;
  overflow: auto;
  background-color: ${(props) => (props.dark ? "#181723" : "white")};
  transition: all 0.5s;
`;
