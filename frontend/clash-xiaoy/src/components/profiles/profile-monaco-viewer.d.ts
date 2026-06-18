import '@/services/monaco';
import { type editor } from 'monaco-editor';
import { type Monaco } from '@monaco-editor/react';
export interface ProfileMonacoViewProps {
    value?: string;
    onChange?: (value: string) => void;
    language?: string;
    className?: string;
    readonly?: boolean;
    schemaType?: 'clash' | 'merge';
    onValidate?: (markers: editor.IMarker[]) => void;
}
export interface ProfileMonacoViewRef {
    getValue: () => string | undefined;
}
export declare const beforeEditorMount: (monaco: Monaco) => void;
export default function ProfileMonacoViewer({ value, language, readonly, schemaType, className, onValidate, ...others }: ProfileMonacoViewProps): import("@emotion/react/jsx-runtime").JSX.Element;
