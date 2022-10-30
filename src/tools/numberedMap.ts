import {NoteMap} from "../notes";

export const NumberedMap = (arr: any[]) => {
    const map: NoteMap = new Map<number, typeof arr[number]>()
    arr.forEach((val, index) => {
        map.set(index + 1, val);
    })
    return map
}