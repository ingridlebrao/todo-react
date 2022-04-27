/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { FaEdit, FaPlus, FaWindowClose } from 'react-icons/fa';
import './Main.css';

export default class Main extends Component {
  state = {
    novaTarefa: '',
    tarefas: [],
    index: -1,
  };

  componentDidUpdate() {
    console.log(this.state.novaTarefa);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { tarefa, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (tarefa.indexOf(novaTarefa) !== -1) return;

    const novasTarefas = [...tarefa];

    if (index === -1) {
      this.setState({
        tarefas: [...novasTarefas, novaTarefa],
        novaTarefa: '',
      });
    } else {
      novasTarefas[index] = novaTarefa;

      this.setState({
        tarefas: novasTarefas,
        index: -1,
      });
    }

    this.setState({
      tarefa: [...novasTarefas, novaTarefa],
      novaTarefa: '',
      index: -1,
    });
  };

  handleChange = (event) => {
    this.setState({
      novaTarefa: event.target.value,
    });
  };

  handleDelete = (e, index) => {
    const { tarefa } = this.state;
    const novasTarefas = [...tarefa];

    novasTarefas.splice(index, 1);

    this.setState({
      tarefa: [...novasTarefas],
    });
  };

  handleEdit = (e, index) => {
    const { tarefas } = this.state;

    this.setState({
      index,
      novaTarefa: tarefas[index],
    });
  };

  render() {
    const { novaTarefa, tarefa } = this.state;

    return (
      <div className="main">
        <h1>Lista de tarefas</h1>

        <form onSubmit={this.handleSubmit} action="#" className="form">
          <input
            onChange={this.handleChange}
            value={novaTarefa}
            type="text"
            placeholder="Nova tarefa"
          />
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="tarefas">
          {tarefa.map((tarefas) => (
            <li key={tarefas}>
              {tarefas}
              <div className="icons">
                <FaEdit onClick={(e) => this.handleEdit(e)} className="edit" />
                <FaWindowClose
                  onClick={(e) => this.handleDelete(e)}
                  className="delete"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
