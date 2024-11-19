import { handleFail, handleSuccess } from '@/app/api/utils';
import { uploadImage } from '@/features/s3';
import { formToJSON, HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const { file, fileName } = formToJSON(formData) as {
      file: File;
      fileName: string;
    };
    if (!file) {
      return handleFail({ message: 'Unable to find image', status: HttpStatusCode.BadRequest });
    }

    const imageUrl = await uploadImage({
      file,
      fileName: fileName || file.name,
    });

    return handleSuccess({ data: imageUrl });
  } catch (error) {}
}
