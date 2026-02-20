import { useInterval } from 'ahooks'
import { useEffect, useState } from 'react'
import { timing } from '@nyanpasu/interface'
import IPASNPanel from './modules/ipasn-panel'
import TimingPanel from './modules/timing-panel'

const REFRESH_SECONDS = 5

export const useHealthPanelData = () => {
  const [health, setHealth] = useState({
    Google: 0,
    GitHub: 0,
    BingCN: 0,
    Baidu: 0,
  })

  const [refreshCount, setRefreshCount] = useState(0)

  const fetchHealth = async () => {
    const newData = {
      Google: await timing.Google(),
      GitHub: await timing.GitHub(),
      BingCN: await timing.BingCN(),
      Baidu: await timing.Baidu(),
    }
    setHealth(newData)
    setRefreshCount((c) => c + REFRESH_SECONDS)
  }

  useInterval(fetchHealth, 1000 * REFRESH_SECONDS)

  useEffect(() => {
    fetchHealth()
  }, [])

  return { health, refreshCount }
}

export const HealthPanel = () => {
  const { health, refreshCount } = useHealthPanelData()

  return (
    <>
      <TimingPanel data={health} />

      <IPASNPanel refreshCount={refreshCount} />
    </>
  )
}

export default HealthPanel
