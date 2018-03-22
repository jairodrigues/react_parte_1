import React, { Component } from 'react'
import InputCustomizado from './InputCustomizado'
import Submit from './Submit'
import $ from 'jquery'
import TratadorErros from '../Erros/TratamentoErros'
import PubSub from 'pubsub-js'

export default class FormularioLivro extends Component{

  constructor(){
    super()
    this.enviaFormTitulo = this.enviaFormTitulo.bind(this)
    const trataErros = new TratadorErros();
    this.state = {
      lista : [],
      titulo : '',
      preco: '',
      autorId: ''
    }
  }

  enviaFormTitulo(evento){
    evento.preventDefault();
    $.ajax({
      url: "http://localhost:8080/api/livros",
      contentType: 'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({ titulo: this.state.titulo, preco:this.state.preco, autorId: this.state.autorId }),
      beforeSend: function(){
        PubSub.publish("limpa-erros",{});
      },
      success: function (novaListagem) {
        PubSub.publish('atualiza-livro', novaListagem)
        this.setState({titulo:'',preco:'',autorId:''});
      }.bind(this),
      error: function (resposta) {
         new TratadorErros().publicaErros(resposta.responseJSON);
      }
    });
  }

  salvaAlteracao(nomeInput,evento){
    let campo = {};
    campo[nomeInput] = evento.target.value;
    this.setState(campo);
  }


  render(){
    const { listaAutores } = this.props
    return(
      <div>
        <div className="pure-form pure-form-aligned">
          <form className="pure-form pure-form-aligned" onSubmit={this.enviaFormTitulo}>
            <InputCustomizado id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.salvaAlteracao.bind(this,'titulo')} label="Titulo" />
            <InputCustomizado id="preco" type="text" name="preco" value={this.state.preco} onChange={this.salvaAlteracao.bind(this,'preco')} label="Preço" />
            <div className="pure-control-group">
              <label htmlFor="autorId">Autor</label>
              <select name="autorId" id="autorId" onChange={this.salvaAlteracao.bind(this,'autorId')} value={this.state.autorId}>
              <option value="">Selecione autor</option>
                {console.log(listaAutores)}
                {

                    listaAutores.map(function(autor) {
                    return <option key={ autor.id } value={ autor.id }>
                              { autor.nome }
                              {console.log('AutorID',autor.id)}
                          </option>;
                  })
                }
              </select>
            </div>
            <Submit type="submit" />
          </form>
        </div>

  </div>
    )
  }
}
