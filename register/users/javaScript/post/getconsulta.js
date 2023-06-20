let id_linha_tabela = 0 // AUXILIA NA CRIACAO DA TABELA

//------------------- RESPONSAVEL PELA REQUISICAO CONSULTA -------------------//
function getQuery(url,pesquisa,table_pesquisa) {
    let request = new XMLHttpRequest();
    
    request.open("POST", url, false);
    request.setRequestHeader('Authorization', 'Bearer '+sessionStorage.getItem('token'))
    request.send(JSON.stringify(pesquisa));
    request.onload = function(){
        console.log(this.responseText);
    }
    if('error' in request){
        if(request.error === 'Token invalido'){
            window.location.replace('../../../../Nux/public/index.html')
        }
    }
    return request.responseText; 

}

//------------------- CRIANDO A LINHA DA TABELA DE CONSULTA ---------------------//
function crialinha(element,data) {
    //funcao que vai criar as linhas da tabela para a consulta
     id_linha_tabela = id_linha_tabela + 1
    console.log(data)
    //criando o dom/elementos da tabela
    body = document.createElement("tbody")
    linha = document.createElement("tr")
    
    id_linha_tabela%2 == 0 ? linha.className = "background" : linha.className = "no-background"

    tdIdClient      = document.createElement("th")
    tdNomeFantasia  = document.createElement("td")
    tdCidade        = document.createElement("td")
    tdEstado        = document.createElement("td")
    tdCnpj          = document.createElement("td")
    tdRazaoSocial   = document.createElement("td")
    tdAcoesBotao    = document.createElement("td")
    tdBotaoUpDoc    = criandoBotaoUploadDocumentos(data)
    tdBotaoAlterar  = criandoBotaoAlterar(data)
    

    linha.id        = id_linha_tabela
    tdIdClient.id   = 'tdNome'
    tdIdClient.className = 'row-data'
    tdIdClient.scope = "row"
    tdCnpj.id        = 'cnpj'+id_linha_tabela
    let documento = verificandoDocumento(element.cnpj)

    tdIdClient.innerHTML      = element.id_cliente
    tdNomeFantasia.innerHTML  = element.nome_fantasia
    tdCidade.innerHTML        = element.nome_cidade
    tdEstado.innerHTML        = element.sigla    
    tdCnpj.innerHTML          = documento
    tdRazaoSocial.innerHTML   = element.razao_social
    
    linha.appendChild(tdIdClient)
    linha.appendChild(tdNomeFantasia)
    linha.appendChild(tdCidade)
    linha.appendChild(tdEstado)
    linha.appendChild(tdCnpj)
    linha.appendChild(tdRazaoSocial)
    linha.appendChild(tdBotaoUpDoc)
    linha.appendChild(tdBotaoAlterar)
    // body.appendChild(linha)
   
    return linha;
}

// ---------------- VERIFICANDO SE É CNPJ OU CPF ---------------//
function verificandoDocumento(params) {
    if(params.length === 14){
       return cnpj(params)
    }else   
        if(params.length === 11){
           return cpf(params)
        }else{
            return params
        }
}

// ------------------ MASCARA CNPJ ------------------//
function cnpj(v) {
    
    v=v.replace(/\D/g,"")                           //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/,"$1.$2")             //Coloca ponto entre o segundo e o terceiro dígitos
    v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
    v=v.replace(/\.(\d{3})(\d)/,".$1/$2")           //Coloca uma barra entre o oitavo e o nono dígitos
    v=v.replace(/(\d{4})(\d)/,"$1-$2")              //Coloca um hífen depois do bloco de quatro dígitos
    
    return v
}

//------------------- MASCARA CPF -------------------//
function cpf(v){
    
    v=v.replace(/\D/g,"")                    //Remove tudo o que não é dígito
    v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
    v=v.replace(/(\d{3})(\d)/,"$1.$2")       //Coloca um ponto entre o terceiro e o quarto dígitos
                                            //de novo (para o segundo bloco de números)
    v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
    return v
}


