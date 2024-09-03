import React, { FC, PropsWithChildren } from 'react'

import clsx from 'clsx'
import Modal from '@mui/material/Modal'
import Slide from '@mui/material/Slide/Slide'

export interface IMyModal {
  open: boolean
  handleClose: () => void
  width?: string
  className?: string
  isReversed?: boolean
}

const MyModal: FC<PropsWithChildren<IMyModal>> = ({
  open,
  handleClose,
  width = 'w-full',
  children,
  className,
  isReversed,
}) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      disableAutoFocus
      closeAfterTransition
    >
      <Slide direction={isReversed ? 'down' : 'up'} in={open}>
        <div
          className={clsx(
            'absolute left-0 p-4 py-6 bg-gray-800  shadow-main flex-col flex',
            isReversed
              ? 'top-0 border-b border-blue-400 rounded-bl-[2rem] rounded-br-[2rem]'
              : 'bottom-0 border-t border-blue-400 rounded-tl-[2rem] rounded-tr-[2rem]',
            width,
            className,
          )}
        >
          <div className="relative">{children}</div>
        </div>
      </Slide>
    </Modal>
  )
}

export default MyModal
