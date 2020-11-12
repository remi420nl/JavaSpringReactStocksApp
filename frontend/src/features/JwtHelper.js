//saving neccesary api responses to local storage

export const getJwt = () => {
    return localStorage.getItem('jwt-token')
}

export const clearJwt = () => {
 localStorage.clear()
}

export const getUserId = () => {
    return localStorage.getItem('UserId')
}