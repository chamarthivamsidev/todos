import { useState, useEffect } from "react";
const axios = require("axios").default;

export const Todos = () => {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, [page]);

  const getData = () => {
    axios
      .get(
        `https://json-mock-server-47.herokuapp.com/todos?_page=${page}&_limit=4`
      )
      .then((res) => {
        let data = res.data;
        setTodo(data);
      });
  };

  return (
    <div>
      <h1 className="title">Todo...</h1>
      <input type="text" className="inputTitle" />
      <br />
      <input
        type="text"
        className="inputBody"
        placeholder="Add Task..."
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button
        className="addBtn"
        onClick={() => {
          const list = { status: false, title: text };
          axios
            .post("https://json-mock-server-47.herokuapp.com/todos", list)
            .then(() => {
              getData();
            });
        }}
      >
        Add
      </button>
      <br />
      <div className="container">
        {todo.map((e) => (
          <div key={e.id} className="list_items">
            {e.id} - {e.title} - {e.status ? "Done" : "Not Done"}
          </div>
        ))}
      </div>
      <button
        className="prev"
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
      >
        Prev
      </button>
      <button
        className="next"
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};
