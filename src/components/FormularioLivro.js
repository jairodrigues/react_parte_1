import React, { Component } from 'react'
import InputCustomizado from './InputCustomizado'
import Submit from './Submit'
import $ from 'jquery'
import TratadorErros from './TratamentoErros'
import PubSub from 'pubsub-js'

export default class FormularioLivro extends Component{

  constructor(){
    super()
    this.enviaFormTitulo = this.enviaFormTitulo.bind(this)
    this.setTitulo = this.setTitulo.bind(this)
    this.setPreco = this.setPreco.bind(this)
    this.setAutorId = this.setAutorId.bind(this)
    const trataErros = new TratadorErros();
    this.state = {
      lista : [],
      titulo : '',
      preco: '',
      autor: ''
    }
  }

  componentDidMount(){
      $.ajax({
        url: "localhost:8080/api/livros",
        dataType: 'json',
        success: function (resposta) {
            console.log("chegou a resposta");
            this.setState({ lista: resposta });
        }.bind(this)
    })
  }

  enviaFormTitulo(evento){
    evento.preventDefault();
    $.ajax({
      url: 'https://localhost:8080/api/livros',
      contentType: 'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({ titulo: this.state.titulo, preco: this.state.preco, autor: this.state.autor }),
      beforeSend: function(){
        PubSub.publish("limpa-erros",{});
      },
      success: function (novaListagem) {
        PubSub.publish('atualiza-lista', novaListagem)
        this.setState({titulo:'',preco:'',autor:''});
      }.bind(this),
      error: function (resposta) {
         new TratadorErros().publicaErros(resposta.responseJSON);
      }
    });
  }

  setTitulo(evento) {
    this.setState({ titulo: evento.target.value });
  }

  setPreco(evento) {
    this.setState({ preco: evento.target.value });
  }

  setAutorId(evento){
    this.setState({autorId: evento.target.value})
  }

  render(){
    return(
      <div>
        <div className="pure-form pure-form-aligned">
          <form className="pure-form pure-form-aligned" onSubmit={this.enviaFormTitulo}>
            <InputCustomizado id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo} label="Titulo" />
            <InputCustomizado id="preco" type="text" name="preco" value={this.state.preco} onChange={this.setPreco} label="Preço" />
            <InputCustomizado id="autorId" type="text" name="autorId" value={this.state.autorId} onChange={this.setAutorId} label="AutorId" />
            <div className="pure-control-group">
              <label htmlFor="autorId">Autor</label>
                <select name="autorId" id="autorID" onChange={this.setAutorId}>
                  <option value="">Selecione autor</option>
                </select>
            </div>
            <Submit type="submit" />
          </form>
        </div>
        <div className="header">
           <h1>Cadastrar usuarios</h1>
        </div>
        <div className="content" id="content">
          <table className="pure-table">
            <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Preço</th>
                    <th>Nome do Autor</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
              {
                  this.state.lista.map(function (livro) {
                      return (
                          <tr key={livro.id}>
                              <td>{livro.titulo}</td>
                              <td>{livro.preco}</td>
                              <td>{livro.autor.nome}</td>
                              <td>{livro.autor.email}</td>
                          </tr>
                      );
                  })
              }
            </tbody>
          </table>
        </div>
  </div>
    )
  }
}
