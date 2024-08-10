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
│   │   ├── AddCourt.js
│   │   ├── AddGame.js
│   │   ├── AddPlayer.js
│   │   ├── CourtCard.js
│   │   ├── GameCard.js
│   │   ├── PlayerCard.js
│   │   ├── GameOneScreen.js
│   ├── pages/
│   │   ├── game/
│   │   │   ├── [id].js
│   │   │   ├── index.js
│   │   ├── _app.js
│   │   ├── add-court.js
│   │   ├── add-game.js
│   │   ├── add-player.js
│   │   ├── HomeScreen.js
│   │   ├── CourtManyScreen.js
│   │   ├── GameManyScreen.js
│   │   ├── index.js
│   │   ├── PlayerOneScreen.js
│   ├── public/
│   │   ├── index.html
│   ├── styles/
│   │   ├── AddCourt.module.css
│   │   ├── AddGame.module.css
│   │   ├── AddPlayer.module.css
│   │   ├── CourtCard.module.css
│   │   ├── CourtManyScreen.module.css
│   │   ├── GameCard.module.css
│   │   ├── GameManyScreen.module.css
│   │   ├── global.css
│   │   ├── HomeScreen.module.css
│   │   ├── PlayerCard.module.css
│   │   ├── PlayerOneScreen.module.css
│   ├── utils/
│   │   ├── supabase.js
│   │   ├── auth.js
│   ├── package.json
│   └── vercel.json
├── sql/
│   ├── create_tables.sql
│   ├── initialize_tables.sql
├── .gitignore
├── README.md
└── LICENSE
