import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { IMAGE_BUCKET_NAME, IMAGE_HOST_URL } from './const';

export async function uploadImage({ file, fileName }: Args) {
  try {
    const s3Client = new S3Client({
      region: process.env.ENV_AWS_REGION!,
      credentials: {
        accessKeyId: process.env.ENV_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.ENV_AWS_SECRET_ACCESS_KEY!,
      },
    });

    const Key = `${process.env.NODE_ENV}/${fileName || file.name}`;

    const command = new PutObjectCommand({
      Bucket: IMAGE_BUCKET_NAME,
      Key,
      Body: Buffer.from(await file.arrayBuffer()),
    });

    await s3Client.send(command);

    return `${IMAGE_HOST_URL}${Key}`;
  } catch (error) {
    console.error(error);
    return '';
  }
}

type Args = {
  file: File;
  fileName?: string;
};
