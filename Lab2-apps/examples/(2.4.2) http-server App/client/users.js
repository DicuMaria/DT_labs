function users() {

    get = function() {
        return axios.get("http://localhost:3000/users");
    }
	
	put = function(username,usercity){
		// se adauga cod 
    }
	
    remove = function(id){
        return axios.delete("http://localhost:3000/users/"+id,{id});
    }
	
    return {
		// aici se adauga functiile pe care le apelezi folosing axios
        get: get, 
        put: put,
        remove: remove
    }
}

function users() {

    get = function() {
        return axios.get("http://localhost:3000/users");
    }

    return {
        get: get
    }
}