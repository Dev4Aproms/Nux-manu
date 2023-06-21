function exibirEditar(element) {
    openTabMotorista(event, 'Cadastro')

    sessionStorage.removeItem('idMotorista')

    limparValidate()

    document.getElementById("h3").textContent = "Alterar Cadastro Motorista"
    document.getElementById("tabCadastro").textContent = "Alterar Cadastro"

    document.getElementById('inputNome').value = element.nome.trim()
    document.getElementById('inputCpf').value = element.cpf.trim()
    document.getElementById('inputEmail').value = element.email.trim()
    document.getElementById('inputCep').value = element.cep.trim()
    document.getElementById('inputEndereco').value = element.endereco.trim()
    document.getElementById('inputRg').value = element.rg.trim()
    document.getElementById('inputOrgaoRg').value = element.orgao_rg.trim()
    document.getElementById('inputCartao').value = element.cartao.trim()
    document.getElementById('inputTelefone').value = element.telefone.trim()
    document.getElementById('inputCnhNum').value = element.cnh_num.trim()
    document.getElementById('inputCnhCat').value = element.cnh_cat.trim()
    document.getElementById('inputValidade').value = element.validade
    document.getElementById('inputNomeMae').value = element.nome_mae.trim()
    document.getElementById('inputStatus').value = element.status
    document.getElementById('inputMotivo').value = element.motivo.trim()
    document.getElementById('inputValidadeTox').value = element.validade_tox
    document.getElementById('inputUf').value = element.uf
    setCidade(element.uf, element.cidade)

    sessionStorage.setItem('idMotorista', element.id_motorista)

    document.getElementById("button_cancel").onclick = function () {
        cancelarEdit()
    }

    if (document.getElementById("button_new") !== null) {
        document.getElementById("final-buttons").removeChild(document.getElementById("button_new"))
    }

    document.getElementById("button_save").onclick = function () {
        validate(0);
    };
}

async function setCidade(uf, cidade) {
    try {
        await getCidadesPorEstado(uf, 'Cadastro')
        document.getElementById('inputCidade').value = cidade
    } catch (error) {
        console.error('Ocorreu um erro:', error)
    }
}
