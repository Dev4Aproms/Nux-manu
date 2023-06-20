function qualModal(){
    if(document.getElementById('h3').value === 'Alterar Dados do Cliente'){
        abrirModal('modal-update')
    }else{
        abrirModal('modal_insert')
    }
}

function abrir(params) {
    document.getElementById('menuOculto').style.width = "250px"
    document.getElementById('main').style.marginLeft = "250px"
}

function fechar(params) {
    document.getElementById('menuOculto').style.width = "0px"
    document.getElementById('main').style.marginLeft = "0px"
    document.getElementById('menuOculto').style.transition = '0.5s'
}

function abrirModal(mn){
    let modal = document.getElementById(mn)
    const myInput = document.getElementById('myInput')

    if(typeof modal == 'undefined' || modal === null)
        return ;
    modal.style.display = 'Block'

}

function fecharModal(mn){

    let modal = document.getElementById(mn)

    if (typeof modal == 'undefined' || modal === null)
        return 
    modal.style.display = 'none'
}

function abrirModalUp(params) {
    const myModal = document.getElementById(params)
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})
}