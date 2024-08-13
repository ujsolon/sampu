-- Create players table
CREATE TABLE players (
  id SERIAL NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  status TEXT NOT NULL,
  user_id UUID UNIQUE NOT NULL,
  avatar_base64 TEXT;
  CONSTRAINT check_player_status CHECK (status IN ('active', 'locked'))
);

-- Create courts table with status constraint
CREATE TABLE courts (
  id SERIAL NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  owner_id INTEGER REFERENCES players (id),
  created_at TIMESTAMP DEFAULT NOW(),
  status TEXT NOT NULL,
  CONSTRAINT check_court_status CHECK (status IN ('available', 'applying', 'no_owner', 'closed'))
);

-- Create games table with status constraint
CREATE TABLE games (
  id SERIAL NOT NULL PRIMARY KEY,
  court_id INTEGER REFERENCES courts (id),
  date DATE NOT NULL,
  time TIME NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  created_by INTEGER REFERENCES players (id),
  status TEXT NOT NULL,
  CONSTRAINT check_game_status CHECK (status IN ('open', 'in_progress', 'finished', 'cancelled'))
);

-- Create games_players table with team constraint
CREATE TABLE games_players (
  id SERIAL NOT NULL PRIMARY KEY,
  game_id INTEGER REFERENCES games (id),
  player_id INTEGER REFERENCES players (id),
  team TEXT,
  CONSTRAINT check_team CHECK (team IN ('team_1', 'team_2', 'substitute'))
  CONSTRAINT unique_game_player UNIQUE (game_id, player_id);
);
