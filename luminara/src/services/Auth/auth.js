import {
  CognitoUser,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js'
import { userPool } from '../../constants/cognitoConfig'
import { generatePassword } from '../../utils/passwordGenerator';

export const signUp = async ({
  firstName,
  lastName,
  email,
  phoneNumber,
  username
}) => {

  const password = generatePassword(12);
  console.log({username, password})
  const attributes = [
    new CognitoUserAttribute({ Name: 'given_name', Value: firstName }),
    new CognitoUserAttribute({ Name: 'family_name', Value: lastName }),
    new CognitoUserAttribute({ Name: 'email', Value: email }),
    new CognitoUserAttribute({ Name: 'phone_number', Value: phoneNumber }),
  ]

  return new Promise((resolve, reject) => {
    userPool.signUp(username, password, attributes, null, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

export const signIn = async (username, password) => {
  const user = new CognitoUser({ Username: username, Pool: userPool })
  const authDetails = new AuthenticationDetails({ Username: username, Password: password })

  return new Promise((resolve, reject) => {
    user.authenticateUser(authDetails, {
      onSuccess: resolve,
      onFailure: reject,
    })
  })
}

export const confirmSignUp = async (username, code) => {
  const user = new CognitoUser({ Username: username, Pool: userPool })

  return new Promise((resolve, reject) => {
    user.confirmRegistration(code, true, (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}

export const resendSignUp = async (username) => {
  const user = new CognitoUser({ Username: username, Pool: userPool })

  return new Promise((resolve, reject) => {
    user.resendConfirmationCode((err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })
}