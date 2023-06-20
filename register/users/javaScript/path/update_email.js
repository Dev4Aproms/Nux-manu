//-------------- FUNCAO QUE VAI ALTERAR OS EMAILS --------------//
function alterarEmails(params) {
    let old_name
    let old_email
    let new_name
    let new_email

    //verifica se esta habilitado ou nao
    //se estiver, significa que é o primeiro clique
    //se nao, significa que nao é o primeiro clique no botao
    if(document.getElementById('add-emails').disabled == true){

        let list_emails = document.querySelector('#lista-emails').children
        for (let i = 1; i < list_emails.length; i++) {
            
            if(list_emails[i].className === 'list-group-item active'){
                
                let linha = list_emails[i].innerText.split(':')
                old_email = linha[0]
                old_name = linha[1]
                new_email = document.getElementById('email').value
                new_name = document.getElementById('nome_email').value
                list_emails[i].innerHTML = new_email+' : '+new_name
            }
            list_emails[i].disabled = false
        }
        
        if(document.getElementById('h3').innerText === 'Alterar Dados do Cliente'){
            var params = window.location.search.substring(1).split('&')
            var paramArray = {}
            for (let i = 0; i < params.length; i++) {
                var param = params[i].split('=')
                paramArray[param[0]] = param[1]
                
            }

            let id = paramArray['id']
            
            updateEmail = {
                "old_name" : old_name.trimEnd().trimStart(),
                "old_email": old_email.trimEnd(),
                "new_name" : new_name.trimEnd().trimStart(),
                "new_email": new_email.trimEnd(),
                "cod_posto": id
            }

            alterandoEmail(updateEmail)
        } 

        document.getElementById('add-emails').disabled = false
        document.getElementById('delete-emails').disabled = false

    }else{
        let list_emails = document.querySelector('#lista-emails').children
        list_emails[0].disabled = true
        for (let i = 1; i < list_emails.length; i++) {
            let classe = list_emails[i].className
            if(list_emails[i].className === 'list-group-item active'){
                
                document.getElementById('add-emails').disabled = true
                document.getElementById('delete-emails').disabled = true
    
                let linha = list_emails[i].innerText.split(':')
                document.getElementById('email').value = linha[0]
                document.getElementById('nome_email').value = linha[1]
                
                    // deletandoEmail(params)
                    
            }else{
                list_emails[i].disabled = true
            }
    
            list_emails[i].setAttribute('data-bs-toggle', 'list')
        }
    }


    
}

//------------ REQUISICAO PARA ALTERAR O EMAIL --------------//
function alterandoEmail(params) {

    fetch( verificandoUrl()+'alterarEmail', {
        method: 'PATCH',
        body: JSON.stringify(params),
        headers:{
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

        alert('email alterado')
        return data
    })
    .catch(error  => console.error(error))

}