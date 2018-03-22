import React, {Component} from 'react'
import TabelaAutor from '../Tabelas/TabelaAutor'
import FormularioAutor from '../Formularios/FormularioAutor'
import $ from 'jquery'
import PubSub from 'pubsub-js'

export default class AutorBox extends Component {
    constructor() {
        super()
        this.state = {
            lista: []
        }
        this.reloadLista = this.reloadLista.bind(this)
    }

    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/api/autores",
            dataType: 'json',
            success: function (resposta) {
                console.log("chegou a resposta");
                this.setState({ lista: resposta });
            }.bind(this)
        })
        PubSub.subscribe('atualiza-lista', function(topico,novaLista){
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
            <FormularioAutor/>
            <TabelaAutor lista={this.state.lista}/>
        </div>
        </div>
        </div>
        )
    }
}

