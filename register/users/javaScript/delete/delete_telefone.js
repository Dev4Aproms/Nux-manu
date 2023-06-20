
//---------- PREPARANDO OS TELEFOENS PARA O DELETE ---------//
function deleteTelefone(params) {
    let list_telefones = document.querySelector('#lista-telefones').children

    
    for (let i = 1; i < list_telefones.length; i++) {
        let classe = list_telefones[i].className

        if(list_telefones[i].className === 'list-group-item active'){
            if(document.getElementById('h3').innerText === 'Pré-Cadastro'){
                list_telefones[i].remove()
                
            }else{
                alert('entrou para a request')
                var params = window.location.search.substring(1).split('&')
                var paramArray = {}
                for (let i = 0; i < params.length; i++) {
                    var param = params[i].split('=')
                    paramArray[param[0]] = param[1]
                    
                }

                let id = paramArray['id']
                
                let telefone = list_telefones[i].innerText
                telefone = telefone.split(':')
                
                let telefones = {
                    'new_tel' : telefone[0].replace(/([^0-9])+/g, ""),
                    'cod_posto' : parseInt(id)
                }
                deletandoTelefone(telefones)
                list_telefones[i].remove()
            }
        }
    }    
}

//----------- REQUISICAO PARA DELETAR OS TELEFONES ------------//
function deletandoTelefone(params) {
    //verificar qual paramentro enviar para o back
    console.log(JSON.stringify(params))
    fetch(verificandoUrl()+'DeletarTel',{
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
        alert('email deletado')
        return data
    })
    .catch(error  => console.error(error))

}

