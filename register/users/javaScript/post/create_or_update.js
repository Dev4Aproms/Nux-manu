//--------------------- VALIDAR CAMPO ---------------------------//
function validate(cont) {
    (() => {
    'use strict'
      const forms = document.querySelectorAll('.needs-validation')

      let form = document.getElementById('Pre_Cadastro')
      form.addEventListener('submit', event => {
        cont = cont + 1
        if (cont <= 1) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
          
        }else{
                event.preventDefault()
                event.stopPropagation()
                updateOrInsert()
        }
    }
        form.classList.add('was-validated')
      }, false)
  })()

}

// --------------------------- UPDATE OR INSERT -----------------//
function updateOrInsert() {
  let opcao = document.getElementById('h3').innerText
  if(opcao === 'Alterar Dados do Cliente'){
    jsonParaOPatch()
    
  }else{
    preUser()
  }
}

//----------------------- PRE CADASTRO PREPARANDO OS DADOS PARA ENVIO ----------------------//

function preUser() {
    // *Essa função vai ser responsável por verificar e montar o array para o save dos emails*
    // *Após isso, vai enviar para o post de create user*
    let url = verificandoUrl() + "preCadastro"
   

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
    
   let pessoal = {
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

    let resposta = doesPost(pessoal,url)
    let data = JSON.parse(resposta)
    console.log(data)

    if('error' in data){
        if(data.error === 'Token invalido'){
                    window.location.replace('../../../../Nux/public/index.html')
        }else{
            alert(data.error)
        }
    }else{
        openTab3(event, 'consulta')
        document.getElementById('table-consulta').style.display = 'block'
        parametrosConsulta('nomefantasia')
    }
}


// ------------------------- VERIFICANDO OS EMAILS -------------------------//
function verificandoEmails() {
// //pegar os ids dos campos, pelo controle de campo que esta no outro arquivo
let list_emails = document.querySelector('#lista-emails').children
      
    
let emails = []
let nome = ''
let email = ''

for (let i = 1; i < list_emails.length; i++) {
    let linha = list_emails[i].innerText.split(':')
    email = linha[0]
    nome = linha[1]
    
    emails.push([email,nome])

}
    return emails
}

// ---------------------- VERIFICANDO TELEFONES ----------------------//
function verificandoTelefones() {
    
let list_telefones = document.querySelector('#lista-telefones').children
let telefones = []

for (let i = 1; i < list_telefones.length; i++) {
    let linha = list_telefones[i].innerText.split(':')
    let telefone = linha[0]

    let nome = linha[1]
    let wpp = linha[2]
    if(wpp === ' Possui WPP'){
        wpp = 1
    }else{
        wpp = 0
    }
    if (telefones[0] != '') {
        telefones.push([telefone.replace(/([^0-9])+/g, ""),nome,wpp])    
    }
    }
    console.log(telefones)
    return telefones
}
 
// ---------------------------- FEZENDO A REQUISICAO POST ----------------------------//
function doesPost(informationUser,url) {
// *doesPost = funcao responsavel por fazer a request, enviar as informacoes para o back
    
    let request = new XMLHttpRequest();
    request.open("POST", url, false);
    request.setRequestHeader('Authorization', 'Bearer '+sessionStorage.getItem('token'))
    request.send(JSON.stringify(informationUser));
    

    request.onload = function(){
        console.log(this.status);
    }

    if('error' in request){
        if(request.error === 'Token invalido'){
            window.location.replace('../../../../Nux/public/index.html')
        }
    }

    return request.responseText; 

}

//------------------------- MUDANDO O TAB --------------------------//
function openTab3(evt, tabName) {
    let i, tabcontent, tablinks
    tabcontent = document.getElementsByClassName('tabcontent')
    for(i = 0; i < tabcontent.length; i++){
        tabcontent[i].style.display = "none"
    }
    tablinks = document.getElementsByClassName('tablinks')
    for(i = 0; i < tablinks.length; i++){
        tablinks[i].className = tablinks[i].className.replace(" active", " ")
    }
    document.getElementById(tabName).style.display = 'block'
    document.getElementById('tabConsulta').className += 'active'
}