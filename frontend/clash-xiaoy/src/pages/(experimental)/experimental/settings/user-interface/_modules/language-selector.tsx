import { useLanguage } from '@/components/providers/language-provider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { m } from '@/paraglide/messages'
import { Locale, locales } from '@/paraglide/runtime'
import { SettingsCard, SettingsCardContent } from '../../_modules/settings-card'

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Locale)
  }

  return (
    <SettingsCard data-slot="language-selector-card">
      <SettingsCardContent
        className="flex items-center justify-between px-3"
        data-slot="language-selector-card-content"
      >
        <div>{m.settings_user_interface_language_label()}</div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="flat">{m.language()}</Button>
          </DropdownMenuTrigger>

<<<<<<< HEAD
          <DropdownMenuContent className="max-h-[300px] overflow-y-auto">
=======
          <DropdownMenuContent>
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
            <DropdownMenuRadioGroup
              value={language}
              onValueChange={handleLanguageChange}
            >
<<<<<<< HEAD
              {[...locales].sort().map((value) => (
=======
              {locales.map((value) => (
>>>>>>> cca0f91e5b3534817b94d9736a4ac8fadf96b5b1
                <DropdownMenuRadioItem key={value} value={value}>
                  {m.language(value, { locale: value })}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SettingsCardContent>
    </SettingsCard>
  )
}
