import {
  createModalForm
} from './modalForm.js';
import {
  createContactItem
} from './addContact.js';
import {
  sendClientData
} from './clientsApi.js';
import {
  validateClientForm
} from './validateForm.js';
import {
  deleteClientModal
} from './deleteModal.js';

export function changeClientModal(data) {
  const changeModal = document.createElement('div');
  const changeModalContent = document.createElement('div');
  const createForm = createModalForm();
  const titleId = document.createElement('span');

  titleId.classList.add('modal__id');
  changeModal.classList.add('modal-change', 'site-modal', 'modal-active');
  changeModalContent.classList.add('modal-change__content', 'site-modal__content', 'modal-active');

  titleId.textContent = 'ID: ' + data.id.substr(0, 6);
  createForm.cancelBtn.textContent = 'Удалить клиента';
  createForm.modalTitle.textContent = 'Изменить данные';

  createForm.cancelBtn.addEventListener('click', e => {
    e.preventDefault();

    const deleteModalElem = deleteClientModal();
    document.body.append(deleteModalElem.deleteModal);

    import('./clientsApi.js').then(({
      deleteClientItem
    }) => {
      deleteModalElem.deleteModalDelete.addEventListener('click', () => {
        deleteClientItem(data.id);
        document.getElementById(data.id).remove();
      });
    });
  });

  createForm.modalClose.addEventListener('click', () => {
    changeModal.remove();
  });

  createForm.inputName.value = data.name;
  createForm.inputSurname.value = data.surname;
  createForm.inputLastname.value = data.lastName;

  for (const contact of data.contacts) {
    const createContact = createContactItem();
    createContact.contactName.textContent = contact.type;
    createContact.contactInput.value = contact.value;

    createForm.contactBlock.prepend(createContact.contact);
    createForm.contactBlock.style.backgroundColor = 'var(--athens-gray)';
  }

  if (data.contacts.length == 10) {
    createForm.addContactBtn.classList.remove('modal__btn-contact--active');
  }

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
        value: contactValues[i].value
      });
    }

    clientObj.name = createForm.inputName.value;
    clientObj.surname = createForm.inputSurname.value;
    clientObj.lastName = createForm.inputLastname.value;
    clientObj.id = data.id;
    clientObj.contacts = contactsArr;

    if (validateClientForm()) {
      sendClientData(clientObj, 'PATCH');
    }
  });

  createForm.modalTitle.append(titleId);
  changeModal.append(changeModalContent);
  changeModalContent.append(createForm.modalClose, createForm.modalTitle, createForm.form);

  document.body.addEventListener('click', e => {
    if (e.target == changeModal) {
      changeModal.remove();
    }
  });

  return {
    changeModal,
    changeModalContent
  };
}
