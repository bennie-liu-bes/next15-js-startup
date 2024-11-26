'use client'
import { useSearchParams } from 'next/navigation'

export function useGetOrdNo() {
  const searchParams = useSearchParams()
  try {
    const encodedData = searchParams.get('data')
    if (!encodedData) throw new Error('error:encodedData不存在')
    const decodedData = JSON.parse(decodeURIComponent(encodedData))
    if (!decodedData.ORD_NO) throw new Error('error:ORD_NO不存在')
    return decodedData.ORD_NO
  } catch (error) {
    return error.message
  }
}
