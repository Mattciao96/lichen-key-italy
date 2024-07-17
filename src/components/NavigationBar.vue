<template>
  <nav
    class="flex-1 items-center max-w container-fluid relative z-50 flex justify-between bg-surface-0/95 backdrop-blur supports-[backdrop-filter]:bg-surface-0/60"
  >
    <!-- logo -->
    <div class="flex gap-2 items-center">
      <div
        class="flex flex-shrink-0 items-center border border-surface-900 rounded-full overflow-hidden"
      >
        <img class="h-10 w-10" src="/general/banner-key.jpg" alt="Your Company" />
      </div>
      <span class="font-semibold text-primary-950 text-2xl">ITALIC KEY</span>
    </div>

    <!-- Desktop menu -->
    <div class="hidden sm:ml-6 sm:block">
      <div class="flex space-x-4">
        <RouterLink
          v-for="item in navigation"
          :key="item.route.name"
          :to="item.route.name"
          :class="[
            item.current ? 'text-primary-500' : 'text-surface-800 hover:text-primary-500',
            'rounded-md px-3 py-2 text-sm font-medium'
          ]"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.name }}
        </RouterLink>
      </div>
    </div>
  </nav>

  <!-- Mobile menu button -->
  <button
    @click="toggleMobileMenu"
    type="button"
    class="sm:hidden fixed top-4 right-4 z-[1002] inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary-500 focus:outline-none"
    aria-controls="mobile-menu"
    :aria-expanded="mobileMenuOpen"
  >
    <span class="sr-only">Toggle main menu</span>
    <svg
      class="h-6 w-6"
      :class="{ hidden: mobileMenuOpen, block: !mobileMenuOpen }"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
    <svg
      class="h-6 w-6"
      :class="{ block: mobileMenuOpen, hidden: !mobileMenuOpen }"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>

  <!-- Mobile menu, show/hide based on menu state -->
  <div
    class="fixed inset-0 z-[1000] transition-all duration-300 ease-in-out"
    :class="{
      'pointer-events-none opacity-0 backdrop-blur-none': !mobileMenuOpen,
      'pointer-events-auto opacity-100 backdrop-blur-sm bg-black/50': mobileMenuOpen
    }"
    @click="toggleMobileMenu"
  >
    <div
      class="fixed top-0 right-0 bottom-0 w-[300px] max-w-[75vw] bg-white shadow-xl transition-transform duration-300 ease-in-out"
      :class="{ 'translate-x-0': mobileMenuOpen, 'translate-x-full': !mobileMenuOpen }"
      @click.stop
    >
      <div class="p-4 space-y-4 mt-16">
        <!-- Added mt-16 to account for the button -->
        <!-- Menu items -->
        <RouterLink
          v-for="item in navigation"
          :key="item.route.name"
          :to="item.route.name"
          :class="[
            item.current ? 'text-primary-500' : 'text-surface-800 hover:text-primary-500',
            'block px-3 py-2 rounded-md text-base font-medium'
          ]"
          :aria-current="item.current ? 'page' : undefined"
          @click="toggleMobileMenu"
        >
          {{ item.name }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const mobileMenuOpen = ref(false)

const navigation = [
  { name: 'Home', route: { name: '/' } },
  { name: 'Filters', route: { name: '/filter-area' } },
  { name: 'Taxa filters', route: { name: '/filter-taxa/a' } },
  { name: 'Full key', route: { name: '/full/species-list' } }
]

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<style scoped>
.container-fluid {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1400px;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
