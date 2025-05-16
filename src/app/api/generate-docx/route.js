import { marked } from 'marked'
import htmlToDocx from 'html-to-docx'
import { NextResponse } from 'next/server'
import { supabase } from '@/app/law-form/supabaseClient'

// markdown 格式範本
const templateText = `# 保密協議

本保密協議（以下簡稱「本協議」）於西元{{締約日}}訂立，締約雙方為：

- **{{對方名稱}}**，一家依照{{對方依何國法律設立}}法律合法設立並運作的公司，註冊地址為{{對方地址}}（以下簡稱「{{對方簡稱}}」）
- **中華工程股份有限公司**，註冊地址臺北市松山區新聚里東興路12號6樓（以下簡稱「中工公司」）

{{對方簡稱}}公司與中工公司之後合稱為「雙方」，單獨稱為「一方」。

為促進討論**{{合作目的}}**（以下稱「業務」），{{對方簡稱}}公司與中工公司雙方希望相互披露與該業務相關的資訊。故此，{{對方簡稱}}公司與中工公司同意依據以下條款及條件訂立本協議：

## 條款

1. 「機密資訊」係指由一方（以下稱「提供方」）向另一方（以下稱「接收方」）提供的任何及所有有關財務資訊、操作方法、業務計劃、商業秘密或專有資訊的數據、報告、解釋及記錄，無論是口頭或書面形式提供，亦不論該等資訊是否標示為「機密」。雙方保證由一方提供予另一方的機密資訊係提供方有權向接收方披露的資訊，且該等資訊的提供並不違反越南法律。{{對方簡稱}}公司與中工公司可視情況分別作為提供方或接收方。
2. 機密資訊不包括以下資訊：
   - (a)接收方在從提供方接收該資訊之前已經知悉的資訊；
   - (b)由第三方善意披露給接收方，且該第三方並未因該事項對提供方承擔任何保密義務；
   - (c)非因接收方違反本協議而已經或隨後進入公開領域的資訊；或
   - (d)由接收方獨立開發且未違反本協議中任何義務的資訊；或
   - (e)提供方同意接收方依據書面協議在非保密基礎上進行披露的資訊。
3. 接收方承諾，並保證其任何子公司、關係企業、分公司、代表處、管理人員、主管、員工、代理人、顧問或服務提供者（以下稱「代表」）承諾：
   - (a)僅將機密資訊用於業務目的；
   - (b)未經提供方事先書面同意，不得向任何其他人披露機密資訊；
   - (c)未經提供方書面同意，不得複製、影印或以其他方式重製全部或部分機密資訊，惟為內部使用及業務目的所需之複製或重製除外；以及
   - (d)接收方及其代表不得向任何其他人披露有關業務討論或談判的事實，除非事先獲得提供方的書面同意。
4. 儘管本協議中對機密資訊使用的限制，接收方及其代表仍有權依法向有權政府機構披露任何要求披露的機密資訊。接收方應盡其合理努力，事先迅速報知提供方該等披露，以便提供方可以尋求保護令或其他適當的補救措施。若該保護令或其他補救措施無法及時獲得，接收方同意其及其代表僅披露依法要求提供的部分機密資訊。
5. 接收方同意，提供方對所提供的機密資訊的準確性或完整性不作任何明示或暗示的聲明或保證。接收方不得要求提供方對接收方或其代表使用機密資訊，或對機密資訊中的任何錯誤或遺漏承擔責任。
6. 如提供方提出要求，接收方應迅速將所有包含或展示機密資訊的文件、數據及其他實體物件（無論以任何形式或媒介）歸還給提供方或予以銷毀，且不得保留該等機密資訊的任何副本、摘錄或其他全部或部分的重製品。
7. 本協議中的任何條款均不旨在授予任何一方有關機密資訊的專利權、著作權、商標、服務標誌或其他智慧財產權。未經對方事先書面同意，任何一方不得在任何媒體或通訊中使用或公佈對方的名稱、標誌或其他識別資訊。為避免誤解，一方在與其代表的溝通中，依據本協議條款和條件使用或公佈對方的名稱、標誌或其他識別資訊，不應被視為在任何媒體或通訊中公佈。
8. 接收方同意，接收方將對其或其代表未經授權使用或披露機密資訊所導致或引起的損害承擔責任。
9. 雙方理解並同意，除非雙方簽署了關於業務的明確書面協議，否則任何有關業務的合同或協議均不應視為存在。每一方保留全權決定終止有關業務的討論的權利。
10. 本協議構成{{對方簡稱}}公司與中工公司之間有關本協議主題的全部協議。除非經雙方書面同意，否則本協議不得進行修改、補充或豁免。
11. 本協議自簽署日起生效。除非在與交易相關的任何明確書面協議中另有規定，或本協議中另有具體規定，否則在雙方終止討論的情況下，本協議下的義務仍然有效，並在本協議簽署日起持續有效{{保密期限約定}}。
12. 本協議應依照中華民國法律進行管轄及解釋。
13. 雙方同意，任何因本協議引起或與本協議相關的爭議，應依據中華民國仲裁協會爭議調解中心（CAA）的仲裁規則解決。仲裁裁決為終局裁決，對雙方具有約束力，並可依照裁決條款完全執行。
14. 本協議以英文及中文雙語製作成兩（2）份原件，具有相同的法律效力；每一方各持一份原件。若英文版及中文版之間存在任何不一致，應以英文版為準。

---

**{{對方簡稱}}公司**  
統一編號：{{對方統一編號}}  
法定代表人：{{對方法定代表人}}  
地址：{{對方地址}}

**中華工程股份有限公司**  
統一編號：75094900  
法定代表人：周志明  
地址：臺北市松山區新聚里東興路12號6樓
`

function getShortName(name) {
  if (!name) return ''
  if (name.length <= 4) return name
  return name.slice(0, 4)
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: '缺少 id' }, { status: 400 })

  // 取得資料
  const { data, error } = await supabase
    .from('confidential_agreements')
    .select('*')
    .eq('id', id)
    .single()
  if (error || !data) return NextResponse.json({ error: '查無資料' }, { status: 404 })

  // 產生對方簡稱
  const shortName = getShortName(data.partner_name)

  // 取代範本變數
  let mdText = templateText
    .replaceAll('{{締約日}}', data.contract_date || '')
    .replaceAll('{{對方名稱}}', data.partner_name || '')
    .replaceAll('{{對方依何國法律設立}}', data.partner_law || '')
    .replaceAll('{{合作目的}}', data.purpose || '')
    .replaceAll('{{保密期限約定}}', data.confidentiality_period || '')
    .replaceAll('{{對方統一編號}}', data.partner_tax_id || '')
    .replaceAll('{{對方法定代表人}}', data.partner_representative || '')
    .replaceAll('{{對方地址}}', data.partner_address || '')
    .replaceAll('{{對方簡稱}}', shortName)

  // markdown 轉 html
  const html = marked(mdText)

  // html 轉 docx buffer
  const buffer = await htmlToDocx(html, null, {
    table: { row: { cantSplit: true } },
    footer: true,
    pageNumber: false,
  })

  // 檔名：公司名稱_保密協議_日期.docx
  const safeName = (data.partner_name || '公司').replace(/[^\w\u4e00-\u9fa5]/g, '')
  const safeDate = (data.contract_date || '').replace(/\//g, '-')
  const filename = `${safeName}_保密協議_${safeDate}.docx`

  return new Response(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
    },
  })
}
