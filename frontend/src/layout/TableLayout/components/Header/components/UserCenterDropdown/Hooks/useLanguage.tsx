import { SelectItem } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export type ValidLang = 'zh' | 'en'
const languageSelectData: SelectItem[] = [
  {
    label: '简体中文',
    value: 'zh'
  },
  {
    label: 'English',
    value: 'en'
  },
]

export default function useLanguageSelectData() {
  const [presentLanguage, setLanguage] = useLocalStorage<ValidLang>({
    key: 'lang',
    defaultValue: 'en'
  })
  const { i18n } = useTranslation()

  const mutateLanguage = useCallback((newLang: ValidLang) => {
    setLanguage(newLang)
    i18n.changeLanguage(newLang)
  }, [i18n, setLanguage])

  return {
    languageSelectData,
    mutateLanguage,
    presentLanguage
  }
}