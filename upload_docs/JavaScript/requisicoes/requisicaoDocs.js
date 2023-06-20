//Requisição ao click do botao check para solicitar  arquivo a ser visualizado
function requisicaoDocs(spanId) {

    let jsonString = sessionStorage.getItem('listaArquivos'); 
    let namesArquivo = JSON.parse(jsonString);
    key = spanId.replace('_', ''); 
    
    spanElement = document.getElementById(spanId)
  
    if (spanElement.innerText != 'Escolher arquivo') {

        json = {
            "nomeArquivo": namesArquivo[key]
        }

        fetch('http://200.174.50.80/ProjetoTeste/posto/mostrar/' + getCnpj(), {
            method: 'POST',
            body: JSON.stringify(json),
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
    }
    else{
        alert("Salve um arquivo antes!")
    }

}