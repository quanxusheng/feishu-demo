
import {useParams, useLocation} from 'react-router-dom'
import queryString from 'query-string'
import {useMemo} from 'react'

export default function useUrlParams() {
    const params = useParams()
    const location = useLocation()
    const locationSearch = queryString.parse(location.search)
    const sheetUrlParams = useMemo<{sheetId: string, tableId: string}>(() => {
        return {
            sheetId: params.sheetId,
            tableId: locationSearch.tableId as string,
        }
    }, [params.sheetId, locationSearch.tableId])
    
    return {
        sheetUrlParams
    }
}