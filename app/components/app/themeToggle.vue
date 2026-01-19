<script lang="ts" setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(value) {
    colorMode.preference = value ? "dark" : "light";
  },
});
</script>

<template>
  <label class="swap swap-rotate">
    <!-- this hidden checkbox controls the state -->
    <input
      v-model="isDark"
      type="checkbox"
      class="theme-controller"
      value="synthwave"
    >
    <Icon
      class="swap-off text-black"
      size="20"
      name="tabler:sun"
    />
    <Icon
      class="swap-on text-white"
      size="20"
      name="tabler:moon-filled"
    />
  </label>
</template>
