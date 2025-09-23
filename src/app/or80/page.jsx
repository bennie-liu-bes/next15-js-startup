import { tables } from '@/lib/tables'

import EnsureTable from './components/EnsureTable'

export default async function Or80() {
  const wkEnsureData = await tables.wkEnsure.getData()
  return (
    <div style={{ padding: 16 }}>
      <EnsureTable data={wkEnsureData} />
    </div>
  )
}
