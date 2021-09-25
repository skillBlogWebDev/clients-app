import {
  createPreloader
} from "./preloader.js";
import {
  svgAddUser
} from "./svg.js";
import {
  addClientModal
} from './addClient.js'
import {
  sortTable
} from "./sortClientTable.js";

export function createSectionClients() {
  const section = document.createElement('section');
  const h1 = document.createElement('h1');
  const sortingDisplay = document.createElement('thead');
  const theadTr = document.createElement('tr');
  const sortingDisplayId = document.createElement('td');
  const sortingDisplayName = document.createElement('td');
  const sortingDisplayCreate = document.createElement('td');
  const sortingDisplayChange = document.createElement('td');
  const sortingDisplayContacts = document.createElement('td');
  const sortingDisplayActions = document.createElement('td');
  const sortingDisplaySpan = document.createElement('span');
  const container = document.createElement('div');
  const main = document.createElement('main');
  const addUserBtn = document.createElement('button');
  const addUserBtnSVG = document.createElement('span');
  const tableWrapper = document.createElement('div');
  const clientsTable = document.createElement('table');
  const clientBody = document.createElement('tbody');
  const createSpan = document.createElement('span');
  const updateSpan = document.createElement('span');
  let callIndex = -1;

  section.classList.add('clients');
  tableWrapper.classList.add('clients__wrapper');
  h1.classList.add('clients__heading');
  clientBody.classList.add('clients__tbody');
  sortingDisplay.classList.add('clients__display', 'display-info');
  sortingDisplayId.classList.add('display-info__item', 'display-info__item--id', 'sort-up');
  sortingDisplayId.setAttribute('data-type', 'id');
  sortingDisplayName.setAttribute('data-type', 'text');
  sortingDisplayCreate.setAttribute('data-type', 'created');
  sortingDisplayChange.setAttribute('data-type', 'updated');
  sortingDisplayName.classList.add('display-info__item', 'display-info__item--name', 'sort-down');
  sortingDisplayCreate.classList.add('display-info__item', 'display-info__item--create', 'sort-down');
  sortingDisplayChange.classList.add('display-info__item', 'display-info__item--change', 'sort-down');
  sortingDisplayContacts.classList.add('display-info__item', 'display-info__item--contacts');
  sortingDisplayActions.classList.add('display-info__item', 'display-info__item--actions');
  sortingDisplaySpan.classList.add('display-info__sorting', );
  container.classList.add('container', 'clients__container');
  main.classList.add('main');
  addUserBtn.classList.add('clients__btn', 'btn-reset');
  clientsTable.classList.add('clients__table', 'list-reset');
  addUserBtnSVG.classList.add('clients__svg');
  createSpan.classList.add('created__span');
  updateSpan.classList.add('updated__span');

  const sortDisplayItems = [sortingDisplayId, sortingDisplayName, sortingDisplayCreate, sortingDisplayChange];

  for (const item of sortDisplayItems) {
    item.addEventListener('click', () => {
      if (item.classList.contains('sort-down')) {
        item.classList.remove('sort-down');
        item.classList.add('sort-up');
      } else {
        item.classList.add('sort-down');
        item.classList.remove('sort-up');
      }
    });
  }

  sortingDisplayCreate.addEventListener('click', e => {
    if (sortingDisplayCreate.classList.contains('sort-down')) {
      createSpan.classList.add('sort-up');
    } else {
      createSpan.classList.remove('sort-up');
    }
  });

  sortingDisplayChange.addEventListener('click', e => {
    if (sortingDisplayChange.classList.contains('sort-down')) {
      updateSpan.classList.add('sort-up');
    } else {
      updateSpan.classList.remove('sort-up');
    }
  });

  addUserBtn.addEventListener('click', () => {
    document.body.append(addClientModal());
  });

  h1.textContent = 'Клиенты';
  sortingDisplayId.textContent = 'id';
  sortingDisplayName.textContent = 'Фамилия Имя Отчество';
  sortingDisplaySpan.textContent = 'А-Я';
  sortingDisplayCreate.textContent = 'Дата и время ';
  sortingDisplayChange.textContent = 'Последние ';
  sortingDisplayContacts.textContent = 'Контакты';
  sortingDisplayActions.textContent = 'Действия';
  addUserBtn.textContent = 'Добавить клиента';
  addUserBtnSVG.innerHTML = svgAddUser;

  sortingDisplay.addEventListener('click', e => {
    const el = e.target;
    const index = el.cellIndex;
    const type = el.getAttribute('data-type');
    console.log(type);

    sortTable(index, type, callIndex == index, clientsTable, clientBody);
    callIndex = (callIndex == index) ? -1 : index;
  });

  main.append(section);
  section.append(container);
  sortingDisplayName.append(sortingDisplaySpan);
  sortingDisplayCreate.append(createSpan);
  sortingDisplayChange.append(updateSpan);
  theadTr.append(sortingDisplayId, sortingDisplayName, sortingDisplayCreate, sortingDisplayChange, sortingDisplayContacts, sortingDisplayActions);
  sortingDisplay.append(theadTr);
  clientBody.append(createPreloader());
  tableWrapper.append(clientsTable);
  clientsTable.append(sortingDisplay, clientBody);
  addUserBtn.append(addUserBtnSVG);
  container.append(h1, tableWrapper, addUserBtn);

  return {
    main,
    clientsTable,
    clientBody
  };
}
