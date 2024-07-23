<template>
  <Transition name="fade" mode="out-in">
    <h1>Pagina Inicial</h1>
  </Transition>
  <router-link to="/login">Go to Form</router-link>
</template>

<script>
export default {
  name: 'Home',
};
</script>

