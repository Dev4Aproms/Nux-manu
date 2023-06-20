function visualizarPDF(arquivoTratado) {

  var blob = '';
  blob = new Blob([arquivoTratado], { type: 'application/pdf' });

  var url = '';
  url = window.URL.createObjectURL(blob);

  var novaJanela = window.open(url, '_blank');

  if (novaJanela === null || typeof (novaJanela) === 'undefined') {
    alert('Bloqueadores de pop-up estão ativados. Por favor, permita pop-ups para visualizar o PDF.');
  } else {

    novaJanela.onbeforeunload = function () {
      window.URL.revokeObjectURL(url);
    };

  }
}