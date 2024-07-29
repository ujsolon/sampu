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
│   ├── src/
│   │   ├── components/
│   │   │   ├── CourtCard.js
│   │   │   ├── PlayerCard.js
│   │   │   ├── GameCard.js
│   │   ├── screens/
│   │   │   ├── HomeScreen.js
│   │   │   ├── CourtManyScreen.js
│   │   │   ├── GameManyScreen.js
│   │   │   ├── PlayerOneScreen.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles/
│   │       └── main.css
│   ├── public/
│   │   ├── index.html
│   ├── utils/
│   │   ├── supabase.js
│   └── package.json
├── .gitignore
├── README.md
└── LICENSE
