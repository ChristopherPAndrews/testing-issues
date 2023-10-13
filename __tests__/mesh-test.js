import { HEMesh } from "../src/he-mesh";

const squarePoints = [
  (0, 0, 0),
  (1, 0, 1),
  (0, 0, 1),
  (1, 0, 0),
  (0.5, 0, 0.5),
];

const squareFaces = [
  [0, 4, 1],
  [2, 4, 1],
  [1, 4, 3],
  [3, 4, 0],
];


describe("Tests for the half-edge mesh structure", () => {
  let mesh;
  beforeEach(() => {
    mesh = new HEMesh(squarePoints, squareFaces);
  });

  test("bad test", () => {
    // this version takes 20 minutes to complete
    expect(mesh.faces[0]).toBe(mesh.faces[1]);

    // this version completes in 3s
    expect(Object.is(mesh.faces[1], mesh.faces[0])).toBeTruthy();
  });

});
