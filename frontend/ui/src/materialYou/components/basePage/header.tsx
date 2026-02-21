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
        <h1
          className="mb-1 min-w-0 flex-1 truncate !text-4xl/[1.25] font-medium"
          data-tauri-drag-region
        >
          {title}
        </h1>

        <div className="flex flex-none items-center gap-2">{header}</div>
      </header>
    )
  },
)

export default Header
