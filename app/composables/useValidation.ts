import { ref, watch, computed, toRef } from 'vue'

export function useUserValidation(user: { name: string; age: number | string }) {
    const nameRef = toRef(user, 'name')
    const ageRef = toRef(user, 'age')
    const nameError = ref('')
    const ageError = ref('')

    // Name Validation
    function validateName(value: string) {
        if (!value) {
            nameError.value = '名前を入力してください'
        } else if (value.length > 50) {
            nameError.value = '50文字以内で入力してください'
        } else if (/^[0-9!@#$%^&*()_+\-=]*$/.test(value)) {
            nameError.value = '名前として不正な形式です'
        } else {
            nameError.value = ''
        }
    }

    // Age Validation
    function validateAge(value: string | number) {
        const num = Number(value)
        
        if (!value && value !== 0) {
                ageError.value = '年齢を入力してください'
            } else if (isNaN(num)) {
                ageError.value = '半角数字で入力してください'
            } else if (num < 0 || num > 120) {
                ageError.value = '0〜120の範囲で入力してください'
            } else {
                ageError.value = ''
            }
    }

      // user.name / user.age をリアルタイム監視
    watch(nameRef, (v) => validateName(v), { immediate: true })
    watch(ageRef, (v) => validateAge(v), { immediate: true })

    const isValid = computed(() => {
        return !nameError.value && !ageError.value
    })

    return {
        nameError,
        ageError,
        isValid,
        validateName,
        validateAge,
    }
}
