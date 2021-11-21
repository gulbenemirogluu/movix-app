export function arraySplit(myArray, chunk_size){
    let index = 0;
    let arrayLength = myArray?.length;
    let tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunk_size) {
        const myChunk = myArray?.slice(index, index+chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}