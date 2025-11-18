<template>
    <div class="text-center">
        <h1>404 - ページが見つからない時はapp/pages/users/[...slug].vueにジャンプするんだよ</h1>
        <NuxtLink to="/">ホームへ戻る</NuxtLink>
    </div>


</template>

<script setup>
    const route = useRoute();
    console.log('Unknown route:', route.params.slug);
</script>