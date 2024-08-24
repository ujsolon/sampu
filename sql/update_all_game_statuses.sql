CREATE OR REPLACE FUNCTION update_all_game_statuses()
RETURNS void AS $$
BEGIN
  UPDATE games
  SET status = CASE
    WHEN date > CURRENT_DATE THEN 'open'
    WHEN date = CURRENT_DATE AND time > CURRENT_TIME THEN 'open'
    WHEN date = CURRENT_DATE AND time <= CURRENT_TIME AND time + (duration || ' minutes')::INTERVAL > CURRENT_TIME THEN 'in_progress'
    ELSE 'finished'
  END;
END;
$$ LANGUAGE plpgsql;
