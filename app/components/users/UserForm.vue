<template>
    <div v-for="field in fields" :key="field.key">
        <label>{{ field.label }}</label>
        <input
            :type="field.type"
            v-model="user[field.key]"
            @input="touched[field.key] = true"
            :placeholder="field.label"
            class="border p-2 mb-4 w-full"
        />

        <div
            v-if="field.key === 'name' && touched.name && nameError"
            class="text-red-500 mb-4"
        >
            {{ nameError }}
        </div>

        <div
            v-if="field.key === 'age' && touched.age && ageError"
            class="text-red-500 mb-4"
        >
            {{ ageError }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/user';
import { reactive, watch } from 'vue';
import { useUserValidation } from '~/composables/useValidation';

// フォームで扱うキーを限定
type EditableKey = 'name' | 'age';

const touched = reactive<Record<EditableKey, boolean>>({
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

const fields: { key: EditableKey; label: string; type: string }[] = [
    { key: 'name', label: '名前', type: 'text' },
    { key: 'age', label: '年齢', type: 'number' },
];

const emit = defineEmits<{
    (e: 'update:modelValue', value: User): void;
    (e: 'validityChange', isValid: boolean): void;
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
</script>
