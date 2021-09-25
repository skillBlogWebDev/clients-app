import {
  createContactItem
} from "./addContact.js";
import {
  svgContactDefault,
  svgContactHover,
  svgSpinner
} from "./svg.js";
import {
  validateClientForm} from "./validateForm.js";

export const createModalForm = () => {
  const modalTitle = document.createElement('h2');
  const modalClose = document.createElement('button');
  const form = document.createElement('form');
  const inputName = document.createElement('input');
  const LabelName = document.createElement('label');
  const LabelLastname = document.createElement('label');
  const requiredName = document.createElement('span');
  const requiredSurname = document.createElement('span');
  const inputSurname = document.createElement('input');
  const LabelSurname = document.createElement('label');
  const inputLastname = document.createElement('input');
  const addContactBtn = document.createElement('button');
  const contactBtnSvgDefault = document.createElement('span');
  const contactBtnSvgHover = document.createElement('span');
  const saveBtn = document.createElement('button');
  const cancelBtn = document.createElement('button');
  const contactBlock = document.createElement('div');
  const formFloatingName = document.createElement('div');
  const formFloatingSurname = document.createElement('div');
  const formFloatingLastName = document.createElement('div');
  const errorBlock = document.createElement('p');
  const unacceptableLetter = document.createElement('span');
  const writeName = document.createElement('span');
  const writeSurname = document.createElement('span');
  const writeLastName = document.createElement('span');
  const requiredValue = document.createElement('span');
  const saveBtnSpinner = document.createElement('span');
  const requireContacts = document.createElement('span');

  modalTitle.classList.add('modal__title')
  form.classList.add('modal__form');
  formFloatingName.classList.add('form-floating');
  formFloatingSurname.classList.add('form-floating');
  formFloatingLastName.classList.add('form-floating');
  inputName.classList.add('modal__input');
  inputSurname.classList.add('modal__input');
  inputLastname.classList.add('modal__input');
  LabelName.classList.add('modal__label');
  LabelSurname.classList.add('modal__label');
  requiredSurname.classList.add('modal__label');
  LabelLastname.classList.add('modal__label');
  addContactBtn.classList.add('modal__btn-contact', 'modal__btn-contact--active');
  saveBtn.classList.add('modal__btn-save', 'btn-reset', 'site-btn');
  cancelBtn.classList.add('modal__btn-back', 'btn-reset');
  contactBtnSvgDefault.classList.add('btn-contact__svg', 'btn-contact__svg--default', 'btn-contact__svg--active');
  contactBtnSvgHover.classList.add('btn-contact__svg', 'btn-contact__svg--hover')
  modalClose.classList.add('modal__close', 'btn-reset');
  contactBlock.classList.add('modal__contact');
  errorBlock.classList.add('modal__error');
  unacceptableLetter.setAttribute('id', 'unacceptableLetter');
  writeName.setAttribute('id', 'writeName');
  writeSurname.setAttribute('id', 'writeSurname');
  writeLastName.setAttribute('id', 'writeLastName');
  requiredValue.setAttribute('id', 'requiredValue');
  requireContacts.setAttribute('id', 'requireContacts');
  saveBtnSpinner.classList.add('modal__spinner');

  modalTitle.textContent = 'Новый клиент';
  LabelName.textContent = 'Имя';
  LabelSurname.textContent = 'Фамилия';
  LabelLastname.textContent = 'Отчество';
  LabelName.setAttribute('for', 'floatingName');
  LabelSurname.setAttribute('for', 'floatingSurname');
  LabelLastname.setAttribute('for', 'floatingLastName');
  inputName.setAttribute('id', 'floatingName');
  inputSurname.setAttribute('id', 'floatingSurname');
  inputLastname.setAttribute('id', 'floatingLastname');
  inputName.type = 'text';
  inputSurname.type = 'text';
  inputLastname.type = 'text';
  inputName.placeholder = 'Имя';
  inputSurname.placeholder = 'Фамилия';
  inputLastname.placeholder = 'Отчество';
  addContactBtn.textContent = 'Добавить контакт';
  saveBtn.textContent = 'Сохранить';
  requiredName.textContent = '*';
  requiredSurname.textContent = '*';
  contactBtnSvgDefault.innerHTML = svgContactDefault;
  contactBtnSvgHover.innerHTML = svgContactHover;
  saveBtnSpinner.innerHTML = svgSpinner;

  addContactBtn.addEventListener('click', e => {
    e.preventDefault();
    const contactItems = document.getElementsByClassName('contact');

    if (contactItems.length < 9) {
      const contactItem = createContactItem();
      contactBlock.prepend(contactItem.contact);
      contactBlock.style.backgroundColor = 'var(--athens-gray)';
    } else {
      const contactItem = createContactItem();
      contactBlock.prepend(contactItem.contact);
      contactBlock.style.backgroundColor = 'var(--athens-gray)';
      addContactBtn.classList.remove('modal__btn-contact--active');
    }
  });

  modalClose.addEventListener('click', () => {
    import('./addClient.js').then(({
      addClientModal
    }) => {
      addClientModal().remove();
    });
  });

  addContactBtn.addEventListener('mouseover', () => {
    contactBtnSvgDefault.classList.remove('btn-contact__svg--active');
    contactBtnSvgHover.classList.add('btn-contact__svg--active');
  });

  addContactBtn.addEventListener('mouseleave', () => {
    contactBtnSvgDefault.classList.add('btn-contact__svg--active');
    contactBtnSvgHover.classList.remove('btn-contact__svg--active');
  });

  saveBtn.addEventListener('click', () => {
    if (validateClientForm()) {
      saveBtnSpinner.style.display = 'block';
    }
  });

  LabelName.append(requiredName);
  LabelSurname.append(requiredSurname);
  formFloatingName.append(inputName, LabelName);
  formFloatingSurname.append(inputSurname, LabelSurname);
  formFloatingLastName.append(inputLastname, LabelLastname);
  contactBlock.append(addContactBtn);
  saveBtn.append(saveBtnSpinner);
  errorBlock.append(writeName, writeSurname, writeLastName, requiredValue, unacceptableLetter, requireContacts);
  form.append(formFloatingSurname, formFloatingName, formFloatingLastName, contactBlock, errorBlock, saveBtn, cancelBtn);
  addContactBtn.append(contactBtnSvgDefault, contactBtnSvgHover);

  return {
    form,
    modalClose,
    modalTitle,
    cancelBtn: cancelBtn,
    inputName,
    inputSurname,
    inputLastname,
    LabelName,
    LabelSurname,
    LabelLastname,
    contactBlock,
    addContactBtn,
  }
}
