function limparInput(input) {
    let form = document.getElementById(input)
    let inputs = form.getElementsByTagName("input")
    let selects = form.getElementsByTagName("select")

    for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i];
        input.value = "";
    }

    for (let i = 0; i < selects.length; i++) {
        let select = selects[i];
        select.selectedIndex = -1
    }
}

function limparTable() {
    let tabela = document.getElementById("tableConsultaMotorista")
    for (var i = tabela.rows.length - 1; i > 0; i--) {
        tabela.deleteRow(i);
    }
}

function limparValidate() {
    document.getElementById("form-cadastro").classList.remove('was-validated')
    const inputs = document.getElementsByTagName('input')
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove('valid-form')
        inputs[i].classList.remove('invalid-form')
    }
}