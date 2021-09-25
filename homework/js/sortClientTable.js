export const sortTable = (index, type, isSorted, table, tbody) => {
  const compare = function (row1, row2) {
    if (type == null) {
      throw new TypeError('Поустое значение');
   }

    const rowData1 = row1.cells[index].innerHTML;
    const rowData2 = row2.cells[index].innerHTML;

    switch (type) {
      case 'id':
        return rowData1 - rowData2
      case 'created':
      case 'updateds':
        const data1 = rowData1.split('.').reverse().join('-');
        const data2 = rowData2.split('.').reverse().join('-');
        return new Date(data1).getTime() - new Date(data2).getTime();
      case 'text':
        if (rowData1 < rowData2) return -1;
        else if (rowData1 > rowData2) return 1;
        return 0;
    }
  }

  let rows = [].slice.call(tbody.rows);

  rows.sort(compare);
  if (isSorted) rows.reverse();

  table.removeChild(tbody);

  for (let i = 0; i < rows.length; i++) {
      tbody.appendChild(rows[i]);
  }

  table.appendChild(tbody);

}
