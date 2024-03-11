import { Injectable } from '@angular/core';
import { Design } from '../design';
import { Edge } from '../edge';


@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private design: Design[] = [];
  private edge: Edge[] = [];


  setDesign(design: Design) {
    this.design = [];
    this.design.push(design);
  }
  setEdge(edge: Edge) {
    this.edge = [];
    this.edge.push(edge);
  }


  getDesign() {
    return this.design[this.design.length - 1];
  }
  getEdge() {
    return this.edge[this.edge.length - 1];
  }



  constructor() { }
}
