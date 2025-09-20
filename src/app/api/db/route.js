import { tables } from '@/lib/tables'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const ordNo = searchParams.get('ordNo')

    if (!ordNo) {
      return Response.json({ error: 'ORD_NO is required' }, { status: 400 })
    }

    let wkWeeklyDateData = []
    let wkMainData = []
    let wkMainHelpData = []
    let wkWeeklyData = []
    let wkWeeklyCustomizeData = []
    let wkMonthlyData = []
    let wkDifferenceData = []
    let wkDifferenceCashData = []
    let wkRevenueData = []
    let wkMilestoneData = []
    let wkFileData = []
    let wkCriticalpathCcoData = []
    let wkTodoData = []
    let wkTodoBData = []
    let wkTrackData = []
    let wkRegulatoryTrackData = []
    let wkControversialCasesData = []
    let wkComControlData = []
    let wkMonthlyPlot1Data = []
    let wkMonthlyPlot1ExtraData = []
    let wkDifferenceCashPlotData = []
    let frProjectIncomeData = []
    let wkEnsureData = []
    try {
      wkWeeklyDateData = await tables.wkWeeklyDate.getData(ordNo)
      wkMainData = await tables.wkMain.getData(ordNo)
      wkMainHelpData = await tables.wkMainHelp.getData(ordNo)
      wkWeeklyData = await tables.wkWeekly.getData(ordNo)
      wkWeeklyCustomizeData = await tables.wkWeeklyCustomize.getData(ordNo)
      wkMonthlyData = await tables.wkMonthly.getData(ordNo)
      wkDifferenceData = await tables.wkDifference.getData(ordNo)
      wkDifferenceCashData = await tables.wkDifferenceCash.getData(ordNo)
      wkRevenueData = await tables.wkRevenue.getData(ordNo)
      wkMilestoneData = await tables.wkMilestone.getData(ordNo)
      wkFileData = await tables.wkFile.getData(ordNo)
      wkCriticalpathCcoData = await tables.wkCriticalpathCco.getData(ordNo)
      wkTodoData = await tables.wkTodo.getData(ordNo)
      wkTodoBData = await tables.wkTodoB.getData(ordNo)
      wkTrackData = await tables.wkTrack.getData(ordNo)
      wkRegulatoryTrackData = await tables.wkRegulatoryTrack.getData(ordNo)
      wkControversialCasesData = await tables.wkControversialCases.getData(ordNo)
      wkComControlData = await tables.wkComControl.getData(ordNo)
      wkMonthlyPlot1Data = await tables.wkMonthlyPlot1.getData(ordNo)
      wkMonthlyPlot1ExtraData = await tables.wkMonthlyPlot1Extra.getData(ordNo)
      wkDifferenceCashPlotData = await tables.wkDifferenceCashPlot.getData(ordNo)
      frProjectIncomeData = await tables.frProjectIncome.getData(ordNo)
      wkEnsureData = await tables.wkEnsure.getData()
    } catch (err) {
      console.error(err)
    }

    if (
      !wkWeeklyDateData.length &&
      !wkMainData.length &&
      !wkMainHelpData.length &&
      !wkWeeklyData.length &&
      !wkWeeklyCustomizeData.length &&
      !wkMonthlyData.length &&
      !wkDifferenceData.length &&
      !wkDifferenceCashData.length &&
      !wkRevenueData.length &&
      !wkMilestoneData.length &&
      !wkFileData.length &&
      !wkCriticalpathCcoData.length &&
      !wkTodoData.length &&
      !wkTodoBData.length &&
      !wkTrackData.length &&
      !wkRegulatoryTrackData.length &&
      !wkControversialCasesData.length &&
      !wkComControlData.length &&
      !wkMonthlyPlot1Data.length &&
      !wkMonthlyPlot1ExtraData.length &&
      !wkDifferenceCashPlotData.length &&
      !frProjectIncomeData.length &&
      !wkEnsureData.length
    ) {
      return Response.json({
        message: '沒有找到相關資料',
        wkWeeklyDate: [],
        wkMain: [],
        wkMainHelp: [],
        wkWeekly: [],
        wkWeeklyCustomize: [],
        wkMonthly: [],
        wkDifference: [],
        wkDifferenceCash: [],
        wkRevenue: [],
        wkMilestone: [],
        wkFile: [],
        wkCriticalpathCco: [],
        wkTodo: [],
        wkTodoB: [],
        wkTrack: [],
        wkRegulatoryTrack: [],
        wkControversialCases: [],
        wkComControl: [],
        wkMonthlyPlot1: [],
        wkMonthlyPlot1Extra: [],
        wkDifferenceCashPlot: [],
        frProjectIncome: [],
        wkEnsure: [],
      })
    }

    return Response.json({
      wkWeeklyDate: wkWeeklyDateData,
      wkMain: wkMainData,
      wkMainHelp: wkMainHelpData,
      wkWeekly: wkWeeklyData,
      wkWeeklyCustomize: wkWeeklyCustomizeData,
      wkMonthly: wkMonthlyData,
      wkDifference: wkDifferenceData,
      wkDifferenceCash: wkDifferenceCashData,
      wkRevenue: wkRevenueData,
      wkMilestone: wkMilestoneData,
      wkFile: wkFileData,
      wkCriticalpathCco: wkCriticalpathCcoData,
      wkTodo: wkTodoData,
      wkTodoB: wkTodoBData,
      wkTrack: wkTrackData,
      wkRegulatoryTrack: wkRegulatoryTrackData,
      wkControversialCases: wkControversialCasesData,
      wkComControl: wkComControlData,
      wkMonthlyPlot1: wkMonthlyPlot1Data,
      wkMonthlyPlot1Extra: wkMonthlyPlot1ExtraData,
      wkDifferenceCashPlot: wkDifferenceCashPlotData,
      frProjectIncome: frProjectIncomeData,
      wkEnsure: wkEnsureData,
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
