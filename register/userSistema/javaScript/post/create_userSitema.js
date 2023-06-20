function createUserSistema(infoUser, url){
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(infoUser)
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data)

        alert('usuario cadastrado')
        return data
    })
    .catch(error  => console.error(error))
}

function parametrosUserSistema(params) {
    let url = verificandoUrlUser()+'cadastrar/'

    let name_user = document.getElementById('nome_completo').value
    let login = document.getElementById('usuario').value
    let senha = document.getElementById('senha').value 
    let comboSector = document.querySelector('#setor')
    let setor  = comboSector.options[comboSector.selectedIndex].value
    let cnpj = document.getElementById('cnpj').value.replace(/([^0-9])+/g, "")
    let razaoSocial = document.getElementById('razaoSocialUser').value
    let telefone = document.getElementById('telefone_usuario').value
    let email = document.getElementById('email_usuario').value

    let infoUser = {
        "name_user" : name_user,
        "cellphone" : telefone.trim().replace(/([^0-9])+/g, ""),
        "razao_social": razaoSocial,
        "sector" : setor,
        "login" : login,
        "cnpj" : cnpj,
        "password_user" : senha,
        "email_user" : email,
        
    }
    console.log(JSON.stringify(infoUser))

    alert('1')
    createUserSistema(infoUser, url)

}