// --------------------- ENVIANDO FILTROS DE PESQUISA ------------------//
function parametrosConsulta(param) {
    id_linha_tabela = 0

    //funcao que vai juntar os paramentros necessarios para a request
    let table_pesquisa = document.getElementById('table_consulta')

    let comboEst = document.getElementById('estadoConsulta')
    let estadoConsulta = comboEst.options[comboEst.selectedIndex].value
    let comboCid = document.getElementById('cityConsulta')
    let cidadeConsulta = comboCid.options[comboCid.selectedIndex].value
    let nomeFantasia = document.getElementById('nome_fantasia_consulta').value
    let razaoSocial = document.getElementById('razao_social_consulta').value
    let cnpj = document.getElementById('cnpj_consulta').value
    let codigo = document.getElementById('codigo_consulta').value
     
    

    url = verificandoUrl()+'consulta'
    
    let pesquisa = {
        'estadoConsulta' : estadoConsulta,
        'cidadeConsulta' : cidadeConsulta,
        'nomeFantasia'   : nomeFantasia,
        'razaoSocial'    : razaoSocial,
        'cnpj'           : cnpj.replace(/[/.-]/g, ""),
        'codigo'         : parseInt(codigo)
    }


    let data = getQuery(url,pesquisa,table_pesquisa)
    data = JSON.parse(data)
    let rows = table_pesquisa.getElementsByTagName('tr');
    //Limpa a tabela antes de preencher
    if(rows.length > 1){
       
        for (let i = rows.length - 1; i >= 0; i--) {
            
            if(i != 0){
                
                rows[i].remove();
            }
        }
    }
    //Preenche tabela
    tbody_pesquisa = document.getElementById('tbody_consulta_cliente')
    data.forEach(element => {
        
        let linha = crialinha(element,data)
        tbody_pesquisa.appendChild(linha)
    });
    
}


// ---------- CRIANDO O BOTAO DE ALTERAR E SUAS FUNCOES -----------//
function criandoBotaoAlterar(data){
    let buttonUp = document.createElement('button')
    let iconUp = document.createElement('i')
    buttonUp.type = 'button'
    buttonUp.className = 'mb-1 mt-1'
    iconUp.className = 'bx bxs-edit-alt'
    buttonUp.appendChild(iconUp)
    buttonUp.id = 'buttonUp'
    dataCli = data

    buttonUp.onclick = function(){//------------------ AÇOES DO BOTAO -----------------//
        
        btnUpdate(dataCli,buttonUp, 'botaoUp')
        //-------------------------- verificando validação ------------------------//
    }

    iconUp.onclick = function(){
        btnUpdate(dataCli, iconUp, 'icone')
    }
    return buttonUp
}

function btnUpdate(dataCli, buttonUpdate, icone_botao){
    let id_client = show(buttonUpdate, icone_botao)
    let pessoa = ''
    dataCli.forEach(element => {
        if (element.id_cliente == id_client) {

            pessoa = element    
        }
        
    });
    console.log(pessoa.razao_social)
    alert(1)
    document.getElementById('table-consulta').style.display = 'none'
    preenchendoCamposUp(pessoa)

    const h3 = document.querySelector('#h3')
    h3.textContent = 'Alterar Dados do Cliente'
    

    openTab2(event, 'preCadastro')
    
    document.getElementById('proposta-comercial').style.display = 'block'
    document.getElementById('table-consulta_proposta').style.display = 'block'
    
    pegandoDados()
    consultarPdf(pessoa.id_cliente)
    
    let dataAtual = new Date()
    document.getElementById('data_elaboracao').value = dataAtual.getFullYear()+'-'+String(dataAtual.getMonth()+1).padStart(2,'0')+'-'+String(dataAtual.getDate()).padStart(2,'0')

    fetch(verificandoUrl()+'verificaToken',{
        method: 'POST',
        headers:{
            'Authorization': 'Bearer '+sessionStorage.getItem('token')
        }
        
    })
    .then(response =>{
        return response.json()
    })
    .then(data => {
        if('error' in data){
            window.location.replace('../../../../Nux/public/index.html')
        }else{
            history.pushState(null, null, '../../users/pages/creat_client.html?id='+pessoa.id_cliente)
        }
        return data
    })
    .catch( error => console.error(error) )
} 



