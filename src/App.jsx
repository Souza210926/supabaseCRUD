import { useState } from "react";
import "./App.css";
import supabase from "./supabaseClient";

function App() {
  const [listaTarefas, setListaTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  const addTodo = async () => {
    const novosDados = {
      name: novaTarefa,
      completo: false,
    };
    const { data, error } = await supabase
      .from("ListaDeTarefas")
      .insert([novosDados])
      .single();

      if(error) {
        console.log("Erro ao adicionar tarefa:", error);
      }
      else {
        setListaTarefas((prev) => [...prev, data]);
        setNovaTarefa("");
      }

      console.log(listaTarefas)
  };

  return (
    <>
      <div>
        <h1>Lista de Tarefas</h1>
        <div>
          <input
            type="text"
            placeholder="Nova Tarefa"
            onChange={(e) => setNovaTarefa(e.target.value)}
          />
        </div>
        <button onClick={addTodo}>Adicionar item</button>
      </div>

      <ul></ul>
    </>
  );
}

export default App;
