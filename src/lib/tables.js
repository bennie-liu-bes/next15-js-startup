import db from './db'

export const tables = {
  wkWeeklyDate: {
    getData: async ordNo => {
      const query = `
        SELECT DISTINCT CALENDAR_DATE 
        FROM FR_WK_WEEKLY
        WHERE 1=1
        AND ORD_NO = @ordNo
        ORDER BY CALENDAR_DATE DESC
      `
      return await db.query(query, { ordNo })
    },
  },
  wkMain: {
    getData: async ordNo => {
      const query = `
        SELECT *
        FROM FR_WK_MAIN
        WHERE 1=1
        AND ORD_NO = @ordNo
      `
      return await db.query(query, { ordNo })
    },
  },
  wkMainHelp: {
    getData: async ordNo => {
      const query = `
        SELECT *
        FROM FR_WK_MAIN_HELP
        WHERE 1=1
        AND ORD_NO = @ordNo
        ORDER BY HELP_NUM
      `
      return await db.query(query, { ordNo })
    },
  },
  wkWeekly: {
    getData: async ordNo => {
      const query = `
        SELECT *
        FROM FR_WK_WEEKLY
        WHERE 1=1
        AND ORD_NO = @ordNo
      `
      return await db.query(query, { ordNo })
    },
  },
  wkWeeklyCustomize: {
    getData: async ordNo => {
      const query = `
        SELECT *
        FROM FR_WK_WEEKLY_CUSTOMIZE
        WHERE 1=1
        AND ORD_NO = @ordNo
        ORDER BY SORT
    `
      return await db.query(query, { ordNo })
    },
  },
  wkMonthly: {
    getData: async ordNo => {
      const query = `
        SELECT *
        FROM FR_WK_MONTHLY
        WHERE 1=1
        AND ORD_NO = @ordNo
      `
      return await db.query(query, { ordNo })
    },
  },
  wkDifference: {
    getData: async ordNo => {
      const query = `
        SELECT * 
        FROM FR_WK_DIFFERENCE
        WHERE 1=1
        AND ORD_NO = @ordNo
      `
      return await db.query(query, { ordNo })
    },
  },
  wkDifferenceCash: {
    getData: async ordNo => {
      const query = `
        SELECT * 
        FROM FR_WK_DIFFERENCE_CASH
        WHERE 1=1
        AND ORD_NO = @ordNo
        ORDER BY DIFFERENCE_CASH_ID
      `
      return await db.query(query, { ordNo })
    },
  },
  wkRevenue: {
    getData: async ordNo => {
      const query = `
        SELECT * 
        FROM FR_WK_REVENUE 
        WHERE ORD_NO = @ordNo
      `
      return await db.query(query, { ordNo })
    },
  },
  wkMilestone: {
    getData: async ordNo => {
      const query = `
        SELECT * 
        FROM FR_WK_MILESTONE
        WHERE ORD_NO = @ordNo
        ORDER BY MILESTONE_ID
      `
      return await db.query(query, { ordNo })
    },
  },
  wkFile: {
    getData: async ordNo => {
      const query = `
        SELECT *
        FROM FR_WK_FILE
        WHERE 1=1
        AND ORD_NO = @ordNo
        ORDER BY PIC_TYPE, PIC_ORDER
      `
      return await db.query(query, { ordNo })
    },
  },
  wkCriticalpathCco: {
    getData: async ordNo => {
      const query = `
        SELECT * 
        FROM FR_WK_CRITICALPATH_CCO
        WHERE 1=1
        AND ORD_NO = @ordNo
        ORDER BY CCO_NUM
      `
      return await db.query(query, { ordNo })
    },
  },
  wkTodo: {
    getData: async ordNo => {
      const query = `
        SELECT * 
        FROM FR_WK_TO_DO
        WHERE 1=1
        AND ORD_NO = @ordNo
        ORDER BY TODO_NUM
      `
      return await db.query(query, { ordNo })
    },
  },
  wkTodoB: {
    getData: async ordNo => {
      const query = `
        SELECT * 
        FROM FR_WK_TO_DO_B
        WHERE 1=1
        AND ORD_NO = @ordNo
      `
      return await db.query(query, { ordNo })
    },
  },
  wkTrack: {
    getData: async ordNo => {
      const query = `
        SELECT * FROM FR_WK_TRACK
        WHERE 1=1
        AND ORD_NO = @ordNo
      `
      return await db.query(query, { ordNo })
    },
  },
  wkRegulatoryTrack: {
    getData: async ordNo => {
      const query = `
        SELECT * 
        FROM FR_WK_REGULATORY_TRACK
        WHERE 1=1
        AND ORD_NO = @ordNo
        ORDER BY 
          ISNULL(RESERVE_DATE, 'Z'),
          CONTRACK_LEVEL,
          CONSTRUCTION_DATE ASC
      `
      return await db.query(query, { ordNo })
    },
  },
  wkControversialCases: {
    getData: async ordNo => {
      const query = `
        SELECT * 
        FROM FR_WK_CONTROVERSIAL_CASES
        WHERE 1=1
        AND ORD_NO = @ordNo
        ORDER BY C_TYPE DESC, C_ID
      `
      return await db.query(query, { ordNo })
    },
  },
  wkComControl: {
    getData: async ordNo => {
      const query = `
        SELECT 
          PROJECT_ID
          ,ORD_NO
          ,ORD_CH
          ,DIV
          ,SITE_CNAME
          ,CALENDAR_DATE
          ,ISNULL([SHOULD_BE],'') AS SHOULD_BE
          ,ISNULL([ALREADY_APPROVED],'') AS ALREADY_APPROVED
          ,ISNULL([UNDER_REVIEW],'') AS UNDER_REVIEW
          ,ISNULL([SETTLEMENT],'') AS SETTLEMENT
          ,ISNULL([REMARK], '') AS REMARK
          ,SHOULD_BE_CHANGE
          ,ALREADY_APPROVED_CHANGE
          ,UNDER_REVIEW_CHANGE
          ,SETTLEMENT_CHANGE
          ,REMARK_CHANGE
        FROM FR_WK_COM_CONTROL
        WHERE 1=1
        AND ORD_NO = @ordNo
      `
      return await db.query(query, { ordNo })
    },
  },
  wkMonthlyPlot1: {
    getData: async ordNo => {
      const query = `SELECT * FROM FR_WK_MONTHLY_PROGRESS_PLOTDATA WHERE ORD_NO = @ordNo`
      return await db.query(query, { ordNo })
    },
  },
  wkMonthlyPlot1Extra: {
    getData: async ordNo => {
      const query = `SELECT * FROM FR_WK_MONTHLY_PROGRESS_PLOTDATA_EXTRA WHERE ORD_NO = @ordNo`
      return await db.query(query, { ordNo })
    },
  },
  wkDifferenceCashPlot: {
    getData: async ordNo => {
      const query = `SELECT * FROM FR_WK_DIFFERENCE_CASH_PLOTDATA WHERE ORD_NO = @ordNo ORDER BY YYMM`
      return await db.query(query, { ordNo })
    },
  },
  frProjectIncome: {
    getData: async ordNo => {
      const query = `SELECT * FROM FR_PROJECT_INCOME WHERE GBMCU = @ordNo ORDER BY YM`
      return await db.query(query, { ordNo })
    },
  },
}
