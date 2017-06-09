import {common} from "../interfaces/common.interface";
import {response} from "../interfaces/response.interface";
import ISet = common.ISet;


export class Set implements common.ISet {
    setNumber: number;
    repCount: number;
    weight: number;

    constructor(set: response.ISet) {
        this.setNumber = set.setNumber;
        this.repCount = set.repCount;
        this.weight = set.weight;
    }
}