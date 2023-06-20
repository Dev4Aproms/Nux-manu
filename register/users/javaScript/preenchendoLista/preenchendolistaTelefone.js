function preenchendolistatelefone(li_telefone,i) {
    
    textarea = document.createElement('TEXTAREA')
    textarea.className = 'form-control'
    textarea.id = 'textareaTelefone'

    textarea.innerHTML = li_telefone

    return textarea
    
}

function listaTelefone(params) {
    let list_telefones = document.querySelector('#lista-telefones').children
    
    let telefones = []
    let nomeTel = ''
    let telefone = ''
    let possui_wpp = ''

    
    for (let i = 1; i < list_telefones.length; i++) {
        let linha = list_telefones[i].innerText.split(':')
        telefone = linha[0]
        nome = linha[1]
        
        telefones.push([telefone+' - '+nome])
    
    }

    let lista_telefone = document.getElementById('lista-telefone')
    let lista = ''
    telefones.forEach(element => {
        if (typeof textareaTelefone === 'undefined') {
            i = 0
            let li_telefone = preenchendolistatelefone(element)
            lista_telefone.appendChild(li_telefone)
            i++

        }
            lista = lista+element[0]+'\r\n'
    })
    
    document.getElementById('textareaTelefone').innerHTML = lista
    document.getElementById('textareaTelefone').disabled = true 


    return telefones
}