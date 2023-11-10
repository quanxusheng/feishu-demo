import { AppShell, Box, Button } from '@mantine/core';
import { PropsWithChildren, useCallback, useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import useSocket from '../../socket/hooks/useSocket'

import { modifyUserInfo } from '../../store/slicers/userSlice'
import { RootState, store } from '../../store'
import useUserWorker from '../../hooks/useUserWorker';

import Header from './components/Header'
import Navbar from './components/Navbar'

import { openDB } from 'idb'


export default function TableLayout(props: PropsWithChildren) {
    useSocket()

    const createDb = async () => {
        await openDB('sheet-db', 2, {
            upgrade(db) {
                console.log('=>db', 111)
                db.createObjectStore('store1')
                db.createObjectStore('store2')
            },
        })
        await openDB('table-db', 2, {
            upgrade(db) {
                db.createObjectStore('store3', { keyPath: 'id' })
                db.createObjectStore('store4', { autoIncrement: true, keyPath: 'id' })
            }
        })
        await openDB('cell-db1', 1, {
            upgrade(db, ov, nv, transaction) {
                console.log('=>db', db)
                console.log('=>ov', ov)
                console.log('=>nv', nv)
                if (ov === 1) createNewStore()
                function createNewStore() {
                    db.createObjectStore('userStore', { keyPath: 'mobile' })
                    transaction.objectStore('userStore').add({ mobile: 100, name: 'qqq' })
                    transaction.objectStore('userStore').add({ mobile: 110, name: 'zzz' })
                    // db.add('userStore', { mobile: '100', nama: 'qqqq' })
                    // db.add('userStore', { mobile: '110', nama: 'zzzz' })
                }
            }
        })
    }
    const dbs = {
        db1: openDB('sheet-db'),
        db2: openDB('table-db')
    }
    setTimeout(async () => {
        (await dbs.db1).put('store1', '111', 'password')
            .then(res => {
                console.log('=res>', res)
            })
    }, 1000)

    setTimeout(async () => {
        console.log('=dbs>', dbs);
        (await dbs.db2).put('store3', { id: 'cat', speed: 10, strength: 5 });
        (await dbs.db2).put('store3', { id: 'dog', speed: 1, strength: 10 });
        (await dbs.db2).put('store4', { name: 'cat111', speed: 11, strength: 11 });
        (await dbs.db2).put('store4', { name: 'dog222', speed: 22, strength: 22 })
    }, 1000)

    setTimeout(async () => {
        (await dbs.db2).get('store3', 'cat').then(res => { console.log('=>ccc', res) });
        (await dbs.db2).get('store4', 2).then(res => { console.log('=>ccc', res) });
        (await dbs.db2).getAll('store4').then(res => { console.log('=>getAll', res) });
        (await dbs.db2).getAllKeys('store3').then(res => { console.log('=>getAllKeys', res) });
        (await dbs.db2).count('store4').then(res => { console.log('=>count', res) });
    }, 2000)

    // setTimeout(async () => {
    //     const transaction = (await dbs.db2).transaction(['store3', 'store4'], 'readwrite')
    //     const tempCat = await transaction.objectStore('store3').get('cat')
    //     await transaction.objectStore('store4').delete(1)
    //     await transaction.objectStore('store4').put(tempCat)
    //     transaction.objectStore('store3').add(tempCat)
    //     transaction.done
    //         .then(res => {
    //             console.log('=>res', res)
    //         })
    //         .catch(e => {
    //             console.log('=>eee', e)
    //         })
    // }, 3000)



    // useCallback(async () => {
    //     // const db = await openDB('sheet-db')

    //     const sheetDb = await openDB('sheet-db', 1, {
    //         upgrade(db) {
    //             console.log('=>db', 111)
    //             db.createObjectStore('store1')
    //             db.createObjectStore('store2')
    //         },
    //     })
    //     const tableDb = await openDB('table-db', 1, {
    //         upgrade(db) {
    //             console.log('=>', 222)
    //             // db.createObjectStore('store3')
    //             db.createObjectStore('store3', { keyPath: 'id' })
    //             db.createObjectStore('store4', { keyPath: 'id', autoIncrement: true })
    //         }
    //     })
    //     initialDB = {
    //         sheetDb,
    //         tableDb
    //     }
    // }, [])
    useEffect(() => {
        createDb()
    })
    // await sheetDb.add('store1', 'name', 'test')
    //     .then(res => { })
    //     .catch(e => { console.log('=>eee', e) })
    // await sheetDb.put('store1', 'alex', 'aa')
    // // await sheetDb.put('store2', '999', 'password')
    // await sheetDb.clear('store1').then(res => console.log('=>clear', res))
    // await sheetDb.delete('store2', 'password')
    //     .then(res => {
    //         console.log('=>res', res)
    //     })

    // await tableDb.put('store3', '123', 'id')
    //     .then(res => { console.log('=>ttt', res) })
    return (
        <AppShell
            header={<Header />}
            navbar={<Navbar />}
        >
            <Box pl={280}>
                {props.children}
            </Box>
        </AppShell>
    )
}