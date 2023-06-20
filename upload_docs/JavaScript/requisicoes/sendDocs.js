// ---------------------------------Pegando cnpj da sessionStorage-----------------------------------------
function getCnpj() {
  var infosEmpresa = sessionStorage.getItem('infosEmpresa');
  var elementos = infosEmpresa.split(",");
  console.log(atob(elementos[1]));
  return cnpj = atob(elementos[1]);
}

//-------------------------------------Enviando os arquivos upados p/ o back-------------------------------------
function submitForm() {
  return new Promise(function (resolve, reject) {
    let form = document.getElementById('inputSection');
    let formData = new FormData(form);

    let fileInputs = form.querySelectorAll('input[type="file"]');
    for (let i = 0; i < fileInputs.length; i++) {
      let fileInput = fileInputs[i];
      let files = fileInput.files;

      console.log(fileInputs)

      for (let j = 0; j < files.length; j++) {
        let file = files[j];
        let fileId = fileInput.id;
        fileIdWithoutLetter = fileId.replace(/\D/g, "");

        if (fileIdWithoutLetter) {
          let cpfInput = document.getElementById(fileId + 'Cpf');
          let cpfValue = cpfInput.value;
          if (cpfValue != '') {
            cpfValue = removerMascara(cpfValue);
            if (validarCPFouCNPJ(cpfValue)) {
              formData.append(cpfValue, file);
            }
          }
        } else {
          formData.append(fileId, file);
        }
      }
    }

    var request = new XMLHttpRequest();
    request.open('POST', form.action + getCnpj())

    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          resolve(request.responseText); // Resolve a Promise com a resposta
        } else {
          reject(Error(request.statusText)); // Rejeita a Promise com o status de erro
        }
      }
    };

    request.send(formData);
  });
}

async function teste() {
  try {
    await submitForm();
    exibirArquivos();
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}

//Removendo mascara cnpj
function removerMascara(value) {
  return value.replace(/\D/g, '');
}



