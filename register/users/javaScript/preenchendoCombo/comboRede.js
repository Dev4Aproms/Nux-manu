
//------------- REALIZANDO A REQUISIÇAO PARA PREENCHER O COMBOBOX --------//
function doesGetRedes(rede,auxNewUpdate) {
    
    fetch(verificandoUrl()+'rede', {
        // 200.174.50.42/nix 
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
                    
                    let selectionRedes = document.getElementById('rede')
                    data.redes.forEach(element =>{
                        let opcao_rede = criandoOptionRede(element)
                        selectionRedes.appendChild(opcao_rede)
                    
                    })
                
           
             return data
        })
        .then(()=>{
            let comboRedes = document.querySelector('#rede')
            if (auxNewUpdate === 2) {
                  
                for (let i = 0; i < comboRedes.options.length; i++) {
                if (comboRedes.options[i].text === rede) {
                    comboRedes.selectedIndex = i
                }
            }
            }

        }) 
        .catch( error  => console.error(error))


}
//------------ CRIANDO AS OPTIONS DO COMBOBOX -----------//

function criandoOptionRede(redes) {
    
    option = document.createElement("option")

    option.innerHTML = redes.nome_rede

    return option
}

function preenchendoComboRedes(rede,auxNewUpdate) {
    qnt_combo = document.getElementById('rede')
   let rowsR = qnt_combo.getElementsByTagName('option');

    //     //Limpa a tabela antes de preencher
  if(rowsR.length > 1){
    
        for (let i = rowsR.length - 1; i >= 0; i--) {
            
            if(i != 0){
                
                 rowsR[i].remove();
            }
        }
    }
    doesGetRedes(rede,auxNewUpdate)
}
