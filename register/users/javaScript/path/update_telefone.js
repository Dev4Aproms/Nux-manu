
//---------------- ALTERANDO OS TELEFONES -------------//
function alterarTelefones(params) {
    let old_obs
    let old_tel
    let new_obs
    let new_tel
    let wpp

    //verifica se esta habilitado ou nao
    //se estiver, significa que é o primeiro clique
    //se nao, significa que nao é o primeiro clique no botao
    if(document.getElementById('add-telefones').disabled == true){
        
        let list_telefones = document.querySelector('#lista-telefones').children
        
        for (let i = 1; i < list_telefones.length; i++) {
            
            if(list_telefones[i].className === 'list-group-item active'){
                
                let linha = list_telefones[i].innerText.split(':')
                old_tel = linha[0]
                old_obs = linha[1]
                new_tel = document.getElementById('telefone').value
                new_obs = document.getElementById('nome_telefone').value
                wpp = document.getElementById('wpp').checked
                if(wpp === 'f'){
                    wpp = 0
                }else{
                    wpp = 1
                }
                
                list_telefones[i].innerHTML = new_tel+' - '+new_obs
            }
            list_telefones[i].disabled = false
        }
        if(document.getElementById('h3').innerText === 'Alterar Dados do Cliente'){
            var params = window.location.search.substring(1).split('&')
            var paramArray = {}
            for (let i = 0; i < params.length; i++) {
                var param = params[i].split('=')
                paramArray[param[0]] = param[1]
                
            }

            let id = paramArray['id']
            
            updateTelefone = {
                "old_obs" : old_obs.trimEnd().trimStart(),
                "old_tel": old_tel.trim().replace(/([^0-9])+/g, ""),
                "new_obs" : new_obs.trimEnd().trimStart(),
                "new_tel": new_tel.trim().replace(/([^0-9])+/g, ""),
                "wpp"    : wpp,
                "cod_posto": parseInt(id)
            }
            
            alterandoTelefone(updateTelefone)
        } 


        document.getElementById('add-telefones').disabled = false
        document.getElementById('delete-telefones').disabled = false
    }else{
        let list_telefones = document.querySelector('#lista-telefones').children
        list_telefones[0].disabled = true
        for (let i = 1; i < list_telefones.length; i++) {
         
            if(list_telefones[i].className === 'list-group-item active'){
                
                document.getElementById('add-telefones').disabled = true
                document.getElementById('delete-telefones').disabled = true
    
                let linha = list_telefones[i].innerText.split(':')
                document.getElementById('telefone').value = linha[0]
                document.getElementById('nome_telefone').value = linha[1]
                    
            }else{
                list_telefones[i].disabled = true
            }
    
            list_telefones[i].setAttribute('data-bs-toggle', 'list')
        }
    }


    
}

//------------- REQUISICAO PARA ALTERAR TELEFONES --------------//
function alterandoTelefone(params) {
    
    fetch( verificandoUrl()+'alterarTel', {
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

        alert('telefone alterado')
        return data
    })
    .catch(error  => console.error(error))

}