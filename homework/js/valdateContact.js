export function validateClientContact() {
  const types = document.querySelectorAll('.contact__name');
    const inputs = document.querySelectorAll('.contact__input');
    const writwName = document.getElementById('writeName');

  for (let i = 0; i < types.length; i++) {
    if (types[i].innerHTML == 'Теелфон' && inputs[i].value > 11) {
      writwName.textContent == 'Номер должен состоять из 11 цифр';
      console.log('Максимум 11 цифр')
    }
  }
}
