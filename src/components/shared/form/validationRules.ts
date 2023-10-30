export const passwordValidationRules = (formType: "login" | "register") => {
    return formType === "register"
        ? {
            required: "Password is required",
            minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
            },
            pattern: {
                value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
            },
        }
        : {
            required: "Password is required",
        };
};

export const confirmPasswordValidationRules = {
    required: "Password is required",
    minLength: {
        value: 8,
        message: "Password must be at least 8 characters long",
    },
    pattern: {
        value:
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        message:
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
    },
};
