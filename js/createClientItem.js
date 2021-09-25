import {
  contactTooltip
} from './contactTooltip.js';
import {
  createContactItemByType,
  formatDate,
  formatTime
} from './createItemFanc.js';
import {
  deleteClientModal
} from './deleteModal.js';
import {
  changeClientModal
} from './changeClient.js';
import { svgSpinner } from './svg.js';

export function createClientItem(data) {
  const clientTr = document.createElement('tr');
  const clientId = document.createElement('span');
  const clientFullName = document.createElement('td');
  const clientName = document.createElement('span');
  const clientSurname = document.createElement('span');
  const clientLastName = document.createElement('span');
  const clientCreated = document.createElement('td');
  const createdDate = document.createElement('span');
  const createdTime = document.createElement('span');
  const clientChanged = document.createElement('td');
  const changedDate = document.createElement('span');
  const changedTime = document.createElement('span');
  const clientContacts = document.createElement('td');
  const clientActions = document.createElement('td');
  const actionEdit = document.createElement('button');
  const actionDelete = document.createElement('button');
  const actionSpinnerEdit = document.createElement('span');
  const actionSpinnerDelete = document.createElement('span');
  const deleteModalElem = deleteClientModal();
  const changeModalElem = changeClientModal(data);

  clientTr.classList.add('clients__item');
  clientTr.setAttribute('id', data.id);
  clientId.classList.add('client__id');
  clientFullName.classList.add('clients__full-name');
  clientName.classList.add('clients__name');
  clientSurname.classList.add('clients__surname');
  clientLastName.classList.add('clients__lastname');
  clientCreated.classList.add('clients__created');
  createdDate.classList.add('created__date');
  createdTime.classList.add('created__time');
  clientChanged.classList.add('clients__changed');
  changedDate.classList.add('changed__date');
  changedTime.classList.add('changed__time');
  clientContacts.classList.add('clients__contacts');
  clientActions.classList.add('clients__actions');
  actionEdit.classList.add('actions__edit', 'btn-reset');
  actionDelete.classList.add('actions__delete', 'btn-reset');
  actionEdit.textContent = 'Изменить';
  actionDelete.textContent = 'Удалить';
  actionSpinnerEdit.classList.add('actions__spinner');
  actionSpinnerDelete.classList.add('actions__spinner');

  const dataId = data.id;
  let substrId = dataId.substr(0, 6);
  clientId.textContent = substrId;
  clientName.textContent = data.name;
  clientSurname.textContent = data.surname;
  clientLastName.textContent = data.lastName;
  createdDate.textContent = formatDate(data.createdAt);
  changedDate.textContent = formatDate(data.updatedAt);
  createdTime.textContent = formatTime(data.createdAt);
  changedTime.textContent = formatTime(data.updatedAt);
  actionSpinnerEdit.innerHTML = svgSpinner;
  actionSpinnerDelete.innerHTML = svgSpinner;

  let contactArr = data.contacts;

  for (const contact of contactArr) {
    createContactItemByType(contact.type, contact.value, clientContacts);
    contactTooltip(contact.type, contact.value);
  }

  function deleteById() {
    import('./clientsApi.js').then(({
      deleteClientItem
    }) => {
      deleteModalElem.deleteModalDelete.addEventListener('click', () => {
        deleteClientItem(data.id);
        document.getElementById(data.id).remove();
        location.reload();
      });
    });
  }

  actionDelete.addEventListener('click', () => {
    actionSpinnerDelete.style.display = 'block';
    actionDelete.classList.add('actions-wait');

    setTimeout(function deleteItem() {
      try {
        deleteById();
        document.body.append(deleteModalElem.deleteModal);
      } catch (error) {
        console.log(error.message);
      } finally {
        actionDelete.classList.remove('actions-wait');
        actionSpinnerDelete.style.display = 'none';
      }
    }, 1500);
  });

  actionEdit.addEventListener('click', () => {
    actionSpinnerEdit.style.display = 'block';
    actionEdit.classList.add('actions-wait');

    setTimeout(function editItem() {
      try {
        document.body.append(changeModalElem.changeModal);
      } catch (error) {
        console.log(error.message);
      } finally {
        actionEdit.classList.remove('actions-wait');
        actionSpinnerEdit.style.display = 'none';
      }
    }, 1500);
  });

  clientFullName.append(clientName, clientSurname, clientLastName);
  clientCreated.append(createdDate, createdTime);
  clientChanged.append(changedDate, changedTime);
  actionEdit.append(actionSpinnerEdit);
  actionDelete.append(actionSpinnerDelete);
  clientActions.append(actionEdit, actionDelete);
  clientTr.append(clientId, clientFullName, clientCreated, clientChanged, clientContacts, clientActions);

  return clientTr;
}
