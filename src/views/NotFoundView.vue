<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-100">
    <h1 class="mb-4 text-6xl font-bold text-gray-800">404</h1>
    <p class="mb-8 text-xl text-gray-600">Oops! Page not found.</p>
    <routerLink
      to="/"
      class="rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
    >
      Go to Home
    </routerLink>
  </div>
</template>

<script setup lang="ts"></script>
