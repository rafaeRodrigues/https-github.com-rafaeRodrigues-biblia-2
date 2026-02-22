import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { COLOR_MAP } from './NoteCard'
import { Note } from '@/services/notes'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  note?: Note | null
  onSave: (note: Partial<Note>) => Promise<void>
}

export function NoteDialog({ open, onOpenChange, note, onSave }: Props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [color, setColor] = useState('blue')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      setTitle(note?.title || '')
      setContent(note?.content || '')
      setColor(note?.importance_color || 'blue')
    }
  }, [open, note])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await onSave({ title, content, importance_color: color })
    setLoading(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {note ? 'Editar Anotação' : 'Nova Anotação'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Tema da Palavra</Label>
            <Input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: O Amor de Deus"
              className="bg-muted/30"
            />
          </div>
          <div className="space-y-2">
            <Label>Sua Anotação</Label>
            <Textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva suas reflexões..."
              className="min-h-[120px] bg-muted/30 resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label>Cor de Importância</Label>
            <div className="flex gap-2 pt-1">
              {Object.keys(COLOR_MAP).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center transition-transform',
                    COLOR_MAP[c],
                    color === c
                      ? 'ring-2 ring-offset-2 ring-foreground scale-110'
                      : '',
                  )}
                  aria-label={`Selecionar cor ${c}`}
                >
                  {color === c && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Anotação'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
