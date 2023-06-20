function deleteEmail(params) {
    let list_emails = document.querySelector('#lista-emails').children

    
    for (let i = 1; i < list_emails.length; i++) {
        let classe = list_emails[i].className
        if(list_emails[i].className === 'list-group-item active'){
            if(document.getElementById('h3').innerText === 'Pré-Cadastro'){
                list_emails[i].remove()
            }else{
                var params = window.location.search.substring(1).split('&')
                var paramArray = {}
                for (let i = 0; i < params.length; i++) {
                    var param = params[i].split('=')
                    paramArray[param[0]] = param[1]
                    
                }
                let id = paramArray['id']
                let email = list_emails[i].innerText
                email = email.split(':')
                
                let emails = {
                    'new_email' : email[0].trimEnd(),
                    'cod_posto' : parseInt(id)
                }
                deletandoEmail(emails)
                list_emails[i].remove()
            }
        }
    }    
}

function deletandoEmail(params) {
    //verificar qual paramentro enviar para o back
    console.log(JSON.stringify(params))
    fetch(verificandoUrl()+'DeletarEmail',{
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer '+sessionStorage.getItem('token')
        },
        body: JSON.stringify(params)
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
        return data
    })
    .catch(error  => console.error(error))

}

