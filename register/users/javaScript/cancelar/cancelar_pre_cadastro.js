function cancelar(){
    history.pushState(null, null, 'http://200.174.50.66/Nux/register/users/pages/creat_client.html')
    const h3 = document.querySelector('#h3')
    h3.textContent = 'Pré-Cadastro'
    document.getElementById('proposta-comercial').style.display = 'none'
    document.getElementById('table-consulta_proposta').style.display = 'none'
    let inputs_form = document.querySelector('#Pre_Cadastro')
    let filho_form = inputs_form.children

    Array.from(filho_form).forEach(filho_form => {
        filho_div = filho_form.children
        if (filho_div[1] != null) {
            if (filho_div[1].tagName == 'INPUT') {
                document.getElementById(filho_div[1].id).value = ' '
            }else  
                if(filho_div[1].tagName == 'SELECT'){
                    document.getElementById(filho_div[1].id).selectedIndex = "0"
                }else
                    if(filho_div[1].tagName == 'DIV'){
                        let textarea = filho_div[1].children

                        document.getElementById(textarea[0].id).value = ' '
                    }
        }      
    })

    
    

    
}