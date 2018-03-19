import React, { Component } from 'react'
import $ from 'jquery'
import InputCustomizado from './InputCustomizado'
import Submit from './Submit'
import PubSub from 'pubsub-js'

export default class FormularioAutor extends Component {

	constructor(){
		super();
		this.state = { nome: '', email: '', senha: '' }
		this.enviaForm = this.enviaForm.bind(this)
    this.setNome = this.setNome.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.setSenha = this.setSenha.bind(this)
	}

  enviaForm(evento) {
    evento.preventDefault();
    $.ajax({
      url: 'https://cdc-react.herokuapp.com/api/autores',
      contentType: 'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
      success: function (novaListagem) {
        // this.props.atualizaLista(resposta)
        PubSub.publish('atualiza-lista', novaListagem)
      },
      error: function (resposta) {
        console.log("erro");
      }
    });
  }

  setNome(evento) {
    this.setState({ nome: evento.target.value });
  }

  setEmail(evento) {
    this.setState({ email: evento.target.value });
  }

  setSenha(evento) {
    this.setState({ senha: evento.target.value });
  }

	render() {
		return (
			<div className="pure-form pure-form-aligned">
				<form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
					<InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome" />
					<InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email" />
					<InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha" />
					<Submit type="submit" />
				</form>
			</div>
		);
	}
}
