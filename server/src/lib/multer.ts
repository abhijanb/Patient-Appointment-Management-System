import multer from "multer";
import path from "path";
import fs from "fs";

const upload = (location: string) => {
    const baseDir = "uploads";
    const targetDir = path.join(baseDir, location);

    // Ensure base directory exists
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir);
    }

    // Ensure sub directory exists
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, targetDir);
            },
            filename: (req, file, cb) => {
                const ext = path.extname(file.originalname);
                const uniqueName =
                    Date.now() + "-" + Math.random().toString(36).substring(2);

                cb(null, uniqueName + ext);
            }
        })
    });
};

export default upload;