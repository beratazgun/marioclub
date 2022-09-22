const User = require("../model/authModel")

const handlePasswordErrors = (error) => {
    const passwordErrors = {}
    try {
        const valuePath = error.errors.password.value
        const kindPath = error.errors.password.kind

        const messagePath = error.errors.password.message
        const message = messagePath.includes("for path `password`")

        if (message && valuePath.length <= 8 && kindPath === "user defined") {
            passwordErrors["password"] = "Password must be minimum 8 characters"
            return passwordErrors
        }

        if (message && valuePath.length > 8 && kindPath === "user defined") {
            passwordErrors["password"] = "Password must be stronger"
            return passwordErrors
        }

        if (kindPath === "required") {
            passwordErrors["password"] = "Password is required"
            return passwordErrors
        }

    } catch (error) {
        return passwordErrors

    }
}

const handleEmailErrors = (error) => {
    const emailErrors = {}

    try {
        const kindPath = error.errors.email.kind
        // const valuePath = error.errors.email.value

        const messagePath = error.errors.email.message
        const message = messagePath.includes("for path `email`")

        if (message && kindPath === "user defined") {
            emailErrors["email"] = "Please enter a valid email adress"
            return emailErrors
        }

        if (kindPath === "required") {
            emailErrors["email"] = "Email is required"
            return emailErrors
        }

    } catch (error) {
        emailErrors["email"] = "This email already exist."
        return emailErrors
    }
}

const handleAllErrors = (error) => {
    const passwordErrorsDict = handlePasswordErrors(error)
    const emailErrorDict = handleEmailErrors(error)
    const allErrors = Object.assign({}, emailErrorDict, passwordErrorsDict)
    return allErrors
}

module.exports.signup_post = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await User.create({ name, email, password })
        res.send(user)
    } catch (error) {
        const err = handleAllErrors(error)
        res.status(400).json({ error: err })
    }
}