import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("Śliwa_Mateusz_5s1.db");

export default class Database {
    static createTable() {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS alarms (id integer primary key not null, h text, m text, days text, s text, v text);"
            );
        });
    }

    static add(h, m) {
        db.transaction(tx => {
            tx.executeSql("INSERT INTO alarms (h, m, days, s, v) values ('" + h + "', '" + m + "', '', 'false', 'false');");
        })
    }

    static remove(x) {
        db.transaction(tx => {
            tx.executeSql(
                "DELETE FROM alarms WHERE (id = " + x + ");"
            );
        });
    }

    static change(val, x) {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE alarms SET days = '" + val + "' WHERE (id = " + x + ");"
            );
        });
        this.getAll()
    }

    static sound(val, x) {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE alarms SET s = '" + val + "' WHERE (id = " + x + ");"
            );
        });
        this.getAll()
    }

    static vib(val, x) {
        db.transaction(tx => {
            tx.executeSql(
                "UPDATE alarms SET v = '" + val + "' WHERE (id = " + x + ");"
            );
        });
        this.getAll()
    }

    static getAll() {
        var query = "SELECT * FROM alarms ORDER BY id ASC;";
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