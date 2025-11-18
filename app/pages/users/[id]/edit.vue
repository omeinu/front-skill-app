<template>
    
    <div>
        <UserForm
            v-model="user"
            @validityChange="validityChange($event)"
        />

        <button
            @click="updateUser(user)"
            :disabled="!isValid"
            class="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition mt-4"
        >
            更新する
        </button>
    </div>
    
    <NuxtLink
        class="inline-block mt-4 bg-gray-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition"
        to="/users"
    >
        戻る
    </NuxtLink>
</template>

<script setup lang="ts">

    import { ref, onMounted } from 'vue';
    import type { User } from '~/types/user';
    import UserForm from '~/components/users/UserForm.vue';

    onMounted(() => {
        console.log('〜〜〜編集ページのMountedだよ〜〜〜');
    });

    const route = useRoute();
    const id = Number(route.params.id);

    const { data: user } = await useFetch<User>(`/api/users/${id}`);

    const updateUser = async (updatedUser: User) => {
        await fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser)
        });

        alert('ユーザー情報を更新しました！');
        navigateTo('/users');
    };

    const isValid = ref(false);
    const validityChange = (valid: boolean) => {
        isValid.value = valid;
    };

</script>