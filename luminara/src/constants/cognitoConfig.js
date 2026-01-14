import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { S3Client } from '@aws-sdk/client-s3'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers'
import { USERPOOL_ID, CLIENT_ID, IDENTITY_POOL_ID } from '@env'

export const poolData = {
  UserPoolId: USERPOOL_ID,
  ClientId: CLIENT_ID,
}

export const userPool = new CognitoUserPool(poolData)

export const s3 = new S3Client({
  region: 'ap-south-1',
  credentials: fromCognitoIdentityPool({
    identityPoolId: IDENTITY_POOL_ID,
    clientConfig: { region: 'ap-south-1' }
  })
})
