<script>
  import Alert from './components/Alert.svelte';
</script>

<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

<main class="p-4">
  <h1 class="text-2xl font-bold mb-4">Svelte оповещения с Tailwind CSS</h1>

  <Alert type="info" message="Это информационное оповещение." />
  <Alert type="success" message="Это оповещение об успешном действии." closeable={true} />
  <Alert type="warning" message="Это предупреждающее оповещение." />
  <Alert type="danger" message="Это оповещение об опасности." closeable={true} />
</main>
