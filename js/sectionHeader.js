import { searchClient } from "./clientsApi.js";
import { createClientItem } from "./createClientItem.js";

export function createHeader(clients) {
  const header = document.createElement('header');
  const logo = document.createElement('a');
  const logoImg = document.createElement('img');
  const form = document.createElement('form');
  const input = document.createElement('input');
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const inner = document.createElement('div');

  const findList = document.createElement('ul');

  clients.map(client => {
    const findItem = document.createElement('li');
    const findItemLink = document.createElement('a');
    findItemLink.textContent = `${client.name} ${client.surname} ${client.lastName}`;
    findItem.classList.add('find-list__item');
    findItemLink.classList.add('find-list__link');
    findList.classList.add('find-list', 'hide');
    findItemLink.href = '#';
    findItem.append(findItemLink);
    findList.append(findItem);
  });

  async function findClient(str) {
    const response = await searchClient(str);
    document.querySelector('.clients__tbody').innerHTML = '';

    for (let item of response) {
      document.querySelector('.clients__tbody').append(createClientItem(item));
    }
  }

  input.addEventListener('input', async e => {
    let val = input.value.trim();
    let findItems = document.querySelectorAll('.find-list__link');

    if (val != '') {
      findItems.forEach(item => {
        if (item.innerText.search(val) == -1) {
          item.classList.add('hide');
          item.innerHTML = item.innerText;
        } else {
          item.classList.remove('hide');
          findList.classList.remove('hide');
          let str = item.innerText;
          item.innerHTML = insertMark(str, item.innerText.search(val), val.length);

          item.onclick = () => {
            findClient(val);
          }
        }
      });
    } else {
      findItems.forEach(item => {
        document.querySelector('.clients__tbody').innerHTML = '';
        clients.map(item => {
          document.querySelector('.clients__tbody').append(createClientItem(item));
        });
        item.classList.remove('hide');
        findList.classList.add('hide');
        item.innerHTML = item.innerText;
      });
    }
  });

  const insertMark = (str, pos, len) => {
    return str.slice(0, pos)+'<mark>'+str.slice(pos, pos+len)+'</mark>'+str.slice(pos+len);
  }

  header.classList.add('header');
  container.classList.add('container', 'header__container');
  logo.classList.add('logo', 'header__logo');
  logoImg.classList.add('logo__img');
  logoImg.src = 'img/logo.svg';
  logoImg.alt = 'Logotype Skillbus';
  form.classList.add('header__form');
  input.classList.add('header__input');
  input.placeholder = 'Введите запрос';
  wrapper.classList.add('header__wrapper');
  inner.classList.add('header__inner')

  header.append(container);
  logo.append(logoImg);
  form.append(input);
  inner.append(findList);
  wrapper.append(form, inner);
  container.append(logo, wrapper);

  return header;
}








//   document.querySelector('.clients__tbody').innerHTML = '';

      //   clients.map(client => {
      //     document.querySelector('.clients__tbody').append(createClientItem(client));
      //   });
      // } else {
      //   document.querySelector('.clients__tbody').innerHTML = '<div class=\'search-result\'>Клиентов не найдено.</div>';
