import TabelView from './components/TableView'
import TableLayout from '../../layout/TableLayout'
// console.log('=>index', window.indexedDB)

// const basedata = indexedDB.open('demo-db', 4)
// basedata.onupgradeneeded = (e) => {
//     console.log('=>onupgradeneeded', e)
// }

// basedata.onsuccess = (e) => {
//     console.log('=>onsuccess', e)
// }
// console.log('=>basedata', basedata)


export default function Sheet() {
    return (
        <TableLayout>
            <TabelView />
        </TableLayout>
    )
}