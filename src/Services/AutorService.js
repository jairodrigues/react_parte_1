export default class AutorService{

    constructor(){
        this.url = 'http://localhost:8080/api/autores'
    }

    getAutores = async () => {
        return await this._get(this.url)
    }

    postAutores = async (conteudo) =>{       
            const options = {
                credentials: 'include',
                method: 'POST',   
                contentType: 'application/json',
                dataType: 'json',
                type: 'post',             
                body: JSON.stringify(conteudo),
            }
            const response = await fetch(this.url, options)
            return await response.json()
    }

    _get = async (url) =>{
        const response = await fetch(url, {method: 'GET'})
        return await response.json()
    }
}