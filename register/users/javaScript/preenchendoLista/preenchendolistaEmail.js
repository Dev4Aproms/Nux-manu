function preenchendolistaemail(li_email) {
    
    textarea = document.createElement('TEXTAREA')
    textarea.className = 'form-control'
    textarea.id = 'textareaEmail'

    textarea.innerHTML = li_email

    return textarea
    
}

function listaEmail(params) {
    
    let list_emails = document.querySelector('#lista-emails').children
      
    
    let emails = []
    let nome = ''
    let email = ''


    for (let i = 1; i < list_emails.length; i++) {
        let linha = list_emails[i].innerText.split(':')
        email = linha[0]
        nome = linha[1]
        console.log(email, nome)
        emails.push([email+' - '+nome])
    
    }

    // console.log(nome,email)
  
    let lista_email = document.getElementById('listaEmail')
    let lista = ''
    emails.forEach(element => {
        if (typeof textareaEmail === 'undefined') {
            i = 0
            let li_email = preenchendolistaemail(element)
            lista_email.appendChild(li_email)
            i++
        }
            
            lista = lista+element[0]+'\r\n'
    })
  
    document.getElementById('textareaEmail').innerHTML = lista
    document.getElementById('textareaEmail').disabled = true 

}
