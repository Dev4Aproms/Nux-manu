let id_linha_tabela = 0 // AUXILIA COM A ORGANIZACAO DAS TABELAS DINAMICAS

// ----------------------- CONSULTANDO PDFS -----------------//
function getConsultaPdf(id_posto, criando) {
    
    fetch(verificandoUrl()+'consultaPdf',{
        method: 'POST',
        body: JSON.stringify(id_posto),
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
        let table_pesquisa = document.getElementById('table_consulta_pdf')
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
        tbody_consulta_pdf = document.getElementById('tbody_pdf')
        data.forEach(element => {
            
            let linha = crialinhapdf(element,data)
            tbody_consulta_pdf.appendChild(linha)

        });
        return data
    })

    .catch(error  => console.error(error))
}

//--------------------- PREPARANDO A CONSULTA DE PDF ----------------//
function consultarPdf(id_cliente) {
            var params = window.location.search.substring(1).split('&')
            var paramArray = {}

            for (let i = 0; i < params.length; i++) {
                var param = params[i].split('=')
                paramArray[param[0]] = param[1]
                
            }
            
            let id = paramArray['id']
            let infoId = {
                'id_posto' : id_cliente
            }

            let data = getConsultaPdf(infoId)
           
}

// --------------------- CRIANDO LINHA DA TABELA ----------------------//
function crialinhapdf(element,data) {
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

    tdIdProposta.innerHTML         = element.id_proposta
    tdDataElaboracao.innerHTML     = element.data_proposta
    tdColaborador.innerHTML        = element.name_user
    tdTaxaMovimentacao.innerHTML   = element.taxa_movimentacao    
    
    linha.appendChild(tdIdProposta)    
    linha.appendChild(tdDataElaboracao)
    linha.appendChild(tdColaborador)
    linha.appendChild(tdTaxaMovimentacao)
    linha.appendChild(tdBotaoPdf)
    
   
    return linha;
}

// --------------------- CRIANDO O GERAR PDF --------------------//
function criandoGerarPdf(data){
    let buttonPdf = document.createElement('button')
    let ico = document.createElement('i')
    ico.classList = "bi bi-filetype-pdf"

    buttonPdf.type = 'button'
    buttonPdf.className = 'mb-1 mt-1'
    buttonPdf.id = 'buttonPdf'
    buttonPdf.appendChild(ico)

    buttonPdf.onclick = function(){
        chamandoGerarPdf(buttonPdf)
       
    } 

    ico.onclick = function(){
        chamandoGerarPdf(buttonPdf)
       
    } 
    
    return buttonPdf
}

function chamandoGerarPdf(params) {
    let id_proposta = showpdf(buttonPdf)
    let infoIdProposta = {
        'id_proposta' : parseInt(id_proposta)
    }

    fetch(verificandoUrl()+'verificaToken',{
        method: 'POST',
        body: JSON.stringify(id_proposta),
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
            window.location.href = '../../users/pages/page_pdf.html?id='+id_proposta;
        }
        return data
    })
    .catch( error => console.error(error) )
      
      
    //   'http://200.174.50.172/Nux/register/users/pages/page_pdf.html?id='+id_proposta
      gerandoPdf(infoIdProposta)
}

//---------------------- ID DA PROPOSTA ---------------------//
function showpdf() {

    let table_consulta_pdf = document.getElementById('table_consulta_pdf')
    let rowUm = event.target.parentNode.id;
    let id_prop = document.getElementById(rowUm).firstChild.innerText
    return id_prop
}

// ---------------------- GERANDO O PDF ---------------------//
function gerandoPdf(id_proposta) {

    fetch(verificandoUrl()+'geraConsultaPdf',{
        method : 'POST',
        body : JSON.stringify(id_proposta),
        headers : {
            'Authorization': 'Bearer '+sessionStorage.getItem('token')
        }
    })
    .then(function(response) {
        return response.blob()})
    .then(function(myBlob) {
        var objectURL = URL.createObjectURL(myBlob);
        document.querySelector('#pdf-frame').src = '';
        document.querySelector('#pdf-frame').src = objectURL;
	    objectURL = URL.revokeObjectURL(myBlob)
        
    })  
    .then(
        function() {
        window.setTimeout(function() {
        document.querySelector('#pdf-frame').contentWindow.print();
        }, 1000)
    });

}