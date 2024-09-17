import { createApp } from 'vue';

const app = createApp({
  data() {
    return {
      password: '',
      userPassword: '',
      strength: { message: '', color: '' }
    };
  },
  methods: {
    generatePassword(length = 12) {
      const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
      const numbers = '0123456789';
      const specialChars = '!@#$%^&*()_+{}|:<>?';
      let password = upperCase[Math.floor(Math.random() * upperCase.length)];
      password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
      password += numbers[Math.floor(Math.random() * numbers.length)];
      password += specialChars[Math.floor(Math.random() * specialChars.length)];
      const allChars = upperCase + lowerCase + numbers + specialChars;
      for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
      }
      this.password = password.split('').sort(() => Math.random() - 0.5).join('');
      this.checkStrength(this.password);
    },
    checkStrength(password) {
      if (password.length < 6) {
        this.strength = { message: 'Weak', color: 'red' };
      } else if (password.length >= 6 && password.length < 12) {
        this.strength = { message: 'Medium', color: 'orange' };
      } else {
        this.strength = { message: 'Strong', color: 'green' };
      }
    }
  }
});

app.mount('#app');