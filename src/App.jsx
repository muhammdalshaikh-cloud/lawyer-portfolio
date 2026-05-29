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
    <div className="app">
      <LanguageSwitcher />
      {/* Navigation */}
      <nav className={`navbar ${!isAtHero ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-content">
            <a href="#hero" className="nav-link">{t('nav.home')}</a>
            <a href="#about" className="nav-link">{t('nav.about')}</a>
            <a href="#services" className="nav-link">{t('nav.services')}</a>
            <a href="#contact" className="nav-link">{t('nav.contact')}</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-content">
          <h1 style={{color: 'white'}}>{t('hero.title')}</h1>
          <p style={{color: '#d4af37'}}>{t('hero.subtitle')}</p>
        </div>
      </section>

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

      {/* FAQ Section */}
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
              <h3>طرق التواصل</h3>
              <div className="contact-methods">
                <div className="contact-method">
                  <h4>البريد الإلكتروني</h4>
                  <a href="mailto:muhammd.alshaikh@gmail.com">muhammd.alshaikh@gmail.com</a>
                </div>
                <div className="contact-method">
                  <h4>الجوال</h4>
                  <a href="tel:+966576608505">0576608505</a>
                </div>
                <div className="contact-method">
                  <h4>الواتس آب</h4>
                  <a href="https://wa.me/966576608505?text=أرغب في التواصل معك بخصوص استشارة قانونية" target="_blank" rel="noopener noreferrer">تواصل عبر الواتس آب</a>
                </div>
                <div className="contact-method">
                  <h4>اكس (X)</h4>
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
    </div>
  )
}

export default App
