<script>
  import { writable, get } from 'svelte/store';
  import Alert from './components/Alert.svelte';

  const notifications = writable([]);

  const addNotification = (type, title, message, duration = 5000) => {
    const id = Math.random().toString(36).substring(2, 9);
    notifications.update(allNotifications => [
      ...allNotifications,
      { id, type, title, message, duration }
    ]);
  };

  const removeNotification = (id) => {
    notifications.update(allNotifications => allNotifications.filter(n => n.id !== id));
  };

  const showAlert = (type) => {
    switch (type) {
      case 'simple':
        addNotification('simple', 'ОБЫЧНЫЙ алерт', 'ДА ЭТО обычный алерт у него даже иконки нету он парень простой но хороший');
        break;
      case 'link':
        addNotification('link', 'Алерт с линкой', 'А вот это уже не обычный алерт он с секретом (у него <a href=\'#\' class=\'text-blue-500\'>ссылка</a>)');
        break;
      case 'error':
        addNotification('error', 'САНЯ ЧТО-ТО не ТО', 'Саня отмена САНЯ ОТМЕНА ТЕСТОВЫЙ АЛЕРТ ПОШЕЛ ПО П@#Z%', 3000);
        break;
      case 'success':
        addNotification('success', 'Успешное действие', 'Поздравляем вы оформили кредит и устроились работать в 41Т');
        break;
      case 'warning':
        addNotification('warning', 'Внимание алерт', 'Посмотрите на меня у меня недостаток внимания я привлекаю внимание');
        break;
      case 'info':
        addNotification('info', 'Синий квадрат', 'Поздравляю это последняя фигура теперь у нас PS алерты');
        break;
    }
  };
</script>

<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

<main class="bg-gray-900 p-8 rounded-lg relative min-h-screen">
  <h2 class="text-white text-xl font-bold mb-4">Svelte оповещения с Tailwind CSS</h2>

  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" on:click={() => showAlert('simple')}>
    Обычный
  </button>
  <button class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-2" on:click={() => showAlert('link')}>
    Ссылка
  </button>
  <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2" on:click={() => showAlert('error')}>
    Ошибка
  </button>
  <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" on:click={() => showAlert('success')}>
    Успех
  </button>
  <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2" on:click={() => showAlert('warning')}>
    Предупреждение
  </button>
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={() => showAlert('info')}>
    Инфо
  </button>

  <div class="fixed bottom-4 right-4 w-96">
    {#each $notifications as notification (notification.id)}
      <Alert {...notification} onClose={() => removeNotification(notification.id)} />
    {/each}
  </div>
</main>