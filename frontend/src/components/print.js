export function Printoption(list){
    let array = [];
    for(let i = 0; i < list.length; i++){
        array.push(
            <div>{list[i]}</div>
        )
    }
    return array
}