function validarCPFouCNPJ(documento) {
    
    documento = documento.replace(/\D/g, '');

    if (documento.length === 11) {
        // Validação de CPF
        if (validarCPF(documento)) {
            return true;
        }
    } else if (documento.length === 14) {
        // Validação de CNPJ
        if (validarCNPJ(documento)) {
            return true;
        }
    }

    alert('O CPF/CNPJ preenchido não é válido.');
    return false;
}

function validarCPF(cpf) {
    
    cpf = cpf.replace(/\D/g, '');


    if (cpf.length !== 11) {
        return false;
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let resto = soma % 11;
    let digitoVerificador = resto < 2 ? 0 : 11 - resto;

    if (digitoVerificador !== parseInt(cpf.charAt(9))) {
        return false;
    }

    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    resto = soma % 11;
    digitoVerificador = resto < 2 ? 0 : 11 - resto;

    if (digitoVerificador !== parseInt(cpf.charAt(10))) {
        return false;
    }

    // CPF válido
    return true;
}

function validarCNPJ(cnpj) {

    cnpj = cnpj.replace(/\D/g, '');

    if (cnpj.length !== 14) {
        return false;
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cnpj)) {
        return false;
    }

    // Validação dos dígitos verificadores
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substr(0, tamanho);
    let digitos = cnpj.substr(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) {
        return false;
    }

    tamanho += 1;
    numeros = cnpj.substr(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) {
        return false;
    }

    // CNPJ válido
    return true;
}
