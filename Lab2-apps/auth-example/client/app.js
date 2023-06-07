var app = new Vue({
    el: '#app',
    data: {
        username: '',
        password: '',
        status: '',
        products: []
    },
    methods: {
        login: function(){
           var url = 'http://localhost:3000/login/'+this.username+'/'+this.password;
           axios.get(url).then(response => {
               this.status = response.data.status;
                if(this.status === 'ALLOW') {
                    // simulate resource loading
                    this.products = [{name:'A'}, {name:'B'}, {name:'C'}];
                }
           });



        }
    }
})