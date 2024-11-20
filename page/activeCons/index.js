 // URL вашего API
 const apiUrl = 'http://195.208.161.184:3030/departments-users'; // Пример API
 function compareNumbers(a, b) {
    return a - b;
  }
 // Функция для получения данных и их отображения
 async function fetchData() {
     try {
        
         const response = await fetch(apiUrl);
         if (!response.ok) {
             throw new Error('Сеть не отвечает');
         }
         const data = await response.json()
        //  console.log(data)
         const dataGen = data['АКТИВ Консалтинг' ]
         console.log(dataGen)
         dataGen.sort((a,b) => {
            if (a.eff < b.eff) {
                return -1; // a идет перед b
            }
            if (a.eff > b.eff) {
                return 1; // b идет перед a
            }
            return 0; // a и b равны
         })
         const firstFiveElements = dataGen.splice(0, 5);
         console.log(firstFiveElements)
         populateTable(firstFiveElements);
     } catch (error) {
         console.error('Ошибка:', error);
     }
 }

 // Функция для заполнения таблицы данными
 function populateTable(data) {
     const tableBody = document.querySelector('#data-table tbody');
     tableBody.innerHTML = ''; // Очищаем таблицу перед добавлением данных

     data.forEach(item => {
         const row = document.createElement('tr');
         row.innerHTML = `
             <td>${item.name}</td>
             <td>${item.taskAtWork}</td>
             <td>${item.eff}</td>
         `;
         tableBody.appendChild(row);
     });
 }

 // Вызов функции при загрузке страницы
 window.onload = fetchData;