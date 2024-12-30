import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';
export const sendImageToCloudinary = async (
  imageName: string,
  path: string,
) => {
  // Configuration
  cloudinary.config({
    cloud_name: 'dizdnrwqr',
    api_key: '339785161511215',
    api_secret: 'WKiqoGkbwgiY1pkZt96967Bgq5E', // Click 'View API Keys' above to copy your API secret
  });
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: imageName,
    })
    .catch((error) => {
      console.log(error);
    });
  fs.unlink(path, (err) => {
    if (err) {
      console.error('An error occurred:', err);
    } else {
      console.log('File deleted successfully!');
    }
  });
  // console.log(uploadResult);
  return uploadResult;
};
//to save local storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
