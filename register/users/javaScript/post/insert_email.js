// ---------------- validar o email ----------------//
function validarEmail(cont) {

    (() => {
        'use strict'
        cont = cont + 1
        if(cont <= 1){
          let form = document.getElementById('form-email-up')
          form.addEventListener('submit', event => {
            console.log(form)
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }else
                if (form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                    adicionarEmail(form)
            }
            form.classList.add('was-validated')
          }, false)
        }       
      })()

}

//--------------------- ADICIONANDO E INSERINDO EMAILS --------------------//
function adicionarEmail(form){

    let new_name = document.getElementById('nome_email').value 
    let new_email = document.getElementById('email').value 

    let array_email = []
    array_email.push([new_name,new_email])

    if(document.getElementById('h3').innerText === 'Alterar Dados do Cliente'){
        var params = window.location.search.substring(1).split('&')
            var paramArray = {}
            for (let i = 0; i < params.length; i++) {
                var param = params[i].split('=')
                paramArray[param[0]] = param[1]
                
            }

            let id = paramArray['id']
            let emails = {
                'new_name' : new_name.trim(),
                'new_email': new_email,
                'cod_posto': parseInt(id)
            }        
            
            let data = populandoListaEmail(emails)
    }

    let lista_emails = document.getElementById('lista-emails')
    array_email.forEach(element => {
        console.log(element)
        let linha = linhaLista(element)
        lista_emails.appendChild(linha)
        
    });
    
    document.getElementById('nome_email').value = ''
    document.getElementById('email').value = ''
   
    let list_emails = document.querySelector('#lista-emails').children
    form.classList.add('was-validated')
    for (let i = 1; i < list_emails.length; i++) {
        list_emails[i].setAttribute('data-bs-toggle', 'list')
    }
}


// ------------------ ADICIONANDO DADOS NA LISTA DO MODAL ----------------//
function linhaLista(element) {
    
    let liLista = document.createElement('li')
    liLista.id = 'liLista'
    
    liLista.className = 'list-group-item'
    

    liLista.innerHTML = element[1]+' : '+element[0]
   
    
    return liLista
}

// ----------------- REQUISICAO COM AS INDFORMACOES -----------------//
function populandoListaEmail(emails){    
    fetch(verificandoUrl()+'inserirEmail',{
        method: 'POST',
        body: JSON.stringify(emails),
        headers : {
            'Authorization': 'Bearer '+sessionStorage.getItem('token')
        }
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data)
        if('error' in data){
            if(request.error === 'Token invalido'){
                window.location.replace('../../../../Nux/public/index.html')
            }
        }
        alert('email alterado')
        return data
    })
    .catch(error  => console.error(error))
}