function criandoBotaoUploadDocumentos(data){
    let buttonUpDoc = document.createElement('button')
    let iconUpDoc = document.createElement('i')
    iconUpDoc.id = 'iconUpDoc'
    buttonUpDoc.type = 'button'
    buttonUpDoc.className = 'mb-1 mt-1'
    iconUpDoc.className = 'bx bxs-cloud-upload'
    buttonUpDoc.appendChild(iconUpDoc)
    buttonUpDoc.id = 'buttonUpDoc'
    dataCli = data

    buttonUpDoc.onclick = function(){//------------------ AÇOES DO BOTAO -----------------//
        let id_client = show(buttonUpDoc)
        let pessoa = ''
        dataCli.forEach(element => {
            if (element.id_cliente == id_client) {
                pessoa = element    
            }
            
        });

        console.log(pessoa.cnpj)
        
        sessionStorage.setItem('infosEmpresa', btoa(pessoa.razao_social)+','+btoa(pessoa.cnpj))    
        window.location.href = "../../../upload_docs/Page/paginateste.html"
        // '../upload_docs/Page/paginateste.html'

    }  
    
    iconUpDoc.onclick = function() {
        let id_client = show(buttonUpDoc)
        let pessoa = ''
        dataCli.forEach(element => {
            if (element.id_cliente == id_client) {
                pessoa = element    
            }
            
        });

        console.log(pessoa.cnpj)
        
        sessionStorage.setItem('infosEmpresa', btoa(pessoa.razao_social)+','+btoa(pessoa.cnpj))    
        window.location.href = "../../../upload_docs/Page/paginateste.html"
    }
    return buttonUpDoc
}


