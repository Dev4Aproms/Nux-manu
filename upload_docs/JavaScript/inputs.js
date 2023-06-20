// <!-- ---------------------------------------SCRIPT PARA TROCAR O TEXTLABEL DE CADA INPUT---------------------------------------- -->


// ----------------------------INPUT 1 - CONTRATO SOCIAL-----------------------------------------------
var input1 = document.getElementById('CSE');
var labelFile1 = document.getElementById('CSE_');
var saveButton1 = document.querySelector('#sbCSE_');

input1.addEventListener('change', () => {

    console.log('evento');
    var nome1 = "Não há arquivo selecionado. Selecionar arquivo...";

    if (input1.files.length > 0) {
        nome1 = input1.files[0].name;
        console.log(nome1);
        if (nome1.length > 20) {
            nome1 = nome1.substring(0, 17) + '...';
        }
        labelFile1.innerHTML = nome1;
        saveButton1.style.color = "blue";
    }
});

// ----------------------------INPUT 2 - ALTERAÇÃO CONTRATUAL/CONSOLIDAÇÃO-----------------------------------------------
var input2 = document.getElementById('ACC');
var labelFile2 = document.getElementById('ACC_');
var saveButton2 = document.querySelector('#sbACC_');

input2.addEventListener('change', () => {

    var nome2 = "Não há arquivo selecionado. Selecionar arquivo...";

    if (input2.files.length > 0) {
        nome2 = input2.files[0].name;

        if (nome2.length > 20) {
            nome2 = nome2.substring(0, 17) + '...';
        }
        labelFile2.innerHTML = nome2;
        saveButton2.style.color = "blue";
    }
});

// ----------------------------INPUT 3 - CARTÃO DE I.E-----------------------------------------------
var input3 = document.getElementById('CI')
var labelFile3 = document.getElementById('CI_');
var saveButton3 = document.querySelector('#sbCI_');


input3.addEventListener('change', () => {

    var nome3 = "Não há arquivo selecionado. Selecionar arquivo...";

    if (input3.files.length > 0) {
        nome3 = input3.files[0].name;
        if (nome3.length > 20) {
            nome3 = nome3.substring(0, 17) + '...';
        }
        labelFile3.innerHTML = nome3;
        saveButton3.style.color = "blue";
    }
});

// ----------------------------INPUT 4 - CNPJ-----------------------------------------------
var input4 = document.getElementById('CNPJ')
var labelFile4 = document.getElementById('CNPJ_');
var saveButton4 = document.querySelector('#sbCNPJ_');


input4.addEventListener('change', () => {

    var nome4 = "Não há arquivo selecionado. Selecionar arquivo...";

    if (input4.files.length > 0) {
        nome4 = input4.files[0].name;
        if (nome4.length > 20) {
            nome4 = nome4.substring(0, 17) + '...';
        }
        labelFile4.innerHTML = nome4;
        saveButton4.style.color = "blue";
    }
});

// ----------------------------INPUT 5 - COMPROVANTE DE ENDEREÇO-----------------------------------------------
var input5 = document.getElementById('CE')
var labelFile5 = document.getElementById('CE_');
var saveButton5 = document.querySelector('#sbCE_');


input5.addEventListener('change', () => {

    var nome5 = "Não há arquivo selecionado. Selecionar arquivo...";

    if (input5.files.length > 0) {
        nome5 = input5.files[0].name;
        if (nome5.length > 20) {
            nome5 = nome5.substring(0, 17) + '...';
        }
        labelFile5.innerHTML = nome5;
        saveButton5.style.color = "blue";
    }
});

// ----------------------------INPUT 6 - FICHA CADASTRAL-----------------------------------------------
var input6 = document.getElementById('FC')
var labelFile6 = document.getElementById('FC_');
var saveButton6 = document.querySelector('#sbFC_');


input6.addEventListener('change', () => {

    var nome6 = "Não há arquivo selecionado. Selecionar arquivo...";

    if (input6.files.length > 0) {
        nome6 = input6.files[0].name;
        if (nome6.length > 20) {
            nome6 = nome6.substring(0, 17) + '...';
        }
        labelFile6.innerHTML = nome6;
        saveButton6.style.color = "blue";
    }
});

// ----------------------------INPUT 7 - RESPONSÁVEL 1-----------------------------------------------
var input7 = document.getElementById('responsavel1')
var labelFile7 = document.getElementById('responsavel_1');
var saveButton7 = document.querySelector('#saveButton7');


input7.addEventListener('change', () => {

    var nome7 = "Não há arquivo selecionado. Selecionar arquivo...";

    if (input7.files.length > 0) {
        nome7 = input7.files[0].name;
        if (nome7.length > 20) {
            nome7 = nome7.substring(0, 17) + '...';
        }
        labelFile7.innerHTML = nome7;
        saveButton7.style.color = "blue";
    }
});


// <!------------------------------------------SCRIPT PARA ADICIONAR NOVO CAMPO DE INPUT---------------------------------------- -->

// Variáveis globais
let numSecoes = 2;
const container = document.getElementById('inputSection');
const secaoFixa = document.querySelector('.especific-inputs');

