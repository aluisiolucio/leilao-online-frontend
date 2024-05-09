import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const S3_BUCKET = import.meta.env.S3_BUCKET;
const REGION = import.meta.env.REGION || '';
const AWS_ACCESS_KEY_ID = import.meta.env.AWS_ACCESS_KEY_ID || '';
const AWS_SECRET_ACCESS_KEY = import.meta.env.AWS_SECRET_ACCESS_KEY || '';

export const uploadImagesAwsS3 = async (image: File) => {
    if (!image) return;

    const s3Client = new S3Client({
        region: REGION,
        credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
        }
    });

    await s3Client.send(
        new PutObjectCommand({
          Bucket: S3_BUCKET,
          Key: image.name,
          Body: image,
          ACL: 'public-read',
        })
    );

    return `https://${S3_BUCKET}.s3.amazonaws.com/${image.name}`
}
