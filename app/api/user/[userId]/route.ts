import { UserFormSchema } from '@/components/pages/UserForm/formSchema';
import { handlePrismaClientError, handleSuccess } from '@/app/api/utils';
import { prisma } from '@/lib/prisma';
import { deleteImage, uploadImage } from '@/features/s3';
import { IMAGE_HOST_URL } from '@/features/s3/const';
import { formToJSON } from 'axios';
import { NextRequest } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
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
      where: { id: params.userId },
      data: {
        ...data,
        image: imageUrl || data.image,
      },
    });
    return handleSuccess({ data: updatedUser });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
