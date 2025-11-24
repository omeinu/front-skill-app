import { mount } from '@vue/test-utils'
import UserForm from '~/components/users/UserForm.vue'
import { nextTick } from 'vue'
import { describe, it, expect, jest } from '@jest/globals'

describe('UserForm', () => {

    const factory = (modelValue?: any) => {
        return mount(UserForm, {
            props: {
                modelValue: modelValue ?? { id: 1, name: '', age: '' }
            }
        })
    }

    // update:modelValue の emit
    it('名前入力で update:modelValue が emit される', async () => {
        const wrapper = factory()

        const input = wrapper.find('input[type="text"]')
        await input.setValue('太郎')

        const emits = wrapper.emitted()['update:modelValue']

        expect(emits).toBeTruthy()
        expect(emits[0][0]).toEqual(expect.objectContaining({ name: '太郎' }))
    })

    // validityChange の emit
    it('validityChange が emit される', async () => {
        const wrapper = factory()

        const nameInput = wrapper.find('input[type="text"]')
        await nameInput.setValue('太郎')

        const ageInput = wrapper.find('input[type="number"]')
        await ageInput.setValue('20')

        await nextTick()

        const emits = wrapper.emitted()['validityChange']

        expect(emits).toBeTruthy()
        expect(emits[emits.length - 1][0]).toBe(true)
    })


    // touched.name が true になる
    it('名前を入力したら touched.name が true になる', async () => {
        const wrapper = factory()

        const input = wrapper.find('input[type="text"]')
        expect(wrapper.vm.touched.name).toBe(false)

        await input.setValue('太郎')

        expect(wrapper.vm.touched.name).toBe(true)
    })

    // nameError の表示
    it('名前が空なら nameError が表示される', async () => {
        const wrapper = factory()

        const input = wrapper.find('input[type="text"]')
        await input.setValue('')

        await nextTick()

        expect(wrapper.text()).toContain('名前を入力してください')
    })

    // submit イベントの emit
    it('submit.prevent で submit emit が発火する', async () => {
        const wrapper = factory()

        await wrapper.find('form').trigger('submit')

        const emits = wrapper.emitted()['submit']

        expect(emits).toBeTruthy()
    })

    // フォーカス
    it('初回マウント時に nameInput がフォーカスされる', async () => {
        const focusSpy = jest.spyOn(HTMLInputElement.prototype, 'focus')

        // UserForm コンポーネントをマウント
        factory()

        // DOM 更新を待つ
        await nextTick()
        // onMounted の nextTick を待つ
        await nextTick()

        expect(focusSpy).toHaveBeenCalled()
    })

})
