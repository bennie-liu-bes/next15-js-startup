# 保固金種類 Chip 組件

## 概述

`EnsureTypeChip` 是一個專為顯示保固金種類而設計的 React 組件，使用 Material-UI 的 Chip 組件和圖標，為不同的保固金種類提供視覺化的標識。

## 支援的保固金種類

| 種類   | 圖標             | 顏色           | 說明           |
| ------ | ---------------- | -------------- | -------------- |
| 切結書 | 📄 Description    | 藍色 (#1976d2) | 文件類保固     |
| 定存單 | 🏛️ AccountBalance | 綠色 (#388e3c) | 銀行定存類保固 |
| 保證書 | 🔒 Security       | 橙色 (#f57c00) | 擔保類保固     |
| 現金   | 💰 AttachMoney    | 紅色 (#d32f2f) | 現金類保固     |

## 使用方法

### 基本使用

```jsx
import EnsureTypeChip from './components/EnsureTypeChip'

// 基本使用
<EnsureTypeChip type="切結書" />
<EnsureTypeChip type="定存單" />
<EnsureTypeChip type="保證書" />
<EnsureTypeChip type="現金" />
```

### 在 DataGrid 中使用

```jsx
{
  field: 'ENSURE_CH',
  headerName: '保固金種類',
  width: 120,
  renderCell: (params) => (
    <EnsureTypeChip type={params.value} />
  ),
}
```

### 自訂尺寸

```jsx
<EnsureTypeChip type="切結書" size="small" />   // 預設
<EnsureTypeChip type="切結書" size="medium" />  // 較大
```

### 自訂樣式

```jsx
<EnsureTypeChip 
  type="切結書" 
  sx={{ 
    fontSize: '14px',
    height: '28px'
  }} 
/>
```

## API

### Props

| 屬性 | 類型                | 預設值  | 說明                                              |
| ---- | ------------------- | ------- | ------------------------------------------------- |
| type | string              | -       | 保固金種類 ('切結書', '定存單', '保證書', '現金') |
| size | 'small' \| 'medium' | 'small' | Chip 大小                                         |
| sx   | Object              | {}      | 額外的 Material-UI 樣式物件                       |

### 輔助函數

```jsx
import { getSupportedEnsureTypes, isValidEnsureType } from './components/EnsureTypeChip'

// 獲取所有支援的保固金種類
const types = getSupportedEnsureTypes()  // ['切結書', '定存單', '保證書', '現金']

// 檢查是否為有效的保固金種類
const isValid = isValidEnsureType('切結書')  // true
const isInvalid = isValidEnsureType('未知類型')  // false
```

## 錯誤處理

當傳入不支援的保固金種類時，組件會顯示灰色的預設樣式：

```jsx
<EnsureTypeChip type="未知類型" />  // 顯示灰色 Chip
<EnsureTypeChip type="" />         // 顯示 "未知" 標籤
<EnsureTypeChip />                 // 顯示 "未知" 標籤
```

## 樣式設計

每種保固金種類都有獨特的視覺設計：

- **圖標**：使用 Material-UI Icons 中相關的圖標
- **顏色**：每種類型有專屬的主色調
- **背景**：淺色背景提供良好的視覺對比
- **邊框**：與主色調一致的邊框
- **尺寸**：緊湊的設計適合表格顯示

## 更新記錄

- v1.0.0: 初始版本，支援 4 種保固金種類
- 支援自訂尺寸和樣式
- 包含錯誤處理機制
- 提供輔助函數
