<template>
    <div>
        <UserForm
            v-model="user"
            @validityChange="validityChange($event)"
            @submit="createUser(user)"
        />
        <div class="flex justify-center gap-6 mt-4">
            <button
                @click="createUser(user)"
                :disabled="!isValid"
                class="btn-proceed"
            >
                更新する
            </button>

            <NuxtLink
                class="btn-back"
                to="/users"
            >
                戻る
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { reactive, ref } from 'vue';
    import type { User } from '~/types/user';
    import UserForm from '~/components/users/UserForm.vue';
    import { useUserStore } from '~/stores/user';

    const user = reactive<User>({
        id: 0,
        name: '',
        age: 0 
    });

    const userStore = useUserStore();

    const createUser = async (newUser: User) => {

        if (!isValid.value) {
            return;
        }
        
        await fetch(`/api/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });

        alert('ユーザーを新規作成しました！');
        await userStore.fetchUsers(true);
        navigateTo('/users');
    };

    
    const isValid = ref(false);
    const validityChange = (valid: boolean) => {
        isValid.value = valid;
    };
</script>