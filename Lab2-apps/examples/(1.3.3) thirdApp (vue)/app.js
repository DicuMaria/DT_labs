var app = new Vue({
    el: '#app',
    data: {
        count: 0
    },
    methods: {
        countNumber: function () {
            if (this.count < 10) {
                this.count++;
                console.log(this.count);
            }
        },
        dec: function () {
            if (this.count > 0) {
                this.count--;
                console.log(this.count);
            }
        }
    }

})
