'use client';

import PageBody from '@/components/PageBody';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { Form, InputFormField } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { PATHS } from '@/const/paths';
import { useAxiosError } from '@/hooks/useAxiosError';
import { inviteGroupMemberMutationOptions } from '@/queries/group/mutation';
import { InvitationResult } from '@/types/invitation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { LucideX } from 'lucide-react';
import { useParams } from 'next/navigation';
import { KeyboardEventHandler, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { formSchema, InvitationFormSchema } from './formSchema';
import InvitationResultDisplay from './InvitationResultDisplay';
import { InvitationFormStatus } from './types';

export default function InvitationForm() {
  const params = useParams();
  const groupId = params.groupId as string;
  const { toast } = useToast();
  const { handleAxiosError } = useAxiosError();
  const inviteGroupMemberMutation = useMutation(inviteGroupMemberMutationOptions);
  const [emailInput, setEmailInput] = useState('');
  const [formStatus, setFormStatus] = useState<InvitationFormStatus>('FORM');
  const [invitationResult, setInvitationResult] = useState<InvitationResult>([]);
  const form = useForm<InvitationFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupId: groupId,
      inviteeEmails: [],
    },
  });
  const [inviteeEmails] = useWatch({
    control: form.control,
    name: ['inviteeEmails'],
  });
  const { isSubmitting } = form.formState;
  const PREVIOUS_URL = `${PATHS.GROUP}/${groupId}?tab=members`;

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      // prevent submit
      e.preventDefault();
      if (inviteeEmails.includes(emailInput)) {
        toast({
          description: '이미 추가된 이메일입니다',
          variant: 'destructive',
        });
        setEmailInput('');
        return;
      }
      addEmail();
    }
  };

  const addEmail = () => {
    if (!emailInput) return;

    form.setValue('inviteeEmails', [...inviteeEmails, emailInput]);
    setEmailInput('');
  };

  const submitForm = form.handleSubmit(async (values: InvitationFormSchema) => {
    try {
      const { result } = await inviteGroupMemberMutation.mutateAsync(values);
      setInvitationResult(result);
      setFormStatus('RESULT');
      form.reset();
    } catch (error) {
      handleAxiosError(error);
    }
  });

  const removeInviteeEmail = (index: number) => () => {
    form.setValue(
      'inviteeEmails',
      inviteeEmails.filter((email, i) => i !== index),
    );
  };

  const setFormStatusAsForm = () => {
    setFormStatus('FORM');
    setInvitationResult([]);
  };

  if (formStatus === 'RESULT') {
    return (
      <>
        <PageHeader
          className="max-w-lg"
          title="멤버 초대 결과"
          backButton
          previousUrl={PREVIOUS_URL}
        >
          <Button onClick={setFormStatusAsForm} type="button">
            <span>다른 멤버 초대</span>
          </Button>
        </PageHeader>

        <PageBody className="max-w-lg">
          <InvitationResultDisplay invitationResult={invitationResult} />
        </PageBody>
      </>
    );
  }

  return (
    <Form {...form}>
      <form className="max-w-lg mx-auto" onSubmit={submitForm}>
        <PageHeader title="멤버 초대" backButton previousUrl={PREVIOUS_URL}>
          <Button onClick={submitForm} isLoading={isSubmitting}>
            <span>초대</span>
          </Button>
        </PageHeader>
        <PageBody>
          <div className="flex items-end gap-4">
            <InputFormField
              className="flex-1"
              name="emailInput"
              label="이메일 주소"
              inputProps={{
                value: emailInput,
                autoFocus: true,
                onKeyDown: handleKeyDown,
                onChange: (e) => setEmailInput(e.target.value.trim()),
                disabled: isSubmitting,
              }}
            />
            <Button onClick={addEmail} type="button" disabled={isSubmitting}>
              추가
            </Button>
          </div>
          <div className="py-4 flex flex-col items-start gap-4">
            {inviteeEmails.map((email, i) => (
              <Chip key={email} className="flex items-center gap-2">
                {email}
                <Button size="icon" type="button" onClick={removeInviteeEmail(i)}>
                  <LucideX className="w-4 h-4" />
                </Button>
              </Chip>
            ))}
          </div>
        </PageBody>
      </form>
    </Form>
  );
}
