// function validarProposta(params) {

//     (() => {
//         'use strict'
//         // Fetch all the forms we want to apply custom Bootstrap validation styles to
//         const formu = document.querySelectorAll('.needs-validation')

//         // Loop over them and prevent submission
//         Array.from(formu).forEach(form => {
//           form.addEventListener('submit', event => {
//             if (!form.checkValidity()) {
//               event.preventDefault()
//               event.stopPropagation()
//             }else
//                 if (form.checkValidity()) {
//                     event.preventDefault()
//                     event.stopPropagation()
//                     preparandoInformacoes()
//             }
//             form.classList.add('was-validated')
//           }, false)
          
//         })
//       })()
    
//     }

function postProposta(infoProposta, url, id){
    fetch(verificandoUrl()+'pdf',{
        method: 'POST', 
        body: JSON.stringify(infoProposta),
        headers :{
            'Authorization': 'Bearer '+sessionStorage.getItem('token')
        }
       
    })
    .then(response => {
        return response.blob()
    })
    .then(data => {
        consultarPdf(id)
        
        return data
    })
    .catch(error  => console.error(error))
}


function preparandoInformacoes() {
    let url = verificandoUrl()+''

    var params = window.location.search.substring(1).split('&')
    var paramArray = {}
    for (let i = 0; i < params.length; i++) {
        var param = params[i].split('=')
        paramArray[param[0]] = param[1]
        
    }
    
    let id = paramArray['id']

    let dataElaboracao         = document.getElementById('data_elaboracao').value
    let comboPagamento         = document.querySelector('#forma_pagamento')
    let formaPagamento         = comboPagamento.options[comboPagamento.selectedIndex].value
    let comboEnvio             = document.querySelector('#forma_envio')
    let formaEnvio             = comboEnvio.options[comboEnvio.selectedIndex].value
    let taxaMov                = document.getElementById('taxa_movimentacao').value
    let observacoes            = document.getElementById('observacoes_proposta').value
    let comboTipoProposta      = document.querySelector('#tipo_proposta')
    let tipoProposta         = comboTipoProposta.options[comboTipoProposta.selectedIndex].value

    let infoProposta = {
         "id_cliente" : id,
         "tipo_proposta" : tipoProposta,
         "forma_pagamento": formaPagamento,
         "taxa_movimentacao": taxaMov,
         "formas_envio" : formaEnvio,
         "obs":[observacoes]
        }
        

    postProposta(infoProposta, url,id)
    // getConsultaPdf(id)
    limparCamposProposta()

}

function crialinhapdfs(element,data) {
    //funcao que vai criar as linhas da tabela para a consulta
     id_linha_tabela = id_linha_tabela + 1

    //criando o dom/elementos da tabela
    body = document.createElement("tbody")
    linha = document.createElement("tr")
    
    id_linha_tabela%2 == 0 ? linha.className = "background" : linha.className = "no-background"

    tdIdProposta        = document.createElement("th")
    tdDataElaboracao    = document.createElement("td")
    tdColaborador       = document.createElement("td")
    tdTaxaMovimentacao  = document.createElement("td")
    tdBotaoPdf          = criandoGerarPdf()
    

    linha.id        = id_linha_tabela
    tdIdProposta.id   = 'tdIdProposta'
    tdIdProposta.className = 'row-info'
    tdIdProposta.scope = "row"


    tdIdProposta.innerHTML    =   element.id_proposta
    tdDataElaboracao.innerHTML  = element.data_proposta
    tdColaborador.innerHTML        = element.name_user
    tdTaxaMovimentacao.innerHTML        = element.taxa_movimentacao    
    
    linha.appendChild(tdIdProposta)    
    linha.appendChild(tdDataElaboracao)
    linha.appendChild(tdColaborador)
    linha.appendChild(tdTaxaMovimentacao)
    linha.appendChild(tdBotaoPdf)
    
   
    return linha;
}

function limparCamposProposta(params) {
    document.getElementById('forma_pagamento').selectedIndex = "0"
    document.getElementById('forma_envio').selectedIndex = "0"
    document.getElementById('tipo_proposta').selectedIndex = "0"
    document.getElementById('taxa_movimentacao').value = ''
    document.getElementById('observacoes_proposta').value = ''
}
