import { FC, memo, ReactNode } from 'react'

export const Header: FC<{ title?: ReactNode; header?: ReactNode }> = memo(
  function Header({
    title,
    header,
  }: {
    title?: ReactNode
    header?: ReactNode
  }) {
    return (
      <header
        className="flex h-14 items-center justify-between gap-4 pl-6 select-none"
        data-tauri-drag-region
      >
        <h1 className="mb-1 !text-4xl/[1.25] font-medium truncate min-w-0 flex-1" data-tauri-drag-region>
          {title}
        </h1>

        <div className="flex items-center gap-2 flex-none">
          {header}
        </div>
      </header>
    )
  },
)

export default Header
