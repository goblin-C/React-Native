import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { USERPOOL_ID, CLIENT_ID } from '@env'

export const poolData = {
  UserPoolId: USERPOOL_ID,
  ClientId: CLIENT_ID,
}

export const userPool = new CognitoUserPool(poolData)
