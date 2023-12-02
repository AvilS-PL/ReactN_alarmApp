import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("Śliwa_Mateusz_5s1.db");

export default class Database {
    static createTable() {
        console.log("created table")
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS alarms (id integer primary key not null, h text, m text);"
            );
        });
    }

    static add() {
        console.log("added")
        db.transaction(tx => {
            tx.executeSql("INSERT INTO alarms (h, m) values ('00', '00');");
        })
    }

    static remove(x) {
        console.log("removed: " + x)
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM alarms WHERE (id = " + x + ");"
            );
        });

    }

    static getAll() {
        var query = "SELECT * FROM alarms ORDER BY id ASC;";
        console.log("getted")
        return new Promise((resolve, reject) => db.transaction((tx) => {
            tx.executeSql(query, [], (tx, results) => {

                resolve(JSON.stringify(results));

            }, function (tx, error) {

                reject(error);

            });
        }))
    }

    static drop() {

        db.transaction(tx => {
            tx.executeSql("DROP TABLE IF EXISTS alarms");
        })
    }
}