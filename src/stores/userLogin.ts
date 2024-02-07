import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import clientHttp from '@/libs/clientHttp';

export const useUserLoginStore = defineStore('userLogin', {
  state: () => ({
    token: '',
    role: '',
    error: '',
    successMessage: '',
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        const response = await clientHttp.post('http://localhost:8000/api/user/login', { email, password });
        const { token, roles } = response.data;

        this.setToken(token);
        this.setRole(roles[0]); 
        this.setSuccessMessage('Connexion réussie');

        const router = useRouter();
        console.log(roles);
        
        if (roles.includes('admin')) {
          router.replace('/admin/categories');
        } else {
          router.replace('/');
        }
      } catch (error) {
        this.setError('Email ou mot de passe incorrect');
        console.error('Erreur lors de la connexion :', error);
      }
    },

    setToken(token: string) {
      this.token = token;
    },

    setRole(role: string) {
      this.role = role;
    },

    setError(error: string) {
      this.error = error;
    },

    setSuccessMessage(message: string) {
      this.successMessage = message;
    },

    clear() {
      this.token = '';
      this.role = '';
      this.error = '';
      this.successMessage = '';
    },

    isAuthenticated() {
        return !!this.token;
      },
  
      isAdmin() {
        return this.role === 'admin';
      }
  },
});
