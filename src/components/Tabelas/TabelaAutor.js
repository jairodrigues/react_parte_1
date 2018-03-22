import React, { Component } from 'react'
import $ from 'jquery'


export default class TabelaAutor extends Component {
    render() {
        return (
            <table className="pure-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.lista.map(function (autor) {
                            return (
                                <tr key={autor.id}>
                                    <td>{autor.nome}</td>
                                    <td>{autor.email}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        )
    }
}
