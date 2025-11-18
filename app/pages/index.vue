<template>
    <div class="max-w-2xl bg-white p-8 rounded-xl shadow-lg">
    
        <h1 class="text-4xl font-bold mb-4 text-gray-900">
        マッチョ管理アプリ
        </h1>

        <p class="text-gray-700 mb-4">
            ここは好きなマッチョ管理できるアプリケーションだ！
        </p>

        <p class="text-gray-700 mb-8">
            お前の好きなマッチョを登録したいって？できるものならやってみろ！
        </p>

        <NuxtLink
            to="/users"
            class="inline-block bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition"
        >
            マッチョを確認する
        </NuxtLink>

    </div>
</template>

<script setup lang="ts">

</script>