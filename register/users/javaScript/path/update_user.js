
//------------ REQUISICAO PARA A ALTERAÇÃO DE DADOS DO CLIENTE ---------------//
function testandoOPatch(update, id){

    fetch(verificandoUrl()+'alterar/'+id, {
        method: 'PATCH',
        headers:{
                'Authorization': 'Bearer '+sessionStorage.getItem('token')
            },
        body: JSON.stringify(update)
        })
    .then( response => {
        alert('ooiii')
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
    .catch( error  => console.error(error))    
    
    }

//------------- ORGANIZANDO OS DADOS PARA O ENVIO ---------------//
function jsonParaOPatch() {
    event.preventDefault()

    var params = window.location.search.substring(1).split('&')
    var paramArray = {}
    for (let i = 0; i < params.length; i++) {
        var param = params[i].split('=')
        paramArray[param[0]] = param[1]
        
    }

    let id = paramArray['id']

    // let id_user

    let razao_social        = document.getElementById('razao_social').value
    let nome_fantasia       = document.getElementById('nome_fantasia').value
    let endereco            = document.getElementById('endereco_client').value
    let cnpj                = document.getElementById('cnpj').value.replace(/([^0-9])+/g, "")
   
    let comboEstado         = document.querySelector('#estado')
    let estado              = comboEstado.options[comboEstado.selectedIndex].value
    
    let comboCidade         = document.querySelector('#city')
    let cidade              = comboCidade.options[comboCidade.selectedIndex].value
    let regiao_atua         = document.getElementById('regiao_atua').value
    let data_visita         = document.getElementById('date_visit').value
    let comboBandeira       = document.querySelector('#bandeira')
    let bandeira            = comboBandeira.options[comboBandeira.selectedIndex].value
    let comboRede           = document.querySelector('#rede')
    let rede                = comboRede.options[comboRede.selectedIndex].value
    let numPostos           = document.getElementById('numero_postos').value
    let comboStatus         = document.querySelector('#status')
    let status              = comboStatus.options[comboStatus.selectedIndex].value
    let contato_cliente     = document.getElementById('contact_client').value
    let observacoes         = document.getElementById('observacoes').value
    
    // let resposta = verificandoDadosInputs(estado,cidade,bandeira,rede)
    // resposta == "falso"   ? break;
    
    // if (status === 'Fechado') {
    //     alert('Este cadastro possui o Status = Fechado, portanto não poderá mais realizar alterações de pré cadastro')
    // }

   let update = {
        "razao_social" : razao_social,   
        "nome_fantasia"  : nome_fantasia, 
        "cnpj"           : cnpj, 
        "contato_c"      : contato_cliente,
        "regiao_atua"    : regiao_atua,
        "uf"             : estado, 
        "nome_cidade"    : cidade, 
        "nome_bandeira"  : bandeira, 
        "nome_rede"      : rede, 
        "endereco"       : endereco, 
        "data_visita"    : data_visita,
        "emails"         : verificandoEmails(),
        "telefones"      : verificandoTelefones(),    
        "observacoes"    : observacoes,
    }
     let url = verificandoUrl()+'alterar/'+id
     let data = testandoOPatch(update,id)
    //  window.location.href = '../../users/pages/creat_client.html'
}