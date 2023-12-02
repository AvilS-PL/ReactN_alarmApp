import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("Śliwa_Mateusz_5s1.db");

export default class Database {
    static createTable() {
        console.log("hmm")
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS alarms (id integer primary key not null, h integer, m integer)"
            );
        });
    }

    static add() {

        db.transaction(tx => {
            tx.executeSql("INSERT INTO alarms (a, b) values ('xxx', 'yyy')");
        })
    }

    static getAll() {
        var query = "SELECT * FROM alarms";
        //
        return new Promise((resolve, reject) => db.transaction((tx) => {
            tx.executeSql(query, [], (tx, results) => {

                console.log(JSON.stringify(results))

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