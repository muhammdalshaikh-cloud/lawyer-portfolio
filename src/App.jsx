import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import LanguageSwitcher from './components/LanguageSwitcher'

// Smooth scroll behavior
if (typeof window !== 'undefined') {
  document.documentElement.style.scrollBehavior = 'smooth'
}

function App() {
  const { t, i18n } = useTranslation()
  const [showCaseForm, setShowCaseForm] = useState(false)
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)
  const [showLicenseModal, setShowLicenseModal] = useState(false)
  const [isAtHero, setIsAtHero] = useState(true)
  const [activeFAQ, setActiveFAQ] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    identity: '',
    workplace: '',
    jobTitle: '',
    salary: '',
    startDate: '',
    endDate: '',
    workCity: '',
    reasonForLeaving: '',
    hasWrittenContract: '',
    isContractOfficial: '',
    delayedSalary: '',
    delayedSalaryDetails: '',
    vacationBalance: '',
    vacationDays: '',
    vacationDaysUsed: '',
    description: ''
  })

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero')
      if (heroSection) {
        const heroBottom = heroSection.offsetHeight
        setIsAtHero(window.scrollY < heroBottom)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Build WhatsApp message
    const message = `
*طلب تولي قضيتي العمالية*

*البيانات الشخصية:*
الاسم: ${formData.name}
البريد الإلكتروني: ${formData.email}
رقم الجوال: ${formData.phone}
رقم الهوية: ${formData.identity}

*بيانات العمل:*
جهة العمل: ${formData.workplace}
المسمى الوظيفي: ${formData.jobTitle}
الراتب الشهري: ${formData.salary}
تاريخ بدء العمل: ${formData.startDate}
تاريخ انتهاء العمل: ${formData.endDate || 'لم ينته'}
مدينة العمل: ${formData.workCity}
سبب ترك العمل: ${formData.reasonForLeaving || 'لم يترك'}

*معلومات العقد:*
هل يوجد عقد عمل مكتوب؟: ${formData.hasWrittenContract}
هل العقد إلكتروني؟: ${formData.isContractOfficial}

*الأجور والإجازات:*
الأجور المتأخرة: ${formData.delayedSalary}
${formData.delayedSalaryDetails ? 'تفاصيل الأجور المتأخرة: ' + formData.delayedSalaryDetails : ''}
رصيد الإجازات السنوية: ${formData.vacationBalance}
${formData.vacationDays ? 'عدد أيام الإجازة المستحقة: ' + formData.vacationDays : ''}
${formData.vacationDaysUsed ? 'عدد أيام الإجازة التي خرجتها: ' + formData.vacationDaysUsed : ''}

*وصف القضية:*
${formData.description}
    `.trim()

    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(message)
    const whatsappURL = `https://wa.me/966576608505?text=${encodedMessage}`
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank')
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      identity: '',
      workplace: '',
      jobTitle: '',
      salary: '',
      startDate: '',
      endDate: '',
      workCity: '',
      reasonForLeaving: '',
      hasWrittenContract: '',
      isContractOfficial: '',
      delayedSalary: '',
      delayedSalaryDetails: '',
      vacationBalance: '',
      vacationDays: '',
      vacationDaysUsed: '',
      description: ''
    })
    
    setShowCaseForm(false)
    alert('تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً.')
  }

  return (
    <div className="app" lang={i18n.language} dir={i18n.language === 'en' ? 'ltr' : 'rtl'}>
      <LanguageSwitcher />
      <div className="gold-line"></div>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="gold-line" style={{marginBottom: '20px'}}></div>
        <div className="hero-content">
          <h1 style={{color: 'white'}}>{t('hero.title')}</h1>
          <p style={{color: '#d4af37'}}>{t('hero.subtitle')}</p>
        </div>
      </section>
      <div className="gold-line"></div>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>{t('about.title')}</h2>
          
          <div className="about-intro">
            <div className="intro-header">
              <h3 className="intro-title">{t('about.intro_title')}</h3>
              <p className="intro-subtitle">{t('about.intro_subtitle')}</p>
            </div>
            
            <p className="intro-text">
              {t('about.description')}
            </p>
            
            <div className="stats">
              <div className="stat">
                <h4>100+</h4>
                <p>{t('stats.cases')}</p>
              </div>
              <div className="stat">
                <h4>100+</h4>
                <p>{t('stats.consultations')}</p>
              </div>
              <div className="stat">
                <h4>100%</h4>
                <p>{t('stats.commitment')}</p>
              </div>
            </div>

            <div className="verification-link">
              <p>🔐 <strong>{t('stats.verification')}</strong></p>
              <a href="https://eservice.sba.gov.sa/lawyers?search=%D9%85%D8%AD%D9%85%D8%AF+%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%88%D8%A7%D8%AD%D8%AF+%D8%A8%D9%86+%D8%A7%D8%AD%D9%85%D8%AF+%D8%A2%D9%84+%D8%A7%D9%84%D8%B4%D9%8A%D8%AE" target="_blank" rel="noopener noreferrer" className="sba-verification-btn">
                {t('stats.verificationLink')}
              </a>
            </div>

            {/* License Image */}
            <div className="license-image-section">
              <img 
                src="/lawyer_license.png" 
                alt="رخصة المحاماة" 
                className="license-image"
                onClick={() => setShowLicenseModal(true)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>

        </div>
      </section>


      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <h2>{t('nav.services')}</h2>
          <div className="services-grid">
            <div className="service-card" onClick={() => setShowCaseForm(true)}>
              <h3>{t('services.service1_title')}</h3>
              <p>{t('services.service1_desc')}</p>
            </div>
            <a href="https://wa.me/966576608505?text=أرغب في التواصل معك بخصوص خدمة قانونية أخرى" target="_blank" rel="noopener noreferrer" className="service-card service-card-link">
              <h3>{t('services.service2_title')}</h3>
              <p>{t('services.service2_desc')}</p>
            </a>
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="container">
          <h2>{t('faq.title')}</h2>
          <div className="faq-list">
            {[
              {
                question: t('faq.q1'),
                answer: t('faq.a1')
              },
              {
                question: t('faq.q2'),
                answer: t('faq.a2')
              },
              {
                question: t('faq.q3'),
                answer: t('faq.a3')
              },
              {
                question: t('faq.q4'),
                answer: t('faq.a4')
              }
            ].map((item, index) => (
              <div key={index} className="faq-item">
                <h3 onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}>
                  {item.question}
                </h3>
                {activeFAQ === index && <p>{item.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>{t('nav.contact')}</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <h3>{t('contact.methods')}</h3>
              <div className="contact-methods">
                <div className="contact-method">
                  <h4>{t('contact.email')}</h4>
                  <a href="mailto:muhammd.alshaikh@gmail.com">muhammd.alshaikh@gmail.com</a>
                </div>
                <div className="contact-method">
                  <h4>{t('contact.phone')}</h4>
                  <a href="tel:+966576608505">0576608505</a>
                </div>
                <div className="contact-method">
                  <h4>{t('contact.whatsapp')}</h4>
                  <a href="https://wa.me/966576608505?text=أرغب في التواصل معك بخصوص استشارة قانونية" target="_blank" rel="noopener noreferrer">{t('contact.whatsapp')}</a>
                </div>
                <div className="contact-method">
                  <h4>{t('contact.x')}</h4>
                  <a href="https://x.com/MOHAMMEDstwi" target="_blank" rel="noopener noreferrer">@MOHAMMEDstwi</a>
                </div>
              </div>
            </div>
            <div className="contact-location">
              <br />
              <h3>{t('contact.location')}</h3>
              <p>{t('contact.address')}</p>
              <div style={{ marginTop: '30px' }} className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.8897457891487!2d50.0495014!3d26.4882261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49ffb2923304e7:0x7a7abb7c8026a8a4!2z-YXZiNmE2Yog2YXZhNmK2LnZiNin!5e0!3m2!1sar!2ssa!4v1716437400000"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Form Modal */}
      {showCaseForm && (
        <div className="case-form-modal" onClick={() => setShowCaseForm(false)}>
          <div className="case-form-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowCaseForm(false)}>✕</button>
            <h2>طلب تولي قضيتي العمالية</h2>
            <form onSubmit={handleSubmit} className="case-form">
              <div className="form-group">
                <label>الاسم الكامل *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>البريد الإلكتروني *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>رقم الجوال *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>رقم الهوية *</label>
                <input type="text" name="identity" value={formData.identity} onChange={handleInputChange} required />
              </div>
              
              <h3 style={{marginTop: '20px', marginBottom: '10px'}}>بيانات العمل</h3>
              
              <div className="form-group">
                <label>جهة العمل *</label>
                <input type="text" name="workplace" value={formData.workplace} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>المسمى الوظيفي *</label>
                <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>الراتب الشهري *</label>
                <input type="text" name="salary" value={formData.salary} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>تاريخ بدء العمل *</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>تاريخ انتهاء العمل</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>مدينة العمل *</label>
                <input type="text" name="workCity" value={formData.workCity} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>سبب ترك العمل</label>
                <input type="text" name="reasonForLeaving" value={formData.reasonForLeaving} onChange={handleInputChange} />
              </div>
              
              <h3 style={{marginTop: '20px', marginBottom: '10px'}}>معلومات العقد</h3>
              
              <div className="form-group">
                <label>هل يوجد عقد عمل مكتوب؟ *</label>
                <select name="hasWrittenContract" value={formData.hasWrittenContract} onChange={handleInputChange} required>
                  <option value="">اختر...</option>
                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>
              </div>
              <div className="form-group">
                <label>هل العقد إلكتروني؟ *</label>
                <select name="isContractOfficial" value={formData.isContractOfficial} onChange={handleInputChange} required>
                  <option value="">اختر...</option>
                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>
              </div>
              
              <h3 style={{marginTop: '20px', marginBottom: '10px'}}>الأجور والإجازات</h3>
              
              <div className="form-group">
                <label>الأجور المتأخرة *</label>
                <select name="delayedSalary" value={formData.delayedSalary} onChange={handleInputChange} required>
                  <option value="">اختر...</option>
                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>
              </div>
              {formData.delayedSalary === 'نعم' && (
                <div className="form-group">
                  <label>تفاصيل الأجور المتأخرة</label>
                  <input type="text" name="delayedSalaryDetails" value={formData.delayedSalaryDetails} onChange={handleInputChange} placeholder="مثال: 3 أشهر" />
                </div>
              )}
              
              <div className="form-group">
                <label>رصيد الإجازات السنوية *</label>
                <select name="vacationBalance" value={formData.vacationBalance} onChange={handleInputChange} required>
                  <option value="">اختر...</option>
                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>
              </div>
              {formData.vacationBalance === 'نعم' && (
                <>
                  <div className="form-group">
                    <label>عدد أيام الإجازة المستحقة</label>
                    <input type="number" name="vacationDays" value={formData.vacationDays} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>عدد أيام الإجازة التي خرجتها</label>
                    <input type="number" name="vacationDaysUsed" value={formData.vacationDaysUsed} onChange={handleInputChange} />
                  </div>
                </>
              )}
              
              <div className="form-group">
                <label>وصف القضية *</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="5"></textarea>
              </div>
              
              <button type="submit" className="submit-btn">إرسال الطلب عبر الواتس آب</button>
            </form>
          </div>
        </div>
      )}

      {/* License Modal */}
      {showLicenseModal && (
        <div className="license-modal" onClick={() => setShowLicenseModal(false)}>
          <div className="license-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowLicenseModal(false)}>✕</button>
            <img src="/lawyer_license.png" alt="رخصة المحاماة" />
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="privacy-modal" onClick={() => setShowPrivacyPolicy(false)}>
          <div className="privacy-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowPrivacyPolicy(false)}>✕</button>
            <h2>{t('privacy.title')}</h2>
            <div className="privacy-content">
              <h3>{t('privacy.section1_title')}</h3>
              <p>{t('privacy.section1_text')}</p>
              
              <h3>{t('privacy.section2_title')}</h3>
              <p>{t('privacy.section2_text')}</p>
              
              <h3>{t('privacy.section3_title')}</h3>
              <p>{t('privacy.section3_text')}</p>
              
              <h3>{t('privacy.section4_title')}</h3>
              <p>{t('privacy.section4_text')}</p>
              
              <h3>{t('privacy.section5_title')}</h3>
              <p>{t('privacy.section5_intro')}</p>
              <ul>
                <li>{t('privacy.section5_a')}</li>
                <li>{t('privacy.section5_b')}</li>
                <li>{t('privacy.section5_c')}</li>
                <li>{t('privacy.section5_d')}</li>
                <li>{t('privacy.section5_e')}</li>
              </ul>
              
              <h3>{t('privacy.section6_title')}</h3>
              <p>{t('privacy.section6_intro')}</p>
              <ul>
                <li>{t('privacy.section6_a')}</li>
                <li>{t('privacy.section6_b')}</li>
              </ul>
              
              <h3>{t('privacy.section7_title')}</h3>
              <ul>
                <li>{t('privacy.section7_a')}</li>
                <li>{t('privacy.section7_b')}</li>
              </ul>
              
              <h3>{t('privacy.section8_title')}</h3>
              <p>{t('privacy.section8_intro')}</p>
              <ul>
                <li><strong>{t('privacy.section8_a_title')}</strong> {t('privacy.section8_a_text')}</li>
                <li><strong>{t('privacy.section8_b_title')}</strong> {t('privacy.section8_b_text')}</li>
                <li><strong>{t('privacy.section8_c_title')}</strong> {t('privacy.section8_c_text')}</li>
                <li><strong>{t('privacy.section8_d_title')}</strong> {t('privacy.section8_d_text')}</li>
                <li><strong>{t('privacy.section8_e_title')}</strong> {t('privacy.section8_e_text')}</li>
                <li><strong>{t('privacy.section8_f_title')}</strong> {t('privacy.section8_f_text')}</li>
              </ul>
              <p>{t('privacy.section8_footer')}</p>
              
              <h3>{t('privacy.section9_title')}</h3>
              <p>{t('privacy.section9_text')}</p>
              
              <p><small>{t('privacy.lastUpdate')}</small></p>
              <p><small>{t('privacy.noUpdates')}</small></p>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/966576608505?text=أرغب في التواصل معك بخصوص استشارة قانونية" target="_blank" rel="noopener noreferrer" className="whatsapp-float">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.347l-.355.202-.368-.067c-1.264-.233-2.477-.571-3.644-1.111l-.42-.201-.422.224c-.663.35-1.296.805-1.857 1.383-.192.192-.385.384-.57.576-.528.553-.968 1.554-.968 2.529 0 .982.44 2.02.968 2.846.528.826 1.295 1.663 2.228 2.293.934.631 2.01 1.1 3.181 1.366 1.17.266 2.42.338 3.59.271 1.17-.066 2.213-.303 3.256-.754 1.042-.45 2.06-1.057 2.927-1.88.867-.822 1.56-1.86 1.998-2.966.438-1.107.64-2.279.64-3.548 0-1.268-.202-2.44-.64-3.547-.438-1.108-1.13-2.146-1.998-2.968-.867-.823-1.885-1.43-2.927-1.88-1.042-.451-2.085-.688-3.256-.754-.572-.034-1.142-.034-1.714 0z"/>
        </svg>
      </a>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>{t('footer.rights')}</p>
          <button 
            onClick={() => setShowPrivacyPolicy(true)}
            className="privacy-link"
          >
            {t('privacy.title')}
          </button>
        </div>
      </footer>
    </div>
  )
}

export default App
