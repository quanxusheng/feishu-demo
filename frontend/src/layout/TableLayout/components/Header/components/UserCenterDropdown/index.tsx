import { Box, Avatar, Menu, Text } from '@mantine/core'
import { IconSettings, IconSearch, IconPhoto, IconMessageCircle, IconTrash, IconArrowsLeftRight } from '@tabler/icons-react';

import useLanguageSelectData from './Hooks/useLanguage'
import useThemeSelectData from './Hooks/useTheme'

import UserCenterSelectItem from './components/UserCenterSelectItem';

import { ValidLang } from './Hooks/useLanguage'



export default function UserCenterDropdown() {
  const { languageSelectData, mutateLanguage, presentLanguage } = useLanguageSelectData()
  const { themeSelectData, changeTheme, presentTheme } = useThemeSelectData()

  return (
    <Box className="gap-2 w-72  border-b border-#646A73/10 border-solid">
      <UserCenterSelectItem
        label="theme"
        selectData={themeSelectData}
        onSelectChange={changeTheme}
        defaultSelect={presentTheme}
      />
      <UserCenterSelectItem<ValidLang>
        label="lang"
        selectData={languageSelectData}
        onSelectChange={mutateLanguage}
        defaultSelect={presentLanguage}
      />
    </Box>
  )
}