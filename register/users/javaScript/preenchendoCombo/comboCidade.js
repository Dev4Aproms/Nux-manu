//------------------- requisicao para cidade -------------------//
function doesGetCidade(sigla_estado,cidade, auxPreUpdate) {

   fetch(verificandoUrl()+'uf?UF='+sigla_estado, {
            headers: {
                'Authorization': 'Bearer '+sessionStorage.getItem('token')
            },
         })
        .then(response => {//recebe o response e ja converte informa no return
    
            return response.json()
        })
        .then(data => {// aqui ja faz o q quer com os dados
                if('error' in data){
                    if(request.error === 'Token invalido'){
                        window.location.replace('../../../../Nux/public/index.html')
                    }
                }
                let selectionCidade = document.getElementById('city')
                data.cidades.forEach(element => {
                    let opcao = criandoOption(element)
                    selectionCidade.appendChild(opcao)
                });

                let selectionCidadeConsulta = document.getElementById('cityConsulta')
                data.cidades.forEach(element => {
                    let opcao = criandoOption(element)
                    selectionCidadeConsulta.appendChild(opcao)
                });
                
             return data
        })
        .then(()=>{
            let comboCidade = document.querySelector('#city')
            if (auxPreUpdate === 2) {
                for (let i = 0; i < comboCidade.options.length; i++) {
                    if (comboCidade.options[i].text === cidade) {
                        comboCidade.selectedIndex = i
                    }
                }
            }else{
                comboCidade.selectedIndex = 1            
            }

        }) 
            
    
        .catch( error  => console.error(error))


}

//---------------- CRIANDO OPTIONS PARA O COMBOBOXCIDADE --------------//
function criandoOption(cidade) {
    
    option = document.createElement("option")//cria o option no section

    option.innerHTML = cidade.nome_cidade

    return option
}

//------- REMOVENDO LINHAS CACHES E REQUISITANDO PARA ADICIONAR AS NOVAS LINHAS -------//
function preenchendoComboCidade(id, cidade,auxPreUpdate) {
    let comboEstado = document.querySelector('#'+id)
    let sigla_estado = comboEstado.options[comboEstado.selectedIndex].value
    
    qnt_combo = document.getElementById('cityConsulta')
    let rowsC = qnt_combo.getElementsByTagName('option');

    //Limpa a tabela antes de preencher
    if(rowsC.length > 1){
       
        for (let i = rowsC.length - 1; i >= 0; i--) {
            
            if(i != 0){
                
                rowsC[i].remove();
            }
        }
    }
  
    qnt_combo = document.getElementById('city')
    let rowsCi = qnt_combo.getElementsByTagName('option');

   doesGetCidade(sigla_estado,cidade,auxPreUpdate)

}
