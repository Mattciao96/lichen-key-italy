<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
    <p class="text-xl text-gray-600 mb-8">Oops! Page not found.</p>
    <routerLink
      to="/"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
    >
      Go to Home
    </routerLink>
  </div>
</template>

<script setup lang="ts"></script>
