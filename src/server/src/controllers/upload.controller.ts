import { RequestWithFile } from '@/interfaces/auth.interface';
import { NextFunction, Response } from 'express';

function getFilePath(files: { [fieldname: string]: Express.Multer.File[] }, field: string): string {
  return files?.[field]?.[0]?.filename || '';
}

export class UploadController {
  public upload = async (req: RequestWithFile, res: Response, next: NextFunction) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      const name = Object.keys(req.files)[0];

      if (!files) {
        return res.status(400).json({ message: 'No files uploaded' });
      } else {
        const pathname = getFilePath(files, name);

        return res.status(200).json({
          data: {
            path: pathname,
            name: name,
          },
          message: 'upload',
        });
      }
    } catch (error) {
      next(error);
    }
  };
}
