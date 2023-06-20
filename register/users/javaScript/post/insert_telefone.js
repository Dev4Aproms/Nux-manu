//--------------------- VALIDACAO DE TELEFONE --------------------//
function validateTelefone(cont) {

    (() => {
        'use strict'
        cont = cont + 1

        if(cont <= 1){
       
          let form = document.getElementById('form-telefone-up')
           form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }else
                if (form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                    adicionarTelefones()
            }
            form.classList.add('was-validated')
          }, false)
        }
      })()

}

//---------------------- ADICIONANDO TELEFONE ------------------------//
function adicionarTelefones(){

    let new_obs = document.getElementById('nome_telefone').value 
    let new_tel = document.getElementById('telefone').value 
    let array_telefone = []
    let wpp = document.getElementById('wpp').checked

    if(wpp === false){
        wpp = 'Não Possui WPP'
    }else{
        wpp = 'Possui WPP'
    }
    
    array_telefone.push([new_obs,new_tel,wpp])
    
    if(document.getElementById('h3').innerText === 'Alterar Dados do Cliente'){
        var params = window.location.search.substring(1).split('&')
            var paramArray = {}
            for (let i = 0; i < params.length; i++) {
                var param = params[i].split('=')
                paramArray[param[0]] = param[1]
                
            }
            
            let id = paramArray['id']
            telefones = {
                "new_obs" : new_obs.trimEnd().trimStart(),
                "new_tel": new_tel.trim().replace(/([^0-9])+/g, ""),
                "wpp"    : wpp,
                "cod_posto": parseInt(id)
            }       
            
            let data = populandoLista(telefones)
           
 
    }

    let lista_telefones = document.getElementById('lista-telefones')
    array_telefone.forEach(element => {
        console.log(element[0])

        let linha = linhaListaTel(element)
        lista_telefones.appendChild(linha)
        
    });
    
    document.getElementById('nome_telefone').value = ''
    document.getElementById('telefone').value = ''
   
    let list_telefones = document.querySelector('#lista-telefones').children

    for (let i = 1; i < list_telefones.length; i++) {
        list_telefones[i].setAttribute('data-bs-toggle', 'list')
    }
}


//--------------------- CRIA A LISTA TELEFONE DE MODAL --------------------//
function linhaListaTel(element) {
    let liLista = document.createElement('li')
    liLista.id = 'liLista'
    
    liLista.className = 'list-group-item'

    liLista.innerHTML = element[1].replace(/[^\d]/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3")+' : '+element[0]+' : '+element[2]
   
    
    return liLista
}

// ----------------------- POPULANDO A LISTA ----------------------//
function populandoLista(telefones){

    fetch(verificandoUrl()+'inserirTel',{
        method: 'POST',
        body: JSON.stringify(telefones),
        headers : {
            'Authorization': 'Bearer '+sessionStorage.getItem('token')
        }
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        if('error' in data){
            if(request.error === 'Token invalido'){
                window.location.replace('../../../../Nux/public/index.html')
            }
        }
        alert('telefone alterado')
        return data
    })
    .catch(error  => console.error(error))
}
