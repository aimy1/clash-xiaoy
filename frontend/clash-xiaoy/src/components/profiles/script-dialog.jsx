import { useAsyncEffect, useReactive } from 'ahooks';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { SelectElement, TextFieldElement, useForm } from 'react-hook-form-mui';
import { useTranslation } from 'react-i18next';
import { message } from '@/utils/notification';
import { Divider } from '@mui/material';
import { ProfileTemplate, useProfile, useProfileContent, } from '@nyanpasu/interface';
import { BaseDialog } from '@nyanpasu/ui';
import LanguageChip from './modules/language-chip';
import { getLanguage, ProfileTypes, } from './utils';
const ProfileMonacoViewer = lazy(() => import('./profile-monaco-viewer'));
const formCommonProps = {
    autoComplete: 'off',
    autoCorrect: 'off',
    fullWidth: true,
};
const optionTypeMapping = [
    {
        id: 'js',
        value: ProfileTypes.JavaScript,
        language: 'javascript',
        label: 'JavaScript',
    },
    {
        id: 'lua',
        value: ProfileTypes.LuaScript,
        language: 'lua',
        label: 'LuaScript',
    },
    {
        id: 'merge',
        value: ProfileTypes.Merge,
        language: 'yaml',
        label: 'Merge',
    },
];
const convertTypeMapping = (data) => {
    optionTypeMapping.forEach((option) => {
        if (option.id === data.type) {
            data = {
                ...data,
                ...option,
            };
        }
    });
    return data;
};
export const ScriptDialog = ({ open, profile, onClose, ...props }) => {
    const { t } = useTranslation();
    const { create, patch } = useProfile();
    const contentFn = useProfileContent(profile?.uid ?? '');
    const form = useForm();
    const isEdit = Boolean(profile);
    useEffect(() => {
        if (isEdit) {
            form.reset(profile);
        }
        else {
            form.reset({
                type: 'merge',
                name: t('New Script'),
                desc: '',
            });
        }
    }, [form, isEdit, profile, t]);
    const [openMonaco, setOpenMonaco] = useState(false);
    const editor = useReactive({
        value: ProfileTemplate.merge,
        displayLanguage: 'YAML',
        language: 'yaml',
        rawType: 'merge',
    });
    const editorMarks = useRef([]);
    const editorHasError = () => editorMarks.current.length > 0 &&
        editorMarks.current.some((m) => m.severity === 8);
    const onSubmit = form.handleSubmit(async (data) => {
        if (editorHasError()) {
            message(t('Please fix the error before submitting'), {
                kind: 'error',
            });
            return;
        }
        convertTypeMapping(data);
        const editorValue = editor.value;
        if (!editorValue) {
            return;
        }
        try {
            if (isEdit) {
                await contentFn.upsert.mutateAsync(editorValue);
                await patch.mutateAsync({
                    uid: data.uid,
                    profile: data,
                });
            }
            else {
                await create.mutateAsync({
                    type: 'manual',
                    data: {
                        item: data,
                        fileData: editorValue,
                    },
                });
            }
        }
        finally {
            onClose();
        }
    });
    useAsyncEffect(async () => {
        if (isEdit) {
            const result = await contentFn.query.refetch();
            editor.value = result.data ?? '';
            editor.displayLanguage = getLanguage(profile);
            editor.language = editor.displayLanguage.toLowerCase();
        }
        else {
            editor.value = ProfileTemplate.merge;
            editor.displayLanguage = 'YAML';
            editor.language = editor.displayLanguage.toLowerCase();
        }
        setOpenMonaco(open);
    }, [open]);
    const handleTypeChange = () => {
        const data = form.getValues();
        editor.rawType = convertTypeMapping(data).type;
        const lang = getLanguage(data);
        if (!lang) {
            return;
        }
        editor.displayLanguage = lang;
        editor.language = editor.displayLanguage.toLowerCase();
        switch (editor.language) {
            case 'yaml': {
                editor.value = ProfileTemplate.merge;
                break;
            }
            case 'lua': {
                editor.value = ProfileTemplate.luascript;
                break;
            }
            case 'javascript': {
                editor.value = ProfileTemplate.javascript;
                break;
            }
        }
    };
    return (<BaseDialog title={<div className="flex gap-2" data-tauri-drag-region>
          <span>{isEdit ? t('Edit Script') : t('New Script')}</span>

          <LanguageChip lang={isEdit && profile ? getLanguage(profile) : editor.displayLanguage}/>
        </div>} open={open} onClose={() => onClose()} onOk={onSubmit} divider contentStyle={{
            overflow: 'hidden',
            padding: 0,
        }} full {...props}>
      <div className="flex h-full">
        <div className="overflow-auto pt-4 pb-4">
          <div className="flex flex-col gap-4 pr-4 pb-4 pl-4">
            {!isEdit && (<SelectElement label={t('Type')} name="type" control={form.control} {...formCommonProps} size="small" required options={optionTypeMapping} onChange={() => handleTypeChange()}/>)}

            <TextFieldElement label={t('Name')} name="name" control={form.control} {...formCommonProps} size="small" required/>

            <TextFieldElement label={t('Descriptions')} name="desc" control={form.control} {...formCommonProps} size="small" multiline/>
          </div>
        </div>

        <Divider orientation="vertical"/>

        <Suspense fallback={null}>
          {openMonaco && !contentFn.query.isPending && (<ProfileMonacoViewer className="w-full" value={editor.value} onChange={(value) => {
                editor.value = value;
            }} language={editor.language} onValidate={(marks) => {
                editorMarks.current = marks;
            }} schemaType={editor.rawType === 'merge' ? 'merge' : undefined}/>)}
        </Suspense>
      </div>
    </BaseDialog>);
};
