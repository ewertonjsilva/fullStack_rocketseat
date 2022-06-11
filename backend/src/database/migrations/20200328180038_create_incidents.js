
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();
        
        table.string('inc_titulo').notNullable();
        table.string('inc_descricao').notNullable();
        table.decimal('inc_valor').notNullable();

        table.string('ong_id').notNullable();
        table.foreign('ong_id').references('ong_id').inTable('ongs');
    });  
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};

