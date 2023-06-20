
//--------- REQUISICAO PARA OS COMBOBOX DE PROPOSTA COMERCIAL ---------//
function pegandoDados(){
    fetch(verificandoUrl()+'getDadosProposta', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+sessionStorage.getItem('token')
        },
     })
    .then( response => {
        return response.json()
    })
    .then( data => {

        if('error' in data){
            if(request.error === 'Token invalido'){
                window.location.replace('../../../../Nux/public/index.html')
            }
        }

                    qnt_combo = document.getElementById('forma_pagamento')
                    let rowsR = qnt_combo.getElementsByTagName('option');

                    //Limpa a tabela antes de preencher
                    if(rowsR.length > 1){
                    
                        for (let i = rowsR.length - 1; i >= 0; i--) {
                            
                            if(i != 0){
                                
                                rowsR[i].remove();
                            }
                        }
                    }
        
        let selectionPagamento = document.getElementById('forma_pagamento')
            data.forma_pagamento.forEach(element => {
                
                let opcao = criandoOptionProposta(element)
                selectionPagamento.appendChild(opcao)
            });


                    qnt_combo = document.getElementById('forma_envio')
                    let rowsFE = qnt_combo.getElementsByTagName('option');

                    //Limpa a tabela antes de preencher
                    if(rowsFE.length > 1){
                    
                        for (let i = rowsFE.length - 1; i >= 0; i--) {
                            
                            if(i != 0){
                                
                                rowsFE[i].remove();
                            }
                        }
                    }
        let selectionEnvio = document.getElementById('forma_envio')
        data.formas_envio.forEach(element => {

            let opcao = criandoOptionProposta(element)
            selectionEnvio.appendChild(opcao)
        });

        qnt_combo = document.getElementById('tipo_proposta')
                    let rowsTP = qnt_combo.getElementsByTagName('option');

                    //Limpa a tabela antes de preencher
                    if(rowsTP.length > 1){
                    
                        for (let i = rowsTP.length - 1; i >= 0; i--) {
                            
                            if(i != 0){
                                
                                rowsTP[i].remove();
                            }
                        }
                    }

        let selectionProposta = document.getElementById('tipo_proposta')
        data.tipo_proposta.forEach(element => {

            let opcao = criandoOptionProposta(element)
            selectionProposta.appendChild(opcao)
        });
        
    })
    .catch()
}

//------------ CRIANDO AS OPTIONS DOS COMBOBOX -----------//
function criandoOptionProposta(params) {
    option = document.createElement("option")//cria o option no section

    option.innerHTML = params

    return option
}