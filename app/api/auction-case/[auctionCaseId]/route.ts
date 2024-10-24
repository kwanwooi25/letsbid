import { AuctionCaseFormSchema } from '@/app/group/[groupId]/auction-case/components/AuctionCaseForm/formSchema';
import { getUserFromSession, handleFail, handlePrismaClientError, handleSuccess } from '@/lib/api';
import { filterBidDetails } from '@/lib/auctionCase';
import { prisma } from '@/lib/prisma';
import { deleteImage, uploadImage } from '@/lib/s3';
import { IMAGE_HOST_URL } from '@/lib/s3/const';
import { formToJSON, HttpStatusCode } from 'axios';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { auctionCaseId: string } }) {
  try {
    const user = await getUserFromSession();
    const auctionCase = await prisma.auctionCase.findUnique({
      where: { id: params.auctionCaseId },
      include: {
        bids: {
          include: {
            user: true,
          },
        },
      },
    });
    if (!auctionCase) {
      return handleFail({
        status: HttpStatusCode.NotFound,
        message: 'Not found',
      });
    }
    return handleSuccess({ data: filterBidDetails(auctionCase, user?.id) });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { auctionCaseId: string } }) {
  try {
    await getUserFromSession();
    const formData = await req.formData();
    const { imageToUpload, imageToDelete, ...data } = formToJSON(formData) as AuctionCaseFormSchema;

    let imageUrl = '';
    if (imageToUpload) {
      imageUrl = await uploadImage({
        file: imageToUpload,
        fileName: `auction-case/${data.caseName}_${imageToUpload.name}`,
      });
      if (data.image && data.image.startsWith(IMAGE_HOST_URL)) {
        await deleteImage(data.image);
      }
    }

    if (imageToDelete && imageToDelete.startsWith(IMAGE_HOST_URL)) {
      await deleteImage(imageToDelete);
    }

    const updatedAuctionCase = await prisma.auctionCase.update({
      where: { id: params.auctionCaseId },
      data: {
        ...data,
        appraisedValue: +data.appraisedValue,
        startingBid: +data.startingBid,
        image: imageUrl || data.image,
      },
    });

    return handleSuccess({ data: updatedAuctionCase });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { auctionCaseId: string } }) {
  try {
    await getUserFromSession();
    await prisma.auctionCase.delete({
      where: { id: params.auctionCaseId },
    });
    return handleSuccess({ data: { id: params.auctionCaseId } });
  } catch (e) {
    return handlePrismaClientError(e);
  }
}
