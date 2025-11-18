<template>
    
    <div>
        <UserForm
            v-model="user"
            @validityChange="validityChange($event)"
        />

        <button
            @click="createUser(user)"
            :disabled="!isValid"
            class="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition mt-4"
        >
            更新する
        </button>

        <NuxtLink
            class="inline-block mt-4 bg-gray-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition"
            to="/users"
        >
            戻る
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">

    import { reactive, ref } from 'vue';
    import type { User } from '~/types/user';
    import UserForm from '~/components/users/UserForm.vue';

    const user = reactive<User>({
        id: 0,
        name: '',
        age: 0 
    });

    const createUser = async (newUser: User) => {
        
        await fetch(`/api/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });

        alert('ユーザーを新規作成しました！');
        navigateTo('/users');
    };

    
    const isValid = ref(false);
    const validityChange = (valid: boolean) => {
        isValid.value = valid;
    };
</script>