function openTabMotorista(event, tabName) {
    var i, tabcontent, tablinks;

    // Oculta todas as guias ao carregar a página
    tabcontent = document.getElementsByClassName("tabcontent")
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove a classe "active" de todos os links das guias
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "")
    }

    // Mostra o conteúdo da guia selecionada
    document.getElementById(tabName).style.display = "block";

    // Mostra a tabela
    if (tabName === 'Consulta') {
        document.getElementById('table-consulta').style.display = "block"
    }

    // Adiciona a classe "active" ao link da guia selecionada
    event.currentTarget.className += " active";

    if (event.target.className.includes('edit')) {
        document.getElementById('tabCadastro').className += ' active';
    }    
}

window.onload = sessionStorage.removeItem('idMotorista')

