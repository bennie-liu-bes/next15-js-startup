'use client'
import { useSearchParams } from 'next/navigation'

export function useGetOrdNo() {
  const searchParams = useSearchParams()
  try {
    // const encodedData = searchParams.get('data')
    const encodedData = searchParams.get('ORD_NO')
    if (!encodedData) throw new Error('error:encodedData不存在')
    // const decodedData = JSON.parse(decodeURIComponent(encodedData))
    // if (!decodedData.ORD_NO) throw new Error('error:ORD_NO不存在')
    // return decodedData.ORD_NO
    const decodedData = decodeURIComponent(encodedData)
    if (!decodedData) throw new Error('error:ORD_NO不存在')
    return decodedData
  } catch (error) {
    return error.message
  }
}
