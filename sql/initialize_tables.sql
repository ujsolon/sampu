-- Insert sample data into players table
INSERT INTO players (id, name, email, status, user_id)
VALUES
(1, 'U Solon', 'yujey_02@yahoo.com.ph', 'active', '815b8000-0039-4077-b95a-8e3f48b591b3'),
(2, 'Jane Smith', 'jane.smith@example.com', 'active', 'd11b59cc-36eb-494f-bf6f-acbd0f60a1f8'),
(3, 'Jim Brown', 'jim.brown@example.com', 'locked', 'f7ea8db9-21ff-4c3e-927b-cd31fa402b37');

-- Insert sample data into courts table
INSERT INTO courts (id, name, location, owner_id, status)
VALUES
(1, 'Court 1', '123 Main St', 1, 'available'),
(2, 'Court 2', '456 Elm St', 2, 'applying'),
(3, 'Court 3', '789 Oak St', NULL, 'no_owner'),
(4, 'Court 4', '101 Maple St', NULL, 'closed');

-- Insert sample data into games table
INSERT INTO games (id, court_id, time, created_by, status)
VALUES
(1, 1, '15:00:00', 1, 'open'),
(2, 1, '16:00:00', 1, 'in_progress'),
(3, 2, '17:00:00', 2, 'finished');

-- Insert sample data into games_players table
INSERT INTO games_players (id, game_id, player_id, team)
VALUES
(1, 1, 1, 'team_1'),
(2, 1, 2, 'team_1'),
(3, 1, 3, 'team_2'),
(4, 2, 1, 'team_2'),
(5, 2, 2, 'substitute');

