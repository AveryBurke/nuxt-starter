<script setup>
useHead({
  htmlAttrs: { lang: "en-US" },
  title: "Avery's Nuxt Test",
  meta: [
    {
      name: "description",
      content:
        "Setting up a nuxt app on Netlify with dynamo DB.",
    },
  ],
  bodyAttrs: {
    class: 'font-display'
  }
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
