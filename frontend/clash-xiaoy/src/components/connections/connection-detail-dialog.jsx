import { sentenceCase } from 'change-case';
import dayjs from 'dayjs';
import { filesize } from 'filesize';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@mui/material';
import { BaseDialog, cn } from '@nyanpasu/ui';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatValue = (key, value) => {
    if (Array.isArray(value)) {
        return <span>{value.join(' / ')}</span>;
    }
    key = key.toLowerCase();
    if (key.includes('speed')) {
        return <span>{filesize(value)}/s</span>;
    }
    if (key.includes('download') || key.includes('upload')) {
        return <span>{filesize(value)}</span>;
    }
    if (key.includes('port') || key.includes('id') || key.includes('ip')) {
        return <span>{value}</span>;
    }
    const date = dayjs(value);
    if (date.isValid()) {
        return (<Tooltip title={date.format('YYYY-MM-DD HH:mm:ss')}>
        <span>{date.fromNow()}</span>
      </Tooltip>);
    }
    return value;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Row = ({ label, value }) => {
    const key = label.toLowerCase();
    return (<>
      <div className="w-fit font-bold">{sentenceCase(label)}</div>
      <div className={cn('overflow', (key === 'id' ||
            key.includes('ip') ||
            key.includes('port') ||
            key.includes('destination') ||
            key.includes('path')) &&
            'font-mono')}>
        {formatValue(key, value)}
      </div>
    </>);
};
export default function ConnectionDetailDialog({ item, ...others }) {
    const { t } = useTranslation();
    if (!item)
        return null;
    return (<BaseDialog {...others} title={t('Connection Detail')}>
      <div className="grid grid-cols-[max-content_1fr] gap-x-3 gap-y-2 px-3">
        {Object.entries(item)
            .filter(([key, value]) => key !== 'metadata' && !!value)
            .map(([key, value]) => (<Row key={key} label={key} value={value}/>))}

        <h3 className="col-span-2 py-1 pt-5 text-xl font-semibold">
          {t('Metadata')}
        </h3>

        {Object.entries(item.metadata)
            .filter(([, value]) => !!value)
            .map(([key, value]) => (<Row key={key} label={key} value={value}/>))}
      </div>
    </BaseDialog>);
}
