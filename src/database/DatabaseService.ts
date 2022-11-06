import React from 'react';

import { PetModel } from '../models/PetModel';
import { DatabaseConnection } from './DatabaseInit';

const table = "Pet"
const db = DatabaseConnection.getConnection()

export default class PetService {
    Inserir(param: PetModel) {
        return new Promise((resolve, reject) => db.transaction(
            tx => {
                tx.executeSql(`insert into ${table} (nome, raca, dataNascimento, dataAdocao, genero, foto) 
                values (?, ?, ?, ?, ?, ?)`, 
                [param.nome, param.raca, param.dataNascimento, param.dataAdocao, param.genero, param.foto], 
                (_, { insertId, rows }) => {
                    console.log("id insert: " + insertId);
                    resolve(insertId)
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
            }));
    }

    Deletar(id: number) {
        db.transaction(
            tx => {
                tx.executeSql(`delete from ${table} where id = ?;`, [id], (_, { rows }) => {
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
    
            });
    }


    Atualizar(param: PetModel) {
        return new Promise((resolve, reject) =>db.transaction(tx => {
                tx.executeSql(`update ${table} set nome = ?, raca = ?, dataNascimento = ?, dataAdocao = ?, genero = ?, foto = ? where id = ?;`, 
                [param.nome, param.raca, param.dataNascimento, param.dataAdocao, param.genero, param.foto, param.id], () => {
                }), (sqlError) => {
                    console.log(sqlError);
                }}, (txError) => {
                console.log(txError);
    
            }));
    }

    EncontrarPorId(id: number) {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table} where id = ?`, [id], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);

        }));
    }

    Listar() {
        return new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(`select * from ${table}`, [], (_, { rows }) => {
                resolve(rows)
            }), (sqlError) => {
                console.log(sqlError);
            }}, (txError) => {
            console.log(txError);
        }))
    }
}