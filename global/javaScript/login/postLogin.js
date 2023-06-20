
    function postLogin(informationLogin,url){

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(informationLogin)

         })
        .then(response => {//recebe o response e ja converte informa no return
    
            return response.json()})
        .then(data => {// aqui ja faz o q quer com os dados
            let tokens = data.token
        //     console.log(data.token)
            if(tokens === undefined){
                alert("Senha ou nome de usuário incorreto.")
            }else{
                let userToken = btoa(document.getElementById('login_user').value)
                let cnpj = btoa(data.cnpj)
                let razaoSocial = btoa(data.razaoSocial)
                sessionStorage.setItem('token', tokens)
                sessionStorage.setItem('user', userToken)
                sessionStorage.setItem('cnpj', cnpj)
                sessionStorage.setItem('razaoSocial', razaoSocial)
                sessionStorage.setItem('nomeUsuario', btoa(data.nomeUsuario))
                alert('Tenha um bom trabalho')
                window.location.href = '../public/principal.html'
            }
            console.log(data)
        })
        .catch(error => console.error(error))
}

function boraLogin(mn){

    //essa função vai evitar que a pagina atualiza depois de apertar o botao
    event.preventDefault();
    let url = verificandoUrl()+'auth'
    console.log(url)
    //começando pelos checkBox
    let login = document.getElementById("login_user").value
    let password  = document.getElementById("password_user").value

    //array que vai para o backend
    informationLogin = {
        "login" : login,
        "senha" : password
    }
    console.log(JSON.stringify(informationLogin))
    
    postLogin(informationLogin,url)
}
