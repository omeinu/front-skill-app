<template>
    <div>
        <h2 class="text-4xl font-bold mb-4 text-gray-900">ユーザー 一覧</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>編集</th>
                    <th>削除</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="u in users" :key="u.id">
                    <td>{{ u.name }}</td>
                    <td>{{ u.age }}</td>
                    <td><NuxtLink :to="`/users/${u.id}/edit`">編集</NuxtLink></td>
                    <td><button class="btn-danger" @click="deleteUser(u.id)">削除</button></td>
                </tr>
            </tbody>
        </table>
        <div class="flex justify-center gap-6 mt-4">
            <NuxtLink
                class="btn-proceed mt-6"
                to="/users/create"
            >
                新規追加
            </NuxtLink>
            <NuxtLink
                class="btn-back mt-6"
                to="/"
            >
                戻る
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { onMounted, computed } from 'vue';
    import { useUserStore } from '~/stores/user';

    const userStore = useUserStore();
    
    onMounted(() => {
        userStore.fetchUsers();
    });

    const users = computed(() => userStore.users)

    const deleteUser = async (id: number) => {
        
        const ok = confirm('本当に削除しますか？');
        if (!ok) return;

        await userStore.deleteUser(id);
        
        alert('ユーザーを削除しました！');
    };

</script>

    <style scoped>
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
    }

    th {
        background: #4CAF50;
        color: white;
    }

    tr:nth-child(even) {
        background: #f9f9f9;
    }
</style>