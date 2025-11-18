<template>

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
                <td><button @click="deleteUser(u.id)">削除</button></td>
            </tr>
        </tbody>
    </table>

    <NuxtLink
        class="inline-block mt-4 bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition"
        to="/users/create"
    >
        新規追加
    </NuxtLink>
    <button
        class="inline-block mt-4 bg-gray-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-600 transition"
        @click="goHome()"
    >
        戻る
    </button>
    
</template>

<script setup lang="ts">

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
    
    const goHome = () => {
        navigateTo('/');
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
    button {
        background: #f44336;
        color: white;
        border: none;
        cursor: pointer;
        padding: 6px 12px;
        border-radius: 4px;
    }
</style>