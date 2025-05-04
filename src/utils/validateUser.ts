export interface UserFormData {
  firstname: string;
  lastname: string;
  email: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
}

export interface ValidationErrors {
  [key: string]: string;
}

export const validateUser = (
  formData: UserFormData,
  isEdit: boolean
): ValidationErrors => {
  const errors: ValidationErrors = {};
  const today = new Date();

  if (!formData.firstname.trim()) errors.firstname = 'First name is required';
  if (!formData.lastname.trim()) errors.lastname = 'Last name is required';

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Invalid email format';
  }

  if (!formData.birthDate) {
    errors.birthDate = 'Birthdate is required';
  } else {
    const birth = new Date(formData.birthDate);
    if (isNaN(birth.getTime())) {
      errors.birthDate = 'Invalid birthdate format';
    } else if (birth > today) {
      errors.birthDate = 'Birthdate cannot be in the future';
    }
  }

  if (!isEdit) {
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'Passwords must match';
    }
  }

  return errors;
};
