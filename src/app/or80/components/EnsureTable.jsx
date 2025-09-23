'use client'

import { fmNoUnit } from '@/utils/fm'
import { useMemo, useState, useEffect } from 'react'

import { red } from '@mui/material/colors'
import { DataGrid } from '@mui/x-data-grid'
import { Box, Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material'

import MetricCards from './MetricCards'
import EnsureTypeChip from './EnsureTypeChip'
export default function EnsureTable({ data = [] }) {
  // 篩選狀態
  const [siteFilter, setSiteFilter] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 獲取所有不重複的工務所名稱
  const uniqueSites = useMemo(() => {
    const sites = data.map(row => row.SITE_CNAME).filter(site => site && site.trim() !== '')
    return [...new Set(sites)].sort()
  }, [data])

  // 篩選後的數據，並添加行號
  const filteredData = useMemo(() => {
    let result = data
    if (siteFilter) {
      result = data.filter(row => row.SITE_CNAME === siteFilter)
    }
    // 為每一行添加行號
    return result.map((row, index) => ({
      ...row,
      rowNumber: index + 1,
    }))
  }, [data, siteFilter])

  // 欄位定義（依照提供的 schema 順序）
  const columns = [
    {
      field: 'rowNumber',
      headerName: '項次',
      type: 'number',
      width: 40,
      resizable: false,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      align: 'right',
      headerAlign: 'left',
    },
    {
      field: 'BI_PROJECT_NAME',
      headerName: '工務所',
      minWidth: 80,

      disableColumnMenu: true,
    },
    { field: 'ORD_CH', headerName: '工程名稱', minWidth: 140, disableColumnMenu: true },
    {
      field: 'ITEM_NO',
      headerName: '保固項次',
      type: 'number',
      resizable: false,
      width: 80,
      headerAlign: 'left',
      disableColumnMenu: true,
    },
    { field: 'ENSURE_DESC', headerName: '保固內容', minWidth: 200, disableColumnMenu: true },
    {
      field: 'ENSURE_YEARS',
      headerName: '保固年數',
      type: 'number',
      align: 'right',
      headerAlign: 'left',
      resizable: false,
      width: 80,
      disableColumnMenu: true,
    },
    {
      field: 'ENSURE_END_DATE',
      headerName: '保固訖日',
      resizable: false,
      disableColumnMenu: true,
    },
    {
      field: 'DAYS_SINCE_ENSURE_END_DATE',
      headerName: '過保天數',
      type: 'number',
      resizable: false,
      width: 80,
      headerAlign: 'left',
      disableColumnMenu: true,
      valueFormatter: value => {
        if (value < 0) {
          return ''
        }
        return fmNoUnit(value)
      },
    },
    {
      field: 'ENSURE_CH',
      headerName: '保固金種類',
      resizable: false,
      disableColumnMenu: true,
      width: 120,
      renderCell: params => <EnsureTypeChip type={params.value} />,
    },
    {
      field: 'ENSURE_AMOUNT',
      headerName: '保固金額',
      type: 'number',
      resizable: false,
      align: 'right',
      headerAlign: 'left',
      valueFormatter: value => {
        if (value == null || value === '') {
          return ''
        }
        return fmNoUnit(value)
      },
      disableColumnMenu: true,
    },
    { field: 'ENSURE_PROCESSING', headerName: '處理情形', minWidth: 200, disableColumnMenu: true },
    { field: 'REMARK', headerName: '備註', minWidth: 200, disableColumnMenu: true },
    { field: 'ENSURE_ID', headerName: '保固ID', resizable: false, disableColumnMenu: true },
    { field: 'MNG', headerName: '主管部門ID', resizable: false, disableColumnMenu: true },
    {
      field: 'MNG_CNAME',
      headerName: '主管部門',
      minWidth: 140,
      resizable: false,
      disableColumnMenu: true,
    },
    {
      field: 'ENSURE_KND',
      headerName: '保固金種類編號',
      resizable: false,
      minWidth: 140,
      disableColumnMenu: true,
    },
    {
      field: 'CLOSE_AMOUNT',
      headerName: '結算金額',
      type: 'number',
      minWidth: 120,
      align: 'right',
      headerAlign: 'left',
      valueFormatter: value => {
        if (value == null || value === '') {
          return ''
        }
        return fmNoUnit(value)
      },
      disableColumnMenu: true,
    },
    {
      field: 'EST_ENSURE_AMOUNT',
      headerName: '提列保固金',
      type: 'number',
      minWidth: 120,
      align: 'right',
      headerAlign: 'left',
      valueFormatter: value => {
        if (value == null || value === '') {
          return ''
        }
        return fmNoUnit(value)
      },
      disableColumnMenu: true,
    },
    {
      field: 'ENSURE_START_DATE',
      headerName: '保固起日',
      resizable: false,
      disableColumnMenu: true,
    },

    {
      field: 'STOP_ENSURE_DATE',
      headerName: '保固解除日',
      resizable: false,
      disableColumnMenu: true,
    },
    { field: 'PROJECT_ID', headerName: '專案ID', resizable: false, disableColumnMenu: true },
    { field: 'ORD_NO', headerName: '工令', resizable: false, disableColumnMenu: true },
    { field: 'DIV', headerName: '工務所ID', resizable: false, disableColumnMenu: true },
    { field: 'SITE_CNAME', headerName: '工務所全稱', minWidth: 140, disableColumnMenu: true },
    {
      field: 'IS_EXPIRED',
      headerName: '是否過保',
      resizable: false,
      disableColumnMenu: true,
      valueFormatter: value => {
        if (value == null || value === '') {
          return ''
        }
        return value == 'Y' ? '是' : '否'
      },
    },
  ]

  if (!mounted) {
    return (
      <Stack direction="column" gap={2}>
        {/* 指標卡片區域 */}
        <MetricCards data={data} siteFilter={siteFilter} />
        {/* 下拉選單 */}
        <Box>
          <FormControl size="small" sx={{ minWidth: 'fit-content' }}>
            <InputLabel>篩選工務所</InputLabel>
            <Select
              value={siteFilter}
              label="篩選工務所"
              onChange={e => setSiteFilter(e.target.value)}
              sx={{
                minWidth: 120,
                width: 'auto',
                '& .MuiSelect-select': {
                  whiteSpace: 'nowrap',
                  overflow: 'visible',
                },
              }}
            >
              <MenuItem value="">
                <em>全部</em>
              </MenuItem>
              {uniqueSites.map(site => (
                <MenuItem key={site} value={site}>
                  {site}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* 表格 */}
        <DataGrid
          suppressHydrationWarning
          rows={filteredData || []}
          columns={columns}
          getRowClassName={params => {
            return params.row.IS_EXPIRED === 'Y' ? 'expired-row' : ''
          }}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#f5f5f5',
            },
            '& .expired-row': {
              backgroundColor: red[100],
            },
          }}
          initialState={{
            columns: {
              columnVisibilityModel: {
                // 預設隱藏的欄位
                ENSURE_ID: false,
                MNG: false,
                MNG_CNAME: false,
                ENSURE_KND: false,
                CLOSE_AMOUNT: false,
                EST_ENSURE_AMOUNT: false,
                ENSURE_START_DATE: false,
                STOP_ENSURE_DATE: false,
                PROJECT_ID: false,
                ORD_NO: false,
                DIV: false,
                SITE_CNAME: false,
                IS_EXPIRED: false,
                // 項次欄位預設顯示
                rowNumber: true,
              },
            },
            pagination: {
              paginationModel: {
                pageSize: 100,
              },
            },
          }}
          density="compact"
          // showToolbar
          pageSizeOptions={[100]}
          getRowId={row => {
            if (row && row.ENSURE_ID != null && row.ENSURE_ID !== '') return row.ENSURE_ID
            const a = row && row.PROJECT_ID != null ? String(row.PROJECT_ID) : ''
            const b = row && row.ITEM_NO != null ? String(row.ITEM_NO) : ''
            const c = row && row.ORD_NO != null ? String(row.ORD_NO) : ''
            const d = row && row.ENSURE_KND != null ? String(row.ENSURE_KND) : ''
            const composite = `${a}-${b}-${c}-${d}`
            if (composite && composite !== '---') return composite
            try {
              return JSON.stringify(row)
            } catch (error) {
              // 使用穩定的 ID 生成，避免 hydration 錯誤
              const fallbackId = `row-${a}-${b}-${c}-${d}`
              return fallbackId || 'fallback-row'
            }
          }}
        />
      </Stack>
    )
  }

  return (
    <Stack direction="column" gap={2}>
      {/* 指標卡片區域 */}
      <MetricCards data={data} siteFilter={siteFilter} />
      {/* 下拉選單 */}
      <Box>
        <FormControl size="small" sx={{ minWidth: 'fit-content' }}>
          <InputLabel>篩選工務所</InputLabel>
          <Select
            value={siteFilter}
            label="篩選工務所"
            onChange={e => setSiteFilter(e.target.value)}
            sx={{
              minWidth: 120,
              width: 'auto',
              '& .MuiSelect-select': {
                whiteSpace: 'nowrap',
                overflow: 'visible',
              },
            }}
          >
            <MenuItem value="">
              <em>全部</em>
            </MenuItem>
            {uniqueSites.map(site => (
              <MenuItem key={site} value={site}>
                {site}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* 表格 */}
      <DataGrid
        rows={filteredData || []}
        columns={columns}
        getRowClassName={params => {
          return params.row.IS_EXPIRED === 'Y' ? 'expired-row' : ''
        }}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#f5f5f5',
          },
          '& .expired-row': {
            backgroundColor: red[100],
          },
        }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              // 預設隱藏的欄位
              ENSURE_ID: false,
              MNG: false,
              MNG_CNAME: false,
              ENSURE_KND: false,
              CLOSE_AMOUNT: false,
              EST_ENSURE_AMOUNT: false,
              ENSURE_START_DATE: false,
              STOP_ENSURE_DATE: false,
              PROJECT_ID: false,
              ORD_NO: false,
              DIV: false,
              SITE_CNAME: false,
              IS_EXPIRED: false,
              // 項次欄位預設顯示
              rowNumber: true,
            },
          },
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        density="compact"
        // showToolbar
        pageSizeOptions={[100]}
        getRowId={row => {
          if (row && row.ENSURE_ID != null && row.ENSURE_ID !== '') return row.ENSURE_ID
          const a = row && row.PROJECT_ID != null ? String(row.PROJECT_ID) : ''
          const b = row && row.ITEM_NO != null ? String(row.ITEM_NO) : ''
          const c = row && row.ORD_NO != null ? String(row.ORD_NO) : ''
          const d = row && row.ENSURE_KND != null ? String(row.ENSURE_KND) : ''
          const composite = `${a}-${b}-${c}-${d}`
          if (composite && composite !== '---') return composite
          try {
            return JSON.stringify(row)
          } catch (error) {
            // 使用穩定的 ID 生成，避免 hydration 錯誤
            const fallbackId = `row-${a}-${b}-${c}-${d}`
            return fallbackId || 'fallback-row'
          }
        }}
      />
    </Stack>
  )
}
