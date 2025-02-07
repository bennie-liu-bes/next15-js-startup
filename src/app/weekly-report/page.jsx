import WeeklyReportClient from './components/WeeklyReportClient'
import { CONFIG } from '@/config-global'

export default function WeeklyReport() {
  return <WeeklyReportClient />
}

async function getData(ordNo) {
  if (!ordNo) return null

  try {
    const response = await fetch(`${CONFIG.API_HOST}/api/db?ordNo=${ordNo}`, {
      // 加入 next 的 fetch 配置
      next: {
        revalidate: 0, // 不快取
      },
      // 處理 fetch timeout
      signal: AbortSignal.timeout(5000), // 5 秒 timeout
    })

    if (!response.ok) {
      throw new Error('資料獲取失敗')
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error fetching data:', error)
    return null
  }
}

export async function generateMetadata({ params, searchParams }) {
  try {
    const searchParamsValues = await searchParams
    const { ORD_NO } = searchParamsValues
    const data = await getData(ORD_NO)
    const siteName = `${data?.wkMain[0]?.SITE_CNAME} - ${data?.wkMain[0]?.ORD_CH}`

    return {
      title: siteName,
      description: '中華工程-工程工務處-工令週報彙整畫面',
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: '工令週報',
      description: '中華工程-工程工務處-工令週報彙整畫面',
    }
  }
}
