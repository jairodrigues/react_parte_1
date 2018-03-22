import React, {Component} from 'react'
import $ from 'jquery'


export default class TabelaLivro extends Component{
    render(){
        return(
        <div>
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
                  this.props.lista.map(function (livro) {
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
