import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { IMAGE_BUCKET_NAME, IMAGE_HOST_URL } from './const';

export async function deleteImage(imageUrl: string) {
  try {
    const s3Client = new S3Client({
      region: process.env.ENV_AWS_REGION!,
      credentials: {
        accessKeyId: process.env.ENV_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.ENV_AWS_SECRET_ACCESS_KEY!,
      },
    });

    const Key = imageUrl.replace(IMAGE_HOST_URL, '');

    const command = new DeleteObjectCommand({
      Bucket: IMAGE_BUCKET_NAME,
      Key,
    });

    await s3Client.send(command);
  } catch (error) {
    console.error(error);
  }
}
