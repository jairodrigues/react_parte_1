import React, {Component} from 'react'
import TabelaLivro from '../Tabelas/TabelaLivro'
import FormularioLivro from '../Formularios/FormularioLivro'
import $ from 'jquery'
import PubSub from 'pubsub-js'

export default class LivroBox extends Component{
    constructor(){
        super()
        this.state = {
            lista : [],
            listaAutores: []
        }
        this.reloadLista = this.reloadLista.bind(this)
    }

    componentDidMount(){
      $.ajax({
        url: "http://localhost:8080/api/autores",
        dataType: 'json',
        success: function (resposta) {
            console.log("chegou a resposta");
            this.setState({ listaAutores: resposta });
        }.bind(this)
    })
      $.ajax({
          url: "http://localhost:8080/api/livros",
          dataType: 'json',
          success: function (resposta) {
              console.log("chegou a resposta");
              this.setState({ lista: resposta });
          }.bind(this)
      })
      PubSub.subscribe('atualiza-livro', function(topico,novaLista){
        this.setState({lista: novaLista})
      }.bind(this))
    }

    reloadLista(novaLista){
      this.setState({lista:novaLista})
    }

    render(){
        return(
            <div>
                <div className="header">
                  <h1>Cadastrar usuarios</h1>
                  <div className="content" id="content">
                      <FormularioLivro listaAutores={this.state.listaAutores}/>
                      <TabelaLivro lista={this.state.lista}/>
                  </div>
                </div>
            </div>
        )
    }
}
