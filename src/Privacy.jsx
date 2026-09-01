import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Privacy.css'

function Privacy() {
  useEffect(() => {
    document.documentElement.lang = 'ar'
    document.documentElement.dir = 'rtl'
    document.title = 'سياسة الخصوصية | محمد آل الشيخ'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'سياسة خصوصية مختصرة توضح كيفية التعامل مع المعلومات المرسلة عبر موقع محمد آل الشيخ للمحاماة والتوثيق.')
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://shaikhlawyer.com/privacy')
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', 'سياسة الخصوصية | محمد آل الشيخ')
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', 'https://shaikhlawyer.com/privacy')
  }, [])

  return (
    <div className="privacy-page" dir="rtl">
      <header className="privacy-header">
        <Link className="privacy-brand" to="/" aria-label="العودة إلى الرئيسية">
          <img src="/logo.svg" alt="شعار محمد آل الشيخ للمحاماة والتوثيق" />
          <span><strong>محمد آل الشيخ</strong><small>محامٍ وموثق</small></span>
        </Link>
        <Link className="privacy-back" to="/">العودة إلى الرئيسية</Link>
      </header>

      <main className="privacy-content">
        <div className="privacy-intro">
          <p>الخصوصية والسرية</p>
          <h1>سياسة الخصوصية</h1>
          <span>آخر تحديث: 1 سبتمبر 2026</span>
        </div>

        <div className="privacy-body">
          <section>
            <h2>المعلومات التي نجمعها</h2>
            <p>يقتصر جمع المعلومات على ما ترسله طوعاً عبر نموذج التواصل، مثل الاسم ورقم الجوال وموضوع الاستشارة وملخص الحالة.</p>
          </section>
          <section>
            <h2>استخدام المعلومات</h2>
            <p>تُستخدم المعلومات للتواصل معك وفهم طلبك وتحديد إمكانية تقديم الخدمة القانونية المناسبة، ولا تُباع بياناتك أو تُستخدم لأغراض تسويقية غير مرتبطة بطلبك.</p>
          </section>
          <section>
            <h2>المشاركة والحفظ</h2>
            <p>يُنقل نموذج التواصل إلى واتساب عند الإرسال، فتخضع الرسالة أيضاً لسياسات واتساب. تُعامل المعلومات بسرية، ولا تُشارك إلا عند الحاجة النظامية أو المهنية.</p>
          </section>
          <section>
            <h2>تنبيه مهني</h2>
            <p>إرسال المعلومات لا ينشئ علاقة محامٍ بموكل، ولا يُعد قبولاً للحالة، حتى يتم الاتفاق الصريح بين الطرفين.</p>
          </section>
          <section>
            <h2>التواصل</h2>
            <p>لطلب الاستفسار عن بياناتك أو تصحيحها أو حذفها، تواصل عبر البريد الإلكتروني الظاهر في الموقع.</p>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Privacy
