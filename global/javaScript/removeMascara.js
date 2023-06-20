//Removendo mascara cnpj e cpf
function removerMascara(value) {
  value = String(value);
  return value.replace(/\D/g, '');
}
