export default class AutorService{

    constructor(){
        this.url = 'http://localhost:8080/api/autores'
    }

    getAutores = async () => {
        return await this._get(this.url)
    }

    async postAutores(conteudo) {       
        const options = {
            method: 'post',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
            body: JSON.stringify(conteudo),
           
        }
        const response = await fetch(this.url, options)
        const json = await response.json()       
        return json
    }

    _get = async (url) =>{
        const response = await fetch(url, {method: 'GET'})
        return await response.json()
    }
}