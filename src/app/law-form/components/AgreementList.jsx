'use client'

import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
} from '@/components/ui/dialog'

import { supabase } from '../supabaseClient'

export default function AgreementList() {
  const [agreements, setAgreements] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    fetchAgreements()
  }, [])

  const fetchAgreements = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('confidential_agreements')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setAgreements(data)
    setLoading(false)
  }

  const handleDownload = async id => {
    const res = await fetch(`/api/generate-docx?id=${id}`)
    if (!res.ok) return alert('下載失敗')
    const blob = await res.blob()
    let filename = 'agreement.docx'
    const disposition = res.headers.get('content-disposition')
    if (disposition) {
      const match =
        disposition.match(/filename\*=UTF-8''([^;\n]+)/) ||
        disposition.match(/filename="?([^";\n]+)"?/)
      if (match) {
        filename = decodeURIComponent(match[1])
      }
    }
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  }

  const handleDelete = async id => {
    setDeletingId(id)
    await supabase.from('confidential_agreements').delete().eq('id', id)
    setDeletingId(null)
    setConfirmOpen(false)
    setConfirmId(null)
    fetchAgreements()
  }

  return (
    <Card className="rounded-2xl border-0 bg-white shadow-xl">
      <CardHeader className="rounded-t-2xl bg-blue-900 p-6">
        <CardTitle className="text-xl font-bold tracking-wide text-white">已送出表單列表</CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        {loading ? (
          <div className="text-gray-500">載入中...</div>
        ) : agreements.length === 0 ? (
          <div className="text-gray-500">尚無資料</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-2 text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="rounded-l-lg px-3 py-2">締約日</th>
                  <th className="px-3 py-2">對方名稱</th>
                  <th className="px-3 py-2">合作目的</th>
                  <th className="px-3 py-2">建立時間</th>
                  <th className="px-3 py-2">下載</th>
                  <th className="rounded-r-lg px-3 py-2">刪除</th>
                </tr>
              </thead>
              <tbody>
                {agreements.map((a, idx) => (
                  <tr
                    key={a.id}
                    className={
                      idx % 2 === 0 ? 'bg-white' : 'bg-gray-50 transition hover:bg-blue-50'
                    }
                  >
                    <td className="px-3 py-2 font-medium">{a.contract_date}</td>
                    <td className="px-3 py-2">{a.partner_name}</td>
                    <td className="px-3 py-2">{a.purpose}</td>
                    <td className="px-3 py-2 text-gray-500">
                      {new Date(a.created_at).toLocaleString()}
                    </td>
                    <td className="px-3 py-2">
                      <Button
                        onClick={() => handleDownload(a.id)}
                        className="rounded-lg bg-blue-600 px-4 py-1 font-bold text-white transition hover:bg-blue-700"
                      >
                        下載
                      </Button>
                    </td>
                    <td className="px-3 py-2">
                      <Button
                        variant="destructive"
                        onClick={() => {
                          setConfirmId(a.id)
                          setConfirmOpen(true)
                        }}
                        disabled={deletingId === a.id}
                        className="rounded-lg px-4 py-1 font-bold"
                      >
                        {deletingId === a.id ? '刪除中...' : '刪除'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>確定要刪除這筆資料嗎？</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setConfirmOpen(false)}
                disabled={deletingId !== null}
              >
                取消
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(confirmId)}
                disabled={deletingId !== null}
              >
                {deletingId !== null ? '刪除中...' : '確定刪除'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
