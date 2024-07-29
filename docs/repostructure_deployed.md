sampu/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── endpoints/
│   │   │   │   ├── courts.py
│   │   │   │   ├── players.py
│   │   │   │   ├── reservations.py
│   │   │   │   ├── payments.py
│   │   │   └── deps.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── crud/
│   │   │   ├── crud_court.py
│   │   │   ├── crud_player.py
│   │   │   ├── crud_reservation.py
│   │   │   ├── crud_payment.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── court.py
│   │   │   ├── player.py
│   │   │   ├── reservation.py
│   │   │   ├── payment.py
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── court.py
│   │   │   ├── player.py
│   │   │   ├── reservation.py
│   │   │   ├── payment.py
│   │   ├── db/
│   │   │   ├── __init__.py
│   │   │   ├── base.py
│   │   │   └── session.py
│   │   ├── main.py
│   │   ├── initial_data.py
│   │   └── requirements.txt
├── frontend/
│   ├── components/
│   │   ├── CourtCard.js
│   │   ├── PlayerCard.js
│   │   ├── GameCard.js
│   ├── pages/
│   │   ├── _app.js
│   │   ├── HomeScreen.js
│   │   ├── CourtManyScreen.js
│   │   ├── GameManyScreen.js
│   │   ├── index.js
│   │   ├── PlayerOneScreen.js
│   ├── public/
│   │   ├── index.html
│   ├── styles/
│   │   ├── CourtCard.module.css
│   │   ├── CourtManyScreen.module.css
│   │   ├── GameCard.module.css
│   │   ├── GameManyScreen.module.css
│   │   ├── HomeScreen.module.css
│   │   ├── PlayerCard.module.css
│   │   ├── PlayerOneScreen.module.css
│   ├── utils/
│   │   ├── supabase.js
│   ├── package.json
│   └── vercel.json
├── sql/
│   ├── create_tables.sql
│   ├── initialize_tables.sql
├── .gitignore
├── README.md
└── LICENSE
