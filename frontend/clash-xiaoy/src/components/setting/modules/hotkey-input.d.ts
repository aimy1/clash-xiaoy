export interface Props extends React.HTMLAttributes<HTMLInputElement> {
    isDuplicate?: boolean;
    value?: string[];
    onValueChange?: (value: string[]) => void;
    func: string;
    onBlurCb?: (e: React.FocusEvent<HTMLInputElement>, func: string) => void;
    loading?: boolean;
}
export default function HotkeyInput({ isDuplicate, value, func, onValueChange, onBlurCb, className, loading, ...rest }: Props): import("@emotion/react/jsx-runtime").JSX.Element;
