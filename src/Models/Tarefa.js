class Tarefa{
    constructor(nome){
        this._nome = nome;
    }

    get nome(){
        return this._nome;
    }


    loadFromJSON(json){

        for(let name in json){

            this[name] = json[name];

        }

    }
}