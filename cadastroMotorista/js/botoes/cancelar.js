function cancelarEdit() {
    sessionStorage.removeItem('idMotorista')
    limparInput('form-cadastro')
    limparInput('form-consulta')
    limparTable()
    limparValidate()
    document.getElementById('inputCidade').innerHTML = ''
    
    openTabMotorista(event, 'Consulta')

    document.getElementById('tabConsulta').classList.add('active')


    document.getElementById("h3").textContent = "Cadastro Motorista"
    document.getElementById("tabCadastro").textContent = "Cadastro"

    document.getElementById("button_cancel").classList.remove('active')
    document.getElementById("button_cancel").onclick = function () {
        window.location.href = '../../public/principal.html';
    }

    let newButton = document.createElement("button")
    newButton.id = "button_new"
    newButton.className = "btn btn-outline-warning me-md-2"
    newButton.textContent = "Novo"
    newButton.onclick = function () {
        novoBotao()
    }
    document.getElementById("final-buttons").appendChild(newButton)

    document.getElementById("final-buttons").removeChild(document.getElementById("button_save"))
    let saveButton = document.createElement("button")
    saveButton.id = "button_save"
    saveButton.className = " btn me-md-2 btn-primary"
    saveButton.textContent = "Salvar"
    saveButton.onclick = function () {
        validate(0)
    }
    document.getElementById("final-buttons").appendChild(saveButton)

}

