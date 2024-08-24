-- Run every 15 minutes
SELECT cron.schedule('*/15 * * * *', 'SELECT update_all_game_statuses()');