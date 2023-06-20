//------------------- VALIDA SALVAR -------------------//

function validate(cont) {

    try {
        (() => {
            'use strict'

            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            const forms = document.querySelectorAll('.needs-validation')

            // Loop over them and prevent submission
            Array.from(forms).forEach(form => {
                form.addEventListener('submit', event => {
                    cont = cont + 1
                    if (cont <= 1) {
                        if (!form.checkValidity()) {
                            event.preventDefault()
                            event.stopPropagation()
                            form.classList.add('was-validated')
                        }

                        if (form.checkValidity()) {
                            event.preventDefault()
                            event.stopPropagation()
                            form.classList.add('was-validated')
                            updateOrInsert()
                        }
                    }
                }, false)
            })
        })()
    } catch (excecao) {
    }
}

// --------------------------- UPDATE OR INSERT -----------------//
function updateOrInsert() {
    let opcao = document.getElementById('h3').innerText
    if (opcao === 'Cadastro Motorista') {
        let url = 'http://200.174.50.133/ProjetoTeste/motorista/cadastro'
        enviarDados(url)
    } else {
        let id = sessionStorage.getItem('idMotorista')
        let url = `http://200.174.50.133/ProjetoTeste/motorista/update/${id}`
        enviarDados(url)
    }
}

function enviarDados(url) {

    let nome = document.getElementById('inputNome').value
    let cpf = document.getElementById('inputCpf').value
    let email = document.getElementById('inputEmail').value
    let cep = document.getElementById('inputCep').value
    let endereco = document.getElementById('inputEndereco').value
    let uf = document.getElementById('inputUf').value
    let cidade = document.getElementById('inputCidade').value
    let rg = document.getElementById('inputRg').value
    let orgao_rg = document.getElementById('inputOrgaoRg').value
    let cartao = document.getElementById('inputCartao').value
    let telefone = document.getElementById('inputTelefone').value
    let cnh_num = document.getElementById('inputCnhNum').value
    let cnh_cat = document.getElementById('inputCnhCat').value
    let validade = document.getElementById('inputValidade').value
    let nome_mae = document.getElementById('inputNomeMae').value
    let status = document.getElementById('inputStatus').value
    let motivo = document.getElementById('inputMotivo').value
    let validade_tox = document.getElementById('inputValidadeTox').value

    cpf = removerMascara(cpf)
    telefone = removerMascara(telefone)
    cep = removerMascara(cep)

    let dados = {
        "nome": nome,
        "cpf": cpf,
        "email": email,
        "cep": cep,
        "endereco": endereco,
        "cidade": cidade,
        "uf": uf,
        "rg": rg,
        "orgao_rg": orgao_rg,
        "cartao": cartao,
        "telefone": telefone,
        "cnh_num": cnh_num,
        "cnh_cat": cnh_cat,
        "validade": validade,
        "nome_mae": nome_mae,
        "status": status,
        "motivo": motivo,
        "validade_tox": validade_tox
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(dados)
    })

        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            if (document.getElementById('h3').textContent === 'Cadastro Motorista') {
                if (data.error === 'CPF ja cadastrado') {
                    alertas('CPF já cadastrado, digite um novo CPF', 'danger')
                    document.getElementById('inputCpf').classList.add('invalid-form')
                    document.getElementById('inputCpf').classList.remove('valid-form')
                    document.getElementById('inputCpf').setCustomValidity('erro')
                } else {
                    alertas('Cadastro realizado com sucesso', 'success')
                }
            } else {
                if (data.error === 'CPF ja cadastrado') {
                    alertas('CPF já cadastrado, digite um novo CPF', 'danger')
                    document.getElementById('inputCpf').classList.add('invalid-form')
                    document.getElementById('inputCpf').classList.remove('valid-form')
                    document.getElementById('inputCpf').setCustomValidity('erro')
                } else {
                    alertas('Alteração no cadastro realizado com sucesso', 'success')
                }
            }

            limparTable()
            limparInput('form-consulta')
        })
        .catch(error => {
            console.error('Erro:', error);
        })
}
