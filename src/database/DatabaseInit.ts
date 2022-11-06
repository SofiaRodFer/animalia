import * as SQLite from 'expo-sqlite';

export const DatabaseConnection = {
    getConnection: () => SQLite.openDatabase("database.db"),
};

var db = null
export default class DatabaseInit {
    constructor() {
        db = DatabaseConnection.getConnection()
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
        console.log('Foreign keys turned on')
    );
        this.InitDb()
    }
    
    InitDb() {
        var sql = [
            // `DROP TABLE IF EXISTS Pet;`,

            `create table if not exists Pet (
            id integer primary key autoincrement,
            nome text,
            raca text,
            dataNascimento text,
            dataAdocao text,
            genero text,
            foto text
            );`,
        ];

        db.transaction(
            tx => {
                for (var i = 0; i < sql.length; i++) {
                    console.log("execute sql : " + sql[i]);
                    tx.executeSql(sql[i]);
                }
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("transaction complete call back ");
            }
        );
    }

}