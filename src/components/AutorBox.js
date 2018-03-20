import React, {Component} from 'react'
import TabelaAutor from './TabelaAutor'
import FormularioAutor from './FormularioAutor'
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
            url: "https://cdc-react.herokuapp.com/api/autores",
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
          <div className="content" id="content">
            <FormularioAutor/>
            <TabelaAutor lista={this.state.lista}/>
      </div>
        )
    }
}
