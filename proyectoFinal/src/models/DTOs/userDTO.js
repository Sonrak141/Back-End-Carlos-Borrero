function usersDTO(users, _id, fyh){
    return{
        ...users,
        _id,
        fyh
    }
}

module.exports = usersDTO