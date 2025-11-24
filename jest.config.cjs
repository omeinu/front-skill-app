module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'json', 'vue', 'ts'],
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.js$': 'babel-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/app/$1',
        '^~/(.*)$': '<rootDir>/app/$1',
        '^@vue/test-utils$':
            '<rootDir>/node_modules/@vue/test-utils/dist/vue-test-utils.cjs.js',
    }

}
