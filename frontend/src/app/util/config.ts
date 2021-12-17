export const PORT_NO = 3000;

function getToken() {
    
    const token = localStorage.getItem('userToken')

    if(token){
        return JSON.parse(token)
    }

    return null
}

export const userToken = getToken()