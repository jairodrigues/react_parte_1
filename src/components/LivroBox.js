import React, {Component} from 'react'
import TabelaLivro from './TabelaLivro'
import FormularioLivro from './FormularioLivro'
import $ from 'jquery'
import PubSub from 'pubsub-js'

export default class LivroBox extends Component{
    constructor(){
        super()
        this.state = {
            lista : []
        }
    }

    componentDidMount(){
        $.ajax({
          url: "https://cdc-react.herokuapp.com/api/livros",
          dataType: 'json',
          success: function (resposta) {
              console.log("chegou a resposta");
              this.setState({ lista: resposta });
          }.bind(this)
      })
    }

    render(){
        return(
            <div>
                <div className="header">
                <h1>Cadastrar usuarios</h1>            
                <div className="content" id="content">
                    <TabelaLivro/>
                    <FormularioLivro lista={this.state.lista}/>
                </div>
            </div>
        )
    }
}