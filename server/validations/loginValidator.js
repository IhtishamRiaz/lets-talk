import Joi from "joi";

const validateLogin = (data) => {
    const JoiSchema = Joi.object({
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().required().label('Password')
    })
    return JoiSchema.validate(data);
}

export default validateLogin;