import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import '../styles/LanguageSwitcher.css'

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang)
    
    // Navigate to the language-specific path
    if (lang === 'ar') {
      navigate('/ar')
    } else if (lang === 'en') {
      navigate('/en')
    } else if (lang === 'ur') {
      navigate('/ur')
    }
  }

  return (
    <div className="language-switcher">
      <button 
        className={`lang-btn ${i18n.language === 'ar' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('ar')}
      >
        العربية
      </button>
      <span className="separator">|</span>
      <button 
        className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('en')}
      >
        English
      </button>
      <span className="separator">|</span>
      <button 
        className={`lang-btn ${i18n.language === 'ur' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('ur')}
      >
        اردو
      </button>
    </div>
  )
}

export default LanguageSwitcher
