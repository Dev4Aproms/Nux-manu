function logout(params) {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('cnpj')
    sessionStorage.removeItem('razaoSocial')

    window.location.href = params
}

