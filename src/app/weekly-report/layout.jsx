import { FontSizeProvider } from './context/useFontSize'

export default function WeeklyReportLayout({ children }) {
  return <FontSizeProvider>{children}</FontSizeProvider>
}
