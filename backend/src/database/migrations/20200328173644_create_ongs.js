
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function (table) {
        table.string('ong_id').primary();
        table.string('ong_nome').notNullable();
        table.string('ong_email').notNullable();
        table.string('ong_whatsapp').notNullable();
        table.string('ong_cidade').notNullable();
        table.string('ong_uf', 2).notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};

