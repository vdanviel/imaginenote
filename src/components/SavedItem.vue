<template>

  <div class="fixed bottom-0 left-1/2 my-2 mb-10 flex -translate-x-1/2 transform cursor-default items-center rounded-lg bg-[#22c55e94] p-2 text-white">
    <span class="mr-2">Salvando...</span>
    <svg class="inline-block h-6 w-6 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <!-- Definindo o gradiente -->
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(255, 255, 255, 0)" />
          <stop offset="100%" stop-color="rgba(255, 255, 255, 1)" />
        </linearGradient>
      </defs>
      <!-- Adicionando o círculo com gradiente -->
      <circle cx="12" cy="12" r="10" stroke-width="4" stroke="url(#gradient)" />
    </svg>
  </div>

</template>
