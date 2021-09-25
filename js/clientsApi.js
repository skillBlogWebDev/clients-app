export async function fetchClients() {
  const response = await fetch('http://localhost:3000/api/clients');
  const data = await response.json();

  return data;
}

export async function deleteClientItem(id) {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'DELETE',
  });

  if (response.status === 404)
    console.log('Не удалось удалить клиента.');
  const data = await response.json();
  console.log(data);
}

export async function sendClientData(obj, method) {
  const clientName = obj.name;
  const clientSurname = obj.surname;
  const clientLastName = obj.lastName;
  const clientContact = obj.contacts;
  const response = await fetch(`http://localhost:3000/api/clients/${method === 'POST' ? '' : obj.id}`, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: clientName,
      surname: clientSurname,
      lastName: clientLastName,
      contacts: clientContact,
    })
  });
}

export async function searchClient(value) {
  const response = await fetch(`http://localhost:3000/api/clients?search=${value}`);
  const result = await response.json();

  return result;
}
