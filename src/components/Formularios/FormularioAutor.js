import React, { Component } from 'react'
import $ from 'jquery'
import InputCustomizado from './InputCustomizado'
import Submit from './Submit'
import PubSub from 'pubsub-js'
import TratadorErros from '../Erros/TratamentoErros'
import AutorService from '../../Services/AutorService'

export default class FormularioAutor extends Component {

	constructor(){
		super();
		this.state = { nome: '', email: '', senha: '' }
		this.enviaForm = this.enviaForm.bind(this)
    const TrataErros = new TratadorErros();
    this.service = new AutorService();
	}

  enviaForm = async (evento) => {
    evento.preventDefault();
    // const response
    try{
      PubSub.publish("limpa-erros",{});
      const response = await this.service.postAutores({nome:this.state.nome,email:this.state.email,senha:this.state.senha})
      this.setState({nome:'',email:'',senha:''});
    }catch(error){
      console.log('ERRO',error)
      // new TratadorErros().publicaErros(response.responseJSON)
    }


    // $.ajax({
    //   url: 'http://localhost:8080/api/autores',
    //   contentType: 'application/json',
    //   dataType: 'json',
    //   type: 'post',
    //   data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
    //   beforeSend: function(){
    //     
    //   },
    //   success: function (novaListagem) {
    //     PubSub.publish('atualiza-lista', novaListagem)
    //     this.setState({nome:'',email:'',senha:''});
    //   }.bind(this),
    //   error: function (resposta) {
    //    new TratadorErros().publicaErros(resposta.responseJSON);
    //   }
    // });
  }

  salvaAlteracao(nomeInput,evento){
    let campo = {};
    campo[nomeInput] = evento.target.value;
    this.setState(campo);
  }


	render() {
		return (
			<div className="pure-form pure-form-aligned">
				<form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
					<InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.salvaAlteracao.bind(this,'nome')} label="Nome" />
					<InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.salvaAlteracao.bind(this,'email')} label="Email" />
					<InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.salvaAlteracao.bind(this,'senha')} label="Senha" />
					<Submit type="submit" />
				</form>
			</div>
		);
	}
}
