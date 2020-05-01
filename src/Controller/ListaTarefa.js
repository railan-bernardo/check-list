class ControllerTarefa{
    constructor(formId, tableId){
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        this.boxLista  = document.querySelector('.box-lista');

        this.onSubmit();
        this.selectAll();
    }

    //evento de envio de formulario 
    onSubmit(){
        this.formEl.addEventListener('submit', event =>{

            event.preventDefault();

            let btn = this.formEl.querySelector('[type=submit]');

            btn.disabled = true;
            btn.style.background = "#cccccc";
            btn.style.cursor = "not-allowed";
            let values = this.getValues();
            
            if(!values) return false;
            this.insert(values);
            this.addLine(values);
            this.formEl.reset();
             this.buttonOn();

        });
    }

    //pegar todos os campos de formulario e os valores
    getValues(){

        let list = {};
        let isValue = true;

        [...this.formEl.elements].forEach((field, index) =>{

            if(['nome'].indexOf(field.name) > -1 && !field.value){

                alert("Digite uma Tarefa");
                isValue = false;

                field.addEventListener('keypress', e =>{
                    this.buttonOn();
                });

            }else{
                list[field.name] = field.value;
            }

        });

        if(!isValue){
            return false;    
        }
        return new Tarefa(
            list.nome
        );

    }

    //carregar da sessionStorage
    getListStorage(){
        let listas = [];

        if(sessionStorage.getItem('applist')){
            listas = JSON.parse(sessionStorage.getItem('applist'));
        }

        return listas;
    }

    //adicionando na linha da tr
    selectAll(){
        let listas = this.getListStorage();

        listas.forEach(dataLista =>{

            let app = new Tarefa();

            app.loadFromJSON(dataLista);

            this.addLine(app);

        });
    }

    //inseri na sessionStorage
    insert(data){
        let listas = this.getListStorage();

        listas.push(data);

        sessionStorage.setItem('applist', JSON.stringify(listas));
    }

    //adicionando linha na tabela e os evento de checado ou pendente
    addLine(dataList){

        let tr = document.createElement('tr');

        tr.innerHTML = `
        <td>${dataList.nome}</td>
        <td>
        <span class="icon-circle-o pendente"></span>
        <span class="icon-check-circle feito" ></span>
        </td>
       
        `;

        this.eventTR(tr);

        this.tableEl.appendChild(tr);

    }

    //eventos dos botõe de pendente e checado 
    eventTR(tr){
        tr.querySelector('.pendente').addEventListener("click", e =>{
            
            this.showCheck(tr);
            this.showAlert();
            this.interval();
 
            tr.querySelector('.feito').addEventListener('click', e =>{
 
                this.showPendent(tr);
                this.showAlertD();
                this.intervalD();
 
            });
         });
    }

    //mostra o status checado e esconde o status pendente
    showCheck(tr){
        tr.querySelector('.feito').style.display = "block";
        tr.querySelector('.pendente').style.display = "none";
    }

    //mostra  o status pendente e esconde o checado
    showPendent(tr){
        tr.querySelector('.feito').style.display = "none";
       tr.querySelector('.pendente').style.display = "block";
    }

    //habilita o botão novamente
    buttonOn(){
        this.formEl.querySelector('[type=submit]').disabled = false;
        this.formEl.querySelector('[type=submit]').style.background = "#f34a16";
        this.formEl.querySelector('[type=submit]').style.cursor = "pointer";
    }

    //criar o alerta na tela
    showAlert(){
        
        let success = document.createElement('div');

        success.classList.add('alert-success');
        success.innerHTML = "Tarefa Concluida!"
        success.style.visibility = "visible";
        success.style.transform = "translateY(50px)";
        success.style.transition = ".3s"; 
        
        this.boxLista.appendChild(success);

    }

        //criar o alerta na tela
        showAlertD(){

            let errors = document.createElement('div');
 
            errors.classList.add('alert-danger');
            errors.innerHTML = "Conclua Sua Tarefa!";
                    errors.style.transform = "translateY(50px)";
                    errors.style.transition = ".5s";
                    errors.style.visibility = "visible";
            
            this.boxLista.appendChild(errors);
       
        }


    //remove o alerta da tela
    interval(){
      let set =  setInterval(() =>{
            let msg = document.querySelector('.box-lista .alert-success');
          // clearInterval(msg);
          msg.remove('alert-success')
        }, 5000);

        setTimeout(() =>{
            clearInterval(set);
        }, 6000);

    }

    intervalD(){
        
        let del =  setInterval(() =>{
            let msgd = document.querySelector('.box-lista .alert-danger');
           // clearTimeout(this.showAlert());
          msgd.remove('alert-danger')
        }, 5000);

        setTimeout(() =>{
            clearInterval(del);
        }, 6000);
    }

    
}