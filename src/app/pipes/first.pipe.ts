import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'first'
})
export class FirstKeyPipe implements PipeTransform {
    transform(obj) {
        if (obj) {
            let keys = Object.keys(obj);
            if (keys && keys.length > 0) {
                console.log(keys);

                return keys[0];
            }
        }
        return null;
    }
}