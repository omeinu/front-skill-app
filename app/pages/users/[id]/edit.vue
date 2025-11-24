<template>
    
    <div>
        <UserForm
            v-model="user"
            @validityChange="validityChange($event)"
            @submit="updateUser(user)"
        />
        <div class="flex justify-center gap-6 mt-4">

            <button
                @click="updateUser(user)"
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

    import { ref } from 'vue';
    import type { User } from '~/types/user';
    import UserForm from '~/components/users/UserForm.vue';
    import { useUserStore } from '~/stores/user';

    const userStore = useUserStore();
    const route = useRoute();
    const id = Number(route.params.id);

    const { data: user } = await useFetch<User>(`/api/users/${id}`);

    const updateUser = async (updatedUser: User) => {

        if (!isValid.value) {
            return;
        }

        await fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser)
        });

        alert('ユーザー情報を更新しました！');
        await userStore.fetchUsers(true)
        navigateTo('/users');
    };

    const isValid = ref(false);
    const validityChange = (valid: boolean) => {
        isValid.value = valid;
    };

</script>