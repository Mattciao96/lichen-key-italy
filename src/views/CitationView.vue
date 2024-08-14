<template>
  <div class="flex w-full flex-col">
    <h1 class="text-title mb-8 mt-4 hidden text-center">ITALIC KEYMAKER</h1>
    <div class="mt-8 [&>h2]:font-bold [&>p]:mb-4">
      <h2 class="mb-1">To cite the Keymaker:</h2>
      <p>
        Conti M., Martellos S., Nimis P.L. (20YY) – ITALIC Keymaker.
        https://italic.units.it/key-maker/ Accessed on: DD/MM/YYYY
      </p>
      <h2 class="mb-1">To cite a key:</h2>
      <p>
        Nimis P.L. (20YY) The lichens of Italy - An interactive guide.
        https://italic.units.it/flora/ (continuously updated) Accessed on: DD/MM/YYYY
      </p>
      <h2 class="mb-1">Example:</h2>
      <p>
        For identification we used the ITALIC Keymaker (Conti & al. 20YY), based on the key to the
        lichens of Italy by Nimis (20YY).
      </p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped>
.text-title {
  font-size: clamp(38px, 9vw, 50px);
  line-height: 1;
  /*  letter-spacing: -0.02em;*/
}
</style>
