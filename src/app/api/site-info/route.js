import { tables } from '@/lib/tables'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const ordNo = searchParams.get('ordNo')

    if (!ordNo) {
      return Response.json({ error: 'ORD_NO is required' }, { status: 400 })
    }

    let wkMainData = []
    try {
      wkMainData = await tables.wkMain.getData(ordNo)
    } catch (err) {
      console.error(err)
    }

    if (!wkMainData.length) {
      return Response.json({
        message: '沒有找到相關資料',
        wkMain: [],
      })
    }

    return Response.json({
      wkMain: wkMainData,
    })
  } catch (error) {
    console.error('API錯誤:', error)
    return Response.json(
      {
        error: '資料庫查詢失敗',
        message: error.message,
      },
      { status: 500 }
    )
  }
}
