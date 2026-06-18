import '@/services/monaco';
import { DiffEditor } from '@monaco-editor/react';
import { beforeEditorMount } from './profile-monaco-viewer';
export default function ProfileMonacoDiffViewer(props) {
    return <DiffEditor {...props} beforeMount={beforeEditorMount}/>;
}
