import React, { Component } from 'react'
import $ from 'jquery'
import InputCustomizado from './InputCustomizado'
import Submit from './Submit'
import PubSub from 'pubsub-js'
import TratadorErros from './TratamentoErros'

export default class FormularioAutor extends Component {

	constructor(){
		super();
		this.state = { nome: '', email: '', senha: '' }
		this.enviaForm = this.enviaForm.bind(this)
    this.setNome = this.setNome.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.setSenha = this.setSenha.bind(this)
    const TrataErros = new TratadorErros();
	}

  enviaForm(evento) {
    evento.preventDefault();
    $.ajax({
      url: 'http://localhost:8080/api/autores',
      contentType: 'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
      beforeSend: function(){
        PubSub.publish("limpa-erros",{});
      },
      success: function (novaListagem) {
        PubSub.publish('atualiza-lista', novaListagem)
        this.setState({nome:'',email:'',senha:''});
      }.bind(this),
      error: function (resposta) {
       new TratadorErros().publicaErros(resposta.responseJSON);
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
