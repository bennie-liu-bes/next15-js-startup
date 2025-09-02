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

export function useGetUrlParams() {
  const searchParams = useSearchParams()
  try {
    const token = searchParams.get('token')
    const ordNo = searchParams.get('ORD_NO')
    
    return {
      token: token ? decodeURIComponent(token) : null,
      ordNo: ordNo ? decodeURIComponent(ordNo) : null,
    }
  } catch (error) {
    return {
      token: null,
      ordNo: null,
      error: error.message
    }
  }
}