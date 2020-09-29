import { DATA } from "./dataCollection";

export function ShuffleObjCollection() {
    const copyCollection = JSON.parse(JSON.stringify(DATA))
    const shuffleCollection = [];
    for (let i = 0; i < copyCollection.length; i += 1) {
        let mixArray = copyCollection[i];
        for (let j = mixArray.length - 1; j >= 0; j -= 1) {
            const randomIndex = Math.floor(Math.random() * (j + 1));
            const currentObj = mixArray[randomIndex];
            mixArray[randomIndex] = mixArray[j];
            mixArray[j] = currentObj;
        }
        shuffleCollection.push(mixArray);
    }
    return shuffleCollection;
}

