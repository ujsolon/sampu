CREATE TRIGGER before_game_insert_update
BEFORE INSERT OR UPDATE ON games
FOR EACH ROW EXECUTE FUNCTION update_game_status();