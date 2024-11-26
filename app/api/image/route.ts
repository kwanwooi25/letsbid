import { handleFail, handleSuccess } from '@/app/api/utils';
import { auth } from '@/features/auth';
import { uploadImage } from '@/features/s3';
import { formToJSON, HttpStatusCode } from 'axios';

export const POST = auth(async function POST(req) {
  try {
    const formData = await req.formData();
    const { file, fileName } = formToJSON(formData) as {
      file: File;
      fileName: string;
    };
    if (!file) {
      return handleFail({ message: 'Image not found', status: HttpStatusCode.BadRequest });
    }

    const imageUrl = await uploadImage({
      file,
      fileName: fileName || file.name,
    });

    return handleSuccess({ data: imageUrl });
  } catch (error) {}
});
