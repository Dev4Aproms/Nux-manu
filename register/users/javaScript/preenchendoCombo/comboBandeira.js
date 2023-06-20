// FICA MONITORANDO O COMPONENTE COMBOBOX BANDEIRA, VERIFICA SE TEM FOCO
let bandeira = document.querySelector('#bandeira')
window.addEventListener('load', ()=>{
    // let qnt_combo = document.getElementById('bandeira') 
    // let rowsB = qnt_combo.getElementsByTagName('option');

    // if(rowsB.length > 1){
                    
    //     for (let i = rowsB.length - 1; i >= 0; i--) {
            
    //         if(i != 0){
            
    //             rowsB[i].remove();
    //         }
    //     }
    // }
    preenchendoComboBandeira()
})

//------------------ TRAZENDO AS BANDEIRAS EXISTENTES -------------------//
function doesGetBandeira(bandeira,auxNewUpdate) {
    fetch(verificandoUrl()+'bandeira', {
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
                    //Limpa a tabela antes de preencher
                    let selectionBandeira = document.getElementById('bandeira')
                    data.bandeiras.forEach(element =>{
                        let opcao_bandeira = criandoOptionBandeira(element)
                        selectionBandeira.appendChild(opcao_bandeira)
                    })
                // }
                

           
             return data
        })
        .then(()=>{
            let comboBandeira = document.querySelector('#bandeira')
            if (auxNewUpdate === 2) {
                  
                for (let i = 0; i < comboBandeira.options.length; i++) {
                if (comboBandeira.options[i].text === bandeira) {
                    comboBandeira.selectedIndex = i
                }
            }
            }

        }) 
        .catch( error  => console.error(error))
}

//-------------- CRIANDO OS OPTIONS DO COMBOBOX --------------//
function criandoOptionBandeira(bandeira) {
    
    option = document.createElement("option")

    option.innerHTML = bandeira.nome_bandeira

    return option
}

//---- REMOVENDO AS LINHAS EXISTENTES E PREENCHENDO COM NOVAS INFORMACOES ------//
function preenchendoComboBandeira(bandeira,auxNewUpdate) {

   

    doesGetBandeira(bandeira,auxNewUpdate)
}
