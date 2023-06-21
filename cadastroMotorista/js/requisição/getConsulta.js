function getConsulta() {
    let codigo = document.getElementById('inputCodigoConsulta').value
    let nome = document.getElementById('inputNomeConsulta').value
    let cpf = document.getElementById('inputCpfConsulta').value
    let uf = document.getElementById('inputUfConsulta').value
    let cidade = document.getElementById('inputCidadeConsulta').value

    cpf = removerMascara(cpf)

    let dados = {
        "codigo": codigo,
        "nome": nome,
        "cpf": cpf,
        "cidade": cidade,
        "uf": uf
    };

    fetch('http://200.174.50.133/ProjetoTeste/motorista/consulta', {
        method: 'POST',
        body: JSON.stringify(dados)
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            if (data.error === undefined) {
                let contador = 0
                let recebeTabela = document.getElementById('tbody_consulta_cliente')
                recebeTabela.innerHTML = ''
                data.forEach(element => {
                    let resto = contador % 2

                    element.cpf = mascaraCpf(element.cpf)
                    if (element.telefone !== null) {
                        element.telefone = mascaraCelular(element.telefone)
                    }
                    let linha = criarLinha(element)
                    if (resto !== 0) {
                        linha.classList.add('background')
                    } else {
                        linha.classList.add('no-background')
                    }
                    contador++
                    recebeTabela.appendChild(linha)

                    //Colocando Tooltips
                    let buttons = document.getElementsByClassName('tooltipButton');
                    Array.from(buttons).forEach(function (button) {
                        button.setAttribute('data-toggle', 'tooltip');
                        button.setAttribute('data-placement', 'top');
                        button.setAttribute('title', 'Editar Cadastro');
                    });
                    $(function () {
                        $('[data-toggle="tooltip"]').tooltip();
                    });
                })

                return data
            } else {
                alertas2('Nenhum cadastro encontrado para esta consulta!', 'danger')
                limparTable()
            }
        })
        .catch(error => {
            console.error('Erro:', error)
        })
}

function criarLinha(element) {
    let linha = document.createElement('tr')
    let colunaCpf = document.createElement('td')
    let colunaNome = document.createElement('td')
    let colunaCidade = document.createElement('td')
    let colunaUf = document.createElement('td')
    let colunaTelefone = document.createElement('td')
    let botao = criarBotao(element)

    colunaCpf.innerHTML = element.cpf
    colunaCpf.classList.add('font-bold')
    colunaNome.innerHTML = element.nome
    colunaCidade.innerHTML = element.cidade
    colunaUf.innerHTML = element.uf
    colunaTelefone.innerHTML = element.telefone

    linha.appendChild(colunaCpf)
    linha.appendChild(colunaNome)
    linha.appendChild(colunaCidade)
    linha.appendChild(colunaUf)
    linha.appendChild(colunaTelefone)
    linha.appendChild(botao)

    return linha
}

function criarBotao(element) {
    let div = document.createElement('div')
    div.className = 'div-btn-edit'

    let button = document.createElement('button')
    button.type = 'button'
    button.className = 'mb-1 mt-1 edit tooltipButton'
    button.id = 'btn-edit'

    let icon = document.createElement('i')
    icon.className = 'bx bxs-edit-alt edit'
    button.appendChild(icon)

    div.appendChild(button)

    button.onclick = function () {
        exibirEditar(element)
    }

    return div
}











