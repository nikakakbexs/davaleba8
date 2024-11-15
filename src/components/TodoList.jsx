import styled from "styled-components";
import { useState } from "react";

export const TodoList = ({ dark }) => {
  const [checked, setChecked] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [filteredTodo, setFilteredTodo] = useState(todoList);
  const [showFilter, setShowFilter] = useState(false);

  const handleChecked = () => {
    setChecked(!checked);
  };

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    const task = {
      id: todoList.length + 1,
      taskName: newTask,
      completed: checked,
    };

    const updatedList = [...todoList, task];
    setTodoList(updatedList);
    setFilteredTodo(updatedList);
    setNewTask("");
  };

  const deleteTask = (id) => {
    const updatedList = todoList.filter((task) => task.id !== id);
    setTodoList(updatedList);
    setFilteredTodo(updatedList);
  };

  const deleteTodos = () => {
    setTodoList([]);
    setFilteredTodo([]);
  };

  const filterHandler = (status) => {
    if (status === "active") {
      setShowFilter(true);
      setFilteredTodo(todoList.filter((item) => !item.completed));
    } else if (status === "completed") {
      setShowFilter(true);
      setFilteredTodo(todoList.filter((item) => item.completed));
    } else {
      setShowFilter(false);
      setFilteredTodo(todoList);
    }
  };

  const completeTask = (id) => {
    const updatedList = todoList.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTodoList(updatedList);
    setFilteredTodo(updatedList);
  };

  return (
    <Wrapper>
      <InputDiv onSubmit={addTodo} dark={dark}>
        <Checked onClick={handleChecked} checked={checked}></Checked>
        <Input
          dark={dark}
          type="text"
          onChange={handleChange}
          value={newTask}
          placeholder="Create a new todo…"
        />
      </InputDiv>

      <TodosDiv dark={dark}>
        {(showFilter ? filteredTodo : todoList).map((elem) => (
          <TodoItem key={elem.id} dark={dark}>
            <Checked
              onClick={() => completeTask(elem.id)}
              checked={elem.completed}
            ></Checked>
            <ListItem completed={elem.completed} dark={dark}>
              {elem.taskName}
            </ListItem>
            <Delete onClick={() => deleteTask(elem.id)}></Delete>
          </TodoItem>
        ))}
      </TodosDiv>

      <FilterWrapper>
        <FilterContainer dark={dark}>
          <Left>{todoList.length} items left</Left>
          <ClearButton onClick={deleteTodos}>Clear Tasks</ClearButton>
        </FilterContainer>
        <FilterButtons dark={dark}>
          <ActiveBtn onClick={() => filterHandler("all")}>All</ActiveBtn>
          <ActiveBtn onClick={() => filterHandler("active")}>Active</ActiveBtn>
          <ActiveBtn onClick={() => filterHandler("completed")}>
            Completed
          </ActiveBtn>
        </FilterButtons>
      </FilterWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 572px;
  margin: 40px auto;
  padding: 0 16px;
`;

const InputDiv = styled.form`
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: ${(props) => (props.dark ? "#25273D" : "#FFFFFF")};
  padding: 0 20px;
  height: 64px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s;
`;

const Checked = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid ${(props) => (props.dark ? "#393A4B" : "#E3E4F1")};
  background: ${(props) =>
    props.checked ? "linear-gradient(#55DDFF, #C058F3)" : "none"};
  cursor: pointer;
`;

const Img = styled.img`
  width: 16px;
  height: 16px;
`;

const Input = styled.input`
  flex: 1;
  font-size: 18px;
  border: none;
  margin-left: 12px;
  background: transparent;
  color: ${(props) => (props.dark ? "#C8CBE7" : "#494C6B")};
  outline: none;
`;

const TodosDiv = styled.div`
  margin-top: 16px;
  border-radius: 5px;
  overflow: hidden;
  background-color: ${(props) => (props.dark ? "#25273D" : "#FFFFFF")};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s;
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 64px;
  background-color: ${(props) => (props.dark ? "#25273D" : "#FFFFFF")};
  border-bottom: 1px solid ${(props) => (props.dark ? "#393A4B" : "#E3E4F1")};
  transition: background-color 0.3s;
`;

const ListItem = styled.span`
  flex: 1;
  margin-left: 16px;
  color: ${(props) => (props.completed ? "#A4A7B2" : "#494C6B")};
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  font-size: 16px;
  transition: color 0.3s;
`;

const Delete = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.dark ? "#C8CBE7" : "#494C6B")};
  font-size: 18px;
`;

const FilterContainer = styled.div`
  position: relative;
  height: 48px;
  width: 540px;
  background-color: ${(props) => (props.dark ? "#25273D" : "#FFFFFF")};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(99, 99, 99, 0.2);
  transition: background-color 0.3s;
  gap: 10px;

  & > span:first-child {
    flex: 1;
    text-align: left;
  }

  & > div {
    flex: 2;
    display: flex;
    justify-content: center;
    gap: 15px;
  }

  & > span:last-child {
    flex: 0;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  @media (max-width: 600px) {
    width: 100%;
    align-items: center;
    gap: 8px;
    padding: 10px 0;
    margin-bottom: 10px;

    & > span:first-child,
    & > div {
      flex: unset;
      text-align: center;
      margin-left: 15px;
    }
  }
`;

const FilterWrapper = styled.div`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
  z-index: 5;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const Left = styled.span`
  color: ${(props) => (props.dark ? "#767992" : "#5B5E7E")};
  font-size: 14px;
  font-weight: 500;
  z-index: 5;
`;

const FilterButtons = styled.div`
  position: relative;
  height: 48px;
  border-radius: 5px;
  background-color: ${(props) => (props.dark ? "#25273D" : "#FFFFFF")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  transition-duration: 0.3s;
  z-index: 3;
  margin-top: -50px;
  z-index: 3;

  @media (max-width: 600px) {
    width: 100%;
    height: auto;
    box-shadow: 0 2px 8px rgba(99, 99, 99, 0.2);
    padding: 10px 0;
    margin-top: 0px;
  }
`;

const ActiveBtn = styled.span`
  cursor: pointer;
  color: ${(props) => (props.dark ? "#C8CBE7" : "#5B5E7E")};
  font-size: 14px;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 3px;
  transition: color 0.3s, background-color 0.3s;
  z-index: 6;

  &:hover {
    color: #3a7cfd;
  }
`;

const ClearButton = styled.span`
  cursor: pointer;
  color: ${(props) => (props.dark ? "#767992" : "#5B5E7E")};
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s;
  z-index: 5;

  &:hover {
    color: #3a7cfd;
  }
`;
