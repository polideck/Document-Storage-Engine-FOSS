function logout(){
    localStorage.removeItem('bearer')
    localStorage.removeItem('address')
    window.location.replace('/')
}