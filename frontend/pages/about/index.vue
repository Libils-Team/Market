<template>
    <div>
        About page
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'about',
    middleware: ["auth"],
});
</script>

<style scoped></style>
