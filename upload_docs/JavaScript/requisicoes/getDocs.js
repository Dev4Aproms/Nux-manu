var cont = 0;
function getCnpj() {
  var infosEmpresa = sessionStorage.getItem('infosEmpresa');
  var elementos = infosEmpresa.split(",");
  console.log(atob(elementos[1]));
  return cnpj = atob(elementos[1]);
}
// -----------------------------------Requisição para o back pedindo os arquivos salvos---------------------------------------
function exibirArquivos() {
  fetch('http://200.174.50.80/ProjetoTeste/posto/Download/' + getCnpj(), { method: 'POST' })
    .then(response => response.json())
    .then(json => {

      jsonArray = JSON.stringify(json);
      if (jsonArray.includes("sem arquivos")) {
        // Caso o JSON contenha a string "sem arquivos"
        return;
      }
      sessionStorage.setItem('listaArquivos', jsonArray);

      var mapping = {
        "CSE": "CSE_",
        "ACC": "ACC_",
        "CI": "CI_",
        "CE": "CE_",
        "CNPJ": "CNPJ_",
        "FC": "FC_"
      };

      let tableBody = document.getElementById('body_docs');
      tableBody.innerHTML = '';

      for (var key in json) {

        var fileName = json[key];
        var isNumeric = !isNaN(parseFloat(key)) && isFinite(key);

        if (isNumeric) {
          cont++;
          let row = createTable(json[key], cont)
          tableBody.appendChild(row);

        } else {

          var spanId = mapping[key];
          var inputElement = document.getElementById(spanId);

          if (fileName.length > 10) {
            fileName = fileName.substring(0, 17) + '...';
            inputElement.innerText = fileName;
          } else {
            inputElement.innerText = fileName;
          }

          var checkButton = document.getElementById('sb' + spanId);

          if (fileName) {
            checkButton.style.color = "green";
            if (checkButton.hasAttribute('data-toggle')) {
              
            } else {
              checkButton.setAttribute('data-toggle', 'tooltip');
              checkButton.setAttribute('data-placement', 'top');
              checkButton.setAttribute('title', 'Visualizar Pdf');
            }
            $(function () {
              $('[data-toggle="tooltip"]').tooltip()
            })
          } else {
            checkButton.style.color = "red";
          }
        }
      }
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
    });


  // ------------------------------------Limpando os inputs dos responsaveis apos o salvamento-----------------------------------------------
  let spanResponsavel = document.querySelectorAll('.responsavel');
  for (var i = 0; i < spanResponsavel.length; i++) {
    spanResponsavel[i].textContent = 'Escolher Arquivo';
  }

  let inputRes = document.querySelectorAll('.inputsRes');
  for (var i = 0; i < inputRes.length; i++) {
    inputRes[i].value = '';
  }

  let inputCpf = document.querySelectorAll('.inputCpf');
  for (var i = 0; i < inputRes.length; i++) {
    inputCpf[i].value = '';
  }

  let labelCpf = document.querySelectorAll('.label-cnpj-cpf')
  for (var i = 0; i < inputRes.length; i++) {
    labelCpf[i].style.color = 'black';
  }

  let buttonSaveCpf = document.querySelectorAll('.saveButtonCpf')
  for (var i = 0; i < inputRes.length; i++) {
    buttonSaveCpf[i].style.color = 'red';
  }
}

// -----------------------------------------------Criando tabela com doc Responsaveis-------------------------------------------
function createTable(elements, cont) {

  var listColumn = document.createElement("td");
  var buttonColumn = document.createElement("td");
  var row = document.createElement("tr");
  var buttonElement = document.createElement("button");
  var icon = document.createElement('i');
  var divText = document.createElement('div');
  var divButton = document.createElement('div');

  divText.innerHTML = elements;
  listColumn.id = 'td' + cont;
  divText.classList = 'columnDoc'

  icon.classList = 'icon-pdf text-primary bi bi-filetype-pdf';

  buttonElement.classList = 'button_viewPDF'
  buttonElement.setAttribute('data-toggle', 'tooltip');
  buttonElement.setAttribute('data-placement', 'top');
  buttonElement.setAttribute('title', 'Visualizar Pdf');
  buttonElement.appendChild(icon);

  let jsonPdf = {
    "nomeArquivo": elements
  }

  buttonElement.addEventListener('click', function () {

    fetch('http://200.174.50.80/ProjetoTeste/posto/mostrar/' + getCnpj(), {
      method: 'POST',
      body: JSON.stringify(jsonPdf),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na solicitação');
        }
        return response.blob();
      })
      .then(blob => {
        visualizarPDF(blob);
      })
      .catch(error => {
        console.error('Erro ao abrir pdf:', error);
      });
  });

  divButton.classList = 'divButton'
  divButton.appendChild(buttonElement);

  buttonColumn.appendChild(divButton);
  listColumn.appendChild(divText);
  row.appendChild(listColumn);
  row.appendChild(buttonColumn);

  return row;
}

