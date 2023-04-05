var app = new Vue({
    el: '#app',
    data: {
        message: '',
        verify: ''
    },
    methods: {
        process: function () {
            this.verify = this.message;
            console.log(this.verify);
        }
    }
})