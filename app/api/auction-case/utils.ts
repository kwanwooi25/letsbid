import { AuctionCaseFormSchema } from '@/components/pages/AuctionCaseForm/formSchema';
import { deleteImage, uploadImage } from '@/features/s3';
import { IMAGE_HOST_URL } from '@/features/s3/const';

export async function getAuctionCaseDataInput(data: AuctionCaseFormSchema) {
  const { imageToUpload, imageToDelete, ...rest } = data;
  const {
    appraisedValue,
    startingBid,
    officialValue,
    area,
    floorLevel,
    completedYear,
    hasElevator,
    groupId,
  } = rest;

  let imageUrl = '';
  if (imageToUpload) {
    imageUrl = await uploadImage({
      file: imageToUpload,
      fileName: `auction-case/${rest.caseName}_${imageToUpload.name}`,
    });
    if (rest.image && rest.image.startsWith(IMAGE_HOST_URL)) {
      await deleteImage(rest.image);
    }
  }

  if (imageToDelete && imageToDelete.startsWith(IMAGE_HOST_URL)) {
    await deleteImage(imageToDelete);
  }

  const unknownHasElevator = hasElevator as unknown;

  return {
    ...rest,
    appraisedValue: +appraisedValue,
    startingBid: +startingBid,
    officialValue: +officialValue,
    area: area ? +area : undefined,
    floorLevel: floorLevel ? +floorLevel : undefined,
    completedYear: completedYear ? +completedYear : undefined,
    hasElevator:
      typeof unknownHasElevator === 'boolean'
        ? !!unknownHasElevator
        : unknownHasElevator === 'true',
    image: imageUrl || rest.image,
    groupId: groupId as string,
  };
}
