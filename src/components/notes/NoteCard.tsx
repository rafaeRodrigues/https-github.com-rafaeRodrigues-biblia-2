import { Note } from '@/services/notes'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, Edit2, Share2, Bookmark } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

export const COLOR_MAP: Record<string, string> = {
  blue: 'bg-blue-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
}

interface Props {
  note: Note
  onEdit: (n: Note) => void
  onDelete: (id: string) => void
}

export function NoteCard({ note, onEdit, onDelete }: Props) {
  const { toast } = useToast()

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: note.title, text: note.content })
      } catch (err) {
        console.error('Share failed', err)
      }
    } else {
      navigator.clipboard.writeText(`${note.title}\n\n${note.content}`)
      toast({ title: 'Copiado para a área de transferência' })
    }
  }

  return (
    <Card className="relative overflow-hidden group border-muted/60 shadow-sm transition-all hover:shadow-md">
      <div
        className={cn(
          'absolute left-0 top-0 bottom-0 w-1.5',
          COLOR_MAP[note.importance_color] || COLOR_MAP.blue,
        )}
      />
      <CardContent className="p-4 pl-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-base line-clamp-1">{note.title}</h3>
          <Bookmark
            className={cn(
              'w-4 h-4 shrink-0',
              COLOR_MAP[note.importance_color]?.replace('bg-', 'text-'),
            )}
          />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 whitespace-pre-wrap">
          {note.content}
        </p>
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => onEdit(note)}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive opacity-70 hover:opacity-100"
            onClick={() => onDelete(note.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
