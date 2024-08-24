CREATE OR REPLACE FUNCTION update_game_status()
RETURNS TRIGGER AS $$
BEGIN
  NEW.status = CASE
    WHEN NEW.date > CURRENT_DATE THEN 'open'
    WHEN NEW.date = CURRENT_DATE AND NEW.time > CURRENT_TIME THEN 'open'
    WHEN NEW.date = CURRENT_DATE AND NEW.time <= CURRENT_TIME AND NEW.time + (NEW.duration || ' minutes')::INTERVAL > CURRENT_TIME THEN 'in_progress'
    ELSE 'finished'
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
