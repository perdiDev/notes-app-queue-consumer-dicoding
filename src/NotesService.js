const { Pool } = require('pg');

class NotesService {
  constructor() {
    this._pool = new Pool();
  }

  async getNotes(userId) {
    const query = {
      text: `SELECT notes.* FROM notes
            JOIN collaborations ON notes.id=collaborations.note_id
            WHERE collaborations.user_id=$1 OR notes.owner=$1
            GROUP BY notes.id`,
      values: [userId],
    };

    const result = await this._pool.query(query);
    console.log(result);
    return result.rows;
  }
}

module.exports = NotesService;
