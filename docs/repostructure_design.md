sampu/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   ├── endpoints/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── courts.py
│   │   │   │   ├── players.py
│   │   │   │   ├── reservations.py
│   │   │   │   ├── payments.py
│   │   │   └── deps.py
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── crud/
│   │   │   ├── __init__.py
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
│   │   │   ├── LandingPage.js
│   │   │   ├── CourtSearch.js
│   │   │   ├── PlayerSearch.js
│   │   │   ├── Reservation.js
│   │   │   └── GroupChat.js
│   │   ├── screens/
│   │   │   ├── HomeScreen.js
│   │   │   ├── CourtDetailScreen.js
│   │   │   ├── PlayerDetailScreen.js
│   │   │   ├── ReservationScreen.js
│   │   │   └── ProfileScreen.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles/
│   │       └── main.css
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   └── package.json
├── docs/
│   ├── requirements.md
│   ├── design.md
│   ├── api.md
│   └── user_manual.md
├── tests/
│   ├── backend/
│   │   ├── test_courts.py
│   │   ├── test_players.py
│   │   ├── test_reservations.py
│   │   └── test_payments.py
│   └── frontend/
│       ├── test_LandingPage.js
│       ├── test_CourtSearch.js
│       ├── test_PlayerSearch.js
│       └── test_Reservation.js
├── .gitignore
├── README.md
└── LICENSE
