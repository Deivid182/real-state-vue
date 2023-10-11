
export const loginSchema = {
  email(value) {
      if (!value) {
        return 'Required';
      }
      // si es un email válido
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return 'Invalid email address';
      }
      return true;
  },
  password(value) {
      if (value) return true
      return 'Required'
  }
}