import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material'
import {
  OpenInNew,
  Refresh,
  Search,
  History as HistoryIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder,
  Delete,
  Star,
  StarBorder,
} from '@mui/icons-material'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { cn } from '@nyanpasu/ui'
import { commands } from '@nyanpasu/interface'
import { useLocalStorage } from 'react-use'
import dayjs from 'dayjs'

export const Route = createFileRoute('/(legacy)/browser')({
  component: BrowserPage,
})

interface HistoryItem {
  url: string
  timestamp: number
}

interface BookmarkItem {
  url: string
  title: string
  timestamp: number
}

function BrowserPage() {
  const [url, setUrl] = useState('about:blank')
  const [src, setSrc] = useState(url)
  const [blocked, setBlocked] = useState<{ url: string } | null>(null)
  
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('browser-history', [])
  const [bookmarks, setBookmarks] = useLocalStorage<BookmarkItem[]>('browser-bookmarks', [])

  const [anchorElHistory, setAnchorElHistory] = useState<null | HTMLElement>(null)
  const [anchorElBookmarks, setAnchorElBookmarks] = useState<null | HTMLElement>(null)

  const normalize = (u: string) => {
    if (/^about:/i.test(u)) return u
    return /^https?:\/\//i.test(u) ? u : `https://${u}`
  }

  const isBlockedHost = (u: string) => {
    try {
      const host = new URL(normalize(u)).host.toLowerCase()
      return [
        'google.com',
        'www.google.com',
        'accounts.google.com',
        'mail.google.com',
        'docs.google.com',
        'youtube.com',
        'www.youtube.com',
        'facebook.com',
        'www.facebook.com',
        'twitter.com',
        'x.com',
        'github.com',
        'www.github.com',
      ].some((h) => host === h || host.endsWith(`.${h}`))
    } catch {
      return false
    }
  }

  const addToHistory = (u: string) => {
    const normalized = normalize(u)
    setHistory((prev) => {
      const newHistory = [
        { url: normalized, timestamp: Date.now() },
        ...(prev || []).filter((item) => item.url !== normalized),
      ]
      return newHistory.slice(0, 50)
    })
  }

  const handleNavigate = () => {
    const target = normalize(url)
    if (isBlockedHost(target)) {
      setBlocked({ url: target })
      setSrc('about:blank')
    } else {
      setBlocked(null)
      setSrc(target)
      addToHistory(target)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNavigate()
    }
  }

  const handleRefresh = () => {
    const current = src
    setSrc('')
    setTimeout(() => setSrc(current), 50)
  }

  const handleOpenExternal = async () => {
    await commands.openWebUrl(normalize(src))
  }

  const isBookmarked = (bookmarks || []).some((b) => b.url === src)

  const toggleBookmark = () => {
    setBookmarks((prev) => {
      if (isBookmarked) {
        return (prev || []).filter((b) => b.url !== src)
      } else {
        return [
          { url: src, title: src, timestamp: Date.now() },
          ...(prev || []),
        ]
      }
    })
  }

  const handleHistoryClick = (item: HistoryItem) => {
    setUrl(item.url)
    setSrc(item.url)
    addToHistory(item.url)
    setAnchorElHistory(null)
  }

  const handleBookmarkClick = (item: BookmarkItem) => {
    setUrl(item.url)
    setSrc(item.url)
    addToHistory(item.url)
    setAnchorElBookmarks(null)
  }

  return (
    <Box
      className={cn(
        'cyber-glass border border-[var(--cyber-glass-border)]',
        'h-full w-full flex flex-col',
      )}
      data-tauri-drag-region
    >
      <div className="flex gap-2 items-center p-2 bg-black/5" data-tauri-drag-region>
        <div className="flex gap-1">
           <Tooltip title="历史记录">
            <IconButton
              size="small"
              onClick={(e) => setAnchorElHistory(e.currentTarget)}
            >
              <HistoryIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="书签">
            <IconButton
              size="small"
              onClick={(e) => setAnchorElBookmarks(e.currentTarget)}
            >
              <BookmarkIcon />
            </IconButton>
          </Tooltip>
        </div>

        <TextField
          size="small"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入网址，例如 https://example.com"
          inputProps={{ 'aria-label': 'browser-url' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                 <Tooltip title={isBookmarked ? "取消收藏" : "添加收藏"}>
                  <IconButton size="small" onClick={toggleBookmark}>
                    {isBookmarked ? <Star color="warning" /> : <StarBorder />}
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '999px',
              backgroundColor: 'var(--cyber-glass-bg)',
            },
          }}
        />
        
        <Tooltip title="刷新">
          <IconButton onClick={handleRefresh} size="small">
            <Refresh />
          </IconButton>
        </Tooltip>

        <Tooltip title="在外部浏览器打开">
          <IconButton onClick={handleOpenExternal} size="small">
            <OpenInNew />
          </IconButton>
        </Tooltip>
      </div>

      <Menu
        anchorEl={anchorElHistory}
        open={Boolean(anchorElHistory)}
        onClose={() => setAnchorElHistory(null)}
        slotProps={{ paper: { sx: { width: 320, maxHeight: 400 } } }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle2">历史记录</Typography>
          <Tooltip title="清除历史记录">
            <IconButton size="small" onClick={() => setHistory([])}>
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <Divider />
        {history?.length === 0 && (
          <MenuItem disabled>
            <ListItemText primary="暂无历史记录" />
          </MenuItem>
        )}
        {history?.map((item) => (
          <MenuItem key={item.timestamp} onClick={() => handleHistoryClick(item)}>
            <ListItemText
              primary={item.url}
              secondary={dayjs(item.timestamp).format('YYYY-MM-DD HH:mm')}
              primaryTypographyProps={{ noWrap: true, variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={anchorElBookmarks}
        open={Boolean(anchorElBookmarks)}
        onClose={() => setAnchorElBookmarks(null)}
        slotProps={{ paper: { sx: { width: 320, maxHeight: 400 } } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2">书签</Typography>
        </Box>
        <Divider />
        {bookmarks?.length === 0 && (
          <MenuItem disabled>
            <ListItemText primary="暂无书签" />
          </MenuItem>
        )}
        {bookmarks?.map((item) => (
          <MenuItem key={item.timestamp} onClick={() => handleBookmarkClick(item)}>
            <ListItemIcon>
              <BookmarkIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={item.title}
              primaryTypographyProps={{ noWrap: true, variant: 'body2' }}
            />
          </MenuItem>
        ))}
      </Menu>

      <div className="flex-1 min-h-0 border-t border-[var(--cyber-glass-border)] overflow-hidden bg-white">
        {src && (
          <iframe
            title="page-browser"
            src={src}
            className="w-full h-full border-none"
            allow="accelerometer; clipboard-read; clipboard-write; geolocation; magnetometer; microphone; midi; payment; usb; web-share"
          />
        )}
        {blocked && (
          <Box className="absolute inset-0 flex items-center justify-center bg-white/80">
            <Box className="flex flex-col items-center gap-3 p-4 rounded-xl border border-[var(--cyber-glass-border)] bg-white">
              <Typography variant="body2">该站点拒绝嵌入，点击在系统浏览器打开</Typography>
              <Box className="flex gap-2">
                <IconButton size="small" onClick={() => setBlocked(null)}>
                  <Refresh />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={async () => {
                    await commands.openWebUrl(blocked.url)
                  }}
                >
                  <OpenInNew />
                </IconButton>
              </Box>
            </Box>
          </Box>
        )}
      </div>
    </Box>
  )
}