// Função para adicionar uma nova seção
function adicionarSecao() {

    if (!validarSecaoAnterior()) {
        return;
    }
    const novoContainer = document.createElement('div'); novoContainer.classList.add('container');
    const novaSecao = document.createElement('div'); novaSecao.classList.add('row');
    const coluna1 = document.createElement('div'); coluna1.classList.add('col-sm');
    const coluna2 = document.createElement('div'); coluna2.classList.add('col-sm');
    const coluna3 = document.createElement('div'); coluna3.classList.add('col-sm');
    const coluna4 = document.createElement('div'); coluna4.classList.add('col-sm');

    coluna2.innerHTML = ` 
        <div class="col-sm">
        <label for="" class="form-label">Responsável ${numSecoes}</label>
            <label for="responsavel${numSecoes}" class="custom-label">
                <span class="input-group-addon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                    </svg>
                </span>
                <span class="label-text responsavel" id="responsavel_${numSecoes}">Escolher arquivo</span>
                <input type="file" name="" id="responsavel${numSecoes}" accept="application/pdf" class = "inputsRes">
                <button type="button" class="saveButton saveButtonCpf" id="responsavel${numSecoes}CheckButton">
                    <div class="input-group-addon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-check-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                        </svg>
                    </div>
                </button>
            </label>
        </div>`;

    coluna3.innerHTML = ` 
        <div class="col-sm" id="label-cpf">
            <div>
                <label class = label-cnpj-cpf for = "responsavel${numSecoes}Cpf">CPF/CNPJ</label>
                <input type="text" class="form-control inputCpf" id = "responsavel${numSecoes}Cpf" maxlength="15" 
                oninput="criarMascaraCNPJ(responsavel${numSecoes}Cpf)" placeholder="EX: 123.456.789-00" required>
            </div>
        </div> `


    const botaoRemover = document.createElement('button');

    const divIcone = document.createElement('div');
    divIcone.classList.add('div-icon');
    divIcone.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-trash" viewBox="0 0 16 16">
            <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
            <path
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
        </svg>`;

    botaoRemover.classList.add('botao-remover');

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    botaoRemover.setAttribute('data-toggle', 'tooltip');
    botaoRemover.setAttribute('data-placement', 'top');
    botaoRemover.setAttribute('title', 'Remover Seção');

    botaoRemover.addEventListener('click', function () {
        removerSecao(novoContainer);
    });

    botaoRemover.appendChild(divIcone);
    coluna4.appendChild(botaoRemover);

    novaSecao.appendChild(coluna1);
    novaSecao.appendChild(coluna2);
    novaSecao.appendChild(coluna3);
    novaSecao.appendChild(coluna4);

    novoContainer.appendChild(novaSecao);

    container.appendChild(novoContainer);

    const inputResponsavel = document.getElementById('responsavel' + numSecoes);

    inputResponsavel.addEventListener('change', function () {
        atualizarLabel(inputResponsavel.id);
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    numSecoes++;
}

function validarSecaoAnterior() {
    if (numSecoes > 1) {
        let secaoAnterior = document.getElementById('responsavel' + (numSecoes - 1));
        let cpfAnterior = document.getElementById('responsavel' + (numSecoes - 1) + 'Cpf');

        if (secaoAnterior.value.trim() === '' || cpfAnterior.value.trim() === '') {
            // Se a seção anterior não estiver preenchida corretamente, exibe uma mensagem de erro 
            alert('Preencha todos os campos da seção anterior antes de adicionar uma nova seção.');
            return false;
        }
        let valorSemPonto = cpfAnterior.value.replace(/([^0-9])+/g, '');

        if (valorSemPonto.length !== 11 && valorSemPonto.length !== 14) {
            // Se o campo preenchido não corresponder à quantidade de caracteres de um CPF ou CNPJ, exibe uma mensagem de erro 
            alert('O CPF/CNPJ preenchido não possui a quantidade de caracteres correta.');
            return false;
        }

        if (!validarCPFouCNPJ(valorSemPonto)) {
            return false;
        }

        return true;
    }

}
    // Função para remover uma seção
    function removerSecao(secao) {
        if (numSecoes > 1) {
            container.removeChild(secao);
            numSecoes--;
        }
    }

    function atualizarLabel(inputId) {
        var input = document.getElementById(inputId);
        console.log(inputId)
        var file = input.files[0];
        var label = document.querySelector('label[for="' + inputId + '"] .label-text');
        var check = document.getElementById(inputId + 'CheckButton');
        console.log(check);
        if (file) {
            var nomeArquivo = file.name;
            if (nomeArquivo.length > 25) {
                nomeArquivo = nomeArquivo.substr(0, 17) + '...';
            }
            label.innerHTML = nomeArquivo;
            check.style.color = 'blue';

            localStorage.setItem('recentFile', JSON.stringify({ name: fileName, status: fileStatus }));
        } else {
            label.innerHTML = 'Escolher arquivo';
            check.style.color = 'red';
        }
    }


    function criarMascaraCNPJ(campo) {
        console.log(campo)
        let idCampo = campo.id;
        let valorInput = document.getElementById(idCampo).value
        console.log(valorInput)
        let valorSemPonto = document.getElementById(idCampo).value.replace(/([^0-9])+/g, "");
        document.getElementById(idCampo).value = valorSemPonto


        const maskcnpj = {
            cnpj: valorInput.replace(/[^\d]/g, "").replace(/[^\d]/g, "").replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
        }

        const maskcpf = {
            cpf: valorInput.replace(/[^\d]/g, "").replace(/[^\d]/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
        }


        if (valorSemPonto.length === 14) {
            document.getElementById(idCampo).value = maskcnpj['cnpj']
        } else
            if (valorSemPonto.length === 11) {
                document.getElementById(idCampo).value = maskcpf['cpf']
            } else {

            }

        const check = document.querySelector('label[for="' + idCampo);
        if (valorSemPonto.length === 11 || valorSemPonto.length === 14) {
            check.style.color = 'green';
        } else {
            check.style.color = 'red';
        }
    }

    $('#addSectionButton').click(adicionarSecao);




