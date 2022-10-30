import {ReturnableError} from "./tools/returnableError";

export const NOTES = [
    "A",
    "A# / B♭",
    "B",
    "C",
    "C# / D♭",
    "D",
    "D# / E♭",
    "E",
    "F",
    "F# / G♭",
    "G",
    "G# / A♭"
] as const

// Takes the NOTES array and makes a union type
export type Note = typeof NOTES[number]
export type NoteMap = Map<number, Note>

const NoteError = ReturnableError("notes.ts");

/** Softly checks whether the note may exist or not */
const noteDoesExist = (note: Note | string) => {
    return NOTES.filter((val: Note) => val.trim().includes(note.trim())).length !== 0
}
/** Checks whether note is natural or sharp/flat */
const isSharpOrFlat = (note: Note | string) => note.includes("#") || note.includes("♭")

/** Safely retrieves the index of a sharp/flat note */
const getSharpOrFlatIndex = (note: string): number => {
    let index;
    NOTES.map((originalNote) => {
        if (originalNote.includes(note))
            index = NOTES.indexOf(originalNote)
    })
    return !!index ? index : NoteError(`Index for sharp/flat not found: ${note}`)
}

/** Safely increments noteIndex -- resets when crossing the max index of NOTES */
const incrementNoteIndex = (index: number, step: number) => {
    const nextIndex = index + step;
    if (nextIndex >= NOTES.length)
        // Resets the index used to get from the array
        return nextIndex - NOTES.length
    return nextIndex
}

/** Safely retrieves the index of a note, including cases for flat/sharp notes */
const getNoteIndex = (note: Note | string): number => {
    const normalizedNote = note.trim()
    if (normalizedNote === "" || normalizedNote === "/")
        NoteError(`Invalid note: blank or "/"`)
    if (!noteDoesExist(note))
        NoteError(`Note "${note}" not found in NOTES array`)
    return isSharpOrFlat(note) ? getSharpOrFlatIndex(note) : NOTES.indexOf(note as Note)
}

/** Generate an array of notes from a semitones array and root note */
export const getNotesFromSemitones = (root: Note | string, semitones: number[]) => {
    let noteIndex = getNoteIndex(root)
    const result: Note[] = [NOTES[noteIndex]] // Add the root note
    semitones.forEach((semitone) => {
        noteIndex = incrementNoteIndex(noteIndex, semitone) // New note index
        result.push(NOTES[noteIndex])
    })
    return result
}
