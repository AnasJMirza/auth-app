import create from 'zustand';

export const useAuthStore = create((set) => ({
    auth : {
        userName : '',
        active : false
    },
    setUserName : (name) => set((state) => ({ auth : { ...state.auth, userName : name }})) 
}))