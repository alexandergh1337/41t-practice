<script>
  export let type = "info";
  export let message = "";
  export let closeable = false;

  let show = true;

  const closeAlert = () => {
    show = false;
  };

  const alertClasses = {
    info: "bg-blue-100 border-blue-500 text-blue-700",
    success: "bg-green-100 border-green-500 text-green-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    danger: "bg-red-100 border-red-500 text-red-700"
  };
</script>

{#if show}
  <div class="relative border-l-4 p-4 mb-4 rounded-md shadow-md {alertClasses[type]}" role="alert">
    <div class="flex justify-between items-center">
      <div>
        <p class="font-bold">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
        <p>{message}</p>
      </div>
      {#if closeable}
        <button on:click={closeAlert} class="text-gray-500 hover:text-gray-700 ml-4">
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      {/if}
    </div>
  </div>
{/if}
