export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

export const validatePassword = (password) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[@$!%*?&]/.test(password)
    const isLongEnough = password.length >= minLength

    if (!isLongEnough) {
        return {
            isValid: false,
            errorMessage: `Password must be at least ${minLength} characters long`,
        }
    }
    if (!hasLowerCase) {
        return {
            isValid: false,
            errorMessage: 'Password must contain at least one lowercase letter',
        }
    }
    if (!hasUpperCase) {
        return {
            isValid: false,
            errorMessage: 'Password must contain at least one uppercase letter',
        }
    }
    if (!hasNumber) {
        return {
            isValid: false,
            errorMessage: 'Password must contain at least one number',
        }
    }
    if (!hasSpecialChar) {
        return {
            isValid: false,
            errorMessage:
                'Password must contain at least one special character (@$!%*?&)',
        }
    }

    return {
        isValid: true,
        errorMessage: '',
    }
}

export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
        return {
            isValid: false,
            errorMessage: 'Please enter your confirmation password',
        }
    }
    if (password !== confirmPassword) {
        return {
            isValid: false,
            errorMessage: 'Password do not match',
        }
    }
    return {
        isValid: true,
        errorMessage: '',
    }
}
