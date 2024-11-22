import { AuctionCaseFormSchema } from '@/components/pages/AuctionCaseForm/formSchema';
import { deleteImage, uploadImage } from '@/features/s3';

export async function getAuctionCaseDataInput(data: AuctionCaseFormSchema) {
  const { imagesToUpload = [], imagesToDelete = [], ...rest } = data;
  const {
    appraisedValue,
    startingBid,
    officialValue,
    area,
    floorLevel,
    completedYear,
    hasElevator,
    groupId,
    images = [],
    caseName,
  } = rest;

  let imageUrls = [...images];
  if (imagesToUpload) {
    const uploadedImageUrls = await Promise.all(
      imagesToUpload.map((imageToUpload) =>
        uploadImage({
          file: imageToUpload,
          fileName: `auction-case/${caseName}_${imageToUpload.name}`,
        }),
      ),
    );
    imageUrls = [...imageUrls, ...uploadedImageUrls];
  }

  if (imagesToDelete.length) {
    await Promise.all(imagesToDelete.map((imageToDelete) => deleteImage(imageToDelete)));
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
    images: imageUrls,
    groupId: groupId as string,
  };
}
