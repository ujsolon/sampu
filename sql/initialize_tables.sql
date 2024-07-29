-- Insert sample data into players table
INSERT INTO players (name, email, status)
VALUES
('John Doe', 'john.doe@example.com', 'active'),
('Jane Smith', 'jane.smith@example.com', 'active'),
('Jim Brown', 'jim.brown@example.com', 'locked');

-- Insert sample data into courts table
INSERT INTO courts (name, location, owner_id, status)
VALUES
('Court 1', '123 Main St', 7, 'available'),
('Court 2', '456 Elm St', 8, 'applying'),
('Court 3', '789 Oak St', 9, 'no_owner'),
('Court 4', '101 Maple St', NULL, 'closed');

-- Insert sample data into games table
INSERT INTO games (court_id, time, created_by, status)
VALUES
(13, '15:00:00', 7, 'open'),
(13, '16:00:00', 8, 'in_progress'),
(13, '17:00:00', 9, 'finished');

-- Insert sample data into games_players table
INSERT INTO games_players (game_id, player_id, team)
VALUES
(7, 7, 'team_1'),
(7, 8, 'team_1'),
(8, 9, 'team_2'),
(9, 7, 'team_2'),
(7, 9, 'substitute');

