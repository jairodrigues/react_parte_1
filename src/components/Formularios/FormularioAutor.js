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
		this.state = {lista:[], nome: '', email: '', senha: '' }
		this.enviaForm = this.enviaForm.bind(this)
    const TrataErros = new TratadorErros();
    this.service = new AutorService();
	}

  enviaForm = async (evento) => {
    evento.preventDefault();  
      PubSub.publish("limpa-erros",{});
      try{
        const resposta = await this.service.postAutores({nome:this.state.nome,email:this.state.email,senha:this.state.senha})
        if(resposta.status == 400){          
          console.log('Deu ruim, vai para o Catch')
          throw resposta         
        }else{
          PubSub.publish('atualiza-lista',resposta)
          this.setState({nome:'',email:'',senha:''});
        }
      }
      catch(err){
        console.log("Cheguei no catch",err)        
        const error = new TratadorErros().publicaErros(err)
        if(error){
          this.setState({nome:'',email:'',senha:''});
        }
      }
      finally{  
        console.log('Cai no Finally, Sempre to aqui')
        PubSub.subscribe('atualiza-lista', function(topico,novaLista){
          this.setState({lista: novaLista})
        }.bind(this))
      }
     
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
