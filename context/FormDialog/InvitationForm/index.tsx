import { Button } from '@/components/ui/button';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, InputFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useAxiosError } from '@/hooks/useAxiosError';
import { inviteGroupMemberMutationOptions } from '@/queries/group/mutation';
import { GroupWithMembers } from '@/types/group';
import { zodResolver } from '@hookform/resolvers/zod';
import { Group } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { formSchema, InvitationFormSchema } from './formSchema';

export default function InvitationForm({ group, onSubmit }: Props) {
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const inviteGroupMemberMutation = useMutation(inviteGroupMemberMutationOptions);
  const form = useForm<InvitationFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupId: group!.id,
      inviteeEmail: '',
    },
  });
  const { isSubmitting } = form.formState;

  const submitForm = form.handleSubmit(async (values: InvitationFormSchema) => {
    try {
      const createdInvitation = await inviteGroupMemberMutation.mutateAsync(values);
      toast({
        title: createdInvitation.inviteeEmail,
        description: <p>멤버 초대장을 발송했습니다</p>,
        variant: 'success',
      });
      onSubmit?.();
      form.reset();
    } catch (error) {
      handleAxiosError(error);
    }
  });

  return (
    <Form {...form}>
      <form className="max-w-xl">
        <DialogContent aria-describedby="">
          <DialogHeader>
            <DialogTitle>멤버 초대</DialogTitle>
          </DialogHeader>

          <div className="my-4">
            <InputFormField
              control={form.control}
              name="inviteeEmail"
              label="이메일 주소"
              inputProps={{ autoFocus: true }}
            />
          </div>

          <DialogFooter>
            <Button onClick={submitForm} isLoading={isSubmitting}>
              <span>초대</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Form>
  );
}

type Props = {
  group?: Group | GroupWithMembers;
  onSubmit?: () => void | Promise<void>;
};
