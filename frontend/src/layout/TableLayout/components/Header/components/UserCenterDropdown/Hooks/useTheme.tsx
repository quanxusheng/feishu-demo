import { SelectItem, Box } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useCallback, useMemo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import getLocalTheme from '../../../../../../../theme/getLocalTheme'

export type ValidTheme = 'light' | 'dark' | 'system'


export default function useTheme() {
    const { t } = useTranslation()

    const themeSelectData = useMemo<SelectItem[]>(() => {
        return [
            {
                label: t('light'),
                value: 'light'
            },
            {
                label: t('dark'),
                value: 'dark'
            },
            {
                label: t('system'),
                value: 'system'
            }
        ]
    }, [t])

    const watchSystemThemeChange = useCallback(() => {

        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)")
        darkThemeMq.addListener(e => {
            //   console.log('=>e', e)
            const theme = e.matches ? 'dark' : 'light'
            setRealtimeTheme(theme)
        })
    }, [])

    const [presentTheme, setPresentTheme] = useLocalStorage({
        key: 'theme',
        defaultValue: 'light'
    })
    const [realtimeTheme, setRealtimeTheme] = useState(getLocalTheme())
    //   console.log('=>realtimeTheme', realtimeTheme)

    useEffect(() => {
        if (presentTheme === 'system') {
            watchSystemThemeChange()
            setRealtimeTheme(getLocalTheme())
            return
        }
        setRealtimeTheme(presentTheme)
    }, [presentTheme, watchSystemThemeChange])


    const changeTheme = useCallback((newValue: ValidTheme) => {
        setPresentTheme(newValue)
    }, [setPresentTheme])

    return {
        realtimeTheme,
        themeSelectData,
        presentTheme,
        changeTheme
    }
}