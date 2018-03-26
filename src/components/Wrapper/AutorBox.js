import React, {Component} from 'react'
import TabelaAutor from '../Tabelas/TabelaAutor'
import FormularioAutor from '../Formularios/FormularioAutor'
import $ from 'jquery'
import PubSub from 'pubsub-js'
import AutorService from '../../Services/AutorService'

export default class AutorBox extends Component {
    constructor() {
        super()
        this.state = {
            lista: []
        }
        this.service = new AutorService()
        this.reloadLista = this.reloadLista.bind(this)
    }

    componentDidMount = async () => {
        try{
            const response = await this.service.getAutores()
            this.setState({lista:response})
        }catch(error){
            console.log('ERRO',error)
        }
        finally{
            PubSub.subscribe('atualiza-lista', function(topico,novaLista){
                this.setState({lista: novaLista})
            }.bind(this))
        }
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

