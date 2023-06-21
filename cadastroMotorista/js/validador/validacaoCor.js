//-----CPF-----//
function inputCpfChange(input) {
    let cpf = document.getElementById(input)
    let value = cpf.value
    cpf.value = mascaraCpf(value)
    if (input === 'inputCpf') {
        validaBonito(input)
    }
}

function validarCPF(cpf) {
    cpf = String(cpf)
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) {
        return false;
    }
    let sum = 0;
    let remainder;
    for (let i = 0; i <= 8; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i)
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (remainder !== parseInt(cpf.charAt(9))) {
        return false;
    }
    sum = 0;
    for (let i = 0; i <= 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i)
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (remainder !== parseInt(cpf.charAt(10))) {
        return false;
    }
    return true;
}

function mascaraCpf(v) {

    v = v.replace(/\D/g, "")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return v
}


//-----TELEFONE-----//
function inputTelefoneChange(input) {
    let telefone = document.getElementById(input)
    let value = telefone.value
    telefone.value = mascaraCelular(value)
    validaBonito(input)
}

function validarCelular(numero) {
    const numeroLimpo = numero.replace(/[^\d]/g, '')

    const padrao = /^\d{2}9\d{8}$/;
    return padrao.test(numeroLimpo);
}

function mascaraCelular(value) {

    value = value.replace(/\D/g, '');
    let formattedValue = '';

    value = value.replace(/[()-\s]/g, '');

    if (value.length > 11) {
        value = value.slice(0, 11);
    }

    if (value.length > 0) {
        formattedValue = value.replace(/(\d{2})(\d{1,5})(\d{1,4})/, '($1) $2-$3')
    }

    return formattedValue;
}




//-----CEP-----//
function inputCepChange(input) {
    let cep = document.getElementById(input)
    let value = cep.value
    cep.value = formatarCep(value)
    validaBonito(input)
}

function formatarCep(cep) {
    cep = cep.replace(/\D/g, '');
    cep = cep.replace(/^(\d{5})(\d)/, '$1-$2');
    return cep
}


function validarCep(cep) {
    return new Promise((resolve, reject) => {
        fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`, {
            method: 'GET'
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.type !== 'service_error') {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                reject(error);
            });
    });
}

//-----VALIDABONITO-----//
function validaBonito(input) {
    let campo = document.getElementById(input)
    let value = campo.value

    value = removerMascara(value)

    if (input === 'inputCep') {
        if (value === '') {
            campo.classList.add('valid-form')
            campo.classList.remove('invalid-form')
            campo.setCustomValidity('')
        } else {
            validarCep(value)
                .then(valido => {
                    if (valido) {
                        campo.classList.add('valid-form')
                        campo.classList.remove('invalid-form')
                        campo.setCustomValidity('')
                    } else {
                        campo.classList.add('invalid-form')
                        campo.classList.remove('valid-form')
                        campo.setCustomValidity('erro')
                    }
                })
                .catch(error => {
                    console.error(error)
                });
        }
    } else {
        if (input === 'inputCpf') {
            if (value === '') {
                campo.setCustomValidity('')
            } else {
                if (validarCPF(value)) {
                    campo.classList.add('valid-form')
                    campo.setCustomValidity('')
                } else {
                    campo.classList.add('invalid-form')
                    campo.setCustomValidity('erro')
                }
            }
        } else {
            if (input === 'inputTelefone') {
                if (value === '') {
                    campo.setCustomValidity('ERRO')
                } else {
                    if (validarCelular(value)) {
                        campo.classList.add('valid-form')
                        campo.setCustomValidity('')
                    } else {
                        campo.classList.add('invalid-form')
                        campo.setCustomValidity('erro')
                    }
                }
            }
        }
    }
}
