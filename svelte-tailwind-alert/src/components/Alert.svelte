<script>
  import {fly} from 'svelte/transition';
  import {cubicOut} from 'svelte/easing';
  import {onDestroy} from 'svelte';

  export let type = "info";
  export let title = "";
  export let message = "";
  export let onClose;
  export let duration = 5000;

  let width = 100;
  let isHovering = false;

  const alertClasses = {
    simple: "border-white",
    link: "border-2 border-purple-500",
    error: "border-red-500",
    success: "border-green-500",
    warning: "border-yellow-500",
    info: "border-blue-500",
  };

  const iconClasses = {
    check: "h-6 w-6 text-green-500",
    warning: "h-6 w-6 text-yellow-500",
    info: "h-6 w-6 text-blue-500",
    close: "h-6 w-6 text-red-500",
  };

  const iconPaths = {
    check: '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>',
    warning: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4L4 20h16L12 4z" fill="none" />',
    info: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>',
    close: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />'
  };

  const handleClose = () => {
    onClose();
  };

  const getBarColor = () => {
    switch (type) {
      case 'error':
        return 'red-500';
      case 'success':
        return 'green-500';
      case 'warning':
        return 'yellow-500';
      case 'info':
        return 'blue-500';
      default:
        return 'white';
    }
  };

  let timer;
  let elapsed = 0;
  let startTime;

  const startTimer = () => {
    startTime = Date.now() - elapsed;
    timer = setInterval(() => {
      elapsed = Date.now() - startTime;
      width = 100 - (elapsed / duration) * 100;

      if (width <= 0) {
        clearInterval(timer);
        handleClose();
      }
    }, 100);
  };

  const pauseTimer = () => {
    clearInterval(timer);
  };

  $: if (isHovering) {
    pauseTimer();
  } else {
    startTimer();
  }

  onDestroy(() => {
    clearInterval(timer);
  });
</script>

<div
        in:fly={{ y: 20, duration: 300, easing: cubicOut }}
        out:fly={{ y: 20, duration: 200, easing: cubicOut }}
        class="bg-gray-800 text-white p-3 rounded-md mb-2 flex justify-between items-start relative {alertClasses[type]}"
        on:mouseover={() => isHovering = true}
        on:mouseout={() => isHovering = false}
>
  <div class="flex items-center">
    {#if type !== 'simple'}
      <span class="mr-2">
        <svg
                xmlns="http://www.w3.org/2000/svg"
                class={iconClasses[type === 'error' ? 'close' : type === 'success' ? 'check' : type]}
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill={type === 'success' ? 'currentColor' : 'none'}
        >
          {@html iconPaths[type === 'error' ? 'close' : type === 'success' ? 'check' : type]}
        </svg>
      </span>
    {/if}
    <div>
      <h3 class="text-white font-bold">
        {title}
      </h3>
      <p class="text-gray-400 {type === 'link' ? 'break-words' : ''}">
        {@html message}
      </p>
    </div>
  </div>

  <button class="text-gray-400 hover:text-gray-300 bg-transparent border-none" on:click={handleClose}>
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  </button>

  <div
          class="absolute bottom-0 right-0 h-1 bg-{getBarColor()}"
          style="width: {width}%; transition: width 0.1s linear;"
  />
</div>
