<script>
  import Alert from './components/Alert.svelte';
</script>

<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

<main class="bg-gray-900 p-8 rounded-lg">
  <h2 class="text-white text-xl font-bold mb-4">Svelte оповещения с Tailwind CSS</h2>

  <Alert
          type="simple"
          title="ОБЫЧНЫЙ алерт"
          message="ДА ЭТО обычный алерт у него даже иконки нету он парень простой но хороший"
  />
  <Alert
          type="link"
          title="Алерт с линкой"
          message="А вот это уже не обычный алерт он с секретом (у него <a href='#' class='text-blue-500'>ссылка</a>)"
  />
  <Alert
          type="error"
          title="САНЯ ЧТО-ТО не ТО"
          message="Саня отмена САНЯ ОТМЕНА ТЕСТОВЫЙ АЛЕРТ ПОШЕЛ ПО П@#Z%"
          icon="close"
  />
  <Alert
          type="success"
          title="Успешное действие"
          message="Поздравляем вы оформили кредит и устроились работать в 41Т"
          icon="check"
  />
  <Alert
          type="warning"
          title="Внимание алерт"
          message="Посмотрите на меня у меня недостаток внимания я привлекаю внимание"
          icon="warning"
  />
  <Alert
          type="info"
          title="Синий квадрат"
          message="Поздравляю это последняя фигура теперь у нас PS алерты"
          icon="info"
  />
</main>