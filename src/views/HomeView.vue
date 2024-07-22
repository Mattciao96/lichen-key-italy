<template>
  <div class="w-full flex flex-col">
    <h1 class="mt-8">ITALIC KEYMAKER</h1>
    <div class="[&>p]:mb-4 [&>h2]:font-bold">
      <p>
        This tool generates keys to subsets of species defined by the user by specifying their
        distribution, traits and ecological requirements. The smaller keys are obtained from the
        general key to the lichens of Italy by eliminating all couplets leading to species which do
        no share all of the specified characters. There are 3 main filters:
      </p>
      <h2>GENERAL FILTER</h2>
      <p>
        Users have to specify (mandatory) whether they want to work with species which are actually
        known from Italy, or to include also additional species known from neighbouring countries,
        whose presence in Italy is possible. In the former case, users can also select an
        administrative region and an ecoregion, and can filter the species on the basis of their
        commonness/rarity in that ecoregion. Furthermore, they can filter the species by genera
        and/or by family.
      </p>
      <h2>TRAIT FILTER</h2>
      <p>
        Species can be filtered by some important morpho-chemical traits. At the moment, a limited
        number of traits can be selected, but in the future further traits will be added.
      </p>
      <h2>ECOLOGICAL FILTER</h2>
      <p>
        Species can be filtered by substrate-type, and by specifying a range of the ecological
        indicator values: pH of the substrate, light, availability of water, eutrophication,
        poleophoby etc, For more details on the indicator values we suggest to consult the Data
        Section of ITALIC. Once a query is completed, the system produces: A) A series of keys in 4
        different formats (the first 4 are printable): 1) Illustrated (with pictures of species and
        descriptions), 2) Not illustrated (with descriptions only), 3) Plain (only the dichotomous
        skeleton, without pictures and desctiptions), 4) interactive (also including pictures of
        characters). B) A list of the species resulting from the query. C) A photo gallery of the
        species resulting from the query. If users wants to delete some species from the query, they
        can use the option “adjust key” specifying only the species they want to retain.
      </p>

      <h2>FREE CHOICE FILTER</h2>
      <p>Users can select any subset of species they want to include in a key.</p>
      <p>
        The tool is still in the phase of testing. We would be grateful for feedback from users –
        write to nimis@units.it
      </p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
