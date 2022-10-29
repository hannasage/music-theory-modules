import {
    getNoteIndex,
    incrementNoteIndex,
    Note,
    NOTES
} from "./notes";

type Scale = Map<number, Note>
type ScaleType = "major" | "minor"

/** Controls the step pattern of each type of scale
 * To add a new scale, add the type to {@link ScaleType} and the corresponding switch case here */
const getScaleIntervals = (scaleType: ScaleType): number[] => {
    switch (scaleType) {
        case "major": return [2, 2, 1, 2, 2, 2, 1]
        case "minor": return [2, 1, 2, 2, 1, 2, 2]
    }
}

/** Create a scale based on inputs
 *
 * @example
 * makeScale("C#", "minor") */
const makeScale = (
    rootNote: Note | string,
    scaleType: ScaleType = "major"
): Scale | undefined => {
    try {
        let noteIndex = getNoteIndex(rootNote) // Traverses scale by step size from the root note
        let scaleIndex = 1 // Index of note in the returned scale
        const stepsArray = getScaleIntervals(scaleType);
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
