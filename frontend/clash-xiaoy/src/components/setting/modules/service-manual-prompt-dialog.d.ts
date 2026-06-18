import { BaseDialogProps } from '@nyanpasu/ui';
export type ServerManualPromptDialogProps = Omit<BaseDialogProps, 'title'> & {
    operation: 'uninstall' | 'install' | 'start' | 'stop' | null;
};
export default function ServerManualPromptDialog({ open, onClose, operation, ...props }: ServerManualPromptDialogProps): import("@emotion/react/jsx-runtime").JSX.Element;
export declare function ServerManualPromptDialogWrapper(): import("@emotion/react/jsx-runtime").JSX.Element;
export declare function useServerManualPromptDialog(): {
    show: (prompt: "install" | "uninstall" | "stop" | "start") => void;
    close: () => void;
};
