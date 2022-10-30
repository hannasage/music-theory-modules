import {
    getNotesFromSemitones,
    Note, NoteMap
} from "./notes";

export type ScaleType = "major" | "minor"

/** Controls the step pattern of each type of scale
 * To add a new scale, add the type to {@link ScaleType} and the corresponding switch case here */
const getScaleSemitones = (scaleType: ScaleType): number[] => {
    switch (scaleType) {
        case "major": return [2, 2, 1, 2, 2, 2, 1]
        case "minor": return [2, 1, 2, 2, 1, 2, 2]
    }
}

/** Create a scale based on inputs
 *
 * @example
 * makeScale("C#", "minor") */
export const makeScale = (
    root: Note | string,
    scaleType: ScaleType = "major"
): NoteMap | undefined => {
    try {
        const scaleSemitones = getScaleSemitones(scaleType);
        const notes = getNotesFromSemitones(root, scaleSemitones)
        const scale: NoteMap = new Map()
        notes.forEach((note, index) => {
            scale.set(index + 1, note)
        })
        return scale
    } catch (e) {
        console.error(e)
    }
}
