import { handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { UserFormSchema } from '@/components/pages/UserForm/formSchema';
import { auth } from '@/features/auth';
import { deleteImage, uploadImage } from '@/features/s3';
import { IMAGE_HOST_URL } from '@/features/s3/const';
import { prisma } from '@/lib/prisma';
import { formToJSON } from 'axios';

export const PATCH = auth(async function PATCH(req, { params }) {
  try {
    const userId = String(params?.userId);
    const formData = await req.formData();
    const { imageToUpload, imageToDelete, ...data } = formToJSON(formData) as UserFormSchema;
    let imageUrl = '';
    if (imageToUpload) {
      imageUrl = await uploadImage({
        file: imageToUpload,
        fileName: `${data.id}_${imageToUpload.name}`,
      });
      // Delete previous image if exists
      if (data.image && data.image.startsWith(IMAGE_HOST_URL)) {
        await deleteImage(data.image);
      }
    }
    if (imageToDelete && imageToDelete.startsWith(IMAGE_HOST_URL)) {
      await deleteImage(imageToDelete);
    }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        image: imageUrl || data.image,
      },
    });
    return handleSuccess({ data: updatedUser });
  } catch (e) {
    return handlePrismaClientError(e);
  }
});
