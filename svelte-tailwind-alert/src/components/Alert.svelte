<script>
  export let type = "info";
  export let title = "";
  export let message = "";
  export let icon = null;

  let show = true;

  const closeAlert = () => {
    show = false;
  };

  const alertClasses = {
    simple: "border-b-4 border-white",
    link: "border-2 border-purple-500",
    error: "border-b-4 border-red-500",
    success: "border-b-4 border-green-500",
    warning: "border-b-4 border-yellow-500",
    info: "border-b-4 border-blue-500",
  };

  const iconClasses = {
    check: "h-6 w-6 text-green-500",
    warning: "h-6 w-6 text-yellow-500",
    info: "h-6 w-6 text-blue-500",
    close: "h-6 w-6 text-red-500",
  };

  const iconPaths = {
    check: '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>',
    warning: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4L4 20h16L12 4z" fill="none" />',
    info: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>',
    close: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />'
  };
</script>

{#if show}
  <div class="bg-gray-800 text-white p-3 rounded-md mb-2 flex justify-between items-start {alertClasses[type]}">
    <div class="flex items-center">
      {#if icon}
        <span class="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="{iconClasses[icon]}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {@html iconPaths[icon]}
          </svg>
        </span>
      {/if}
      <div>
        <h3 class="text-white font-bold">{title}</h3>
        <p class="text-gray-400">{@html message}</p>
      </div>
    </div>
    <button class="text-gray-400 hover:text-gray-300 bg-transparent border-none" on:click={closeAlert}>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
{/if}