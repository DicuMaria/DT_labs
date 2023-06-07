var app = new Vue({
    el: '#app',
    data: {
        users: [],
        usersService: null,
        username: '',
        usercity: '',
        userid: 0,
        msg: ''
    },
    created: function () {
        usersService = users();
        usersService.get().then(response => (this.users=response.data));
    },
	
    methods: { //aici adaugati functiile prin care faceti callurile catre server
        add: function(){
             // adauga codul pentru functia "add user"
        },
        remove: function(){
			// adauga codul pentru functia "delete user"
            usersService = users();
            usersService.remove(this.userid).then(response => (this.msg = response.data));
            location.reload();
        },
        update: function(){
			// adauga codul pentru functia "update user"
        }
    }
})



var app = new Vue({
    el: '#app',
    data: {
        users: [],
        usersService: null
    },
    created: function () {
        this.usersService = users();
        this.usersService.get().then(response => (this.users = response.data));
    },
    methods: {
    }
})
