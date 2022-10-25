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
] as const

// Takes the NOTES array and makes a union type
type Note = typeof NOTES[number]
type Scale = Map<number, Note>
type ScaleType = "major" | "minor"

/** Softly checks whether the note may exist or not */
const noteDoesExist = (note: Note | string) => {
    return NOTES.filter((val: Note) => val.trim().includes(note.trim())).length !== 0
}
/** Checks whether note is natural or sharp/flat */
const isSharpOrFlat = (note: Note | string) => note.includes("#") || note.includes("♭")

/** A convenient function to return that throws an error. Without defining
 * what type this function returns, functions returning this conditionally
 * won't have to use `undefined` as a union return type.
 *
 * @example
 * const funcThing = (): number => {
 *     return numberVariable !== undefined
 *          ? 1
 *          : ScalesError("Ya 'dun goofed!")
 * } */
const ScalesError = (message: string) => {
    throw Error(message)
}

/** Controls the step pattern of each type of scale
 * To add a new scale, add the type to {@link ScaleType} and the corresponding switch case here */
const getScaleStepsArray = (keyType: ScaleType): number[] => {
    switch (keyType) {
        case "major": return [2, 2, 1, 2, 2, 2, 1]
        case "minor": return [2, 1, 2, 2, 1, 2, 2]
        default: return ScalesError(`Invalid keyType "${keyType}"`)
    }
}

/** Safely increments noteIndex -- resets when crossing the max index of NOTES */
const incrementNoteIndex = (index: number, step: number) => {
    const nextIndex = index + step;
    if (nextIndex >= NOTES.length)
        // Resets the index used to get from the array
        return nextIndex - NOTES.length
    return nextIndex
}

/** Safely retrieves the index of a sharp/flat note */
const getSharpOrFlatIndex = (note: string): number => {
    let index;
    NOTES.map((originalNote) => {
        if (originalNote.includes(note))
            index = NOTES.indexOf(originalNote)
    })
    return !!index ? index : ScalesError(`Index for sharp/flat not found: ${note}`)
}

/** Safely retrieves the index of a note, including cases for flat/sharp notes */
const getNoteIndex = (note: Note | string): number => {
    const normalizedNote = note.trim()
    if (normalizedNote === "" || normalizedNote === "/")
        return ScalesError(`Invalid note: blank or "/"`)
    if (!noteDoesExist(note)) return ScalesError(`Note "${note}" not found in NOTES array`)
    return isSharpOrFlat(note) ? getSharpOrFlatIndex(note) : NOTES.indexOf(note as Note)
}

/** Create a key based on inputs
 *
 * @example
 * makeKeyMap("C#", "minor") */
const makeScale = (
    rootNote: Note | string,
    keyDesignation: ScaleType = "major"
): Scale | undefined => {
    try {
        let noteIndex = getNoteIndex(rootNote) // Traverses scale by step size from the root note
        let scaleIndex = 1 // Index of note in the returned scale
        const stepsArray = getScaleStepsArray(keyDesignation);
        const scale: Scale = new Map().set(scaleIndex, rootNote) // Add the root note
        stepsArray.forEach((stepSize) => {
            // Step first
            noteIndex = incrementNoteIndex(noteIndex, stepSize);
            scaleIndex += 1;
            // Then set map entry
            scale.set(scaleIndex, NOTES[noteIndex])
        })
        return scale
    } catch (e) {
        console.error(e)
    }
}

export default makeScale
export type { Note, Scale }
