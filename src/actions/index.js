import { USER_EMAIL } from "../reducers/user";

export const saveUserEmailInReduxStore = (email) => ({
  type: USER_EMAIL,
  email,
})
