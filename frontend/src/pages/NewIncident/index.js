import React, { useState } from "react";
import heroesLogo from "../../assets/logo.svg";
import Api from "../../services/api";

import "./style.css";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function Register() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const ongId = localStorage.getItem("ongId");

  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = { title, description, value };
    try {
      Api.post("incidents", data, {
        headers: {
          Authorization: ongId
        }
      });
      history.push("/profile");
    } catch (error) {
      alert("Erro ao cadastrar caso, tente novamente...");
    }
  }
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={heroesLogo} alt="be the hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um héroi para resolver
            isso.
          </p>
          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Titulo do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
