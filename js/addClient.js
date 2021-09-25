import {
  sendClientData
} from './clientsApi.js';
import {
  createModalForm
} from './modalForm.js';
import { validateClientForm } from './validateForm.js';

export function addClientModal() {
  const modalContent = document.createElement('div');
  const createForm = createModalForm();
  const modal = document.createElement('div');

  modal.classList.add('modal', 'site-modal');
  modalContent.classList.add('modal__content', 'site-modal__content');
  createForm.form.classList.add('add-client');

  modal.classList.add('modal-active');
  modalContent.classList.add('modal-active');

  createForm.form.addEventListener('submit', e => {
    e.preventDefault();

    const contactTypes = document.querySelectorAll('.contact__name');
    const contactValues = document.querySelectorAll('.contact__input');
    let contactsArr = [];
    let clientObj = {};

    for (let i = 0; i < contactTypes.length; i++) {
      if (!contactValues[i].value) {
        document.getElementById('requireContacts').textContent = 'Заполните все поля контактов!';
        document.querySelector('.modal__spinner').style.display = 'none';
        return;
      }

      contactsArr.push({
        type: contactTypes[i].innerHTML,
        value: contactValues[i].value,
      });
    }

    clientObj.name = createForm.inputName.value;
    clientObj.surname = createForm.inputSurname.value;
    clientObj.lastName = createForm.inputLastname.value;
    clientObj.contacts = contactsArr;
    console.log(clientObj);

    if (validateClientForm()) {
      sendClientData(clientObj, 'POST');
    }
  });

  createForm.cancelBtn.textContent = 'Отмена';

  createForm.modalClose.addEventListener('click', () => {
    modal.remove();
  });

  createForm.cancelBtn.addEventListener('click', e => {
    e.preventDefault();
    modal.remove();
  });

  modal.append(modalContent);
  modalContent.append(createForm.modalClose, createForm.modalTitle, createForm.form);

  document.body.addEventListener('click', e => {
    if (e.target == modal) {
      modal.remove();
    }
  });

  return modal;
}
