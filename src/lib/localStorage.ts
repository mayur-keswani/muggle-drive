export const getAuth=()=>{
  if(typeof window !==null)
      return JSON.parse(localStorage.getItem('auth')!)
}

export const clearLocalStorage=()=>{
    if(typeof window !== null)
        return localStorage.clear()
}