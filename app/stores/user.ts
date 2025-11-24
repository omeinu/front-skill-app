import { defineStore } from 'pinia';
import type { User } from '~/types/user';

export const useUserStore = defineStore('user', {

    state: () => ({
        users: [] as User[],
    }),

    actions: {
        async fetchUsers(force = false) {
            if (!force && this.users.length > 0) {
                return
            }
        
            const { data } = await useFetch<User[]>('/api/users', {
                key: 'user-list-' + Date.now(),
                server: false,
                immediate: true,
                default: () => []
            });

            this.users = data.value || [];
        },
    
        async deleteUser(id: number) {
            await useFetch(`/api/users/${id}`, {
                method: 'DELETE',
            });
            // ローカルの users 配列から削除
            this.users = this.users.filter(user => user.id !== id);
        }
    },
    persist: true
});