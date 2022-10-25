type MusicalKeys = "major" | "minor"
// e.x. MusicalKey of C starts with { key: 1, value: "C" }
type NotesMap = Map<number, string>
const NOTES = [
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
]

const getKeyStep = (keyType: MusicalKeys): number[] => {
    switch (keyType) {
        case "major": return [2, 2, 1, 2, 2, 2, 1]
        case "minor": return [2, 1, 2, 2, 1, 2, 2]
        default: throw Error(`Invalid keyType "${keyType}"`)
    }
}

const getNote = (index: number): string => {
    try {
        return NOTES[index]
    } catch (e: any) {
        throw Error(`Invalid NOTES Index: ${index}`)
    }
}

const getNextNoteIndex = (index: number, step: number) => {
    const nextIndex = index + step;
    if (nextIndex === 12) return 0
    if (nextIndex === 13) return 1
    return nextIndex
}

const confirmNoteIndex = (note: string) => {
    if (note.includes("#") || note.includes("♭")) {
        // Find the right sharp/flat
        let returnableNote;
        NOTES.map((originalNote) => {
            if (originalNote.includes(note))
                returnableNote = NOTES.indexOf(originalNote)
        })
        if (returnableNote !== undefined) return returnableNote
    }
    // We know it won't be sharp/flat by this point
    if (!NOTES.includes(note) || NOTES.indexOf(note) === -1) {
        throw Error(`Note "${note}" not found in NOTES array`)
    }
    return NOTES.indexOf(note)
}
/** Create a key based on inputs
 *
 * @example makeKeyMap("C", "minor") */
export const makeKeyMap = (
    keySignature: string,
    keyType: MusicalKeys = "major"
): NotesMap | undefined => {
    try {
        let noteIndex = confirmNoteIndex(keySignature) // Traverses scale by step size from the root note
        let keyIndex = 1 // Index of note in the actual key
        const keyStep = getKeyStep(keyType);
        const musicalKey: NotesMap = new Map().set(keyIndex, keySignature)
        keyStep.forEach((stepSize) => {
            noteIndex = getNextNoteIndex(noteIndex, stepSize);
            keyIndex += 1;
            musicalKey.set(
                keyIndex,
                getNote(
                    noteIndex
                )
            )
        })
        return musicalKey
    } catch (e) {
        console.error(e)
    }
}
