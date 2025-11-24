import { reactive, nextTick } from 'vue'
import { describe, it, expect, jest } from '@jest/globals'
import { useUserValidation } from '../../composables/useValidation'

describe('useUserValidation', () => {
    const setup = () => {
        const user = reactive({ name: '', age: '' })
        const validation = useUserValidation(user)
        return { user, ...validation }
    }

    it('名前が空 → NG', async () => {
        const { nameError, isValid } = setup()
        await nextTick()
        expect(nameError.value).toBe('名前を入力してください')
        expect(isValid.value).toBe(false)
    })

    it('名前は50文字までOK', async () => {
        const { user, nameError } = setup()
        user.age = 20
        user.name = 'あ'.repeat(50)
        await nextTick()
        expect(nameError.value).toBe('')
    })

    it('年齢が空 → NG', async () => {
        const { ageError, isValid } = setup()
        await nextTick()
        expect(ageError.value).toBe('年齢を入力してください')
        expect(isValid.value).toBe(false)
    })

    it('名前 & 年齢 OK → isValid=true', async () => {
        const { user, isValid } = setup()
        user.name = '太郎'
        user.age = 20
        await nextTick()
        await nextTick()
        expect(isValid.value).toBe(true)
    })
})
