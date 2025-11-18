import { defineStore } from 'pinia';
import type { User } from '~/types/user';

export const useUserStore = defineStore('user', () => {

    const users = ref<User[]>([]);

    const fetchUsers = async () => {
        const { data } = await useFetch<User[]>('/api/users');
        users.value = data.value || [];
    };

    const deleteUser = async (id: number) => {
        await useFetch(`/api/users/${id}`, {
            method: 'DELETE',
        });
        // ローカルの users 配列から削除
        users.value = users.value.filter(user => user.id !== id);
    }

    return {
        users,
        fetchUsers,
        deleteUser,
    };
});