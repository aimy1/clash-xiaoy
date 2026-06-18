import { useAtomValue } from 'jotai'
import { useTranslation } from 'react-i18next'
import { Virtualizer } from 'virtua'
import { RuleFolderOutlined } from '@mui/icons-material'
import ContentDisplay from '../base/content-display'
import { atomRulePage } from './modules/store'
import RuleItem from './rule-item'

export const RulePage = () => {
  const { t } = useTranslation()

  const rule = useAtomValue(atomRulePage)

  return rule?.data?.length ? (
    <Virtualizer scrollRef={rule?.scrollRef}>
      {rule.data.map((item, index) => {
        return <RuleItem key={index} index={index} value={item} />
      })}
    </Virtualizer>
  ) : (
    <ContentDisplay
      className="absolute"
      message={t('No Rules')}
      icon={<RuleFolderOutlined sx={{ fontSize: 56 }} />}
    />
  )
}

export default RulePage
