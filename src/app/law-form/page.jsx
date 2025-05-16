'use client'

import { useState, useEffect } from 'react'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from '@/components/ui/card'

import LawForm from './components/LawForm'
import AgreementList from './components/AgreementList'

export default function LawFormPage() {
  const [tab, setTab] = useState('form')
  const [pageLoaded, setPageLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => setPageLoaded(true), 50)
  }, [])
  return (
    <div
      className={`min-h-screen bg-gray-100 font-sans transition-opacity duration-700 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* 頂部 Banner */}
      <header className="animate-fadeInUp bg-blue-900 py-8 text-white shadow-md">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4">
          <div className="animate-fadeInUp mb-2 flex items-center gap-2 text-3xl font-bold tracking-wide delay-100">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <rect width="24" height="24" rx="6" fill="#fff" fillOpacity="0.1" />
              <path d="M7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" fill="#fff" />
            </svg>
            法務處合約自動產生系統
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-10 px-4 py-10">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="w-full bg-gray-200">
            <TabsTrigger value="form" className="flex-1">
              填寫表單
            </TabsTrigger>
            <TabsTrigger value="list" className="flex-1">
              表單清單
            </TabsTrigger>
          </TabsList>
          <TabsContent value="form">
            <Card className="animate-fadeInUp rounded-2xl border-0 bg-white shadow-xl">
              <CardHeader>
                <CardTitle>填寫保密協議表單</CardTitle>
                <CardDescription>請輸入合約資訊，送出後可於清單下載合約</CardDescription>
              </CardHeader>
              <CardContent>
                <LawForm onSubmitSuccess={() => setTab('list')} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="list">
            <Card className="animate-fadeInUp rounded-2xl border-0 bg-white shadow-xl">
              <CardHeader>
                <CardTitle>表單清單</CardTitle>
                <CardDescription>所有已送出資料，可直接下載合約</CardDescription>
              </CardHeader>
              <CardContent>
                <AgreementList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
