import AWS from 'aws-sdk';
import fs from 'fs';

async function uploadFile(fileName, filePath) {
    const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: process.env.AWS_REGION });
    const fileContent = fs.readFileSync(filePath);
 
    const params: any = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileName,
        Body: fileContent,
        // ContentType: mimeType//geralmente se acha sozinho
    };
 
    const data = await s3.upload(params).promise();
    return data.Location;
}

module.exports = { uploadFile };