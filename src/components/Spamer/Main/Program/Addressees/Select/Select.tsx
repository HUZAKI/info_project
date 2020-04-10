import React from 'react'
import Title from '../../../../../common/Title/Title'
import { MenuItem } from '@material-ui/core'
import MyTextField from '../../../../../common/MyTextField/MyTextField'
import bs from '../../../../../../utils/BrowserStorage'
import addresses from '../../../../../../utils/addresses'
import { spamModeType } from '../../../../../../types/types'
import { useFormikContext } from 'formik'
import { useSelector } from 'react-redux'
import { rootReducerType } from '../../../../../../redux/store'

interface IProps {
  setPlaceholder: (placeholder: string) => void
}

function Select ({ setPlaceholder }: IProps) {
  const { setFieldValue } = useFormikContext()
  const spamOnPause = useSelector((state: rootReducerType) => state.spamerReducer.spamOnPause)
  const spamOnRun = useSelector((state: rootReducerType) => state.spamerReducer.spamOnRun)

  return (
    <>
      <Title>Режим рассылки</Title>
      <MyTextField
        disabled={spamOnPause || spamOnRun}
        name="spamMode"
        fullWidth
        select
        variant="outlined"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const spamMode = e.target.value as spamModeType

          bs.local.set('fields.spamMode', spamMode)
          setPlaceholder(addresses.getPlaceholder(spamMode as spamModeType))
          setFieldValue('addressees', addresses.getLocalValue(spamMode) || '')
        }}
      >
        <MenuItem value={'pm'}>Личные сообщения <span role="img" aria-label="pm">👨</span></MenuItem>,
        <MenuItem value={'talks'}>Беседы <span role="img" aria-label="talks">👪</span></MenuItem>,
        <MenuItem value={'talksAutoExit'}>Беседы с автовыходом <span role="img" aria-label="talks">⛔</span></MenuItem>,
        <MenuItem value={'usersWalls'}>Стены юзеров <span role="img" aria-label="usersWalls">📄</span></MenuItem>,
        <MenuItem value={'groupsWalls'}>Стены групп <span role="img" aria-label="groupsWalls">📢</span></MenuItem>,
        <MenuItem value={'comments'}>Комментарии <span role="img" aria-label="comments">🖊</span></MenuItem>,
        <MenuItem value={'discussions'}>Обсуждения <span role="img" aria-label="discussions">🤓</span></MenuItem>
      </MyTextField>
    </>
  )
}

export default Select
