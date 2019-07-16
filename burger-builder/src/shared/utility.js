export const updateObject = (oldObject, newProps) => {
    return {
        ...oldObject,
        ...newProps
    }
}

export const checkValidity = (value, validationRules) => {
    let isValid = true;
    if (validationRules.required) {
        isValid = (value.trim() !== '') && isValid;
    }
    if (validationRules.minLength) {
        isValid = (value.length >= validationRules.minLength) && isValid;
    }
    if (validationRules.maxLength) {
        isValid = (value.length <= validationRules.maxLength) && isValid;
    }
    if (validationRules.email) {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid = pattern.test(String(value).toLowerCase()) && isValid;
    }
    return isValid;
}