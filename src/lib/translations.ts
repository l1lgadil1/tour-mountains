export const translations = {
  ru: {
    title: "Горные туры Алматы",
    subtitle: "Откройте для себя красоту казахских гор",
    bookWhatsApp: "Забронировать через WhatsApp",
    nextTour: "Ближайший тур",
    daysLeft: "дней осталось",
    hoursLeft: "часов осталось",
    minutesLeft: "минут осталось",
    duration: (count: number) => {
      if (count === 1) return `${count} день`
      if (count >= 2 && count <= 4) return `${count} дня`
      return `${count} дней`
    },
    from: "от",
    tenge: "₸",
    aboutUs: "О нас",
    aboutText: "Мы — команда профессиональных гидов, которые любят горы и хотят поделиться этой любовью с вами. Наш опыт и знание местности гарантируют безопасные и незабываемые путешествия.",
    ourTours: "Наши туры",
    whatsappMessage: (tourName: string) => `Привет! Меня интересует тур "${tourName}". Хотел бы узнать подробности.`,
    loading: "Загрузка...",
    error: "Произошла ошибка при загрузке туров",
    recommended: "Рекомендуем",
    days: "дней",
    hours: "часов",
    minutes: "минут",
    seconds: "секунд",
    bookNow: "Забронировать сейчас",
    yearsExperience: "лет опыта",
    happyTourists: "довольных туристов",
    routes: "маршрутов",
    professionalTours: "Профессиональные горные туры"
  },
  kz: {
    title: "Алматы тау турлары",
    subtitle: "Қазақ тауларының сұлулығын ашыңыз",
    bookWhatsApp: "WhatsApp арқылы брондау",
    nextTour: "Келесі тур",
    daysLeft: "күн қалды",
    hoursLeft: "сағат қалды",
    minutesLeft: "минут қалды",
    duration: (count: number) => `${count} күн`,
    from: "бастап",
    tenge: "₸",
    aboutUs: "Біз туралы",
    aboutText: "Біз тауларды жақсы көретін және бұл сүйіспеншілікті сізбен бөлісуді қалайтын кәсіби гидтердің командасымыз. Біздің тәжірибеміз бен жер танудың кепілдігі қауіпсіз және есте қаларлық саяхаттарды қамтамасыз етеді.",
    ourTours: "Біздің турларымыз",
    whatsappMessage: (tourName: string) => `Сәлем! Мені "${tourName}" туры қызықтырады. Егжей-тегжейлерін білгім келеді.`,
    loading: "Жүктелуде...",
    error: "Турларды жүктеу кезінде қате пайда болды",
    recommended: "Ұсынамыз",
    days: "күн",
    hours: "сағат",
    minutes: "минут",
    seconds: "секунд",
    bookNow: "Қазір брондау",
    yearsExperience: "жыл тәжірибе",
    happyTourists: "қанағаттанған турист",
    routes: "маршрут",
    professionalTours: "Кәсіби тау турлары"
  }
} as const

export type Locale = keyof typeof translations
export type Translation = typeof translations[Locale]