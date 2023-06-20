

function criaMascaraCell(campo) {
    
    let valorInput = document.getElementById(campo).value
    let valorSemPonto = document.getElementById(campo).value.replace(/([^0-9])+/g, "");
    document.getElementById(campo).value = valorSemPonto
    
    const masktel = {
      tel: valorInput.replace(/[^\d]/g, "").replace(/[^\d]/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3")
    }

      document.getElementById(campo).value = masktel['tel']
    

  }

  function criaMascaraCNPJCPF(valorInput) {

    let valorSemPonto = valorInput.replace(/([^0-9])+/g, "");
    
    const maskcnpj = {
      cnpj: valorInput.replace(/[^\d]/g, "").replace(/[^\d]/g, "").replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
    }
    
    const maskcpf = {
      cpf: valorInput.replace(/[^\d]/g, "").replace(/[^\d]/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    }


    if (valorSemPonto.length === 14) {
      return  maskcnpj['cnpj']
    }else
      if (valorSemPonto.length === 11) {
        return maskcpf['cpf']
    }else{
        return ' '
    }

  }

