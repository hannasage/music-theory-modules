import {getNotesFromSemitones, Note, NoteMap} from "./notes";

type TriadBase = "root" | "third" | "fifth"
type TriadFifth = "diminished" | "augmented"
interface TriadOptions {
    minorThird?: boolean,
    fifth?: TriadFifth,
    base?: TriadBase
}

const makeTriadSemitones = (options: TriadOptions): [number, number] => {
    let intervals: [number, number] = options.minorThird ? [3, 4] : [4, 3]
    switch (options.fifth) {
        case "diminished":
            intervals = [intervals[0], (intervals[1] - 1)]
            break;
        case "augmented":
            intervals = [intervals[0], (intervals[1] + 1)]
            break;
        case undefined:
        default:
            break;
    }
    return intervals
}

const arrangeTriad = (notes: Note[], base: TriadBase | undefined): Note[] => {
    const [root, third, fifth] = notes;
    switch (base) {
        case "third":
            return [third, fifth, root]
        case "fifth":
            return [fifth, root, third]
        case "root":
        case undefined:
        default:
            return notes;
    }
}

/** Generates a triad from a root note and optional {@link TriadOptions} */
export const buildTriad = (
    root: Note,
    options: TriadOptions = {
        // Major triad
        minorThird: false,
        base: "root"
    }
): NoteMap => {
    const triadSemitones = makeTriadSemitones(options);
    const notes = getNotesFromSemitones(root, triadSemitones);
    const triad = arrangeTriad(notes, options.base);
    const triadMap: NoteMap = new Map()
    triad.forEach((note, index) => {
        triadMap.set(index + 1, note);
    })
    return triadMap
};