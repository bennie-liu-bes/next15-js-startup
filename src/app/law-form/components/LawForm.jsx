'use client'

import { useState } from 'react'
import { format } from 'date-fns'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { supabase } from '../supabaseClient'

const initialState = {
  contract_date: '',
  partner_name: '',
  partner_law: '',
  purpose: '',
  confidentiality_period: '',
  partner_tax_id: '',
  partner_representative: '',
  partner_address: '',
}

export default function LawForm({ onSubmitSuccess }) {
  const [form, setForm] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [date, setDate] = useState(null)
  const [open, setOpen] = useState(false)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleDateChange = d => {
    setDate(d)
    setForm({ ...form, contract_date: d ? format(d, 'yyyy-MM-dd') : '' })
    setOpen(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.from('confidential_agreements').insert([form])
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setForm(initialState)
      setDate(null)
      if (onSubmitSuccess) onSubmitSuccess()
    }
  }

  return (
    <Card className="rounded-2xl border-0 bg-white shadow-xl">
      <CardHeader className="rounded-t-2xl bg-blue-900 p-6">
        <CardTitle className="text-xl font-bold tracking-wide text-white">
          填寫保密協議表單
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block font-semibold text-gray-700">締約日</label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={`w-full justify-start bg-gray-50 text-left font-normal ${!date ? 'text-gray-400' : ''}`}
                >
                  {date ? format(date, 'yyyy-MM-dd') : '請選擇日期'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label className="mb-1 block font-semibold text-gray-700">對方名稱</label>
            <Input
              name="partner_name"
              value={form.partner_name}
              onChange={handleChange}
              required
              placeholder="例如：XXX股份有限公司"
              className="bg-gray-50"
            />
          </div>
          <div>
            <label className="mb-1 block font-semibold text-gray-700">對方依何國法律設立</label>
            <Input
              name="partner_law"
              value={form.partner_law}
              onChange={handleChange}
              required
              placeholder="例如：中華民國"
              className="bg-gray-50"
            />
          </div>
          <div>
            <label className="mb-1 block font-semibold text-gray-700">合作目的</label>
            <Input
              name="purpose"
              value={form.purpose}
              onChange={handleChange}
              required
              placeholder="例如：委託銷售"
              className="bg-gray-50"
            />
          </div>
          <div>
            <label className="mb-1 block font-semibold text-gray-700">保密期限約定</label>
            <Input
              name="confidentiality_period"
              value={form.confidentiality_period}
              onChange={handleChange}
              required
              placeholder="例如：永久"
              className="bg-gray-50"
            />
          </div>
          <div>
            <label className="mb-1 block font-semibold text-gray-700">對方統一編號</label>
            <Input
              name="partner_tax_id"
              value={form.partner_tax_id}
              onChange={handleChange}
              required
              placeholder="例如：12345678"
              className="bg-gray-50"
            />
          </div>
          <div>
            <label className="mb-1 block font-semibold text-gray-700">對方法定代表人</label>
            <Input
              name="partner_representative"
              value={form.partner_representative}
              onChange={handleChange}
              required
              placeholder="例如：XXX"
              className="bg-gray-50"
            />
          </div>
          <div>
            <label className="mb-1 block font-semibold text-gray-700">對方地址</label>
            <Input
              name="partner_address"
              value={form.partner_address}
              onChange={handleChange}
              required
              placeholder="例如：臺北市松山區東興路100號"
              className="bg-gray-50"
            />
          </div>
          {error && <div className="text-sm font-medium text-red-500">{error}</div>}
          <Button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2 font-bold text-white transition hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? '送出中...' : '送出'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
