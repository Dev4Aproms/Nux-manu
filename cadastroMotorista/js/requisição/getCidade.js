function getCidadesPorEstado(uf, tabName) {
  return new Promise(function (resolve, reject) {
    fetch(`http://200.174.50.133/ProjetoTeste/motorista/uf?UF=${uf}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {

        if (tabName === 'Cadastro') {
          const cidadeSelect = document.getElementById('inputCidade');
          cidadeSelect.innerHTML = '';

          if (document.getElementById('inputUf').value !== '') {
            data.forEach(cidade => {
              let option = document.createElement('option');
              option.innerHTML = cidade.nome_cidade;
              cidadeSelect.appendChild(option);
            });
          } else {
            let option = document.createElement('option')
            option.innerHTML = ''
            cidadeSelect.appendChild(option)
          }
        }


        if (tabName === 'Consulta') {
          const cidadeSelectConsulta = document.getElementById('inputCidadeConsulta');
          cidadeSelectConsulta.innerHTML = '';
          if (document.getElementById('inputUfConsulta').value !== '') {
            data.forEach(cidadeConsulta => {
              let optionConsulta = document.createElement('option');
              optionConsulta.innerHTML = cidadeConsulta.nome_cidade;
              cidadeSelectConsulta.appendChild(optionConsulta);
            });
          } else {
            let optionVazio = document.createElement('option')
            optionVazio.innerHTML = ''
            cidadeSelectConsulta.appendChild(optionVazio)
          }
        }

        if ('pode' in data) {
          reject(new Error('Mensagem de erro'))
        } else {
          resolve(data)
        }
      })


      .catch(error => {
        // Lida com erros de requisição
        console.error('Ocorreu um erro:', error)
      });
  })
}