import { useEffect, useState } from 'react'
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  Note,
} from '@/services/notes'
import { NoteCard } from '@/components/notes/NoteCard'
import { NoteDialog } from '@/components/notes/NoteDialog'
import { Button } from '@/components/ui/button'
import { Plus, LayoutGrid, List, BookOpen } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isGrid, setIsGrid] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const { toast } = useToast()

  const loadNotes = async () => {
    try {
      const data = await getNotes()
      setNotes(data)
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro ao carregar anotações' })
    }
  }

  useEffect(() => {
    loadNotes()
  }, [])

  const handleSave = async (noteData: Partial<Note>) => {
    try {
      if (editingNote) {
        await updateNote(editingNote.id, noteData)
      } else {
        await createNote(
          noteData as Pick<Note, 'title' | 'content' | 'importance_color'>,
        )
      }
      toast({ title: 'Anotação salva com sucesso!' })
      loadNotes()
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro ao salvar' })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir esta anotação?')) return
    try {
      await deleteNote(id)
      toast({ title: 'Anotação excluída' })
      loadNotes()
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro ao excluir' })
    }
  }

  return (
    <div className="space-y-6 animate-fade-in-up py-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Anotações</h1>
        </div>
        <div className="flex bg-muted/50 p-1 rounded-lg">
          <button
            onClick={() => setIsGrid(false)}
            className={cn(
              'p-1.5 rounded-md transition-colors',
              !isGrid ? 'bg-background shadow-sm' : 'text-muted-foreground',
            )}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsGrid(true)}
            className={cn(
              'p-1.5 rounded-md transition-colors',
              isGrid ? 'bg-background shadow-sm' : 'text-muted-foreground',
            )}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Button
        onClick={() => {
          setEditingNote(null)
          setDialogOpen(true)
        }}
        className="w-full h-12 rounded-xl font-bold gap-2 shadow-md"
      >
        <Plus className="w-5 h-5" /> Nova Anotação
      </Button>

      {notes.length === 0 ? (
        <div className="text-center py-16 px-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-primary/60" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Nenhuma anotação</h3>
          <p className="text-muted-foreground text-sm max-w-[250px] mx-auto">
            Comece a registrar seus estudos e reflexões da palavra de Deus.
          </p>
        </div>
      ) : (
        <div
          className={cn('grid gap-4', isGrid ? 'grid-cols-2' : 'grid-cols-1')}
        >
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleDelete}
              onEdit={(n) => {
                setEditingNote(n)
                setDialogOpen(true)
              }}
            />
          ))}
        </div>
      )}

      <NoteDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        note={editingNote}
        onSave={handleSave}
      />
    </div>
  )
}
