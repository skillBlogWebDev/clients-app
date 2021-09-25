import {
  createHeader
} from "./sectionHeader.js";
import {
  createSectionClients
} from './sectionClients.js';
import {
  fetchClients
} from './clientsApi.js';
import {
  createClientItem
} from "./createClientItem.js";

const createApp = async () => {
  const clients = await fetchClients();
  const sectionClients = createSectionClients();
  const header = createHeader(clients);

  window.onload = () => {
    const preloader = document.querySelector('.preloader');
    preloader.remove();

    for (const item of clients) {
      document.querySelector('.clients__tbody').append(createClientItem(item));
    }
  }

  document.body.append(
    header,
    sectionClients.main);
}
createApp();
