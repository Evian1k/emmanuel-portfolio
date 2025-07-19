// lang.js
(function() {
  const langToggle = document.getElementById('lang-toggle');
  const translations = {
    sw: {
      nav_home: 'Nyumbani',
      nav_about: 'Kuhusu',
      nav_projects: 'Miradi',
      nav_contact: 'Mawasiliano',
      hero_hi: 'Habari, mimi ni',
      hero_role: 'Mtaalamu wa Programu',
      hero_msg: 'Mbunifu wa Tovuti Anayejenga Uzoefu Mzuri na Wenye Kazi.',
      download_cv: 'Pakua CV',
      hire_me: 'Niandike Kazi',
      testimonials_title: 'Ushuhuda',
      about_title: 'Kuhusu Mimi',
      about_bio: 'Mimi ni Emmanuel Evian, mtaalamu wa programu mwenye ubunifu na shauku ya kujenga programu za wavuti zenye ufanisi na uzuri. Nimebobea katika HTML, CSS, JavaScript, React, Python, na Vite. Napenda kutatua matatizo halisi na kujenga bidhaa za kidijitali zinazofaa na kufurahisha kutumia.',
      skills_title: 'Ujuzi Wangu',
      projects_title: 'Miradi Yangu',
      contact_title: 'Wasiliana Nami',
      contact_name: 'Jina',
      contact_email: 'Barua Pepe',
      contact_message: 'Ujumbe',
      contact_send: 'Tuma',
    },
    en: {}
  };
  let currentLang = localStorage.getItem('lang') || 'en';
  function setLang(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (lang !== 'en' && translations[lang][key]) {
        el.textContent = translations[lang][key];
      } else if (translations['en'][key]) {
        el.textContent = translations['en'][key];
      } else {
        el.textContent = el.dataset.default || el.textContent;
      }
    });
    localStorage.setItem('lang', lang);
    currentLang = lang;
  }
  if (langToggle) {
    langToggle.addEventListener('click', function() {
      setLang(currentLang === 'en' ? 'sw' : 'en');
    });
  }
  // On load
  setLang(currentLang);
})();