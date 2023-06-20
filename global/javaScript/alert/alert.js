function alertas(message, type, login) {

    
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div id="divAlerta" class="alert alert-${type} alert-dismissible fade show" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.appendChild(wrapper)

  

  if (login != 'login') {

      $(document).ready(function(){			
        setTimeout(function() {
        $("#divAlerta").fadeOut("slow", function(){
            $(this).divAlerta('close');
        });				
        
        let removeDiv = document.querySelector('#liveAlertPlaceholder').children
        
        removeDiv[0].remove()
    }, 5000);			
    });    
  }


}

