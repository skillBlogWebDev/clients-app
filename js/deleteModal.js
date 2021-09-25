import {
  svgSpinner
} from "./svg.js";

export function deleteClientModal() {
  const deleteModalContent = document.createElement('div')
  const modalClose = document.createElement('button');
  const deleteModalTitle = document.createElement('h2');
  const deleteModalText = document.createElement('p');
  const deleteModal = document.createElement('div');
  const deleteModalDelete = document.createElement('button');
  const deleteModalBack = document.createElement('button');
  const deleteModalSpinner = document.createElement('span');

  deleteModal.classList.add('delete-modal', 'site-modal', 'modal-active');
  deleteModalContent.classList.add('delete-modal__content', 'site-modal__content', 'modal-active');
  deleteModalText.classList.add('delete-modal__text');
  deleteModalTitle.classList.add('delete-modal__titile', 'modal__title');
  deleteModalDelete.classList.add('delete-modal__delete', 'btn-reset', 'site-btn');
  deleteModalBack.classList.add('delete-modal__back', 'btn-reset');
  modalClose.classList.add('modal__close', 'btn-reset');
  deleteModalSpinner.classList.add('modal__spinner');

  deleteModalBack.addEventListener('click', () => {
    deleteModal.remove();
  });

  modalClose.addEventListener('click', () => {
    deleteModal.remove();
  });

  deleteModalDelete.addEventListener('click', () => {
    deleteModalSpinner.style.display = 'block';
  });

  deleteModalTitle.textContent = 'Удалить клиента';
  deleteModalText.textContent = 'Вы действительно хотите удалить данного клиента?';
  deleteModalDelete.textContent = 'Удалить';
  deleteModalBack.textContent = 'Отмена';
  deleteModalSpinner.innerHTML = svgSpinner;

  deleteModalDelete.append(deleteModalSpinner);
  deleteModalContent.append(modalClose, deleteModalTitle, deleteModalText, deleteModalDelete, deleteModalBack);
  deleteModal.append(deleteModalContent);

  document.body.addEventListener('click', e => {
    if (e.target == deleteModal) {
      deleteModal.remove();
    }
  });

  return {
    deleteModal,
    deleteModalContent,
    deleteModalDelete
  };
}
