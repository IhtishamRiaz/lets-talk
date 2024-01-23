import Joi from "joi";

const validateLogin = (data) => {
   const JoiSchema = Joi.object({
      username: Joi.string().required().label('Username'),
      password: Joi.string().required().label('Password')
   })
   return JoiSchema.validate(data);
}

export default validateLogin;