//--------------- PREENCHENDO OS CAMPOS DA ALTERACAO DE DADOS DO CLIENTES ----------------//
function preenchendoCamposUp(pessoa){
    document.getElementById('razao_social').value = pessoa.razao_social
    document.getElementById('nome_fantasia').value = pessoa.nome_fantasia
    document.getElementById('contact_client').value = pessoa.contato
    document.getElementById('cnpj').value = pessoa.cnpj
    criarMascaraCNPJ('cnpj')

    document.getElementById('regiao_atua').value = pessoa.regiao_atua
    document.getElementById('endereco_client').value = pessoa.endereco

    document.getElementById('date_visit').value = pessoa.data_visita
    
    document.getElementById('numero_postos').value = 0
    document.getElementById('colaborador').value = " "
    document.getElementById('observacoes').value = pessoa.observacoes
 
    let estado = pessoa.sigla
    let comboEstado = document.querySelector('#estado')
        for (let i = 0; i < comboEstado.options.length; i++) {
            if (comboEstado.options[i].text === estado) {
                comboEstado.selectedIndex = i
                preenchendoComboCidade('estado',pessoa.nome_cidade, 2) 
            }
        }
    

    let redes = pessoa.nome_rede
    let comboRede = document.querySelector('#rede')
  
    preenchendoComboRedes(redes,2)

    let bandeira = pessoa.nome_bandeira
    let comboBandeira = document.querySelector('#bandeira')

    preenchendoComboBandeira(bandeira,2)

    let list_email = document.getElementById('lista-emails')
    let rows = list_email.getElementsByTagName('li');

    //Limpa a tabela antes de preencher
    if(rows.length > 1){
       
        for (let i = rows.length - 1; i >= 0; i--) {
            
            if(i != 0){
                
                rows[i].remove();
            }
        }
    }


    let paramsEm = pessoa.emails
    let paramEm = paramsEm.split(',')
  
    let lista_emails = document.getElementById('lista-emails')
    paramEm.forEach(element => {
       
        let linha = linhadaLista(element)
        lista_emails.appendChild(linha)
    });

    let list_emails = document.querySelector('#lista-emails').children

    for (let i = 1; i < list_emails.length; i++) {
        list_emails[i].setAttribute('data-bs-toggle', 'list')
    }
    
// preenchendo o textarea do email
    let lista_email = document.getElementById('listaEmail')
    let listaE = ''
    paramEm.forEach(element => {
        if (typeof textareaEmail === 'undefined') {
            i = 0
            let li_email = preenchendolistaemailArea(element)
            lista_email.appendChild(li_email)
            i++
        }
            
        listaE = listaE+element+'\r'
    })
  
    document.getElementById('textareaEmail').innerHTML = listaE
    document.getElementById('textareaEmail').disabled = true
    

    // //Preenchendo os telefones
    let list_telefone = document.getElementById('lista-telefones')
    let rowsTel = list_telefone.getElementsByTagName('li');

    //Limpa a tabela antes de preencher
    if(rowsTel.length > 1){
       
        for (let i = rowsTel.length - 1; i >= 0; i--) {
            
            if(i != 0){
                
                rowsTel[i].remove();
            }
        }
    }

    let paramsTel = pessoa.telefones
    let paramTel = paramsTel.split(',')
    let lista_telefones = document.getElementById('lista-telefones')
    
    paramTel.forEach(element => {
        
        let tel = element.split(':')
        let telefone = tel[0].replace(/[^\d]/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3")
        let linha = linhadaLista(telefone+' : '+tel[1])
        lista_telefones.appendChild(linha)

    });
     
    let list_telefones = document.querySelector('#lista-telefones').children

    for (let i = 1; i < list_telefones.length; i++) {
        list_telefones[i].setAttribute('data-bs-toggle', 'list')
    }
     
    let lista_telefones2 = document.getElementById('lista-telefone')
    let lista = ''
    paramTel.forEach(element => {
        if (typeof textareaTelefone === 'undefined') {
            i = 0
            let li_telefone = preenchendolistatelefoneArea(element)
            lista_telefones2.appendChild(li_telefone)
            i++

        }
            lista = lista+element+'\r'
    })

    document.getElementById('colaborador').value = atob(sessionStorage.getItem('user'))
    
    document.getElementById('textareaTelefone').innerHTML = lista
    document.getElementById('textareaTelefone').disabled = true 
     

}


// ------------------ PREENCHENDO A LISTA DE EMAILS DO USUARIO ---------------//
function preenchendolistaemailArea(li_email) {
    
    textarea = document.createElement('TEXTAREA')
    textarea.className = 'form-control'
    textarea.id = 'textareaEmail'

    textarea.innerHTML = li_email

    return textarea
    
}

// ------------------ PREENCHENDO A LISTA DE TELEFONES DO USUARIO ---------------//
function preenchendolistatelefoneArea(li_telefone,i) {
    
    textarea = document.createElement('TEXTAREA')
    textarea.className = 'form-control'
    textarea.id = 'textareaTelefone'

    textarea.innerHTML = li_telefone

    return textarea
    
}

//---------------- MONTANDO AS LISTAS ------------//
function linhadaLista(element) {
    let liLista = document.createElement('li')
    liLista.className = 'list-group-item'

    liLista.innerHTML = element
    


    return liLista
}

//----------------------- PEGA O ID DO CLIENTE PARA A ATERACAO --------------------//
function show(buttonUpdate, icone_botao) {
    //o id das linhas da tabela consulta cliente e consulta proposta sao as mesmas
    //para que as consultas fiquem certas, antes de pegar o id, eh necessario excluir as linhas da outra tabela
    let table_pesquisa = document.getElementById('table_consulta_pdf')
    let rows = table_pesquisa.getElementsByTagName('tr');

    //Limpa a tabela antes de realizar o calculo de id
    if(rows.length > 1){
    
        for (let i = rows.length - 1; i >= 0; i--) {
            
            if(i != 0){
                
                rows[i].remove();
            }
        }
    }
    let rowId
    if(icone_botao === 'icone'){
        rowId = event.target.parentNode.parentNode.id;
    }else{
        rowId = event.target.parentNode.id;
    }
    
    let data = document.getElementById(rowId).querySelectorAll(".row-data")
    let id = data[0]

    let id_user = id.innerHTML
     return id_user
}

//-------------------- MUDANDO O TAB --------------------//
function openTab2(evt, tabName) {
    // if('error' in request){
    //     if(request.error === 'Token invalido'){
    //         window.location.replace('../../../../Nux/public/index.html')
    //     }
    // }
    let i, tabcontent, tablinks
    tabcontent = document.getElementsByClassName('tabcontent')
    for(i = 0; i < tabcontent.length; i++){
        tabcontent[i].style.display = "none"
    }
    tablinks = document.getElementsByClassName('tablinks')
    for(i = 0; i < tablinks.length; i++){
        
        tablinks[i].className = tablinks[i].className.replace(" active", "")
    }
    document.getElementById(tabName).style.display = 'block'
    document.getElementById('tabPreCadastro').className += 'active'

}

