<template>
    <form @submit.prevent="emit('submit')">
    <!-- 名前 -->
        <div>
            <label>名前</label>
            <input
                ref="nameInput"
                type="text"
                v-model="user.name"
                @input="touched.name = true"
                placeholder="名前"
                class="border p-2 mb-2 w-full"
            />
            <div class="min-h-[24px]">
                <p
                v-show="touched.name && nameError"
                class="text-red-500"
                >
                {{ nameError }}
                </p>
            </div>
        </div>

        <!-- 年齢 -->
        <div>
            <label>年齢</label>
            <input
                type="number"
                v-model="user.age"
                @input="touched.age = true"
                placeholder="年齢"
                class="border p-2 mb-2 w-full"
            />
            <div class="min-h-[24px]">
                <p
                v-show="touched.age && ageError"
                class="text-red-500"
                >
                {{ ageError }}
                </p>
            </div>
        </div>
        <button type="submit" class="hidden"></button>
    </form>
</template>

<script setup lang="ts">
import type { User } from '~/types/user';
import { ref, reactive, watch, nextTick, onMounted } from 'vue';
import { useUserValidation } from '~/composables/useValidation';

const touched = reactive({
    name: false,
    age: false,
});

const props = defineProps<{
    modelValue: User | undefined;
}>();

const user = reactive<User>(
    props.modelValue
        ? { ...props.modelValue }
        : { id: 0, name: '', age: '' as any }
);

const { nameError, ageError, isValid } = useUserValidation(user);

const emit = defineEmits<{
    (e: 'update:modelValue', value: User): void;
    (e: 'validityChange', isValid: boolean): void;
    (e: 'submit'): void;
}>();

watch(
    user,
    () => {
        emit('update:modelValue', user);
    },
    { deep: true, immediate: true }
);

watch(
    isValid,
    (value) => {
        emit('validityChange', value);
    },
    { immediate: true }
);

const nameInput = ref<HTMLInputElement | null>(null)

onMounted(async () => {
    await nextTick()
    nameInput.value?.focus()
})
</script>
