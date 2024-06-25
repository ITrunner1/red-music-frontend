async function AboutUsPage() {
  return (
    <div className="flex flex-col items-center my-10">
      <div className="text-4xl max-sm:text-xl">
        Цель компании
      </div>
      <div className="text-2xl max-sm:text-sm my-4 text-center">
        Стать лидером в сфере музыкальных стриминговых сервисов, предоставляя качественную музыку для всех пользователей.
      </div>
      <div className="text-4xl max-sm:text-xl mt-4 mb-2">
        Ценность компании
      </div>
      <div className="text-2xl max-sm:text-sm">
        <ul className="list-decimal pl-6">
          <li className="my-2">
            Инновации и качество: Предложение передовых технологий передачи музыки, которые обеспечивают качественное звучание.
          </li>
          <li className="my-2">
            Безопасность и ответственность: Комплексный подход к модерации музыки с упором на безопасность контента.
          </li>
          <li className="my-2">
            Доступность: Обеспечение доступа к музыке для широкого круга пользователей со всего мира.
          </li>
          <li className="my-2">
            Постоянное развитие: Поддержание культуры непрерывного обучения и развития.
          </li>
        </ul>
      </div>
      <div className="text-4xl max-sm:text-xl my-4 text-center">
        Миссия компании
      </div>
      <div className="text-2xl max-sm:text-sm mb-4 text-center">
        Мы работаем для того, чтобы люди в России жили лучше и богаче, слушая любимую музыку.
      </div>
      <div className="text-4xl max-sm:text-xl my-4 text-center">
        Техническая поддержка: +7-(800)-555-35-35
      </div>
      <div className="text-4xl mb-4 max-sm:text-xl">
        Где мы находимся
      </div>
      <div className="text-2xl text-center">
        <div className="relative overflow-hidden">
          <a className="mr-2 max-sm:text-sm" href="https://yandex.ru/maps/75/vladivostok/?utm_medium=mapframe&utm_source=maps" >
            Владивосток,
          </a>
          <a className="max-sm:text-sm"
            href="https://yandex.ru/maps/75/vladivostok/house/okeanskiy_prospekt_15a/ZUoHaA9oT0EGXEJuYGJwcHRqZwA=/?ll=131.886608%2C43.118833&utm_medium=mapframe&utm_source=maps&z=19.07">
            Океанский проспект, 15А
          </a>
          <iframe className="mt-4 max-sm:h-[200px] max-sm:w-[300px]" src="https://yandex.ru/map-widget/v1/?ll=131.886608%2C43.118833&mode=whatshere&whatshere%5Bpoint%5D=131.886258%2C43.118855&whatshere%5Bzoom%5D=17&z=19.07" width="560" height="400">
          </iframe>
        </div>
      </div>
    </div>
  )
}

export default AboutUsPage
