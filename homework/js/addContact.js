import {
  svgDelete
} from "./svg.js";

export function createContactItem() {
  const contact = document.createElement('div');
  const contactType = document.createElement('div');
  const contactName = document.createElement('button');
  const contactList = document.createElement('ul');
  const contacPhone = document.createElement('li');
  const contacEmail = document.createElement('li');
  const contacVK = document.createElement('li');
  const contacFb = document.createElement('li');
  const contacOther = document.createElement('li');
  const contactInput = document.createElement('input');
  const deleteContact = document.createElement('button');
  const deleteTooltip = document.createElement('span');

  contact.classList.add('contact');
  deleteTooltip.classList.add('contact-tooltip', 'site-tooltip');
  contactType.classList.add('contact__type');
  contactName.classList.add('contact__name');
  contactList.classList.add('contact__list');
  contacPhone.classList.add('contact__item');
  contacEmail.classList.add('contact__item');
  contacVK.classList.add('contact__item');
  contacFb.classList.add('contact__item');
  contacOther.classList.add('contact__item');
  contactInput.classList.add('contact__input');
  deleteContact.classList.add('contact__delete', 'btn-reset');

  deleteContact.addEventListener('click', e => {
    e.preventDefault();
    contact.remove();
    document.querySelector('.modal__btn-contact').classList.add('modal__btn-contact--active');
  });

  contactName.addEventListener('click', e => {
    e.preventDefault();
    contactList.classList.toggle('contact__list--active');
    contactName.classList.toggle('contact__list--active');
  });

  contactType.addEventListener('mouseleave', () => {
    contactList.classList.remove('contact__list--active');
    contactName.classList.remove('contact__list--active');
  });

  function setType(type) {
    type.addEventListener('click', () => {
      contactName.textContent = type.textContent;
      contactList.classList.remove('contact__list--active');
      contactName.classList.remove('contact__list--active');
    });
  }

  const typesArray = [contacPhone, contacEmail, contacVK, contacFb, contacOther];

  for (const type of typesArray) {
    setType(type);
  }

  contactName.textContent = 'Телефон';
  deleteTooltip.textContent = 'Удалить контакт';
  contacPhone.textContent = 'Телефон';
  contacEmail.textContent = 'Email';
  contacVK.textContent = 'VK';
  contacFb.textContent = 'Facebook';
  contacOther.textContent = 'Другое';
  contactInput.placeholder = 'Введите данные контакта';
  contactInput.type = 'text';
  deleteContact.innerHTML = svgDelete;

  deleteContact.append(deleteTooltip);
  contact.append(contactType, contactInput, deleteContact);
  contactType.append(contactName, contactList);
  contactList.append(contacPhone, contacEmail, contacVK, contacFb, contacOther);

  return {
    contact,
    contactName,
    contactInput,
    deleteContact
  };
}
