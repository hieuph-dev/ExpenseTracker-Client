import moment from 'moment'

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

export const getInitials = (name) => {
    if (!name) return ''

    const words = name.split(' ')
    let initials = ''

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0]
    }

    return initials.toUpperCase()
}

export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return ''

    const [integerPart, fractionalPart] = num.toString().split('.')
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return fractionalPart
        ? `${formattedInteger}.${fractionalPart}`
        : formattedInteger
}

export const prepareExpenseBarChartData = (data = []) => {
    const chartData = data.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }))

    return chartData
}

export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    )

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        source: item?.source,
    }))

    return chartData
}

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    )

    const chartData = sortedData.map((item) => ({
        month: moment(item?.date).format('Do MMM'),
        amount: item?.amount,
        category: item?.category,
    }))

    return chartData
}
