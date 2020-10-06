export const getJwt = () => {
    return localStorage.getItem('jwt-token')
}


export const clearJwt = () => {
    console.log('cleared')
 localStorage.clear()
}

