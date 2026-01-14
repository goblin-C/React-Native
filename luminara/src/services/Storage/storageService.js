import * as FileSystem from 'expo-file-system/legacy'
import { decode } from 'base-64'
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3 } from '../../constants/cognitoConfig'
import { S3_BUCKET_NAME } from '@env'

/**
 * Generates a presigned URL for an S3 object
 * @param {string} key - The S3 object key
 * @returns {Promise<string>} - The presigned URL
 */
export const getPresignedUrl = async (key) => {
    if (!S3_BUCKET_NAME) {
        throw new Error('S3_BUCKET_NAME is not defined in environment variables')
    }

    try {
        const command = new GetObjectCommand({
            Bucket: S3_BUCKET_NAME,
            Key: key,
        })

        // Presigned URL valid for 1 hour (3600 seconds)
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
        return url
    } catch (error) {
        console.error('S3 Get Presigned URL Error:', error)
        throw error
    }
}

/**
 * Converts a base64 string to a Uint8Array
 * @param {string} base64
 * @returns {Uint8Array}
 */
const base64ToUint8Array = (base64) => {
    const binaryString = decode(base64)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes
}

/**
 * Uploads an image to S3
 * @param {string} uri - The local URI of the image
 * @param {string} fileName - The name to save the file as in S3
 * @returns {Promise<string>} - The S3 object key
 */
export const uploadImageToS3 = async (uri, fileName) => {
    if (!S3_BUCKET_NAME) {
        throw new Error('S3_BUCKET_NAME is not defined in environment variables')
    }

    try {
        const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: 'base64',
        })

        const body = base64ToUint8Array(base64)
        const key = `profiles/${fileName}`

        const command = new PutObjectCommand({
            Bucket: S3_BUCKET_NAME,
            Key: key,
            Body: body,
            ContentType: 'image/png',
        })

        await s3.send(command)

        return key
    } catch (error) {
        console.error('S3 Upload Error:', error)
        throw error
    }
}
