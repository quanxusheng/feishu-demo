import { Box, HoverCard, Text, SelectItem } from '@mantine/core'
import { map } from 'lodash-es'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

interface UserCeneterSelectItemProps<ValidSelectValue = string> {
  label: string
  defaultSelect: string
  selectData: SelectItem[]
  onSelectChange: (newValue: ValidSelectValue) => void
}

function SubLeftSelect<ValidSelectValue>({ defaultSelect, selectData, onSelectChange }: Omit<UserCeneterSelectItemProps<ValidSelectValue>, 'label'>) {
  const changeCurrentSelect = useCallback((newValue: ValidSelectValue) => {
    onSelectChange(newValue)
  }, [onSelectChange])

  return (
    <Box>
      {
        // map
        map(selectData, item => {
          return (
            <Box
              className='cursor-pointer border-b'
              onClick={() => changeCurrentSelect(item.value as ValidSelectValue)}
              key={item.value}
              sx={(theme) => ({
                display: 'block',
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                color: theme.colorScheme === 'dark' ? theme.colors.blue[4] : theme.colors.blue[7],
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                },
              })}
            >{item.label}</Box>
          )
        })
      }
    </Box>
  )
}

export default function UserCenterSelectItem<ValidSelectValue = string>({ label, ...SelectItemProps }
  : UserCeneterSelectItemProps<ValidSelectValue>) {

  const { t } = useTranslation()
  return (
    <HoverCard position='left'>
      <HoverCard.Target>
        <Box className="px-3 h-10 flex justify-between items-center text-sm cursor-pointer">
          <Text>{t(label)}</Text>
        </Box>
      </HoverCard.Target>

      <HoverCard.Dropdown>
        <SubLeftSelect<ValidSelectValue> {...SelectItemProps} />
      </HoverCard.Dropdown>
    </HoverCard>
  )
}