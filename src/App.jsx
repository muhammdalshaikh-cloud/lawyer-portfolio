import { useState, useEffect } from 'react'
import './App.css'

// Smooth scroll behavior
if (typeof window !== 'undefined') {
  document.documentElement.style.scrollBehavior = 'smooth'
}

function App() {
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
      {/* Navigation */}
      <nav className={`navbar ${!isAtHero ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-content">
            <a href="#hero" className="nav-link">الرئيسية</a>
            <a href="#about" className="nav-link">نبذة عنا</a>
            <a href="#services" className="nav-link">خدماتنا</a>
            <a href="#contact" className="nav-link">تواصل معنا</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-content">
          <h1 style={{color: 'white'}}>المحامي/ محمد آل الشيخ</h1>
          <p style={{color: '#d4af37'}}>محامي عمالي</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>نبذة عن المحامي / محمد آل الشيخ</h2>
          
          <div className="about-intro">
            <div className="intro-header">
              <h3 className="intro-title">محامي متخصص في القضايا العمالية</h3>
              <p className="intro-subtitle">خبرة واسعة في تمثيل الموظفين والعمال في المملكة العربية السعودية</p>
            </div>
            
            <p className="intro-text">
              محامٍ سعودي مرخص من وزارة العدل، ومعتمد مهنيًا من الهيئة السعودية للمحامين، متخصص بشكل كامل في مجال القانون العمالي. تولى عدد كبير من القضايا العمالية المعقدة ضد كبريات الشركات والبنوك والمؤسسات في المملكة العربية السعودية. يقدم خدمات قانونية متكاملة للموظفين والعمال الذين يواجهون نزاعات عمالية، سواء كانت قضايا فصل تعسفي، عدم دفع الأجور، أو المطالبة بحقوقهم القانونية الكاملة.
            </p>
            
            <div className="stats">
              <div className="stat">
                <h4>100+</h4>
                <p>قضية عمالية معقدة</p>
              </div>
              <div className="stat">
                <h4>100+</h4>
                <p>استشارة قانونية عمالية</p>
              </div>
              <div className="stat">
                <h4>100%</h4>
                <p>التزام بحقوق الموظف والعامل</p>
              </div>
            </div>

            <div className="verification-link">
              <p>🔐 <strong>تحقق من موثوقيتنا:</strong></p>
              <a href="https://eservice.sba.gov.sa/lawyers?search=%D9%85%D8%AD%D9%85%D8%AF+%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D9%88%D8%A7%D8%AD%D8%AF+%D8%A8%D9%86+%D8%A7%D8%AD%D9%85%D8%AF+%D8%A2%D9%84+%D8%A7%D9%84%D8%B4%D9%8A%D8%AE" target="_blank" rel="noopener noreferrer" className="sba-verification-btn">
                التحقق من ملفنا في الهيئة السعودية للمحامين
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
          <h2>خدماتنا</h2>
          <div className="services-grid">
            <div className="service-card" onClick={() => setShowCaseForm(true)}>
              <h3>تولي قضيتي العمالية</h3>
              <p>نتولى قضيتك العمالية بكاملها من البداية إلى النهاية. قدم طلبك الآن وسنتواصل معك لحصر المطالبة والاتفاق على الأتعاب.</p>
            </div>
            <a href="https://wa.me/966576608505?text=أرغب في التواصل معك بخصوص خدمة قانونية أخرى" target="_blank" rel="noopener noreferrer" className="service-card service-card-link">
              <h3>خدمات قانونية أخرى</h3>
              <p>لطلب الخدمات القانونية الأخرى، تواصل عن طريق الـ WhatsApp</p>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="container">
          <h2>الأسئلة الشائعة</h2>
          <div className="faq-list">
            {[
              {
                question: 'هل إرسال (طلب تولي قضيتي العمالية) ينشئ أي التزام عليَّ؟',
                answer: 'مجرد إرسال الطلب لا ينشئ أي التزام، ولا ينشئ علاقة تعاقدية، وإنما هو بداية لعملية التفاوض ودراسة القضية، وسيتواصل معك المحامي لحصر المطالبة، والاتفاق على نطاق العمل والأتعاب، وعند الاتفاق يتم توقيع عقد محاماة تحدد فيه حقوق والتزامات كل طرف.'
              },
              {
                question: 'هل يلزم حضوري للمكتب لتوقيع العقد أو خلال مراحل سير القضية؟',
                answer: 'لا يلزم.'
              },
              {
                question: 'ما الذي تشمله خدمة (تولي قضيتي العمالية)؟',
                answer: 'تشمل الخدمة دراسة القضية، وحصر المطالبة، وتقديم طلب التسوية الودية لمكتب العمل المختص، وحضور الجلسات أمام مكتب العمل، وصياغة صحيفة الدعوى، ورفعها للمحكمة العمالية المختصة، ومتابعة قيدها، وحضور الجلسات القضائية، وتقديم المذكرات الجوابية، والاعتراض على حكم محكمة الدرجة الأولى بطريق الاستئناف حال وجدت حاجة ووجاهة لذلك، وتقديم الحكم النهائي أو محضر التسوية الودية لمحكمة التنفيذ المختصة، ومتابعة طلب التنفيذ حتى انتهائه.'
              },
              {
                question: 'كيف يتم تحديد الأتعاب؟',
                answer: 'نظرًا لطبيعة القضايا العمالية تحدد الأتعاب بدفعتين: الدفعة الأولى: مقدم رمزي قدره 500 - 1000 ⃁؛ بغرض التحقق من جدية القضية. الدفعة الثانية: مؤخر قدره 25% مما يستلمه الموكل للقضية التي يقل مبلغ المطالبة فيها عن 50,000 ⃁، و20% مما يستلمه الموكل للقضية التي يزيد مبلغ المطالبة فيها عن 50,000 ⃁.'
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
          <h2>تواصل معنا</h2>
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
              <h3>موقعنا</h3>
              <p>المملكة العربية السعودية، المنطقة الشرقية، سيهات</p>
              <div className="map-container">
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
                <input type="text" name="salary" value={formData.salary} onChange={handleInputChange} required placeholder="بيِّن الأجر الأساسي، والبدلات إن وجدت، وكذلك المميزات العينية إن وجدت" />
              </div>
              <div className="form-group">
                <label>تاريخ بدء العمل *</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>تاريخ انتهاء العمل (إن وجد)</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>مدينة العمل *</label>
                <input type="text" name="workCity" value={formData.workCity} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>سبب ترك العمل (إن وجد)</label>
                <input type="text" name="reasonForLeaving" value={formData.reasonForLeaving} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>هل يوجد عقد عمل مكتوب؟ *</label>
                <select name="hasWrittenContract" value={formData.hasWrittenContract} onChange={handleInputChange} required>
                  <option value="">اختر...</option>
                  <option value="نعم، وتوجد صورة من العقد عندي">نعم، وتوجد صورة من العقد عندي</option>
                  <option value="نعم، ولا توجد صورة من العقد عندي">نعم، ولا توجد صورة من العقد عندي</option>
                  <option value="لا">لا</option>
                </select>
              </div>
              {formData.hasWrittenContract !== 'لا' && (
              <div className="form-group">
                <label>هل العقد إلكتروني؟ {formData.hasWrittenContract === 'لا' ? '' : '*'}</label>
                <select name="isContractOfficial" value={formData.isContractOfficial} onChange={handleInputChange} required={formData.hasWrittenContract !== 'لا'}>
                  <option value="">اختر...</option>
                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>
              </div>
              )}
              <div className="form-group">
                <label>الأجور المتأخرة</label>
                <select name="delayedSalary" value={formData.delayedSalary} onChange={handleInputChange}>
                  <option value="">اختر...</option>
                  <option value="نعم">يوجد أجور متأخرة</option>
                  <option value="لا">لا يوجد أجور متأخرة</option>
                </select>
                {formData.delayedSalary === 'نعم' && (
                  <div className="form-group" style={{marginTop: '10px'}}>
                    <label>تفاصيل الأجور المتأخرة</label>
                    <input type="text" name="delayedSalaryDetails" value={formData.delayedSalaryDetails} onChange={handleInputChange} placeholder="مثال: شهر يناير 2024 و 15 يوم من فبراير 2024" />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>رصيد الإجازات السنوية *</label>
                <select name="vacationBalance" value={formData.vacationBalance} onChange={handleInputChange} required>
                  <option value="">اختر...</option>
                  <option value="yes-known">يوجد، وأعرف عدد الأيام المستحقة لي</option>
                  <option value="yes-unknown">يوجد، ولكن لا أعرف عدد الأيام المستحقة لي</option>
                  <option value="no">لا يوجد</option>
                </select>
                {formData.vacationBalance === 'yes-known' && (
                  <div className="form-group" style={{marginTop: '10px'}}>
                    <label>عدد أيام الإجازة المستحقة لي</label>
                    <input type="text" name="vacationDays" value={formData.vacationDays} onChange={handleInputChange} placeholder="مثال: 15 يوم لسنة 2024" />
                  </div>
                )}
                {formData.vacationBalance === 'yes-unknown' && (
                  <div className="form-group" style={{marginTop: '10px'}}>
                    <label>عدد أيام الإجازة التي خرجتها</label>
                    <input type="text" name="vacationDaysUsed" value={formData.vacationDaysUsed} onChange={handleInputChange} placeholder="مثال: 5 أيام في 2024" />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>وصف القضية / المشكلة *</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="5" placeholder="اشرح وقائع قضيتك، وبيِن مطالبك، وأي شيء ترغب من المحامي دراسته"></textarea>
              </div>
              <button type="submit" className="submit-btn">إرسال الطلب عبر الواتس آب</button>
            </form>
          </div>
        </div>
      )}

      {/* License Image Modal */}
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
            <h2>سياسة الخصوصية</h2>
            <div className="privacy-text">
              <h3>1- ما المقصود بالبيانات الشخصية؟</h3>
              <p>يقصد بالبيانات الشخصية كل بيان -مهما كان مصدره أو شكله- من شأنه أن يؤدي إلى معرفة الفرد على وجه التحديد، أو يجعل التعرف عليه ممكنًا بصفة مباشرة أو غير مباشرة.</p>
              
              <h3>2- ما هي البيانات الشخصية التي نقوم بجمعها ومعالجتها؟</h3>
              <p>نقوم بجمع ومعالجة البيانات الشخصية الإلزامية الآتية:</p>
              <p>الاسم، والهوية، ورقم الجوال، والبريد الإلكتروني، وعقد العمل، والعنوان الوطني، والبيانات اللازمة للسير في القضية.</p>
              
              <h3>3- كيف يتم جمع بياناتك الشخصية؟</h3>
              <p>جميع البيانات الشخصية التي نقوم بمعالجتها يتم الحصول عليها عن طريقك مباشرة.</p>
              
              <h3>4- كيف نستخدم بياناتك الشخصية وما الغرض من جمعها؟</h3>
              <p>نستخدم البيانات الشخصية التي تم جمعها للتواصل معك، وللقيام بالخدمات المطلوبة من قبلك. ونحيطكم بأن بياناتكم لن تعالج بصورة تتنافى مع الغرض من جمعها.</p>
              
              <h3>5- كيف نفصح عن بياناتك الشخصية وكيف نعالجها؟</h3>
              <p>لن نفصح عن بياناتك الشخصية لأي طرف آخر لأغراض التسويق المباشر.</p>
              <p>وقد نفصح عن بياناتك الشخصية مع الجهات الآتية:</p>
              <p><strong>أ-</strong> إذا كانت الجهة التي تطلب الإفصاح جهة عامة، وكان ذلك لأغراض المصلحة العامة أو لأغراض أمنية أو لتنفيذ أحكام الأنظمة أو لاستيفاء متطلبات قضائية.</p>
              <p><strong>ب-</strong> إذا كان الإفصاح سيقتصر على معالجتها لاحقاً بطريقة لا تؤدي إلى معرفة هويتك أو أي فرد آخر على وجه التحديد.</p>
              <p><strong>ج-</strong> إذا كان الإفصاح ضروريًا لتحقيق مصالح مشروعة لنا، ما لم يخل ذلك بحقوقك أو يتعارض مع مصالحك ولم تكن تلك البيانات بيانات حساسة.</p>
              <p><strong>د-</strong> جهات تقديم خدمات معالجة المدفوعات، والمؤسسات الأخرى التي نستخدمها لمعالجة مدفوعاتك.</p>
              <p><strong>هـ-</strong> مقدّمو الخدمات الخارجيون المستقلّون (بمن فيهم المتعاقدون من الباطن)؛ مثل وكلاء التحصيل.</p>
              
              <h3>6- المسوغات النظامية لجمع ومعالجة بياناتك الشخصية:</h3>
              <p>وفقاً لنظام حماية البيانات الشخصية، فإن المسوغ النظامي الذي نعتمد عليه لمعالجة بياناتك:</p>
              <p><strong>أ-</strong> موافقتك الصريحة، ويعد تقديمك للبيان موافقة صريحة منك، ويمكنك التواصل معنا عبر بيانات التواصل المدونة أدناه للعدول عن الموافقة في أي وقت على ألا يؤثر على عمليات المعالجة التي تتم بناءً على مسوغات نظامية أخرى.</p>
              <p><strong>ب-</strong> تنفيذًا لالتزام تعاقدي حسب العقد المبرم معكم.</p>
              
              <h3>7- كيف نقوم بتخزين وحفظ وإتلاف بياناتك الشخصية؟</h3>
              <p><strong>أ-</strong> يتم تخزين بياناتك الشخصية بشكل آمن وذلك لدى مقدم خدمات الحوسبة السحابية.</p>
              <p><strong>ب-</strong> نحتفظ ببياناتك الشخصية طوال علاقتك معنا، وطالما كان ذلك ضروريًا لتحقيق الغرض الذي تم جمعها لتحقيقه، ويعني هذا أنّه سيتم إتلاف البيانات ومحوها من أنظمتنا عندما لا تصبح مطلوبة، كما نحتفظ ببياناتك الشخصية طبقًا لنظام الدفاتر التجارية لمدة عشر سنوات من انتهاء العلاقة معك، وسنقوم بعد ذلك بالتخلص من هذه البيانات بطريقة آمنة لا يمكن من خلالها الاطلاع عليها أو استعادتها مرة أخرى، وذلك بشكل إلكتروني.</p>
              
              <h3>8- حقوقك فيما يتعلق بمعالجة بياناتك الشخصية:</h3>
              <p>بموجب نظام حماية البيانات الشخصية، فإن لديك الحقوق الآتية:</p>
              <p><strong>أ- الحق في العلم:</strong> يحق لك معرفة طرق جمعنا لبياناتك الشخصية والمسوغ النظامي لجمعها ومعالجتها، وكيفية معالجتها وحفظها وإتلافها ولمن سيتم الإفصاح عنها، ويمكنك الاطلاع على كافة التفاصيل من خلال سياسة الخصوصية أو يمكنك التواصل معنا عبر بيانات التواصل المدونة أدناه.</p>
              <p><strong>ب- الحق في الوصول إلى بياناتك الشخصية:</strong> يحق لك أن تطلب منا الاطلاع على بياناتك الشخصية، وذلك عن طريق التواصل معنا عبر بيانات التواصل المدونة أدناه.</p>
              <p><strong>ج- الحق في طلب الحصول على بياناتك الشخصية:</strong> يحق لك طلب الحصول على بياناتك الشخصية المتوفرة لدينا بصيغة مقروءة وواضحة متى ما كان ذلك ممكنًا.</p>
              <p><strong>د- الحق في تصحيح بياناتك الشخصية:</strong> يحق لك أن تطلب منا تصحيح بياناتك الشخصية التي ترى أنها غير دقيقة أو غير صحيحة أو غير مكتملة.</p>
              <p><strong>هـ- الحق في إتلاف بياناتك الشخصية:</strong> يحق لك أن تطلب منا إتلاف بياناتك الشخصية بما لا يتعارض مع المسوغات النظامية التي توجب حفظها، والقيود الواردة على الحق في الإتلاف حسب المادة الثامنة عشرة من نظام حماية البيانات الشخصية.</p>
              <p><strong>و- الحق في الرجوع عن موافقتك على معالجة بياناتك الشخصية:</strong> يحق لك الرجوع عن موافقتك على معالجة بياناتك الشخصية -في أي وقت- ما لم تكن هناك مسوغات نظامية تتطلب عكس ذلك، وبما لا يؤثر على تقديم الخدمات حسب العقد المبرم معكم.</p>
              <p>ما عدا ما هو منصوص عليه نظاماً، لن تكون مطالباً بدفع أي رسوم مقابل ممارسة هذه الحقوق، ويمكنك طلب ممارسة أي من هذه الحقوق عن طريق التواصل معنا عبر بيانات التواصل المدونة أدناه، وفي حال تم تقديم طلب لممارسة أي من هذه الحقوق، سيتم الرد عليك خلال مدة لا تتجاوز (ثلاثين) يومًا من تاريخ استلام الطلب كاملًا، علمًا أنه قد يتم تمديد المدة في حال تطلب التنفيذ جهدًا إضافيًا غير متوقع أو غير معتاد أو في حال تلقينا طلبات متعددة منك، وذلك بما لا يزيد على (ثلاثين) يومًا إضافية، وسيتم إشعارك مسبقًا بالتمديد ومبرراته.</p>
              <p>علمًا أنه يحق لنا في حال كان الطلب متكررًا بشكل غير مبرر أو يتطلب تنفيذه جهدًا غير عادي؛ عدم معالجة الطلب، على أن يكون ذلك مسببًا مع إشعارك بذلك.</p>
              
              <h3>9- كيف تتواصل معنا؟</h3>
              <p>يمكنك التواصل معنا عن طريق بيانات التواصل الموضحة في الموقع الإلكتروني.</p>
              
              <p style={{marginTop: '20px', fontSize: '14px', color: '#666'}}>تم إجراء آخر تحديث على سياسة الخصوصية بتاريخ 23-05-2026م، ويمكنك الاطلاع على سجل التحديثات أدناه:</p>
              <p style={{fontSize: '14px', color: '#666'}}>لا يوجد سجل تحديثات سابق.</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 المحامي محمد آل الشيخ. جميع الحقوق محفوظة.</p>
          <a className="privacy-link" onClick={() => setShowPrivacyPolicy(true)} style={{color: '#ffffff', cursor: 'pointer', textDecoration: 'underline'}}>سياسة الخصوصية</a>
        </div>
      </footer>
    </div>
  )
}

export default App
