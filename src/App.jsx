import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './components/LanguageSwitcher'
import './App.css'

const contact = {
  phone: '0576608505',
  whatsapp: '966576608505',
  email: 'muhammd.alshaikh@gmail.com',
}

function MarkIcon({ name }) {
  const paths = {
    estate: <><path d="M4 20h16M6 17V8l6-4 6 4v9M9 17v-5h6v5" /><path d="M12 4v8M6 8h12" /></>,
    waqf: <><path d="M5 20h14M7 20V9h10v11M5 9h14M8 9V6h8v3M10 6V3h4v3" /><path d="M10 13h4M10 16h4" /></>,
    will: <><path d="M6 3h9l3 3v15H6zM15 3v4h4M9 11h6M9 15h6" /><path d="m9 19 2-1 4-4" /></>,
    scale: <><path d="M12 3v18M7 21h10M5 7h14M7 7l-3 6h6L7 7Zm10 0-3 6h6l-3-6Z" /></>,
    arrow: <path d="m9 18 6-6-6-6M15 12H3" />,
    phone: <path d="M6.6 3.8 9 8 7.4 9.6c1.1 2.4 2.9 4.2 5.3 5.3l1.6-1.6 4.2 2.4-.8 3.1c-.2.8-.9 1.3-1.7 1.3C9.3 19.6 4.4 14.7 3.9 8c-.1-.8.5-1.5 1.3-1.7l1.4-2.5Z" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>
}

function App() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', service: 'estate', summary: '' })
  const isEnglish = i18n.language === 'en'
  const direction = isEnglish ? 'ltr' : 'rtl'
  const services = t('services.items', { returnObjects: true })
  const credentials = t('credentials.items', { returnObjects: true })
  const process = t('process.items', { returnObjects: true })

  useEffect(() => {
    document.documentElement.lang = i18n.language
    document.documentElement.dir = direction
    document.title = t('meta.title')
  }, [direction, i18n.language, t])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const selectedService = t(`contact.serviceOptions.${formData.service}`)
    const message = [
      t('contact.messageTitle'),
      `${t('contact.fields.name')}: ${formData.name}`,
      `${t('contact.fields.phone')}: ${formData.phone}`,
      `${t('contact.fields.service')}: ${selectedService}`,
      `${t('contact.fields.summary')}: ${formData.summary}`,
    ].join('\n')

    window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="app" dir={direction}>
      <header className="site-header">
        <button className="brand" onClick={() => scrollTo('hero')} aria-label={t('nav.home')}>
          <img src="/logo.svg" alt={t('brand.logoAlt')} />
          <span className="brand-copy">
            <strong>{t('brand.name')}</strong>
            <small>{t('brand.role')}</small>
          </span>
        </button>

        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label={t('nav.label')}>
          <button onClick={() => scrollTo('about')}>{t('nav.about')}</button>
          <button onClick={() => scrollTo('services')}>{t('nav.services')}</button>
          <button onClick={() => scrollTo('credentials')}>{t('nav.credentials')}</button>
          <button onClick={() => scrollTo('contact')}>{t('nav.contact')}</button>
        </nav>

        <div className="header-tools">
          <LanguageSwitcher />
          <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label={t('nav.menu')} aria-expanded={menuOpen}>
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="hero">
          <div className="hero-copy reveal reveal-1">
            <div className="eyebrow"><span />{t('hero.eyebrow')}</div>
            <h1>{t('hero.title')} <em>{t('hero.highlight')}</em></h1>
            <p className="hero-lead">{t('hero.subtitle')}</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => scrollTo('contact')}>
                {t('hero.primaryCta')} <MarkIcon name="arrow" />
              </button>
              <button className="text-button" onClick={() => scrollTo('about')}>{t('hero.secondaryCta')}</button>
            </div>
            <div className="hero-proof">
              <span>{t('hero.proofOne')}</span>
              <span>{t('hero.proofTwo')}</span>
              <span>{t('hero.proofThree')}</span>
            </div>
          </div>

          <div className="hero-art reveal reveal-2" aria-hidden="true">
            <div className="inheritance-orbit">
              <div className="orbit-ring ring-one" />
              <div className="orbit-ring ring-two" />
              <div className="share share-one"><span>1/2</span></div>
              <div className="share share-two"><span>1/3</span></div>
              <div className="share share-three"><span>1/6</span></div>
              <div className="orbit-center">
                <img src="/favicon.svg" alt="" />
              </div>
            </div>
            <div className="art-caption">
              <span>{t('hero.artLabel')}</span>
              <strong>{t('hero.artTitle')}</strong>
            </div>
          </div>
        </section>

        <section className="specialty-band" aria-label={t('services.title')}>
          <span>{t('services.items.0.title')}</span><i />
          <span>{t('services.items.1.title')}</span><i />
          <span>{t('services.items.2.title')}</span>
        </section>

        <section className="about section" id="about">
          <div className="section-heading">
            <span className="section-number">01</span>
            <div>
              <p>{t('about.kicker')}</p>
              <h2>{t('about.title')}</h2>
            </div>
          </div>

          <div className="about-grid">
            <div className="about-statement">
              <span className="quote-mark">”</span>
              <p>{t('about.statement')}</p>
            </div>
            <div className="about-body">
              <p>{t('about.paragraphOne')}</p>
              <p>{t('about.paragraphTwo')}</p>
              <div className="about-signature">
                <strong>{t('brand.name')}</strong>
                <span>{t('brand.role')}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="section-heading light">
            <span className="section-number">02</span>
            <div>
              <p>{t('services.kicker')}</p>
              <h2>{t('services.title')}</h2>
            </div>
          </div>

          <div className="services-grid">
            {Array.isArray(services) && services.map((service, index) => (
              <article className={`service-card service-${index + 1}`} key={service.title}>
                <div className="service-topline">
                  <span>0{index + 1}</span>
                  <MarkIcon name={['estate', 'waqf', 'will'][index]} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="process section" id="process">
          <div className="process-intro">
            <div className="section-heading compact">
              <span className="section-number">03</span>
              <div>
                <p>{t('process.kicker')}</p>
                <h2>{t('process.title')}</h2>
              </div>
            </div>
            <p>{t('process.description')}</p>
          </div>
          <div className="process-list">
            {Array.isArray(process) && process.map((item, index) => (
              <div className="process-item" key={item.title}>
                <span>0{index + 1}</span>
                <div><h3>{item.title}</h3><p>{item.description}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="credentials section" id="credentials">
          <div className="credentials-copy">
            <div className="section-heading compact light">
              <span className="section-number">04</span>
              <div>
                <p>{t('credentials.kicker')}</p>
                <h2>{t('credentials.title')}</h2>
              </div>
            </div>
            <p>{t('credentials.description')}</p>
            <div className="license-seal"><MarkIcon name="scale" /><span>{t('credentials.license')}</span></div>
          </div>
          <div className="credentials-list">
            {Array.isArray(credentials) && credentials.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{item.title}</h3><p>{item.description}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-copy">
            <div className="eyebrow"><span />{t('contact.kicker')}</div>
            <h2>{t('contact.title')}</h2>
            <p>{t('contact.description')}</p>
            <div className="direct-contact">
              <a href={`tel:${contact.phone}`}><MarkIcon name="phone" /><span>{contact.phone}</span></a>
              <a href={`mailto:${contact.email}`}><MarkIcon name="mail" /><span>{contact.email}</span></a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              <span>{t('contact.fields.name')}</span>
              <input required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
            </label>
            <label>
              <span>{t('contact.fields.phone')}</span>
              <input required type="tel" inputMode="tel" value={formData.phone} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} />
            </label>
            <label className="full-field">
              <span>{t('contact.fields.service')}</span>
              <select value={formData.service} onChange={(event) => setFormData({ ...formData, service: event.target.value })}>
                <option value="estate">{t('contact.serviceOptions.estate')}</option>
                <option value="waqf">{t('contact.serviceOptions.waqf')}</option>
                <option value="will">{t('contact.serviceOptions.will')}</option>
              </select>
            </label>
            <label className="full-field">
              <span>{t('contact.fields.summary')}</span>
              <textarea required rows="4" value={formData.summary} onChange={(event) => setFormData({ ...formData, summary: event.target.value })} />
            </label>
            <button className="primary-button full-field" type="submit">
              {t('contact.submit')} <MarkIcon name="arrow" />
            </button>
            <p className="form-note full-field">{t('contact.note')}</p>
          </form>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <img src="/logo.svg" alt={t('brand.logoAlt')} />
          <span><strong>{t('brand.name')}</strong><small>{t('brand.role')}</small></span>
        </div>
        <p>{t('footer.description')}</p>
        <span>© 2026 {t('brand.name')}. {t('footer.rights')}</span>
      </footer>
    </div>
  )
}

export default App
