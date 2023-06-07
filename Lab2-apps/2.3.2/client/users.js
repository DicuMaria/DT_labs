function users() {
    get = function () {
        return axios.get("http://localhost:3000/users");
    }

    add = function (user) {
        return axios.put("http://localhost:3000/users", user);
    }

    remove = function (index) {
        return axios.delete("http://localhost:3000/users/" + index);
    }

    modify = function (index, user) {
        return axios.post("http://localhost:3000/users/update/" + index, user);
    }

    return {
        get: get,
        add: add,
        remove: remove,
        modify: modify
    }
}